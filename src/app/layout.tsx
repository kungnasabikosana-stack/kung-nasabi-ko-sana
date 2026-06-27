import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kung Nasabi Ko Sana - Digital Letters Delivered with Care',
  description: 'Discover forgotten handwritten letters. A timeless, intimate experience of delivering messages with love and care.',
  keywords: ['letters', 'digital', 'memories', 'vintage', 'correspondence'],
  authors: [{ name: 'Kung Nasabi Ko Sana' }],
  creator: 'Kung Nasabi Ko Sana',
  publisher: 'Kung Nasabi Ko Sana',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kungnasabikosana.com',
    title: 'Kung Nasabi Ko Sana - Digital Letters Delivered with Care',
    description: 'Discover forgotten handwritten letters. A timeless, intimate experience.',
    siteName: 'Kung Nasabi Ko Sana',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#BFD7EA" />
      </head>
      <body className="bg-cream paper-bg">
        {children}
      </body>
    </html>
  )
}
