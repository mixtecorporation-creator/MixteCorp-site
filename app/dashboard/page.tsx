'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Activity {
  id: string
  action: string
  details: Record<string, unknown> | null
  created_at: string
}

const actionLabels: Record<string, string> = {
  sign_in: 'Signed in',
  sign_out: 'Signed out',
  profile_update: 'Updated profile',
  download_app: 'Downloaded app',
  feedback_sent: 'Sent feedback',
}

export default function DashboardPage() {
  const { user, profile, loading, profileLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (!loading && !user) router.push('/auth')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    supabase
      .from('activity_logs')
      .select('id, action, details, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }: { data: Activity[] | null }) => { if (data) setActivities(data) })
  }, [user])

  if (loading || profileLoading) return null
  if (!user || !profile) return null

  return (
    <div className="page page-narrow">
      <Link href="/" className="page-back">&larr; Home</Link>
      <h1 className="page-title">Dashboard</h1>

      <div className="dash-stats">
        <div className="dash-stat">
          <span className="dash-stat-value">{profile.username || '—'}</span>
          <span className="dash-stat-label">Username</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-value">{profile.country || '—'}</span>
          <span className="dash-stat-label">Country</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-value">{activities.length}</span>
          <span className="dash-stat-label">Recent Actions</span>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-value">{profile.is_admin ? 'Admin' : 'Member'}</span>
          <span className="dash-stat-label">Role</span>
        </div>
      </div>

      <div className="dash-section">
        <h2 className="dash-section-title">Quick Links</h2>
        <div className="dash-links">
          <Link href="/profile" className="dash-link">Profile</Link>
          <Link href="/settings" className="dash-link">Settings</Link>
          <Link href="/blog" className="dash-link">Blog</Link>
          <Link href="/changelog" className="dash-link">Changelog</Link>
          <Link href="/feedback" className="dash-link">Send Feedback</Link>
        </div>
      </div>

      <div className="dash-section">
        <h2 className="dash-section-title">Recent Activity</h2>
        {activities.length === 0 ? (
          <p className="dash-empty">No activity yet.</p>
        ) : (
          <div className="dash-activity">
            {activities.map((a) => (
              <div key={a.id} className="dash-activity-item">
                <span className="dash-activity-action">
                  {actionLabels[a.action] || a.action}
                </span>
                <span className="dash-activity-date">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
