import type { Metadata } from 'next';
import { Anton, Oswald, Plus_Jakarta_Sans, Permanent_Marker } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const oswald = Oswald({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Street District — Urban Streetwear & Exclusive Sneakers',
  description:
    'Exclusive sneakers, heavyweight hoodies, and limited-edition urban streetwear built for movement and curated for the culture.',
  openGraph: {
    title: 'Street District — Urban Streetwear & Exclusive Sneakers',
    description:
      'Exclusive sneakers, heavyweight hoodies, and limited-edition urban streetwear built for movement and curated for the culture.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Street District — Urban Streetwear & Exclusive Sneakers',
    description:
      'Exclusive sneakers, heavyweight hoodies, and limited-edition urban streetwear built for movement and curated for the culture.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${jakarta.variable} ${marker.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#080808] text-white antialiased selection:bg-[#F4511E] selection:text-white overflow-x-hidden"
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
