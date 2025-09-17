import { groq } from 'next-sanity'

export const allEpisodesQuery = groq`
  *[_type == "episode"] | order(date desc) {
    _id,
    title,
    'slug': slug.current,
    date,
    guest,
    summary,
    spotifyEmbedUrl,
    youtubeUrl,
    coverImage
  }`

export const episodeBySlugQuery = groq`
  *[_type == "episode" && slug.current == $slug][0]{
    _id, title, 'slug': slug.current, date, guest, summary,
    spotifyEmbedUrl, youtubeUrl, coverImage
  }`