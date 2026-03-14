import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function HorizontalTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">Horizontal Tabs</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TabContent
            name="Overview"
            description="A direct replacement for the stock shadcn tabs primitive."
            points={[
              'Same Radix API and same overall mental model.',
              'A moving indicator makes the active tab feel more obvious.',
              'Content stays simple and easy to customize.',
            ]}
          />
        </TabsContent>
        <TabsContent value="design">
          <TabContent
            name="Design"
            description="A quieter visual style that still feels native to shadcn."
            points={[
              'Neutral surfaces and subtle borders keep the focus on content.',
              'The hover state is there, but it does not overpower the layout.',
              'It feels like a polished extension, not a new design system.',
            ]}
          />
        </TabsContent>
        <TabsContent value="motion">
          <TabContent
            name="Motion"
            description="Animation is used to clarify state, not decorate it."
            points={[
              'The indicator moves between tabs instead of blinking on and off.',
              'Panel changes get a short entrance transition.',
              'The overall effect stays restrained and product-like.',
            ]}
          />
        </TabsContent>
        <TabsContent value="delivery">
          <TabContent
            name="Delivery"
            description="Best suited to the shadcn registry workflow."
            points={[
              'Consumers add the source file directly into their own codebase.',
              'They can adjust spacing, colors, or timing without waiting on releases.',
              'The registry item keeps installation simple and transparent.',
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
