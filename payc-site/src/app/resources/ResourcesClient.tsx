'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Category = { _id: string; title: string; slug: string; description?: string }
type Res = {
  _id: string
  title: string
  slug?: string
  type?: string
  url: string
  summary?: string
  tags?: string[]
  featured?: boolean
  coverImage?: any
  category?: { _id: string; title: string; slug: string }
}

const TYPE_LABELS: Record<string, string> = {
  article: 'Article',
  video: 'Video',
  tool: 'Tool',
  book: 'Book',
  course: 'Course',
  podcast: 'Podcast',
  community: 'Community',
  other: 'Other',
}

export default function ResourcesClient({
  categories,
  resources,
}: {
  categories: Category[]
  resources: Res[]
}) {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string>('')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    resources.forEach(r => r.tags?.forEach(t => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [resources])

  const TABS = useMemo(
    () => [{ label: 'All', value: 'all' as const }, ...categories.map(c => ({ label: c.title, value: c.slug }))],
    [categories]
  )

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return resources
      .filter(r => (activeCat === 'all' ? true : r.category?.slug === activeCat))
      .filter(r => (tag ? (r.tags || []).includes(tag) : true))
      .filter(r => {
        if (!query) return true
        const hay = `${r.title ?? ''} ${r.summary ?? ''} ${r.category?.title ?? ''} ${(r.tags || []).join(' ')}`.toLowerCase()
        return hay.includes(query)
      })
  }, [resources, activeCat, q, tag])

  const outline = { borderColor: 'color-mix(in oklab, var(--foreground) 22%, transparent)' } as const

  return (
    <>
      {/* Filters row */}
      <div className="mb-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
        {/* Tabs */}
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide">
            {TABS.map(t => (
              <button
                key={t.value}
                onClick={() => setActiveCat(t.value)}
                className={`pb-1 transition ${
                  activeCat === t.value ? 'border-b-2 border-black dark:border-white' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-center">
          <label className="flex w-full max-w-md items-center gap-3 border-b pb-1 text-xs uppercase tracking-wide opacity-70">
            <span>Search</span>
            <input
              className="flex-1 border-none bg-transparent p-0 text-sm outline-none placeholder:opacity-60"
              placeholder="Find a resource…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search resources"
            />
          </label>
        </div>

        {/* Tag select */}
        <div className="order-3 lg:order-3 lg:justify-self-end">
          <select
            className="h-9 rounded border bg-transparent px-3 text-xs uppercase tracking-wide"
            style={outline}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            aria-label="Filter by tag"
          >
            <option value="">All Tags</option>
            {allTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm opacity-70">No resources match that filter.</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <article
              key={r._id}
              className="rounded-2xl border p-5 transition-transform duration-150 hover:-translate-y-0.5"
              style={outline}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                  {TYPE_LABELS[r.type ?? 'other']}{r.featured ? ' • Featured' : ''}
                </span>
                {r.category?.title && (
                  <span className="text-[10px] uppercase tracking-wider opacity-60">{r.category.title}</span>
                )}
              </div>

              <h3 className="text-base font-extrabold leading-snug">
                <a href={r.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {r.title}
                </a>
              </h3>

              {r.summary && <p className="mt-2 text-sm opacity-80 line-clamp-3">{r.summary}</p>}

              {r.tags && r.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map(t => (
                    <button
                      key={t}
                      onClick={() => setTag(prev => (prev === t ? '' : t))}
                      className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-wider ${
                        tag === t ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={outline}
                      aria-pressed={tag === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5">
                <Link
                  href={r.url}
                  target="_blank"
                  className="inline-block text-xs font-semibold uppercase underline underline-offset-4"
                >
                  Open
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  )
}
