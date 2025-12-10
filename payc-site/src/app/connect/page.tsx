import { sanityClient } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import ConnectClient from '../connect/ConnectClient'

export const revalidate = 60

export default async function ConnectPage() {
  const settings = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60, tags: ['siteSettings'] } }
  )

  const contact = settings?.contact ?? {}
  const socials = settings?.socials ?? []

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-12">
      <ConnectClient contact={contact} socials={socials} />
    </main>
  )
}
