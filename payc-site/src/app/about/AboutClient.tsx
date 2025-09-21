'use client'

import { useMemo, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { FaChevronDown } from 'react-icons/fa'
import { urlFor } from '@/sanity/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


type Pillar = { title: string; description: string }
type Metric = { value: string; label: string }
type AboutData = {
  heroImage?: { asset?: any; alt?: string } | null
  mission?: any[]
  quote?: { text?: string; attribution?: string }
  pillars?: Pillar[]
  metrics?: Metric[]
}

export default function AboutClient({ about }: { about: AboutData }) {
  const [expanded, setExpanded] = useState(false)

  // stronger outline in both modes (using your --foreground variable)
  const outline = useMemo(
    () => ({ borderColor: 'color-mix(in oklab, var(--foreground) 32%, transparent)' } as const),
    []
  )

  const visibleMission =
    expanded || !about.mission ? about.mission : about.mission.slice(0, 3)

  // Build hero image URL (if present)
  const heroUrl =
    about.heroImage?.asset ? urlFor(about.heroImage).width(2000).height(800).fit('crop').url() : null
  const heroAlt = about.heroImage?.alt || 'PAYC hero image'

  // === Metrics carousel state ===
  const metrics = about.metrics ?? []
  const [metricStart, setMetricStart] = useState(0)
  const canSlide = metrics.length > 3

  const visibleMetrics = useMemo(() => {
    if (!metrics.length) return []
    if (metrics.length <= 3) return metrics
    return Array.from({ length: 3 }, (_, i) => metrics[(metricStart + i) % metrics.length])
  }, [metrics, metricStart])

  const prevMetric = () => {
    if (!canSlide) return
    setMetricStart((s) => (s - 1 + metrics.length) % metrics.length)
  }

  const nextMetric = () => {
    if (!canSlide) return
    setMetricStart((s) => (s + 1) % metrics.length)
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-12 text-[var(--foreground)]">
      {/* HERO with background image */}
      <section className="relative mb-12 overflow-hidden rounded-2xl">
        {/* Background */}
        {heroUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroUrl}
              alt={heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Subtle overlay that adapts to theme */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, color-mix(in oklab, var(--background) 40%, transparent), var(--background))',
              }}
              aria-hidden
            />
          </>
        )}

        {/* Title over the image */}
        <div className="relative z-10 px-6 py-20 text-center md:px-12">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">Pull As You Climb</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg opacity-85">
            A movement to expose, educate, and guide young people toward
            purpose, skills, and careers.
          </p>
        </div>
      </section>

      {/* METRICS — modern 3-up carousel with outside arrows (no clipping) */}
      {metrics.length > 0 && (
        <section className="relative mb-12">
          <div className="relative">
            {/* Inner wrapper handles clipping; arrows are on the outer wrapper */}
            <div className="overflow-hidden rounded-2xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 py-2 sm:py-4">
                {visibleMetrics.map((m, i) => (
                  <div
                    key={`${m.value}-${m.label}-${metricStart}-${i}`}
                    className="
                      rounded-xl border p-6 text-center
                      transition-transform duration-200 ease-out
                      hover:-translate-y-0.5
                    "
                    style={{
                      borderColor: 'color-mix(in oklab, var(--foreground) 32%, transparent)',
                      background: 'color-mix(in oklab, var(--background) 96%, transparent)',
                    }}
                  >
                    <p className="text-3xl font-extrabold tracking-tight">{m.value}</p>
                    <p className="mt-1 text-sm opacity-70">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Outside arrows (only show when there are >3 metrics) */}
            {canSlide && (
              <>
                <button
                  type="button"
                  onClick={prevMetric}
                  aria-label="Previous metrics"
                  className="
                    absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                    hidden sm:inline-flex
                    z-10
                    h-10 w-10 items-center justify-center
                    rounded-full border backdrop-blur
                    transition hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    motion-reduce:transition-none
                  "
                  style={{
                    borderColor: 'color-mix(in oklab, var(--foreground) 38%, transparent)',
                    background: 'color-mix(in oklab, var(--background) 80%, transparent)',
                  }}
                >
                  <FaChevronLeft aria-hidden />
                </button>
              
                <button
                  type="button"
                  onClick={nextMetric}
                  aria-label="Next metrics"
                  className="
                    absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                    hidden sm:inline-flex
                    z-10
                    h-10 w-10 items-center justify-center
                    rounded-full border backdrop-blur
                    transition hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    motion-reduce:transition-none
                  "
                  style={{
                    borderColor: 'color-mix(in oklab, var(--foreground) 38%, transparent)',
                    background: 'color-mix(in oklab, var(--background) 80%, transparent)',
                  }}
                >
                  <FaChevronRight aria-hidden />
                </button>
              </>
            )}
          </div>
        </section>
      )}


      {/* MISSION (no border; expand-only Read More) */}
      <section className="relative mb-12">
        <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed [&>p]:mb-6">
            {about.mission && about.mission.length > 0 ? (
                <PortableText value={visibleMission} />
            ) : (
                <p className="opacity-70">Mission coming soon.</p>
            )}
        </div>

        {!expanded && about.mission && about.mission.length > 3 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="
                inline-flex items-center gap-2 rounded
                text-sm font-semibold uppercase underline underline-offset-4
                hover:no-underline hover:opacity-100
                opacity-90 cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              aria-expanded={expanded}
            >
              Read More <FaChevronDown size={14} aria-hidden />
            </button>
          </div>
        )}
      </section>

      {/* QUOTE */}
      {(about.quote?.text || about.quote?.attribution) && (
        <section className="mb-12 text-center">
          {about.quote?.text && (
            <blockquote className="text-xl font-semibold italic opacity-85">
              “{about.quote.text}”
            </blockquote>
          )}
          {about.quote?.attribution && (
            <p className="mt-2 text-sm opacity-60">— {about.quote.attribution}</p>
          )}
        </section>
      )}

      {/* PILLARS */}
      {about.pillars && about.pillars.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {about.pillars.map((p, i) => (
            <div key={`${p.title}-${i}`} className="rounded-xl border p-4" style={outline}>
              <h3 className="mb-2 font-bold">{p.title}</h3>
              <p className="text-sm opacity-80">{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
