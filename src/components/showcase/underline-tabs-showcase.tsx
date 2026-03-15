import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function UnderlineTabsShowcase() {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList
          className="h-10 text-zinc-500 bg-transparent rounded-none"
          activeIndicatorClassName="rounded-full border-0 bg-zinc-950 shadow-none"
          hoverIndicatorClassName="rounded-full border-0 bg-zinc-300"
          variant="line"
        >
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="reports">
            Reports
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
