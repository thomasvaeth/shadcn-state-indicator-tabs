import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'State Indicator Tabs Registry',
  description: 'A Next.js showcase and shadcn registry item for state indicator tabs.',
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
