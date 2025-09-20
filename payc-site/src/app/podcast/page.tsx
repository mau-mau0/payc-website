import { sanityClient } from '@/sanity/client'
import { allCategoriesQuery, allEpisodesWithCategoriesQuery } from '@/sanity/queries'
import PodcastIndexPage from './PodcastIndexPage'

export default async function Page() {
  const [categories, episodes] = await Promise.all([
    sanityClient.fetch(allCategoriesQuery),
    sanityClient.fetch(allEpisodesWithCategoriesQuery),
  ])

  return <PodcastIndexPage categories={categories} episodes={episodes} />
}
