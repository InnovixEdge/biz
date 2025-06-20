
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'fallback_webhook_secret_for_build'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.subscription.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            tier: 'PRO',
            status: subscription.status.toUpperCase() as any,
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
          }
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.subscription.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            tier: 'FREE',
            status: 'CANCELED',
            stripeSubscriptionId: null,
            stripePriceId: null,
            currentPeriodStart: null,
            currentPeriodEnd: null,
          }
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        if ((invoice as any).subscription) {
          await prisma.subscription.update({
            where: { stripeSubscriptionId: (invoice as any).subscription as string },
            data: {
              status: 'PAST_DUE'
            }
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
