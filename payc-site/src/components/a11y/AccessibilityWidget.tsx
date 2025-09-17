'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useA11y } from './A11yProvider'

export default function AccessibilityWidget() {
  const { settings, update, reset } = useA11y()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { if (!open) btnRef.current?.focus() }, [open])

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-[99999] rounded-full border bg-white px-4 py-3 text-sm shadow-lg transition hover:shadow-xl dark:bg-neutral-900 dark:text-white"
      >
        Accessibility
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          id={panelId}
          className="fixed bottom-20 right-4 z-[99999] w-[320px] rounded-2xl border bg-white p-4 text-sm shadow-xl dark:bg-neutral-900 dark:text-white"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Accessibility</h2>
            <button className="opacity-70 hover:opacity-100" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          <fieldset className="mb-4">
            <legend className="mb-1 font-medium">Theme</legend>
            <div className="flex gap-3">
              {(['system','light','dark'] as const).map(t => (
                <label key={t} className="inline-flex items-center gap-2">
                  <input type="radio" name="theme" value={t} checked={settings.theme===t} onChange={()=>update('theme', t)} />
                  <span className="capitalize">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="mb-1 font-medium">Text size</legend>
            <div className="flex gap-3">
              {(['base','lg','xl'] as const).map(s => (
                <label key={s} className="inline-flex items-center gap-2">
                  <input type="radio" name="fontScale" value={s} checked={settings.fontScale===s} onChange={()=>update('fontScale', s)} />
                  <span className="uppercase">{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="mb-1 font-medium">Text spacing</legend>
            <div className="flex gap-3">
              {(['normal','loose'] as const).map(s => (
                <label key={s} className="inline-flex items-center gap-2">
                  <input type="radio" name="textSpacing" value={s} checked={settings.textSpacing===s} onChange={()=>update('textSpacing', s)} />
                  <span className="capitalize">{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mb-4 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.hideImages} onChange={e=>update('hideImages', e.target.checked)} />
              <span>Hide images</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.reduceMotion} onChange={e=>update('reduceMotion', e.target.checked)} />
              <span>Reduce motion</span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button className="rounded-md border px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800" onClick={()=>reset()}>
              Reset
            </button>
            <button className="rounded-md bg-black px-3 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black" onClick={()=>setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  )
}
