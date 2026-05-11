'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setShow(true), 1500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ ...preferences, accepted: true }))
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, accepted: false }))
    setShow(false)
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'necessary') return
    setPreferences({ ...preferences, [key]: !preferences[key] })
  }

  if (!show) return null

  return (
    <div className="cookie-banner show">
      <div className="cookie-content">
        <div className="cookie-header">
          <h3>We value your privacy</h3>
        </div>
        <p>
          We use cookies to enhance your browsing experience, serve personalized content, 
          and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
        </p>
        <div className="cookie-preferences">
          <label className="cookie-pref">
            <input type="checkbox" checked={preferences.necessary} disabled />
            Necessary
          </label>
          <label className="cookie-pref">
            <input 
              type="checkbox" 
              checked={preferences.analytics} 
              onChange={() => handlePreferenceChange('analytics')}
            />
            Analytics
          </label>
          <label className="cookie-pref">
            <input 
              type="checkbox" 
              checked={preferences.marketing} 
              onChange={() => handlePreferenceChange('marketing')}
            />
            Marketing
          </label>
        </div>
        <div className="cookie-actions">
          <button className="cookie-btn accept" onClick={handleAccept}>Accept All</button>
          <button className="cookie-btn decline" onClick={handleDecline}>Decline</button>
        </div>
      </div>
    </div>
  )
}