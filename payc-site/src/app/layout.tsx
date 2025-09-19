import './globals.css'
import { A11yProvider } from '@/components/a11y/A11yProvider'
import AccessibilityWidget from '@/components/a11y/AccessibilityWidget'
import Header from '@/components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <A11yProvider>
          <Header />

          <main>{children}</main>

          <footer className="mt-16 border-t">
            <div className="mx-auto max-w-6xl px-4 py-8 text-xs opacity-70">
              © {new Date().getFullYear()} PAYC
            </div>
          </footer>

          <AccessibilityWidget />
        </A11yProvider>
      </body>
    </html>
  )
}
