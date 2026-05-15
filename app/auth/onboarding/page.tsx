'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { countries } from '@/lib/countries'

export default function OnboardingPage() {
  const { user, profile, profileLoading, loading, updateProfile, checkUsername } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth')
  }, [user, loading, router])

  useEffect(() => {
    if (!profileLoading && profile?.username) {
      router.push('/')
    }
  }, [profile, profileLoading, router])

  useEffect(() => {
    if (!username || username.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    const timer = setTimeout(async () => {
      const available = await checkUsername(username)
      setUsernameAvailable(available)
      setCheckingUsername(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [username])

  if (loading || profileLoading) return null
  if (!user) return null
  if (profile?.username) return null

  const validateAge = (date: string) => {
    const birth = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1
    }
    return age
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username.length < 3) { setError('Username must be at least 3 characters'); return }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError('Username can only contain letters, numbers, and underscores'); return }
    if (usernameAvailable === false) { setError('Username is already taken'); return }
    if (!birthdate) { setError('Please enter your birthdate'); return }
    if (validateAge(birthdate) < 18) { setError('You must be at least 18 years old'); return }
    if (!country) { setError('Please select your country'); return }

    setSubmitting(true)
    const { error } = await updateProfile({
      username,
      birthdate,
      country,
      onboarded: true,
    })
    setSubmitting(false)

    if (error) { setError(error); return }
    router.push('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Complete Your Profile</h1>
          <p className="auth-subtitle">Set up your account before continuing</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                minLength={3}
                required
              />
              {username.length >= 3 && (
                <span className={`auth-username-status ${checkingUsername ? 'checking' : usernameAvailable ? 'available' : 'taken'}`}>
                  {checkingUsername ? 'Checking...' : usernameAvailable ? 'Available' : 'Taken'}
                </span>
              )}
            </div>

            <div className="auth-field">
              <input
                type="date"
                placeholder="Birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="" disabled>Select your country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="auth-btn auth-btn-submit"
              disabled={submitting || usernameAvailable === false}
            >
              {submitting ? 'Saving...' : 'Complete Setup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
