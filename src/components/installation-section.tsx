'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const PACKAGE_MANAGERS = {
  pnpm: 'pnpm dlx shadcn@latest add https://your-domain.com/r/animated-tabs.json',
  npm: 'npx shadcn@latest add https://your-domain.com/r/animated-tabs.json',
  yarn: 'npx shadcn@latest add https://your-domain.com/r/animated-tabs.json',
  bun: 'bunx shadcn@latest add https://your-domain.com/r/animated-tabs.json',
} as const;

type PackageManager = keyof typeof PACKAGE_MANAGERS;

export default function InstallationSection() {
  const [activeManager, setActiveManager] = React.useState<PackageManager>('pnpm');
  const [copied, setCopied] = React.useState(false);

  const command = PACKAGE_MANAGERS[activeManager];

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden border rounded-lg">
        {/* Package manager tab bar */}
        <div className="flex items-center justify-between border-b px-3 bg-muted/50">
          <div className="flex">
            {(Object.keys(PACKAGE_MANAGERS) as PackageManager[]).map((manager) => (
              <button
                key={manager}
                onClick={() => setActiveManager(manager)}
                className={cn(
                  'px-3 py-2 text-xs cursor-pointer transition-colors',
                  activeManager === manager
                    ? 'border-b border-foreground text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {manager}
              </button>
            ))}
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            aria-label="Copy command"
            className="p-1 text-muted-foreground hover:text-foreground rounded cursor-pointer transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        {/* Command */}
        <pre className="overflow-x-auto px-4 py-3 font-mono text-sm">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}
