import './globals.css'
import { A11yProvider } from '@/components/a11y/A11yProvider'
import AccessibilityWidget from '@/components/a11y/AccessibilityWidget'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <A11yProvider>
          <Header />

          <main>{children}</main>

          <Footer />

          <AccessibilityWidget />
        </A11yProvider>
      </body>
    </html>
  )
}
