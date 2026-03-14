import Link from 'next/link';
import { CodeBlock } from '@/components/ui/code-block';

export default function InstallationSection() {
  const installCommand = 'pnpm dlx shadcn@latest add https://your-domain.com/r/animated-tabs.json';

  return (
    <>
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Installation</h2>
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Registry command</p>
          <CodeBlock>{installCommand}</CodeBlock>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>The registry item installs as `components/ui/tabs.tsx` in the consuming app.</p>
          <div className="flex gap-3">
            <Link className="text-foreground underline underline-offset-4" href="/r/animated-tabs.json">
              Open registry JSON
            </Link>
            <Link
              className="text-foreground underline underline-offset-4"
              href="https://ui.shadcn.com/docs/registry/getting-started"
            >
              Shadcn registry docs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
