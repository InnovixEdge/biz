
# Matalino AI - Your Ultimate Business Mentor

A Next.js application that provides AI-powered business mentoring and guidance.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A database (PostgreSQL recommended)

### Installation

1. Clone this repository to your local machine
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual values.

4. Set up your database and run migrations (if using Prisma)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

### Step 1: Prepare Your Repository

1. **Delete all existing files** from your GitHub repository
2. **Upload all files** from this organized project to your repository
3. Make sure the file structure looks like this:
   ```
   your-repo/
   ├── src/
   │   └── app/
   │       ├── api/
   │       ├── auth/
   │       ├── dashboard/
   │       ├── pricing/
   │       ├── globals.css
   │       ├── layout.tsx
   │       └── page.tsx
   ├── components/
   ├── lib/
   ├── hooks/
   ├── types/
   ├── package.json
   ├── next.config.js
   ├── tailwind.config.ts
   ├── tsconfig.json
   └── other config files
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. **Before deploying**, add your environment variables:
   - Go to "Environment Variables" section
   - Add all the variables from your `.env.example` file with real values:
     - `DATABASE_URL`
     - `NEXTAUTH_URL` (set this to your Vercel domain, e.g., `https://your-app.vercel.app`)
     - `NEXTAUTH_SECRET`
     - `STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - Any other environment variables your app needs

6. Click "Deploy"

### Step 3: Post-Deployment Setup

1. **Update NEXTAUTH_URL**: After deployment, update the `NEXTAUTH_URL` environment variable to your actual Vercel domain
2. **Database Setup**: Make sure your database is accessible from Vercel
3. **Stripe Webhooks**: Update your Stripe webhook endpoint to point to `https://your-app.vercel.app/api/webhooks/stripe`

## Environment Variables Required

Make sure to set these environment variables in Vercel:

- `DATABASE_URL` - Your database connection string
- `NEXTAUTH_URL` - Your app's URL (https://your-app.vercel.app)
- `NEXTAUTH_SECRET` - A random secret for NextAuth.js
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
- Any OAuth provider keys (Google, etc.)

## Troubleshooting

If deployment fails:

1. Check the build logs in Vercel dashboard
2. Ensure all environment variables are set correctly
3. Make sure your database is accessible
4. Verify that all import paths use the `@/` alias correctly

## Features

- AI-powered business mentoring
- User authentication with NextAuth.js
- Stripe integration for payments
- Responsive design with Tailwind CSS
- Modern UI components with Radix UI

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Database**: PostgreSQL with Prisma (recommended)
- **Deployment**: Vercel

