'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Changelog {
  id: string
  version: string
  title: string
  body: string
  published_at: string
}

const fallback: Changelog[] = [
  {
    id: '1',
    version: '0.1.1',
    title: 'Initial Release',
    body: 'First public release of the Mixte app. Includes core features and bug fixes.',
    published_at: new Date().toISOString(),
  },
]

export default function ChangelogPage() {
  const [entries, setEntries] = useState<Changelog[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('changelogs')
      .select('id, version, title, body, published_at')
      .order('published_at', { ascending: false })
      .then(({ data }: { data: Changelog[] | null }) => setEntries(data?.length ? data : fallback))
  }, [])

  return (
    <div className="page page-narrow">
      <Link href="/" className="page-back">&larr; Back</Link>
      <h1 className="page-title">Changelog</h1>

      <div className="changelog-list">
        {entries.map((e) => (
          <div key={e.id} className="changelog-entry">
            <div className="changelog-meta">
              <span className="changelog-version">v{e.version}</span>
              <span className="changelog-date">
                {new Date(e.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h2 className="changelog-title">{e.title}</h2>
            <p className="changelog-body">{e.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
