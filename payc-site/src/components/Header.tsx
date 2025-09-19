'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

function NavLink({
  href,
  children,
  align = 'left',
}: {
  href: string
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={clsx(
        'px-2 py-1 text-[13px] tracking-wide uppercase',
        'hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40',
        align === 'left' ? 'opacity-80 hover:opacity-100' : 'opacity-80 hover:opacity-100',
        active && 'opacity-100 underline underline-offset-4'
      )}
    >
      {children}
    </Link>
  )
}

export default function Header() {
  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b',
        'bg-[var(--background)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)/0.85]'
      )}
      role="banner"
    >
      {/* three-column layout: left / center / right */}
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-4">
        {/* left group */}
        <nav aria-label="Primary" className="flex items-center gap-6">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/podcast">Podcast</NavLink>
        </nav>

        {/* center brand */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="font-extrabold tracking-[0.12em] text-[15px] leading-none uppercase"
            aria-label="PAYC home"
          >
            PAYC
          </Link>
        </div>

        {/* right group */}
        <nav aria-label="Utility" className="flex items-center justify-end gap-6">
          <NavLink href="/resources" align="right">
            Resources
          </NavLink>
          <NavLink href="/connect" align="right">
            Connect
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
