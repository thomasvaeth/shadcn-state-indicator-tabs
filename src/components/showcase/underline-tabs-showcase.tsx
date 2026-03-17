import { Tabs, TabsList, TabsTrigger } from '@/registry/state-indicator-tabs/tabs';

export default function UnderlineTabsShowcase() {
  return (
    <Tabs defaultValue="overview">
      <TabsList
        className="h-10 bg-transparent text-zinc-500 rounded-none"
        activeIndicatorClassName="border-0 bg-zinc-950 rounded-full shadow-none"
        hoverIndicatorClassName="border-0 bg-zinc-300 rounded-full"
        variant="line"
      >
        <TabsTrigger className="border-0 px-4 rounded-none data-[state=active]:text-zinc-950" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger className="border-0 px-4 rounded-none data-[state=active]:text-zinc-950" value="analytics">
          Analytics
        </TabsTrigger>
        <TabsTrigger className="border-0 px-4 rounded-none data-[state=active]:text-zinc-950" value="reports">
          Reports
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
