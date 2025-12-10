import Link from 'next/link'
import { sanityClient } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { NAV_LINKS } from '@/lib/nav'
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPinterestP, FaTiktok } from 'react-icons/fa6'

type SocialLink = {
  network: string
  url: string
  label?: string
}

type LegalLink = {
  label: string
  href: string
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

export default async function Footer() {
  // --- Choose ONE of these strategies ---
  // 1) Immediate updates (no cache):
  // const settings = await sanityClient.fetch(siteSettingsQuery, {}, { cache: 'no-store' })

  // 2) ISR with tag (recommended for prod):
  const settings = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60, tags: ['siteSettings'] } } // revalidate once/minute & via tag
  )

  const {
    newsletter = { heading: 'Weekly wisdom straight to your inbox.', subtext: 'Newsletter coming soon.', ctaLabel: 'Subscribe', enabled: false },
    socials = [],
    legalLinks = [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Site Credits', href: '/credits' },
    ],
    footerBlurb = 'PAYC (Pull As You Climb) shares real stories, mentors, and practical steps so young people—especially from underrepresented communities—can build skills, careers, and community.',
    copyrightName = 'PAYC',
  } = settings || {}

  // Footer links now come from NAV_LINKS (keeps Header + Footer in sync)
  const footerLinks = NAV_LINKS
  const mid = Math.ceil(footerLinks.length / 2)
  const leftCol  = footerLinks.slice(0, mid)
  const rightCol = footerLinks.slice(mid)

  const outline = { borderColor: 'color-mix(in oklab, var(--foreground) 18%, transparent)' } as const

  return (
    <footer className="mt-20 border-t" style={outline}>
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: two columns of links (from NAV_LINKS) */}
          <div className="grid grid-cols-2 gap-6">
            <nav className="space-y-3 text-sm font-semibold uppercase tracking-wide">
              {leftCol.map(l => (
                <Link key={l.href + l.label} href={l.href} className="block opacity-80 hover:opacity-100">
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav className="space-y-3 text-sm font-semibold uppercase tracking-wide">
              {rightCol.map(l => (
                <Link key={l.href + l.label} href={l.href} className="block opacity-80 hover:opacity-100">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: newsletter + socials + blurb (from Sanity) */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider">{newsletter.heading}</h3>
            <p className="mt-2 text-sm opacity-80">{newsletter.subtext}</p>

            <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                disabled={!newsletter.enabled}
                placeholder="Name"
                className="h-11 rounded border px-3 text-sm bg-transparent"
                style={outline}
              />
              <input
                disabled={!newsletter.enabled}
                placeholder="Email"
                className="h-11 rounded border px-3 text-sm bg-transparent"
                style={outline}
              />
              <button
                disabled={!newsletter.enabled}
                className="h-11 rounded border px-4 text-xs font-semibold uppercase tracking-wide"
                style={outline}
                title={newsletter.enabled ? newsletter.ctaLabel : 'Coming soon'}
              >
                {newsletter.ctaLabel}
              </button>
            </form>

            {socials?.length > 0 && (
              <div className="mt-6">
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

            <p className="mt-4 text-sm opacity-80">{footerBlurb}</p>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-xs" style={outline}>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="opacity-70">© {new Date().getFullYear()} {copyrightName}</div>
            <nav className="flex flex-wrap items-center gap-6">
              {legalLinks.map((l: LegalLink) => (
                <Link key={l.href + l.label} href={l.href} className="opacity-80 hover:opacity-100">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
