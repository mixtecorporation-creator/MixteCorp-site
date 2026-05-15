'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UserMenu() {
  const { user, profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!user) return null

  const avatar = user.user_metadata?.avatar_url
  const name = user.user_metadata?.full_name || user.email?.charAt(0).toUpperCase() || 'U'
  const displayName = user.user_metadata?.full_name || user.email || 'User'
  const email = user.email || ''

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-trigger" onClick={() => setOpen(!open)}>
        {avatar ? (
          <img src={avatar} alt="" className="user-avatar" />
        ) : (
          <span className="user-avatar-fallback">{name}</span>
        )}
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <span className="user-menu-name">{displayName}</span>
            <span className="user-menu-email">{email}</span>
          </div>
          <Link href="/dashboard" className="user-menu-item" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/profile" className="user-menu-item" onClick={() => setOpen(false)}>
            Profile
          </Link>
          <Link href="/settings" className="user-menu-item" onClick={() => setOpen(false)}>
            Settings
          </Link>
          {profile?.is_admin && (
            <>
              <Link href="/admin" className="user-menu-item" onClick={() => setOpen(false)}>
                Admin
              </Link>
              <div className="user-menu-divider" />
            </>
          )}
          <div className="user-menu-divider" />
          <button className="user-menu-item" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
