import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function UnderlineTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <Tabs defaultValue="signal">
        <TabsList
          className="bg-transparent text-zinc-500 h-10 rounded-none border-b border-zinc-200 p-0"
          activeIndicatorClassName="rounded-full border-0 bg-zinc-950 shadow-none"
          hoverIndicatorClassName="rounded-full border-0 bg-zinc-300"
          variant="line"
        >
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="signal">
            Signal
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="layout">
            Layout
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:text-zinc-950 rounded-none border-0 px-4" value="density">
            Density
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
