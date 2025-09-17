import { sanityClient } from '@/sanity/client'
import { episodeBySlugQuery } from '@/sanity/queries'

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const episode = await sanityClient.fetch(episodeBySlugQuery, { slug })
  if (!episode) {
    return <main className="p-8">Episode not found</main>
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{episode.title}</h1>
      {episode.guest && <p className="mt-1 opacity-70">with {episode.guest}</p>}

      <div className="my-6">
        {episode.spotifyEmbedUrl ? (
          <iframe
            src={episode.spotifyEmbedUrl}
            width="100%"
            height="232"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : episode.youtubeUrl ? (
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={episode.youtubeUrl.replace('watch?v=', 'embed/')}
              title={episode.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </div>

      {episode.summary && <p className="opacity-90">{episode.summary}</p>}
    </main>
  )
}
