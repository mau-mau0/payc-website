import Link from 'next/link'
import { sanityClient } from '@/sanity/client'
import { allEpisodesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

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
}

function fmtDate(d?: string) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
  } catch {
    return d
  }
}

export default async function PodcastIndexPage() {
  const episodes: Ep[] = await sanityClient.fetch(allEpisodesQuery)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Podcast</h1>
        <p className="mt-2 text-sm opacity-70">New episodes every week</p>
      </header>

      <div className="space-y-10">
        {episodes.map((ep) => {
          // derive non-embed spotify url if you used an embed link
          const spotifyPage = ep.spotifyEmbedUrl?.replace('/embed/', '/')
          const youtubeWatch = ep.youtubeUrl // already a watch or embed; fine to open new tab

          return (
            <article key={ep._id} className="grid gap-6 border-t pt-8 md:grid-cols-[320px_1fr]">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 md:w-[320px]">
                {ep.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={ep.title}
                    className="h-full w-full object-cover"
                    src={urlFor(ep.coverImage).width(640).height(400).fit('crop').url()}
                  />
                ) : null}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wide opacity-60">
                  {fmtDate(ep.date)}
                  {ep.guest && <span>•</span>}
                  {ep.guest && <span>{ep.guest}</span>}
                </div>

                <h2 className="mt-2 text-xl font-extrabold leading-snug">
                  <Link href={`/episode/${ep.slug}`} className="hover:underline">
                    {ep.title}
                  </Link>
                </h2>

                {ep.summary && (
                  <p className="mt-3 max-w-prose text-sm opacity-80 line-clamp-3">{ep.summary}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                  {youtubeWatch && (
                    <a
                      href={youtubeWatch}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline"
                    >
                      WATCH ▶
                    </a>
                  )}
                  {spotifyPage && (
                    <a
                      href={spotifyPage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline"
                    >
                      LISTEN ♫
                    </a>
                  )}
                  <Link
                    href={`/episode/${ep.slug}`}
                    className="inline-flex items-center gap-2 underline"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
