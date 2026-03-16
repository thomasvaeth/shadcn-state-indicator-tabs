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
      <div className="overflow-hidden rounded-lg border">
        {/* Package manager tab bar */}
        <div className="bg-muted/50 flex items-center justify-between border-b px-3">
          <div className="flex">
            {(Object.keys(PACKAGE_MANAGERS) as PackageManager[]).map((manager) => (
              <button
                key={manager}
                onClick={() => setActiveManager(manager)}
                className={cn(
                  'cursor-pointer px-3 py-2 text-xs transition-colors',
                  activeManager === manager
                    ? 'border-b border-foreground font-medium text-foreground'
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
            className="text-muted-foreground hover:text-foreground cursor-pointer rounded p-1 transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        {/* Command */}
        <pre className="font-mono overflow-x-auto px-4 py-3 text-sm">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}
