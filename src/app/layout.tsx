import type { Metadata } from 'next';
import GitHubButton from '@/components/github-button';

import './globals.css';

export const metadata: Metadata = {
  title: 'State Indicator Tabs Registry',
  description: 'A Next.js showcase and shadcn registry item for state indicator tabs.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <header className="border-b py-4">
          <div className="flex items-center justify-between gap-4 mx-auto max-w-7xl px-6">
            <h1 className="text-lg font-medium">Shadcn State Indicator Tabs</h1>
            <GitHubButton />
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
