'use client'

import ContactForm from './ContactForm'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">About Mixte</h2>
        <div className="section-line"></div>
      </div>

      <div className="about-split">
        <div className="about-text animate-on-scroll">
          <h3>Who We Are</h3>
          <p>
            Mixte Corporation is more than just a technology company. We&apos;re dreamers who believe that great software 
            should be both powerful and beautiful.
          </p>
          <p>
            Our mission is to create applications that don&apos;t just solve problems, 
            but inspire people to reach their full potential. Every line of code, 
            every pixel, every interaction is crafted with intention and care.
          </p>
          <p>
            We combine cutting-edge technology with thoughtful design to deliver 
            experiences that users love and remember.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}