import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'State Indicator Tabs',
  description:
    'A shadcn registry item that keeps the tabs API familiar while adding a separate indicator for each state — active and hover.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-precomposed.png', rel: 'apple-touch-icon-precomposed' },
    ],
  },
  openGraph: {
    title: 'State Indicator Tabs',
    description:
      'A shadcn registry item that keeps the tabs API familiar while adding a separate indicator for each state — active and hover.',
    images: ['/seo.jpg'],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="px-6 py-10">
        <main className="mx-auto max-w-xl space-y-12">{children}</main>
      </body>
    </html>
  );
}
