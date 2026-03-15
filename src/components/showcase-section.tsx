import * as React from 'react';

type ShowcaseSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-xl border bg-card p-6 sm:p-8">{children}</div>
    </section>
  );
}
