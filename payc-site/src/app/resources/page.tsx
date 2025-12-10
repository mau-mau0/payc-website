import { sanityClient } from '@/sanity/client'
import { allResourceCategoriesQuery, allResourcesQuery } from '@/sanity/queries'
import ResourcesClient from '../resources/ResourcesClient'

export const revalidate = 60 // ISR; adjust as desired

export default async function ResourcesPage() {
  const [categories, resources] = await Promise.all([
    sanityClient.fetch(allResourceCategoriesQuery, {}, { next: { revalidate: 60 } }),
    sanityClient.fetch(allResourcesQuery, {}, { next: { revalidate: 60 } }),
  ])

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">Resources</h1>
        <p className="mt-2 text-xs font-semibold tracking-wide opacity-70 uppercase">
          Curated tools, reads, and communities for your climb
        </p>
      </header>

      <ResourcesClient categories={categories} resources={resources} />
    </main>
  )
}
