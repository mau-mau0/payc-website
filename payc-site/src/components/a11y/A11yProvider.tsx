'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'
type FontScale = 'base' | 'lg' | 'xl'
type TextSpacing = 'normal' | 'loose'

export type A11ySettings = {
  theme: Theme
  hideImages: boolean
  fontScale: FontScale
  textSpacing: TextSpacing
  reduceMotion: boolean
}

const DEFAULTS: A11ySettings = {
  theme: 'system',
  hideImages: false,
  fontScale: 'base',
  textSpacing: 'normal',
  reduceMotion: false,
}

type Ctx = {
  settings: A11ySettings
  setSettings: (s: A11ySettings) => void
  update: <K extends keyof A11ySettings>(k: K, v: A11ySettings[K]) => void
  reset: () => void
}

const A11yContext = createContext<Ctx | null>(null)
const KEY = 'a11y-settings-v1'

function applyToDom(s: A11ySettings) {
  const root = document.documentElement
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const useDark = s.theme === 'dark' || (s.theme === 'system' && mq.matches)
  root.classList.toggle('dark', useDark)
  root.setAttribute('data-font-scale', s.fontScale)
  root.setAttribute('data-text-spacing', s.textSpacing)
  root.setAttribute('data-hide-images', String(s.hideImages))
  root.setAttribute('data-reduce-motion', String(s.reduceMotion))
}

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS)

  // load from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as A11ySettings) })
    } catch {}
  }, [])

  // apply + persist whenever settings change
  useEffect(() => {
    applyToDom(settings)
    try { localStorage.setItem(KEY, JSON.stringify(settings)) } catch {}

    if (settings.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyToDom(settings)
      mq.addEventListener?.('change', handler)
      return () => mq.removeEventListener?.('change', handler)
    }
  }, [settings])

  const value = useMemo<Ctx>(() => ({
    settings,
    setSettings,
    update: (k, v) => setSettings(p => ({ ...p, [k]: v })),
    reset: () => setSettings(DEFAULTS),
  }), [settings])

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>
}

export function useA11y() {
  const ctx = useContext(A11yContext)
  if (!ctx) throw new Error('useA11y must be used within <A11yProvider>')
  return ctx
}
