import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '../components/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RMO Landscaping',
  description: 'Professional landscaping services management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
