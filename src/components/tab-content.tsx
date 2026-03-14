import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type TabContentProps = {
  name: string;
  description: string;
  points: string[];
};

export default function TabContent({ name, description, points }: TabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        {points.map((point) => (
          <p key={point}>{point}</p>
        ))}
      </CardContent>
    </Card>
  );
}
