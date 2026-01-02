import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codex Applications',
  description: 'Codex Applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}