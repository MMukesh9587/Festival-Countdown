import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Festival Countdown Central",
  description: "Live countdowns for your favorite festivals and events. Create custom timers, share with friends, and never miss a celebration.",
  openGraph: {
    title: 'Festival Countdown Central',
    description: 'Live countdowns for your favorite festivals and events.',
    url: 'https://festival-countdown-central.com',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <div className="flex-grow">
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
          <Toaster />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
