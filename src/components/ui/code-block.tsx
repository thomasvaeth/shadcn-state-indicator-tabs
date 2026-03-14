import { cn } from '@/lib/utils';

type CodeBlockProps = {
  children: string;
  className?: string;
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'bg-muted text-foreground overflow-x-auto rounded-lg border px-4 py-3 text-sm leading-7',
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  );
}
