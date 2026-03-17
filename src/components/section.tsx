import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return <section className="space-y-4">{children}</section>;
}
