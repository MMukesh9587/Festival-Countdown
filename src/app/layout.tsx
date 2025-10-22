import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/context/ThemeProvider";
import { FirebaseClientProvider } from "@/firebase";
import { Playfair_Display, PT_Sans } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-playfair-display',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const siteUrl = "https://festivalcountdown.netlify.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Festival Countdown Central",
  description: "Live countdowns for your favorite festivals and events. Create custom timers, share with friends, and never miss a celebration.",
  openGraph: {
    title: 'Festival Countdown Central',
    description: 'Live countdowns for your favorite festivals and events.',
    url: siteUrl,
    siteName: 'Festival Countdown Central',
    images: [
      {
        url: '/og-image.png', // It's good practice to have a default OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google: "b3sR0RVRAR-fGVCbRdHLjUGLMl_p6uUiWodhrQcDx0U",
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Festival Countdown",
  "url": "https://festivalcountdown.netlify.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://festivalcountdown.netlify.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${ptSans.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <LanguageProvider>
              <div className="flex-grow">
                <Header />
                <main>{children}</main>
              </div>
              <Footer />
              <Toaster />
            </LanguageProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
