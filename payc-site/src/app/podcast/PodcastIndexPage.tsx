'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'
import { FaSearch, FaHeadphones, FaPlay, FaSpotify, FaApple, FaAmazon, FaYoutube } from 'react-icons/fa'

type Category = { _id: string; title: string; slug: string }
type Ep = {
  _id: string
  title: string
  slug: string
  date?: string
  guest?: string
  summary?: string
  spotifyEmbedUrl?: string
  youtubeUrl?: string
  coverImage?: any
  episodeNumber?: string
  categories?: Category[]
}

function fmtDate(d?: string) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
  } catch { return d || '' }
}
function toSpotifyPage(embed?: string) {
  return embed?.includes('/embed/') ? embed.replace('/embed/', '/') : embed
}

export default function PodcastIndexPage({
  categories,
  episodes,
}: {
  categories: Category[]
  episodes: Ep[]
}) {
  // Build tabs: “All” + categories from CMS
  const TABS = useMemo(
    () => [{ label: 'Most Recent', value: 'all' as const }, ...categories.map(c => ({ label: c.title, value: c.slug }))],
    [categories]
  )

  const [activeTab, setActiveTab] = useState<string>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return episodes
      .filter(ep => {
        if (activeTab === 'all') return true
        const slugs = ep.categories?.map(c => c.slug) ?? []
        return slugs.includes(activeTab)
      })
      .filter(ep => {
        if (!query) return true
        const hay = `${ep.title ?? ''} ${ep.guest ?? ''} ${ep.summary ?? ''}`.toLowerCase()
        return hay.includes(query)
      })
  }, [episodes, activeTab, q])

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-10">
      {/* Title + tagline */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">PAYC Podcast</h1>
        <p className="mt-2 text-xs font-semibold tracking-wide opacity-70 uppercase">New episodes every single day</p>
      </header>

      {/* Tabs + Platforms + Search */}
      <div className="mb-8 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:items-center lg:gap-6">
        {/* left: tabs (from CMS) */}
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide lg:gap-6">
          {TABS.map(t => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`pb-1 transition ${activeTab === t.value ? 'border-b-2 border-black dark:border-white' : 'opacity-70 hover:opacity-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* center: platform buttons */}
        <div className="flex flex-wrap justify-center gap-2 lg:flex-nowrap">
          {[
            { label: 'Spotify', href: 'https://spotify.com', icon: <FaSpotify size={18} /> },
            { label: 'Apple', href: 'https://podcasts.apple.com', icon: <FaApple size={18} /> },
            { label: 'Amazon', href: 'https://music.amazon.com', icon: <FaAmazon size={18} /> },
            { label: 'YouTube', href: 'https://youtube.com', icon: <FaYoutube size={18} /> },
          ].map(b => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {b.icon}
              {b.label}
            </a>
          ))}
        </div>

        {/* right: search */}
        <div className="flex justify-center lg:justify-end">
          <label className="flex items-center gap-3 border-b pb-1 text-xs uppercase tracking-wide opacity-70">
            <span aria-hidden><FaSearch /></span>
            <input
              className="w-48 border-none bg-transparent p-0 text-sm outline-none placeholder:opacity-60"
              placeholder="Type to search…"
              aria-label="Search episodes"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Episodes list */}
      <div className="divide-y">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm opacity-70">No episodes match that filter.</p>
        )}

        {filtered.map(ep => {
          const spotifyPage = toSpotifyPage(ep.spotifyEmbedUrl)
          return (
            <article key={ep._id} className="grid gap-6 py-8 md:grid-cols-[320px_1fr_auto] md:gap-10">
              {/* thumbnail */}
              <Link href={`/episode/${ep.slug}`} className="block aspect-[16/10] w-full overflow-hidden bg-neutral-100 md:w-[320px]">
                {ep.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={ep.title}
                    className="h-full w-full object-cover"
                    src={urlFor(ep.coverImage).width(640).height(400).fit('crop').url()}
                  />
                ) : null}
              </Link>

              {/* middle */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-5 text-[11px] uppercase tracking-wide opacity-70">
                  {ep.episodeNumber ? (
                    <span className="hidden select-none md:block">
                      <span className="inline-block align-middle">EP — {ep.episodeNumber}</span>
                    </span>
                  ) : null}
                  <span>{fmtDate(ep.date)}</span>
                </div>

                <h2 className="mb-3 text-lg font-extrabold uppercase leading-snug">
                  <Link href={`/episode/${ep.slug}`} className="hover:underline">{ep.title}</Link>
                </h2>

                {ep.summary ? <p className="mb-4 max-w-prose text-sm opacity-80">{ep.summary}</p> : null}

                <Link href={`/episode/${ep.slug}`} className="inline-block text-xs font-semibold uppercase underline">
                  Read More
                </Link>
              </div>

              {/* right: actions */}
              <div className="flex flex-col items-end justify-center gap-6 text-xs font-semibold uppercase">
                {ep.youtubeUrl ? (
                  <a href={ep.youtubeUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
                    <span className="opacity-70 group-hover:opacity-100">Watch</span>
                    <FaPlay size={14} aria-hidden />
                  </a>
                ) : null}
                {spotifyPage ? (
                  <a href={spotifyPage} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
                    <span className="opacity-70 group-hover:opacity-100">Listen</span>
                    <FaHeadphones size={14} aria-hidden />
                  </a>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
