import * as React from 'react';

type ShowcaseSectionProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <section className="space-y-4">
      {(title || description) && (
        <div className="space-y-1.5">
          {title && <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{title}</h3>}
          {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-lg border">
        <div className="flex min-h-[280px] items-center justify-center p-10">{children}</div>
      </div>
    </section>
  );
}
