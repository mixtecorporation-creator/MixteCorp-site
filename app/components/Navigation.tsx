'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import UserMenu from './UserMenu'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { href: '#apps', label: 'Apps' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
  { href: '#hiring', label: 'Hiring' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <nav className="nav-container">
        <Link href="/" className="logo">
          Mixte
        </Link>

        <ul className="nav-desktop-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <ThemeToggle />
          {!loading && (
            user ? <UserMenu /> : <Link href="/auth" className="nav-signin-btn">Sign In</Link>
          )}
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-links-header">
            <span className="nav-links-title">Menu</span>
            <button className="nav-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <ul className="nav-links-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMobileMenu}>{item.label}</Link>
              </li>
            ))}
            <li className="nav-mobile-divider" />
            <li><Link href="/blog" onClick={closeMobileMenu}>Blog</Link></li>
            <li><Link href="/changelog" onClick={closeMobileMenu}>Changelog</Link></li>
            <li><Link href="/feedback" onClick={closeMobileMenu}>Feedback</Link></li>
            <li className="nav-mobile-divider" />
            <li><Link href="/privacy" onClick={closeMobileMenu}>Privacy</Link></li>
            <li><Link href="/terms" onClick={closeMobileMenu}>Terms</Link></li>
          </ul>
          <div className="nav-links-footer">
            <a href="mailto:mixtecorporation@gmail.com" className="nav-email-link">
              mixtecorporation@gmail.com
            </a>
          </div>
        </div>

        <div className={`nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu} />
      </nav>
    </header>
  )
}