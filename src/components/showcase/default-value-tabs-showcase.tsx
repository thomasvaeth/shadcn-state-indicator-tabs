import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function DefaultValueTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">Default Value Tabs</h2>
      <Tabs defaultValue="current">
        <TabsList className="mb-2">
          <TabsTrigger value="legacy">Legacy</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-0" value="legacy">
          <TabContent
            name="Legacy"
            description="A simpler state change with less emphasis on the indicator."
            points={[
              'Useful if you want a more understated interpretation.',
              'Works well for teams that prefer the stock shadcn feel.',
              'A good fallback if you want to minimize motion.',
            ]}
          />
        </TabsContent>
        <TabsContent className="mt-0" value="current">
          <TabContent
            name="Current"
            description="The default version with the animated active-tab treatment."
            points={[
              'The indicator motion makes state changes easier to track.',
              'The styling stays close to shadcn’s default component language.',
              'This is the version exposed by the registry item.',
            ]}
          />
        </TabsContent>
        <TabsContent className="mt-0" value="notes">
          <TabContent
            name="Notes"
            description="A small component with a low-cost customization surface."
            points={[
              'Ideal for copy-paste or registry distribution.',
              'Easy to evolve later if you want more variants.',
              'Small enough that consumers can quickly understand the whole file.',
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
