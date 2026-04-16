import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from '@/components/container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Evento - Find Events Around You',
    template: '%s | Evento',
  },
  description: 'Browse more than 10,000 events around the world',
  metadataBase: new URL('https://even-to.vercel.app'),
  openGraph: {
    title: 'Evento - Find Events Around You',
    description: 'Browse more than 10,000 events around the world',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  authors: [{ name: 'HariYenuganti' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll `}
      >
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
