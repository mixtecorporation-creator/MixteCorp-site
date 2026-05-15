'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar_url: string | null
  bio: string | null
}

const fallbackMembers = [
  { id: '1', name: 'Amyn', role: 'Founder & Lead Developer', avatar_url: null, bio: 'Building the future of creative technology.' },
]

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('team_members')
      .select('id, name, role, avatar_url, bio')
      .order('sort_order')
      .then(({ data }: { data: TeamMember[] | null }) => {
        setMembers(data?.length ? data : fallbackMembers)
      })
  }, [])

  return (
    <section id="team" className="section">
      <div className="container">
        <h2 className="section-label">TEAM</h2>
        <h3 className="section-title">The People Behind Mixte</h3>

        <div className="team-grid">
          {members.map((m) => (
            <div key={m.id} className="team-card">
              <div className="team-avatar">
                {m.avatar_url ? (
                  <img src={m.avatar_url} alt={m.name} />
                ) : (
                  <span>{m.name.split(' ').map((n) => n[0]).join('')}</span>
                )}
              </div>
              <h4 className="team-name">{m.name}</h4>
              <p className="team-role">{m.role}</p>
              {m.bio && <p className="team-bio">{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
