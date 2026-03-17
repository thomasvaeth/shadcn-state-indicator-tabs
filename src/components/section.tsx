import * as React from 'react';

type SectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return <section className="space-y-4">{children}</section>;
}
