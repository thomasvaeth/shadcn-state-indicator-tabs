import { Tabs, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function ContrastTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <Tabs defaultValue="contrast">
        <TabsList
          wrapperClassName="isolate"
          className="border border-zinc-300 bg-white p-1 text-zinc-700 shadow-sm"
          activeIndicatorClassName="border-black bg-black shadow-none"
          hoverIndicatorClassName="border-zinc-200 bg-white shadow-sm"
          fallbackActiveTriggerClassName="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none"
        >
          <TabsTrigger className="text-white mix-blend-difference data-[state=active]:text-white" value="contrast">
            Contrast
          </TabsTrigger>
          <TabsTrigger className="text-white mix-blend-difference data-[state=active]:text-white" value="hover">
            Hover
          </TabsTrigger>
          <TabsTrigger className="text-white mix-blend-difference data-[state=active]:text-white" value="blend">
            Blend Mode
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
