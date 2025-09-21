import { sanityClient } from '@/sanity/client'
import { aboutPageQuery } from '@/sanity/queries'
import AboutClient from './AboutClient'

export default async function Page() {
  const data = await sanityClient.fetch(aboutPageQuery)

  const about = data ?? {
    heroImage: null,
    mission: [],
    quote: { text: '', attribution: '' },
    pillars: [],
    metrics: [],
  }

  return <AboutClient about={about} />
}
