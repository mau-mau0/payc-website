import { groq } from 'next-sanity'

// Podcast Categories
export const allCategoriesQuery = groq`
*[_type == "podcastCategory"] | order(order asc, title asc) {
  _id, title, "slug": slug.current, order
}`

// Episodes
export const episodeBySlugQuery = groq`
*[_type == "episode" && slug.current == $slug][0] {
  _id, title, 'slug': slug.current, date, guest, summary,
  spotifyEmbedUrl, youtubeUrl, coverImage, episodeNumber,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  }
}`

// All Episodes with Categories
export const allEpisodesWithCategoriesQuery = groq`
*[_type == "episode"] | order(date desc) {
  _id, title, 'slug': slug.current, date, guest, summary,
  spotifyEmbedUrl, youtubeUrl, coverImage, episodeNumber,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  }
}`

// About Page
export const aboutPageQuery = groq`
*[_type == "aboutPage" && _id == "aboutPage"][0]{
  heroImage{asset, alt},
  mission,
  quote{ text, attribution },
  pillars[]{ title, description },
  metrics[]{ value, label }
}
`