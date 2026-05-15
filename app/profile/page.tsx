'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { countries } from '@/lib/countries'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, profile, profileLoading, loading, updateProfile, checkUsername } = useAuth()
  const router = useRouter()
  const [editing, setEditing] = useState(false)

  const [username, setUsername] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth')
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '')
      setBirthdate(profile.birthdate || '')
      setCountry(profile.country || '')
    }
  }, [profile])

  useEffect(() => {
    if (!editing || !username || username.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    const timer = setTimeout(async () => {
      const available = await checkUsername(username)
      setUsernameAvailable(available || username === profile?.username)
      setCheckingUsername(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [username, editing])

  if (loading || profileLoading) return null
  if (!user || !profile) return null

  const currentUsername = profile.username
  const isUsernameChanged = username !== currentUsername

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

  const handleSave = async () => {
    setError('')
    setSuccess(false)

    if (username.length < 3) { setError('Username must be at least 3 characters'); return }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError('Username can only contain letters, numbers, and underscores'); return }
    if (isUsernameChanged && usernameAvailable === false) { setError('Username is already taken'); return }
    if (!birthdate) { setError('Please enter your birthdate'); return }
    if (validateAge(birthdate) < 18) { setError('You must be at least 18 years old'); return }
    if (!country) { setError('Please select your country'); return }

    setSubmitting(true)
    const { error } = await updateProfile({ username, birthdate, country })
    setSubmitting(false)

    if (error) { setError(error); return }
    setSuccess(true)
    setEditing(false)
  }

  const handleCancel = () => {
    setUsername(profile.username || '')
    setBirthdate(profile.birthdate || '')
    setCountry(profile.country || '')
    setError('')
    setSuccess(false)
    setEditing(false)
  }

  const avatar = user.user_metadata?.avatar_url
  const displayName = user.user_metadata?.full_name || user.email || 'User'
  const email = user.email || ''

  const formatDate = (date: string) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={`profile-page${editing ? ' editing' : ''}`}>
      <div className="profile-topbar">
        <Link href="/" className="profile-back">&larr; Back</Link>
        <div className="profile-topbar-right">
          {editing ? (
            <>
              <button className="pf-btn pf-btn-primary" onClick={handleSave} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="pf-btn pf-btn-ghost" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="pf-btn pf-btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <header className="profile-hero">
        {avatar ? (
          <img src={avatar} alt="" className="profile-avatar" />
        ) : (
          <span className="profile-avatar-fallback">
            {(displayName as string).charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <h1 className="profile-name">{displayName}</h1>
          <span className="profile-email">{email}</span>
        </div>
      </header>

      {success && <p className="profile-success">Profile updated successfully.</p>}
      {error && <p className="profile-error">{error}</p>}

      <div className="profile-grid">
        <div className="profile-field">
          <label className="profile-label">Username</label>
          {editing ? (
            <div className="profile-input-wrap">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                className="profile-input"
                minLength={3}
              />
              {isUsernameChanged && username.length >= 3 && (
                <span className={`profile-username-status ${checkingUsername ? 'checking' : usernameAvailable ? 'available' : 'taken'}`}>
                  {checkingUsername ? 'Checking...' : usernameAvailable ? 'Available' : 'Taken'}
                </span>
              )}
            </div>
          ) : (
            <p className="profile-value">{profile.username || 'Not set'}</p>
          )}
        </div>

        <div className="profile-field">
          <label className="profile-label">Birthdate</label>
          {editing ? (
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="profile-input" />
          ) : (
            <p className="profile-value">{formatDate(profile.birthdate || '')}</p>
          )}
        </div>

        <div className="profile-field">
          <label className="profile-label">Country</label>
          {editing ? (
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="profile-input">
              <option value="" disabled>Select your country</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : (
            <p className="profile-value">{profile.country || 'Not set'}</p>
          )}
        </div>
      </div>
    </div>
  )
}
