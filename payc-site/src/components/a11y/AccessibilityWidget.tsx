'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useA11y } from './A11yProvider'

// --- Sub-components for cleaner UI ---

function IconAccessibility({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 4.68"/><path d="M8 21c0-2.5 0-2.5 6-2.506"/><path d="M12 11l-3-3"/><path d="m10 16 5-5"/></svg>
  )
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
  )
}

// Reusable Toggle Switch Component
function ToggleSwitch({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (c: boolean) => void 
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg py-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
      <span className="text-sm font-medium">{label}</span>
      <div className="relative inline-flex items-center">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className="h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-neutral-900 peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-neutral-900 dark:bg-neutral-700 dark:peer-checked:bg-white dark:peer-focus:outline-white transition-colors"></div>
        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5 dark:bg-black"></div>
      </div>
    </label>
  )
}

// --- Main Widget ---

export default function AccessibilityWidget() {
  const { settings, update, reset } = useA11y()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && !btnRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  // Focus management
  useEffect(() => { 
    if (!open) btnRef.current?.focus() 
  }, [open])

  const outlineStyle = { borderColor: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Accessibility Options"
        className={`fixed bottom-6 right-6 z-[99999] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <IconAccessibility className="h-6 w-6" />
      </button>

      {/* Main Panel */}
      <div
        role="dialog"
        aria-modal="true"
        id={panelId}
        ref={panelRef}
        className={`fixed bottom-6 right-6 z-[99999] w-[340px] origin-bottom-right overflow-hidden rounded-2xl border bg-[var(--background)]/95 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-neutral-900/95 dark:text-white ${
          open 
            ? 'visible translate-y-0 scale-100 opacity-100' 
            : 'invisible translate-y-4 scale-95 opacity-0 pointer-events-none'
        }`}
        style={outlineStyle}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b pb-4" style={outlineStyle}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
               <IconAccessibility className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wide">Display Settings</h2>
          </div>
          <button 
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" 
            onClick={() => setOpen(false)} 
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          
          {/* Theme Selection */}
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-60">Color Mode</legend>
            <div className="grid grid-cols-3 gap-2">
              {(['system', 'light', 'dark'] as const).map(t => {
                const isActive = settings.theme === t
                return (
                  <button
                    key={t}
                    onClick={() => update('theme', t)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg border py-3 text-xs font-medium transition-all ${
                      isActive 
                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]' 
                        : 'border-transparent bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {t === 'light' && <span className="text-lg">☀</span>}
                    {t === 'dark' && <span className="text-lg">☾</span>}
                    {t === 'system' && <span className="text-lg">💻</span>}
                    <span className="capitalize">{t}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Text Size */}
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-60">Text Size</legend>
            <div className="flex rounded-lg border p-1" style={outlineStyle}>
              {(['base', 'lg', 'xl'] as const).map((s, idx) => {
                const isActive = settings.fontScale === s
                return (
                  <button
                    key={s}
                    onClick={() => update('fontScale', s)}
                    className={`relative flex-1 rounded-md py-1.5 text-center text-sm font-medium transition-all ${
                      isActive ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                     <span style={{ fontSize: idx === 0 ? '14px' : idx === 1 ? '16px' : '18px' }}>
                        Aa
                     </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Toggles Group */}
          <div className="space-y-1">
             <div className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-60">Preferences</div>
            <ToggleSwitch 
              label="Hide Images" 
              checked={settings.hideImages} 
              onChange={(v) => update('hideImages', v)} 
            />
            <ToggleSwitch 
              label="Reduce Motion" 
              checked={settings.reduceMotion} 
              onChange={(v) => update('reduceMotion', v)} 
            />
            <fieldset className="flex items-center justify-between py-2">
               <span className="text-sm font-medium">Text Spacing</span>
               <div className="flex gap-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-800">
                  {(['normal', 'loose'] as const).map(spacing => (
                    <button
                      key={spacing}
                      onClick={() => update('textSpacing', spacing)}
                      className={`h-6 w-16 rounded text-xs font-medium transition-all ${
                        settings.textSpacing === spacing 
                        ? 'bg-white text-black shadow-sm dark:bg-black dark:text-white' 
                        : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {spacing === 'normal' ? 'Normal' : 'Wide'}
                    </button>
                  ))}
               </div>
            </fieldset>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t pt-4" style={outlineStyle}>
            <button 
              className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline" 
              onClick={() => reset()}
            >
              Reset to Default
            </button>
            <button 
              className="rounded-full bg-[var(--foreground)] px-6 py-2 text-xs font-bold uppercase tracking-wide text-[var(--background)] transition-transform hover:scale-105" 
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}