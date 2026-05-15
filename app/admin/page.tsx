'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  page: string | null
  created_at: string
  user_id: string | null
}

interface Application {
  id: string
  name: string
  email: string
  message: string
  job_title: string
  job_type: string | null
  created_at: string
}

type Tab = 'feedback' | 'applications'

export default function AdminPage() {
  const { user, profile, profileLoading, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [tab, setTab] = useState<Tab>('feedback')

  useEffect(() => {
    if (!loading && !user) router.push('/auth')
  }, [user, loading, router])

  useEffect(() => {
    if (!profileLoading && profile && !profile.is_admin) router.push('/')
  }, [profile, profileLoading, router])

  useEffect(() => {
    if (!user || !profile?.is_admin) return
    supabase
      .from('feedback')
      .select('id, name, email, message, page, created_at, user_id')
      .order('created_at', { ascending: false })
      .then(({ data }: { data: Feedback[] | null }) => { if (data) setFeedback(data) })
    supabase
      .from('applications')
      .select('id, name, email, message, job_title, job_type, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }: { data: Application[] | null }) => { if (data) setApplications(data) })
  }, [user, profile])

  if (loading || profileLoading) return null
  if (!user || !profile?.is_admin) return null

  const handleDeleteFeedback = async (id: string) => {
    await supabase.from('feedback').delete().eq('id', id)
    setFeedback((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDeleteApplication = async (id: string) => {
    await supabase.from('applications').delete().eq('id', id)
    setApplications((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <Link href="/" className="page-back">&larr; Home</Link>
        <h1 className="admin-title">Admin Panel</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat-value">{feedback.length}</span>
          <span className="admin-stat-label">Messages</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-value">{applications.length}</span>
          <span className="admin-stat-label">Applications</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'feedback' ? 'active' : ''}`} onClick={() => setTab('feedback')}>
          Feedback ({feedback.length})
        </button>
        <button className={`admin-tab ${tab === 'applications' ? 'active' : ''}`} onClick={() => setTab('applications')}>
          Applications ({applications.length})
        </button>
      </div>

      {tab === 'feedback' && (
        <div className="admin-section">
          <h2 className="admin-section-title">Feedback Messages</h2>
          {feedback.length === 0 ? (
            <p className="admin-empty">No messages yet.</p>
          ) : (
            <div className="admin-list">
              {feedback.map((f) => (
                <div key={f.id} className="admin-card">
                  <div className="admin-card-header">
                    <div>
                      <span className="admin-card-name">{f.name}</span>
                      <span className="admin-card-email">{f.email}</span>
                    </div>
                    <div className="admin-card-right">
                      <span className="admin-card-date">
                        {new Date(f.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <button className="admin-delete-btn" onClick={() => handleDeleteFeedback(f.id)}>Delete</button>
                    </div>
                  </div>
                  <p className="admin-card-message">{f.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'applications' && (
        <div className="admin-section">
          <h2 className="admin-section-title">Job Applications</h2>
          {applications.length === 0 ? (
            <p className="admin-empty">No applications yet.</p>
          ) : (
            <div className="admin-list">
              {applications.map((a) => (
                <div key={a.id} className="admin-card">
                  <div className="admin-card-header">
                    <div>
                      <span className="admin-card-name">{a.name}</span>
                      <span className="admin-card-email">{a.email}</span>
                      <span className="admin-card-job">{a.job_title}{a.job_type ? ` · ${a.job_type}` : ''}</span>
                    </div>
                    <div className="admin-card-right">
                      <span className="admin-card-date">
                        {new Date(a.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <button className="admin-delete-btn" onClick={() => handleDeleteApplication(a.id)}>Delete</button>
                    </div>
                  </div>
                  <p className="admin-card-message">{a.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
