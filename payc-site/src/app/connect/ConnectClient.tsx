'use client'

import { useMemo, useState } from 'react'
import ContactForm from './ContactForm'
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

type Contact = {
  emailTo?: string
  phone?: string
  location?: string
  enableForm?: boolean
}

type Social = {
  network: string
  url: string
  label?: string
}

type Props = {
  contact: Contact
  socials: Social[]
}

type DialogKind = 'guest' | 'mentorship' | 'email' | null

const iconFor = (network: string) => {
  const n = network.toLowerCase()
  if (n === 'x' || n === 'twitter') return <FaXTwitter aria-hidden />
  if (n === 'instagram') return <FaInstagram aria-hidden />
  if (n === 'linkedin') return <FaLinkedinIn aria-hidden />
  return null
}

export default function ConnectClient({ contact, socials }: Props) {
  const [open, setOpen] = useState<DialogKind>(null)

  const outline = useMemo(
    () => ({ borderColor: 'color-mix(in oklab, var(--foreground) 22%, transparent)' } as const),
    []
  )

  const primarySocials = useMemo(
    () =>
      socials.filter((s) => {
        const n = s.network?.toLowerCase?.() || ''
        return ['x', 'twitter', 'instagram', 'linkedin'].includes(n)
      }),
    [socials]
  )

  return (
    <>
      {/* Intro */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase">Get Involved</h1>
        <p className="mt-3 max-w-2xl mx-auto text-sm opacity-85">
          PAYC is “ours”. Whether you want to share your story, get mentorship, or help build our
          community, there&apos;s a place for you here.
        </p>
      </header>

      {/* Top row: Be a Guest / Get Mentorship */}
      <section className="grid gap-8 md:grid-cols-2 mb-14">
        {/* Be a Guest */}
        <div className="rounded-2xl border p-6" style={outline}>
          <h2 className="text-lg font-extrabold uppercase tracking-wide mb-2">Be a Guest</h2>
          <p className="text-sm opacity-85">
            Share your journey and help others climb. Perfect for professionals ready to break down
            their path to success into actionable steps.
          </p>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li>• Share your personal story and career journey</li>
            <li>• Recommend books and organizations that helped you</li>
            <li>• Provide practical advice for the next generation</li>
          </ul>
          <button
            type="button"
            onClick={() => setOpen('guest')}
            className="mt-6 h-10 rounded border px-5 text-xs font-semibold uppercase tracking-wide hover:opacity-100 opacity-90"
          >
            Apply to Be a Guest
          </button>
        </div>

        {/* Get Mentorship */}
        <div className="rounded-2xl border p-6" style={outline}>
          <h2 className="text-lg font-extrabold uppercase tracking-wide mb-2">Get Mentorship</h2>
          <p className="text-sm opacity-85">
            Connect with our community for guidance, resources, and support as you work toward your
            vocational goals.
          </p>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li>• Access curated resources from successful professionals</li>
            <li>• Learn about career paths you never knew existed</li>
            <li>• Join a supportive community of climbers</li>
          </ul>
          <button
            type="button"
            onClick={() => setOpen('mentorship')}
            className="mt-6 h-10 rounded border px-5 text-xs font-semibold uppercase tracking-wide hover:opacity-100 opacity-90"
          >
            Join the Community
          </button>
        </div>
      </section>

      {/* Reach Out row: Email / Social */}
      <section className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Reach Out</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Email Us */}
          <div className="rounded-2xl border p-6" style={outline}>
            <h3 className="text-sm font-extrabold uppercase tracking-wide mb-2">Email Us</h3>
            <p className="text-sm opacity-85">
              Have questions? Want to suggest a guest? Ready to share your story? We&apos;d love to
              hear from you.
            </p>

            {contact.emailTo && (
              <p className="mt-3 text-xs opacity-75">
                Or email us directly at{' '}
                <a className="underline" href={`mailto:${contact.emailTo}`}>
                  {contact.emailTo}
                </a>
                .
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpen('email')}
              className="mt-6 h-10 rounded border px-5 text-xs font-semibold uppercase tracking-wide hover:opacity-100 opacity-90"
            >
              Send Email
            </button>
          </div>

          {/* Social Media */}
          <div className="rounded-2xl border p-6" style={outline}>
            <h3 className="text-sm font-extrabold uppercase tracking-wide mb-2">Social Media</h3>
            <p className="text-sm opacity-85">
              Follow us for episode updates, guest highlights, and community discussions. Tag us in
              your climbing journey!
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {primarySocials.length === 0 && (
                <p className="text-xs opacity-70">
                  Social links coming soon. Check back after our next launch.
                </p>
              )}

              {primarySocials.map((s, i) => {
                const label = s.label || s.network
                const icon = iconFor(s.network)
                return (
                  <a
                    key={s.network + i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded border px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-100 opacity-90"
                    style={outline}
                  >
                    <span className="inline-flex items-center gap-2">
                      {icon}
                      {label}
                    </span>
                    <span aria-hidden>↗</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-[var(--background)] p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                {open === 'guest' && 'Apply to Be a Guest'}
                {open === 'mentorship' && 'Join the Community'}
                {open === 'email' && 'Send Us a Message'}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-xs uppercase opacity-70 hover:opacity-100"
                aria-label="Close dialog"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-sm">
              {open === 'guest' && <GuestForm />}
              {open === 'mentorship' && <MentorshipDialogContent socials={primarySocials} />}
              {open === 'email' && <ContactForm enabled={contact.enableForm ?? true} />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* --- Guest Application Form --- */

function GuestForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // honeypot
    if (data.get('website')) {
      setStatus('success')
      setMsg('Thanks! We got your application.')
      form.reset()
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/guest-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          role: data.get('role'),
          topic: data.get('topic'),
          story: data.get('story'),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setMsg('Thanks for applying to share your story with PAYC.')
      form.reset()
    } catch {
      setStatus('error')
      setMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block opacity-70">Name</span>
          <input
            name="name"
            type="text"
            required
            className="h-10 w-full rounded border bg-transparent px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block opacity-70">Email</span>
          <input
            name="email"
            type="email"
            required
            className="h-10 w-full rounded border bg-transparent px-3 text-sm"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block opacity-70">Role / Field</span>
        <input
          name="role"
          type="text"
          placeholder="e.g. Software Engineer, Nurse, Entrepreneur"
          className="h-10 w-full rounded border bg-transparent px-3 text-sm"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block opacity-70">What would you like to share?</span>
        <input
          name="topic"
          type="text"
          required
          placeholder="Core theme of your journey or topic"
          className="h-10 w-full rounded border bg-transparent px-3 text-sm"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block opacity-70">Short story / context</span>
        <textarea
          name="story"
          rows={5}
          required
          className="w-full rounded border bg-transparent px-3 py-2 text-sm"
          placeholder="Tell us briefly about your path and why it could help others."
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-10 rounded border px-5 text-xs font-semibold uppercase tracking-wide disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Submit Application'}
        </button>
        {status !== 'idle' && (
          <p className="text-xs opacity-80">{msg}</p>
        )}
      </div>
    </form>
  )
}

/* --- Mentorship Dialog content --- */

function MentorshipDialogContent({ socials }: { socials: Social[] }) {
  return (
    <div className="space-y-3 text-sm">
      <p className="opacity-85">
        Start by following PAYC across platforms. We share resources, episode drops, and
        opportunities to connect with other climbers.
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {socials.length === 0 && (
          <p className="text-xs opacity-70">
            Social links coming soon. In the meantime, keep an eye on new episodes for resources and
            shout-outs.
          </p>
        )}
        {socials.map((s, i) => (
          <a
            key={s.network + i}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between rounded border px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:opacity-100 opacity-90"
          >
            <span className="inline-flex items-center gap-2">
              {iconFor(s.network)}
              {s.label || s.network}
            </span>
            <span aria-hidden>↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
