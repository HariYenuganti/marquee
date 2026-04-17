import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from '@/components/container';
import { siteUrl } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: {
    default: 'Marquee — Tonight\u2019s lineup, tonight\u2019s town',
    template: '%s · Marquee',
  },
  description:
    'A curated index of shows, sets, readings, and late-night pop-ups — updated as the day unfolds.',
  metadataBase: new URL(siteUrl()),
  openGraph: {
    title: 'Marquee — Tonight\u2019s lineup, tonight\u2019s town',
    description:
      'A curated index of shows, sets, readings, and late-night pop-ups — updated as the day unfolds.',
    type: 'website',
    siteName: 'Marquee',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-base text-ink overflow-y-scroll antialiased">
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
