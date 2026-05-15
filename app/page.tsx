import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Apps from './components/Apps'
import About from './components/About'
import Team from './components/Team'
import Hiring from './components/Hiring'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import CookieBanner from './components/CookieBanner'
import ScrollAnimations from './components/ScrollAnimations'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Mixte — Creative Technology Studio',
  description: 'Mixte Corporation is a creative technology studio crafting innovative applications and digital solutions that push boundaries and redefine possibilities.',
  keywords: ['technology', 'apps', 'mobile development', 'software', 'innovation'],
  authors: [{ name: 'Mixte Corporation' }],
  openGraph: {
    title: 'Mixte — Creative Technology Studio',
    description: 'Creative technology studio crafting innovative applications and digital solutions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mixte — Creative Technology Studio',
    description: 'Creative technology studio crafting innovative applications and digital solutions.',
  },
  robots: 'index, follow',
}

export default function Home() {
  return (
    <>
      <div className="grid-background" />
      <ScrollAnimations />
      <Navigation />
      <main className="main-content">
        <div className="container">
          <Hero />
          <Apps />
          <About />
          <Team />
          <Hiring />
          <Footer />
        </div>
      </main>
      <BackToTop />
      <CookieBanner />
    </>
  )
}