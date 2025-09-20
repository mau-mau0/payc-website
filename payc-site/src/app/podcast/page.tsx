import Link from 'next/link'
import { sanityClient } from '@/sanity/client'
import { allEpisodesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { FaSearch, FaHeadphones, FaPlay , FaSpotify, FaApple, FaAmazon, FaYoutube } from 'react-icons/fa'

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
}

function fmtDate(d?: string) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
  } catch {
    return d || ''
  }
}

function toSpotifyPage(embed?: string) {
  return embed?.includes('/embed/') ? embed.replace('/embed/', '/') : embed
}

export default async function PodcastIndexPage() {
  const episodes: Ep[] = await sanityClient.fetch(allEpisodesQuery)

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-10">
      {/* Title + tagline */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">PAYC Podcast</h1>
        <p className="mt-2 text-xs font-semibold tracking-wide opacity-70 uppercase">
          New episodes every single day
        </p>
      </header>

      {/* Platform buttons + search row */}
      <div className="mb-8 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:items-center lg:gap-6">
        {/* left: tabs (static for now) */}
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide lg:gap-6">
          <button className="border-b-2 border-black pb-1 dark:border-white">Most Recent</button>
          <button className="opacity-70 hover:opacity-100">Featured</button>
          <button className="opacity-70 hover:opacity-100">On Love</button>
          <button className="opacity-70 hover:opacity-100">On Self</button>
        </div>

        {/* center: platform buttons */}
        <div className="flex flex-wrap justify-center gap-2 lg:flex-nowrap">
            {[
                { label: 'Spotify', href: 'https://spotify.com', icon: <FaSpotify size={18} /> },
                { label: 'Apple', href: 'https://podcasts.apple.com', icon: <FaApple size={18} /> },
                { label: 'Amazon', href: 'https://music.amazon.com', icon: <FaAmazon size={18} /> },
                { label: 'YouTube', href: 'https://youtube.com', icon: <FaYoutube size={18} /> },
            ].map((b) => (
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
            <span><FaSearch /></span>
            <input
              className="w-48 border-none bg-transparent p-0 text-sm outline-none placeholder:opacity-60"
              placeholder="Type to search…"
              aria-label="Search episodes"
            />
          </label>
        </div>
      </div>

      {/* Episodes list */}
      <div className="divide-y">
        {episodes.map((ep) => {
          const spotifyPage = toSpotifyPage(ep.spotifyEmbedUrl)
          return (
            <article key={ep._id} className="grid gap-6 py-8 md:grid-cols-[320px_1fr_auto] md:gap-10">
              {/* thumbnail */}
              <Link
                href={`/episode/${ep.slug}`}
                className="block aspect-[16/10] w-full overflow-hidden bg-neutral-100 md:w-[320px]"
              >
                {ep.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={ep.title}
                    className="h-full w-full object-cover"
                    src={urlFor(ep.coverImage).width(640).height(400).fit('crop').url()}
                  />
                ) : null}
              </Link>

              {/* middle: meta + title + read more */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-5 text-[11px] uppercase tracking-wide opacity-70">
                  {/* vertical EP label */}
                  {ep.episodeNumber ? (
                    <span className="hidden select-none md:block">
                      <span className="inline-block rotate-90 align-middle">EP — {ep.episodeNumber}</span>
                    </span>
                  ) : null}

                  <span>{fmtDate(ep.date)}</span>
                </div>

                <h2 className="mb-3 text-lg font-extrabold uppercase leading-snug">
                  <Link href={`/episode/${ep.slug}`} className="hover:underline">
                    {ep.title}
                  </Link>
                </h2>

                {ep.summary ? (
                  <p className="mb-4 max-w-prose text-sm opacity-80">{ep.summary}</p>
                ) : null}

                <Link href={`/episode/${ep.slug}`} className="inline-block text-xs font-semibold uppercase underline">
                  Read More
                </Link>
              </div>

              {/* right: actions */}
              <div className="flex flex-col items-end justify-center gap-6 text-xs font-semibold uppercase">
              {ep.youtubeUrl ? (
                    <a
                    href={ep.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2"
                    >
                    <span className="opacity-70 group-hover:opacity-100">Watch</span>
                    <FaPlay size={14} aria-hidden />
                    </a>
                ) : null}

                {spotifyPage ? (
                    <a
                    href={spotifyPage}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2"
                    >
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
