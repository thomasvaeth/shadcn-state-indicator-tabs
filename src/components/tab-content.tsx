import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type TabContentProps = {
  name: string;
  description: string;
  children: React.ReactNode;
};

export default function TabContent({ name, description, children }: TabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-muted-foreground text-sm">{children}</CardContent>
    </Card>
  );
}
