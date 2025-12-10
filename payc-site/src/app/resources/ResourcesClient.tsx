'use client'

import { useMemo, useState } from 'react'

type Resource = {
  _id: string
  title: string
  kind: string
  url: string
  summary?: string
  tags?: string[]
  featured?: boolean
  recommendedBy?: string
  recommendedRole?: string
}

const KIND_LABELS: Record<string, string> = {
  book: 'Books',
  organization: 'Organizations',
  charity: 'Charities',
  website: 'Websites',
  course: 'Courses',
  tool: 'Tools',
}

const FILTERS = [
  { label: 'All Resources', value: 'all' },
  { label: 'Books', value: 'book' },
  { label: 'Organizations', value: 'organization' },
  { label: 'Charities', value: 'charity' },
  { label: 'Websites', value: 'website' },
  { label: 'Courses', value: 'course' },
  { label: 'Tools', value: 'tool' },
] as const

export default function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [kind, setKind] = useState<string>('all')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg, setMsg] = useState<string>('')

  const outline = useMemo(
    () => ({ borderColor: 'color-mix(in oklab, var(--foreground) 22%, transparent)' } as const),
    []
  )

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return resources
      .filter(r => (kind === 'all' ? true : r.kind === kind))
      .filter(r => {
        if (!query) return true
        const hay = `${r.title ?? ''} ${r.summary ?? ''} ${r.recommendedBy ?? ''} ${(r.tags || []).join(' ')}`
          .toLowerCase()
        return hay.includes(query)
      })
  }, [resources, kind, q])

  async function handleSuggestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // honeypot
    if (data.get('website')) {
      setStatus('success')
      setMsg('Thanks! We got your suggestion.')
      form.reset()
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/resource-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          kind: data.get('kind'),
          resourceName: data.get('resourceName'),
          resourceUrl: data.get('resourceUrl'),
          reason: data.get('reason'),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setMsg('Thanks for sharing a resource with the PAYC community.')
      form.reset()
    } catch {
      setStatus('error')
      setMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      {/* Filters row */}
      <div className="mb-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
        {/* Type filters */}
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setKind(f.value)}
                className={`pb-1 transition ${
                  kind === f.value
                    ? 'border-b-2 border-black dark:border-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="order-1 flex justify-center lg:order-2">
          <label className="flex w-full max-w-md items-center gap-3 border-b pb-1 text-xs uppercase tracking-wide opacity-70">
            <span>Search</span>
            <input
              className="flex-1 border-none bg-transparent p-0 text-sm outline-none placeholder:opacity-60"
              placeholder="Search titles, guests, or tags…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search resources"
            />
          </label>
        </div>

        {/* Spacer / future filters */}
        <div className="order-3 lg:order-3 lg:justify-self-end" />
      </div>

      {/* Resource cards */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm opacity-70">
          No resources match that filter yet.
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(r => (
            <article
              key={r._id}
              className="flex h-full flex-col rounded-2xl border p-5 transition-transform duration-150 hover:-translate-y-0.5"
              style={outline}
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider opacity-70">
                <span>{KIND_LABELS[r.kind] ?? 'Resource'}{r.featured ? ' • Featured' : ''}</span>
                {r.tags && r.tags.length > 0 && (
                  <span className="truncate max-w-[8rem]">{r.tags.join(' • ')}</span>
                )}
              </div>

              <h3 className="text-base font-extrabold leading-snug">
                <a href={r.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {r.title}
                </a>
              </h3>

              {r.summary && (
                <p className="mt-2 text-sm opacity-80 line-clamp-3">
                  {r.summary}
                </p>
              )}

              {(r.recommendedBy || r.recommendedRole) && (
                <p className="mt-3 text-xs opacity-70">
                  Recommended by{' '}
                  {r.recommendedBy && <span className="font-semibold">{r.recommendedBy}</span>}
                  {r.recommendedBy && r.recommendedRole && ' — '}
                  {r.recommendedRole && <span>{r.recommendedRole}</span>}
                </p>
              )}

              <div className="mt-4">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-semibold uppercase underline underline-offset-4"
                >
                  Open Resource
                </a>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Building Our Library */}
      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Building Our Library</h2>
          <p className="mt-3 text-sm opacity-85">
            PAYC’s library grows with every conversation. We highlight books, organizations,
            charities, websites, courses, and tools that helped our guests climb.
          </p>
          <p className="mt-3 text-sm opacity-85">
            If you&apos;ve found a book, organization, or tool that helped you climb, let us know so
            we can share it with the PAYC community.
          </p>
        </div>

        <div className="rounded-2xl border p-5" style={outline}>
          <h3 className="text-sm font-extrabold uppercase tracking-wide">Suggest a Resource</h3>
          <p className="mt-2 text-xs opacity-80">
            We review suggestions regularly and may feature them in future episodes or updates.
          </p>

          <form onSubmit={handleSuggestSubmit} className="mt-4 grid gap-3">
            {/* Honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden />

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block opacity-70">Your Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  className="h-10 w-full rounded border bg-transparent px-3 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block opacity-70">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-10 w-full rounded border bg-transparent px-3 text-sm"
                />
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-1 block opacity-70">Resource Type</span>
              <select
                name="kind"
                required
                className="h-10 w-full rounded border bg-transparent px-3 text-sm"
              >
                <option value="">Select one…</option>
                <option value="book">Book</option>
                <option value="organization">Organization</option>
                <option value="charity">Charity</option>
                <option value="website">Website</option>
                <option value="course">Course</option>
                <option value="tool">Tool</option>
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block opacity-70">Resource Name</span>
              <input
                name="resourceName"
                type="text"
                required
                className="h-10 w-full rounded border bg-transparent px-3 text-sm"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block opacity-70">Link (URL)</span>
              <input
                name="resourceUrl"
                type="url"
                required
                className="h-10 w-full rounded border bg-transparent px-3 text-sm"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block opacity-70">How did this help you climb?</span>
              <textarea
                name="reason"
                rows={4}
                required
                className="w-full rounded border bg-transparent px-3 py-2 text-sm"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-10 rounded border px-5 text-xs font-semibold uppercase tracking-wide disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </button>
              {status !== 'idle' && (
                <p className="text-xs opacity-80">{msg}</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
