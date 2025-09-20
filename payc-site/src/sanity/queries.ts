import { groq } from 'next-sanity'

export const allCategoriesQuery = groq`
*[_type == "podcastCategory"] | order(order asc, title asc) {
  _id, title, "slug": slug.current, order
}`

export const episodeBySlugQuery = groq`
*[_type == "episode" && slug.current == $slug][0] {
  _id, title, 'slug': slug.current, date, guest, summary,
  spotifyEmbedUrl, youtubeUrl, coverImage, episodeNumber,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  }
}`

export const allEpisodesWithCategoriesQuery = groq`
*[_type == "episode"] | order(date desc) {
  _id, title, 'slug': slug.current, date, guest, summary,
  spotifyEmbedUrl, youtubeUrl, coverImage, episodeNumber,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  }
}`