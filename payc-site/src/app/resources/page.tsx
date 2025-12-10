import { sanityClient } from '@/sanity/client'
import { allResourcesQuery } from '@/sanity/queries'
import ResourcesClient from './ResourcesClient'

export const revalidate = 60

export default async function ResourcesPage() {
  const resources = await sanityClient.fetch(
    allResourcesQuery,
    {},
    { next: { revalidate: 60, tags: ['resources'] } }
  )

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">Resources</h1>
        <p className="mt-2 text-xs font-semibold tracking-wide opacity-70 uppercase max-w-xl mx-auto">
          Books, organizations, charities, websites, courses, and tools recommended by PAYC guests.
          These helped shape their journeys and can help shape yours too.
        </p>
      </header>

      <ResourcesClient resources={resources} />
    </main>
  )
}
