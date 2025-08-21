import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PharmaRDC - Gestion de Pharmacie",
  description: "Plateforme complète de gestion de pharmacie en République Démocratique du Congo",
  generator: "PharmaRDC",
  manifest: "/manifest.json",
  keywords: ["pharmacie", "RDC", "médicaments", "gestion", "santé"],
  authors: [{ name: "PharmaRDC" }],
  icons: {
    icon: "/icon-192x192.png",
    shortcut: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PharmaRDC",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "PharmaRDC",
    title: "PharmaRDC - Gestion de Pharmacie",
    description: "Plateforme complète de gestion de pharmacie en République Démocratique du Congo",
  },
  twitter: {
    card: "summary",
    title: "PharmaRDC - Gestion de Pharmacie",
    description: "Plateforme complète de gestion de pharmacie en République Démocratique du Congo",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta name="application-name" content="PharmaRDC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PharmaRDC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#10b981" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[v0] SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('[v0] SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
