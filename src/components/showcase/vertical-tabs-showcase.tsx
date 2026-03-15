import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function VerticalTabsShowcase() {
  return (
    <div className="w-full max-w-xs">
      <Tabs defaultValue="team">
        <TabsList className="sm:h-auto sm:w-40 sm:flex-col sm:items-stretch">
          <TabsTrigger className="sm:justify-start" value="team">
            Team
          </TabsTrigger>
          <TabsTrigger className="sm:justify-start" value="product">
            Product
          </TabsTrigger>
          <TabsTrigger className="sm:justify-start" value="ship">
            Ship
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
