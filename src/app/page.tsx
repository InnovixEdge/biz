
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ChatbotSection from '@/components/chatbot-section'
import FeaturesSection from '@/components/features-section'
import PricingSection from '@/components/pricing-section'
import AboutSection from '@/components/about-section'
import BenefitsSection from '@/components/benefits-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ChatbotSection />
      <FeaturesSection />
      <PricingSection />
      <AboutSection />
      <BenefitsSection />
      <Footer />
    </main>
  )
}
