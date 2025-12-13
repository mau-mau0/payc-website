import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/sanity/client'
import { urlFor, type SanityImageSource } from '@/sanity/image'
import type { PortableTextBlock } from '@portabletext/react'
import { 
  allEpisodesWithCategoriesQuery, 
  aboutPageQuery, 
  allResourcesQuery 
} from '@/sanity/queries'

// --- Types ---

interface Category {
  _id: string
  title: string
  slug: string
}

interface Episode {
  _id: string
  title: string
  slug: string
  date?: string
  guest?: string
  summary?: string
  coverImage?: SanityImageSource
  episodeNumber?: string
  categories?: Category[]
}

interface AboutData {
  heroImage?: SanityImageSource
  mission?: PortableTextBlock[]
  quote?: { text?: string; attribution?: string }
  metrics?: Array<{ value: string; label: string }>
}

interface Resource {
  _id: string
  title: string
  type: string
}

// --- Styles & Helpers ---

// The specific border style requested
const outlineStyles = { 
  borderColor: 'color-mix(in oklab, var(--foreground) 22%, transparent)' 
}

const outlineStrongStyles = {
  borderColor: 'color-mix(in oklab, var(--foreground) 32%, transparent)'
}

// Date formatter
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// --- Components ---

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

// --- Main Page Component ---

export default async function HomePage() {
  // 1. Parallel Data Fetching
  const [episodes, about] = await Promise.all([
    sanityClient.fetch<Episode[]>(allEpisodesWithCategoriesQuery),
    sanityClient.fetch<AboutData>(aboutPageQuery),
    // resources fetched but not currently used on homepage
    // sanityClient.fetch<Resource[]>(allResourcesQuery)
  ])

  // Get latest 3 episodes
  const recentEpisodes = episodes?.slice(0, 3) || []
  
  // Get featured metrics if available
  const metrics = about?.metrics?.slice(0, 3) || []

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit" style={outlineStyles}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                New Episodes Daily
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-[0.9]">
              Pull As You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] to-gray-500">
                Climb.
              </span>
            </h1>

            <p className="text-lg md:text-xl opacity-80 max-w-xl leading-relaxed">
              Exposing, educating, and guiding young people toward purpose, skills, and careers. 
              Real stories. Real mentors. Real steps.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/podcast" 
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[var(--foreground)] px-8 font-semibold uppercase tracking-wide text-[var(--background)] transition-transform hover:-translate-y-0.5"
              >
                <span className="mr-2">Listen Now</span>
                <PlayIcon className="w-4 h-4" />
              </Link>
              
              <Link 
                href="/about" 
                className="inline-flex h-12 items-center justify-center rounded-full border px-8 font-semibold uppercase tracking-wide hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
                style={outlineStrongStyles}
              >
                Our Mission
              </Link>
            </div>
          </div>

          {/* Hero Visual / Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border" style={outlineStyles}>
              {about?.heroImage ? (
                 <Image
                  src={urlFor(about.heroImage).width(800).height(1000).url()}
                  alt="PAYC Host and Guests"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                // Fallback visual if no hero image set
                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                   <span className="text-9xl font-black opacity-5 select-none">PAYC</span>
                </div>
              )}
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[var(--background)]/90 backdrop-blur-md p-4 rounded-xl border shadow-lg" style={outlineStyles}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">Latest Insight</p>
                <p className="font-bold text-sm sm:text-base line-clamp-2">
                  {about?.quote?.text || "The only way to grow is to help others grow with you."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- METRICS / SOCIAL PROOF --- */}
      {metrics.length > 0 && (
        <section className="py-10 border-y" style={outlineStyles}>
          <div className="max-w-screen-2xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{metric.value}</span>
                  <span className="text-xs uppercase tracking-widest opacity-70">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- LATEST EPISODES --- */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">Latest Episodes</h2>
              <p className="opacity-70 max-w-md">Dive into recent conversations with industry leaders and mentors.</p>
            </div>
            <Link 
              href="/podcast" 
              className="group inline-flex items-center text-sm font-bold uppercase tracking-wide hover:opacity-70 transition-opacity"
            >
              View All Episodes
              <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEpisodes.map((episode) => (
              <Link 
                key={episode._id} 
                href={`/podcast/${episode.slug}`}
                className="group flex flex-col h-full rounded-2xl border bg-[var(--background)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={outlineStyles}
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-neutral-100 dark:bg-neutral-900">
                  {episode.coverImage ? (
                    <Image
                      src={urlFor(episode.coverImage).width(600).height(340).url()}
                      alt={episode.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center opacity-10">
                       <PlayIcon className="w-12 h-12" />
                    </div>
                  )}
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-[var(--background)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm" style={outlineStyles}>
                    {formatDate(episode.date)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  {episode.categories && episode.categories.length > 0 && (
                    <span className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
                      {episode.categories[0].title}
                    </span>
                  )}
                  <h3 className="text-xl font-bold uppercase tracking-tight leading-snug mb-3 group-hover:underline underline-offset-4 decoration-2">
                    {episode.title}
                  </h3>
                  {episode.guest && (
                    <p className="text-sm opacity-60 font-medium mt-auto">
                      Ft. {episode.guest}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPLORE GRID (Resources & Connect) --- */}
      <section className="py-16 md:py-24 border-t" style={outlineStyles}>
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Resources Box */}
            <div className="relative rounded-3xl p-8 md:p-12 border overflow-hidden group" style={outlineStrongStyles}>
              <div className="relative z-10 flex flex-col h-full items-start">
                <div className="mb-6 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-4">
                  Tools for Growth
                </h3>
                <p className="opacity-80 mb-8 max-w-md leading-relaxed">
                  Access a curated library of books, courses, and tools recommended by our mentors to help you climb the ladder.
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/resources" 
                    className="inline-flex items-center font-bold uppercase tracking-wide border-b border-[var(--foreground)] pb-1 hover:opacity-60 transition-opacity"
                  >
                    Browse Resources
                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* Connect Box */}
            <div className="relative rounded-3xl p-8 md:p-12 bg-[var(--foreground)] text-[var(--background)] overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full items-start">
                 <div className="mb-6 p-3 rounded-xl bg-[var(--background)] text-[var(--foreground)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-4">
                  Join the Community
                </h3>
                <p className="opacity-90 mb-8 max-w-md leading-relaxed">
                  We believe in pulling as we climb. Whether you want to be a guest, find a mentor, or share your story, we want to hear from you.
                </p>
                <div className="mt-auto flex flex-wrap gap-4">
                  <Link 
                    href="/connect" 
                    className="h-10 px-6 rounded-full bg-[var(--background)] text-[var(--foreground)] font-semibold uppercase text-sm inline-flex items-center hover:scale-105 transition-transform"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>

               {/* Background Decoration */}
               <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>

          </div>
        </div>
      </section>

      {/* --- NEWSLETTER / CTA --- */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">Don&apos;t Miss an Episode</h2>
          <p className="opacity-70 mb-8">Subscribe to get the latest stories and strategies delivered to your inbox.</p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="flex-1 h-12 px-4 rounded-xl bg-transparent border focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)] focus:outline-hidden transition-all placeholder:text-sm placeholder:font-semibold placeholder:tracking-wide placeholder:opacity-50"
              style={outlineStyles}
              aria-label="Email address"
            />
            <button 
              type="submit"
              className="h-12 px-8 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs opacity-50 mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

    </main>
  )
}