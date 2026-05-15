'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SettingsPage() {
  const { user, loading, profileLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [newEmail, setNewEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth')
  }, [user, loading, router])

  if (loading || profileLoading) return null
  if (!user) return null

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!newEmail) { setError('Enter a new email'); return }
    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setSubmitting(false)
    if (error) { setError(error.message); return }
    setSuccess(true)
    setNewEmail('')
  }

  return (
    <div className="page page-narrow">
      <Link href="/profile" className="page-back">&larr; Back to Profile</Link>
      <h1 className="page-title">Settings</h1>

      <div className="settings-group">
        <h2 className="settings-group-title">Email</h2>
        <form onSubmit={handleEmailUpdate} className="settings-form">
          <input
            type="email"
            placeholder="New email address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="settings-input"
          />
          {error && <p className="settings-error">{error}</p>}
          {success && <p className="settings-success">Confirmation email sent. Check your inbox.</p>}
          <button type="submit" disabled={submitting} className="settings-btn">
            {submitting ? 'Sending...' : 'Update Email'}
          </button>
        </form>
      </div>
    </div>
  )
}
