'use client'

import { useState } from 'react'

export default function ContactForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg, setMsg] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!enabled) return
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot
    if (data.get('company')) {
      setStatus('success') // silently ignore bots
      setMsg('Thanks!'); form.reset(); return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setMsg('Message sent. Thank you!')
      form.reset()
    } catch {
      setStatus('error')
      setMsg('Something went wrong. Please try again.')
    }
  }

  const disabled = !enabled || status === 'loading'

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      {/* Honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block opacity-70">Name</span>
          <input
            required
            name="name"
            type="text"
            className="h-11 w-full rounded border bg-transparent px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block opacity-70">Email</span>
          <input
            required
            name="email"
            type="email"
            className="h-11 w-full rounded border bg-transparent px-3 text-sm"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block opacity-70">Subject</span>
        <input
          required
          name="subject"
          type="text"
          className="h-11 w-full rounded border bg-transparent px-3 text-sm"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block opacity-70">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full rounded border bg-transparent px-3 py-2 text-sm"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="h-11 rounded border px-5 text-xs font-semibold uppercase tracking-wide disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Send'}
        </button>
        {status !== 'idle' && <p className="text-sm opacity-80">{msg}</p>}
      </div>
    </form>
  )
}
