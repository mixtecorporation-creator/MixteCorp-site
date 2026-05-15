'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function ContactForm() {
  const { user, profile } = useAuth()
  const supabase = createClient()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('All fields are required')
      return
    }
    setSubmitting(true)
    const { error } = await supabase.from('feedback').insert({
      user_id: user?.id || null,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      page: '/',
    })
    setSubmitting(false)
    if (error) { setError(error.message); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-section">
        <div className="contact-form form-success">
          <h4>Message Sent!</h4>
          <p>Thank you for reaching out. We&apos;ll get back to you soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="How can we help you?"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        {error && <p className="settings-error">{error}</p>}
        <button type="submit" className="form-submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
