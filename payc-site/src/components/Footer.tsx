'use client'

import Link from 'next/link'
import { NAV_LINKS } from '@/lib/nav'
import { SOCIALS } from '@/lib/socials'
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa6'

const iconFor = (label: string) => {
  switch (label.toLowerCase()) {
    case 'x':         return <FaXTwitter aria-hidden />
    case 'instagram': return <FaInstagram aria-hidden />
    case 'facebook':  return <FaFacebookF aria-hidden />
    case 'linkedin':  return <FaLinkedinIn aria-hidden />
    case 'youtube':   return <FaYoutube aria-hidden />
    case 'pinterest': return <FaPinterestP aria-hidden />
    default:          return null
  }
}

export default function Footer() {
  const outline = { borderColor: 'color-mix(in oklab, var(--foreground) 18%, transparent)' } as const

  // Split links into two columns like the reference
  const mid = Math.ceil(NAV_LINKS.length / 2)
  const leftCol  = NAV_LINKS.slice(0, mid)
  const rightCol = NAV_LINKS.slice(mid)

  return (
    <footer className="mt-20 border-t" style={outline}>
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        {/* Top grid: links (left) + newsletter + socials (right) */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: site links in two columns */}
          <div className="grid grid-cols-2 gap-6">
            <nav className="space-y-3 text-sm font-semibold uppercase tracking-wide">
              {leftCol.map((l) => (
                <Link key={l.href} href={l.href} className="block hover:opacity-100 opacity-80">
                  {l.label}
                </Link>
              ))}
            </nav>
            <nav className="space-y-3 text-sm font-semibold uppercase tracking-wide">
              {rightCol.map((l) => (
                <Link key={l.href} href={l.href} className="block hover:opacity-100 opacity-80">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: newsletter placeholder + socials + blurb */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Weekly wisdom straight to your inbox.</h3>
            <p className="mt-2 text-sm opacity-80">
              Join the PAYC community for insights, resources, and next steps. (Newsletter coming soon.)
            </p>

            {/* Placeholder form */}
            <form className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
              <input
                disabled
                placeholder="Name"
                className="h-11 rounded border px-3 text-sm bg-transparent"
                style={outline}
              />
              <input
                disabled
                placeholder="Email"
                className="h-11 rounded border px-3 text-sm bg-transparent"
                style={outline}
              />
              <button
                disabled
                className="h-11 rounded border px-4 text-xs font-semibold uppercase tracking-wide opacity-70"
                style={outline}
                title="Coming soon"
              >
                Subscribe
              </button>
            </form>

            {/* Socials */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Follow PAYC:</p>
              <div className="mt-3 flex flex-wrap gap-4 text-lg">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 opacity-80 hover:opacity-100"
                    aria-label={s.label}
                  >
                    {iconFor(s.label)}
                  </a>
                ))}
              </div>
            </div>

            {/* Blurb */}
            <p className="mt-4 text-sm opacity-80">
              PAYC (Pull As You Climb) is a modern platform and podcast sharing real stories, mentors, and
              practical steps so young people—especially from underrepresented communities—can build skills,
              careers, and community.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t pt-6 text-xs" style={outline}>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="opacity-70">© {new Date().getFullYear()} PAYC</div>
            <nav className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="opacity-80 hover:opacity-100">Privacy Policy</Link>
              <Link href="/terms"   className="opacity-80 hover:opacity-100">Terms</Link>
              <Link href="/credits" className="opacity-80 hover:opacity-100">Site Credits</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
