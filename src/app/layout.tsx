import type { Metadata } from 'next';
import Link from 'next/link';

import './globals.css';

export const metadata: Metadata = {
  title: 'Animated Tabs Registry',
  description: 'A Next.js showcase and shadcn registry item for animated tabs.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased">
        <header className="border-b py-4">
          <div className="flex items-center justify-between gap-4 mx-auto max-w-7xl px-6">
            <h1 className="text-lg font-medium">Shadcn Animated Tabs</h1>
            <Link className="text-muted-foreground text-sm hover:text-foreground" href="/r/animated-tabs.json">
              Registry JSON
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-auto border-t py-4">
          <div className="flex items-center justify-between gap-4 mx-auto max-w-7xl px-6 text-muted-foreground text-sm">
            <p>&copy; Thomas Vaeth. Coded with Claude Code in {new Date().getFullYear()}.</p>
            <Link className="hover:text-foreground" href="https://ui.shadcn.com/docs/registry/getting-started">
              Registry docs
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
