'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero animate-on-scroll">
      <h1>
        We create<br />
        <span className="gradient-text">digital experiences</span><br />
        that matter
      </h1>
      <p>
        Mixte Corporation is a creative technology studio crafting innovative applications 
        and digital solutions that push boundaries and redefine possibilities.
      </p>
      <Link href="#apps" className="cta-button">
        <span>Explore Our Work</span>
      </Link>
    </section>
  )
}