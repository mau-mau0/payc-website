"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

export default function AboutPage() {
  const [expanded, setExpanded] = useState(false)

  // Darker, higher-contrast outline that adapts to light/dark via your CSS variables
  const outline = {
    borderColor: "color-mix(in oklab, var(--foreground) 28%, transparent)",
  } as const

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-12 text-[var(--foreground)]">
      {/* HERO */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Pull As You Climb</h1>
        <p className="mt-3 text-lg opacity-80">
          A movement to expose, educate, and guide young people toward
          purpose, skills, and careers.
        </p>
      </section>

      {/* IMPACT / METRICS */}
      <section className="mb-12 grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
        {[
          { big: "10+", small: "Industries Represented" },
          { big: "100+", small: "Hours of Stories" },
          { big: "1", small: "Shared Mission" },
        ].map((m) => (
          <div key={m.small} className="rounded-xl border p-6" style={outline}>
            <p className="text-2xl font-bold">{m.big}</p>
            <p className="text-sm opacity-70">{m.small}</p>
          </div>
        ))}
      </section>

      {/* MISSION (no card/border; expand-only Read More) */}
      <section className="relative mb-12">
        <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            PAYC is about exposure and achievement. We open doors for young people who
            may not have access to role models, mentors, or vocational guidance.
          </p>
          <p>
            We exist to be the “village”—a resource for education, inspiration, and
            actionable steps toward careers and personal growth.
          </p>
          <p>
            Guests share methodical and passion-driven journeys, broken down into
            clear, achievable steps to motivate and guide the community.
          </p>

          {expanded && (
            <>
              <p>
                Our conversations highlight organizations, books, and programs that
                made a difference—so listeners can follow similar paths or create new ones.
              </p>
              <p>
                The goal is a strong foundation: practical steps, accountability, and
                mentorship that turn ambition into real opportunities.
              </p>
              <p>
                PAYC is ours. It belongs to every young person ready to take responsibility
                for their journey and climb while lifting others.
              </p>
            </>
          )}
        </div>

        {!expanded && (
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
      <section className="mb-12 text-center">
        <blockquote className="text-xl font-semibold italic opacity-85">
          “An idea is just an idea until you put the necessary steps to achieve it.”
        </blockquote>
        <p className="mt-2 text-sm opacity-60">— Denzel Washington</p>
      </section>

      {/* PILLARS */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {[
          { title: "Exposure", desc: "Discover vocations you might not see every day." },
          { title: "Achievement", desc: "Actionable, step-by-step paths to goals." },
          { title: "Mentorship", desc: "Guidance from relatable role models." },
          { title: "Community", desc: "A village that climbs—and lifts—together." },
        ].map((p) => (
          <div key={p.title} className="rounded-xl border p-4" style={outline}>
            <h3 className="mb-2 font-bold">{p.title}</h3>
            <p className="text-sm opacity-80">{p.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
