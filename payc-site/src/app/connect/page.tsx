import { sanityClient } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPinterestP, FaTiktok } from 'react-icons/fa6'
import ContactForm from '../connect/ContactForm'

type SocialLink = {
  network: string
  url: string
  label?: string
}

const iconFor = (network: string) => {
  switch (network.toLowerCase()) {
    case 'x': return <FaXTwitter aria-hidden />
    case 'instagram': return <FaInstagram aria-hidden />
    case 'facebook': return <FaFacebookF aria-hidden />
    case 'linkedin': return <FaLinkedinIn aria-hidden />
    case 'youtube': return <FaYoutube aria-hidden />
    case 'pinterest': return <FaPinterestP aria-hidden />
    case 'tiktok': return <FaTiktok aria-hidden />
    default: return null
  }
}

export const revalidate = 60

export default async function ConnectPage() {
  const settings = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60, tags: ['siteSettings'] } }
  )

  const outline = { borderColor: 'color-mix(in oklab, var(--foreground) 22%, transparent)' } as const
  const socials = settings?.socials ?? []
  const contact = settings?.contact ?? {}

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">Connect</h1>
        <p className="mt-2 text-xs font-semibold tracking-wide opacity-70 uppercase">
          We’d love to hear from you
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-2">
        {/* Left: intro + details + socials */}
        <div>
          <h2 className="text-xl font-bold">{contact.heading || 'Get in touch'}</h2>
          <p className="mt-3 text-sm opacity-85">
            {contact.subtext || 'Questions, collaborations, or guest ideas? Send a note below.'}
          </p>

          <dl className="mt-6 space-y-2 text-sm">
            {contact.emailTo && (
              <div className="flex gap-2">
                <dt className="opacity-60 min-w-20">Email</dt>
                <dd><a className="underline" href={`mailto:${contact.emailTo}`}>{contact.emailTo}</a></dd>
              </div>
            )}
            {contact.phone && (
              <div className="flex gap-2">
                <dt className="opacity-60 min-w-20">Phone</dt>
                <dd><a className="underline" href={`tel:${contact.phone}`}>{contact.phone}</a></dd>
              </div>
            )}
            {contact.location && (
              <div className="flex gap-2">
                <dt className="opacity-60 min-w-20">Location</dt>
                <dd>{contact.location}</dd>
              </div>
            )}
          </dl>

          {socials?.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Follow PAYC:</p>
              <div className="mt-3 flex flex-wrap gap-4 text-lg">
                {socials.map((s: SocialLink, i: number) => (
                  <a
                    key={`${s.network}-${i}`}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 opacity-80 hover:opacity-100"
                    aria-label={s.label || s.network}
                  >
                    {iconFor(s.network)}
                  </a>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-xs opacity-70">
            Prefer email? Reach us at{' '}
            {contact.emailTo
              ? <a className="underline" href={`mailto:${contact.emailTo}`}>{contact.emailTo}</a>
              : <span>your@email.com</span>}
            .
          </p>
        </div>

        {/* Right: contact form */}
        <div className="rounded-2xl border p-6" style={outline}>
          <h2 className="text-base font-extrabold uppercase tracking-wide">Send a message</h2>
          <p className="mt-2 text-sm opacity-80">
            We read every note. Please include any links or context that helps.
          </p>

          <ContactForm enabled={!!contact.enableForm} />
          <p className="mt-3 text-xs opacity-60">
            By submitting, you agree we may contact you about your message.
          </p>
        </div>
      </section>

      {/* FAQ placeholder */}
      <section className="mt-16">
        <h2 className="text-xl font-bold">FAQs</h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="opacity-80">• Guest recommendations: briefly share who and why.</li>
          <li className="opacity-80">• Partnerships: tell us your idea, timing, and goals.</li>
          <li className="opacity-80">• Students: ask for resources—we’ll point you to playlists and tools.</li>
        </ul>
      </section>
    </main>
  )
}
