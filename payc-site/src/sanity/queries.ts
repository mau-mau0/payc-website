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

// Site Settings
export const siteSettingsQuery = groq`
*[_type == "siteSettings" && _id == "siteSettings"][0]{
  newsletter{ heading, subtext, ctaLabel, enabled },
  socials[]{ network, url, label },
  footerLinks[]{ label, href },
  legalLinks[]{ label, href },
  footerBlurb,
  copyrightName
}
`

export const allResourceCategoriesQuery = groq`
*[_type == "resourceCategory"] | order(title asc) {
  _id, title, "slug": slug.current, description
}
`

// Resources (join category + tags)
export const allResourcesQuery = groq`
*[_type == "resource"] | order(featured desc, title asc) {
  _id, title, "slug": slug.current, type, url, summary, tags,
  featured,
  coverImage,
  "category": category->{
    _id, title, "slug": slug.current
  }
}
`