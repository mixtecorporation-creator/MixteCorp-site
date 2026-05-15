'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function FeedbackPage() {
  const { user, profile } = useAuth()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setName(profile?.username || user.user_metadata?.full_name || '')
      setEmail(user.email || '')
    }
  }, [user, profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !message.trim()) { setError('All fields are required'); return }
    setSubmitting(true)
    const { error } = await supabase.from('feedback').insert({
      user_id: user?.id || null,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      page: window.location.pathname,
    })
    setSubmitting(false)
    if (error) { setError(error.message); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page page-narrow page-center">
        <div className="feedback-thanks">
          <h1>Thank You!</h1>
          <p>We appreciate your feedback.</p>
          <Link href="/" className="feedback-link">Back Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page page-narrow">
      <Link href="/" className="page-back">&larr; Back</Link>
      <h1 className="page-title">Feedback</h1>
      <p className="page-desc">Help us improve Mixte.</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="settings-input" />
        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="settings-input" />
        <textarea placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="settings-input feedback-textarea" rows={6} />
        {error && <p className="settings-error">{error}</p>}
        <button type="submit" disabled={submitting} className="settings-btn">
          {submitting ? 'Sending...' : 'Send Feedback'}
        </button>
      </form>
    </div>
  )
}
