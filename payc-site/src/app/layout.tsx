import './globals.css'
import Link from 'next/link'
import { A11yProvider } from '@/components/a11y/A11yProvider'
import AccessibilityWidget from '@/components/a11y/AccessibilityWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        <A11yProvider>
          <header className="border-b">
            <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 text-sm">
              <Link href="/" className="font-semibold">PAYC</Link>
              <Link href="/podcast">Podcast</Link>
              <Link href="/about">About</Link>
            </nav>
          </header>

          {children}

          <footer className="mt-16 border-t">
            <div className="mx-auto max-w-5xl px-4 py-8 text-xs opacity-70">© {new Date().getFullYear()} PAYC</div>
          </footer>

          <AccessibilityWidget />
        </A11yProvider>
      </body>
    </html>
  )
}
