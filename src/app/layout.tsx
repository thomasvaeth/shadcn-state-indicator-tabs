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
      <body className="bg-background text-foreground flex min-h-screen flex-col antialiased">
        <nav className="border-b py-4">
          <div className="container flex items-center justify-between gap-4">
            <h1 className="text-lg font-medium">Shadcn Animated Tabs</h1>
            <Link className="text-muted-foreground text-sm hover:text-foreground" href="/r/animated-tabs.json">
              Registry JSON
            </Link>
          </div>
        </nav>

        <div className="flex-1">{children}</div>

        <footer className="mt-auto border-t py-4">
          <div className="container flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Thomas Vaeth</p>
            <Link className="hover:text-foreground" href="https://ui.shadcn.com/docs/registry/getting-started">
              Registry docs
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
