import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function VerticalTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">Vertical Tabs</h2>
      <Tabs defaultValue="team" className="gap-4 sm:flex-row sm:items-start">
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

        <div className="min-w-0 flex-1">
          <TabsContent className="mt-0" value="team">
            <TabContent
              name="Team"
              description="A layout that works well for settings-style pages."
              points={[
                'Vertical navigation gives the active indicator more room to travel.',
                'The trigger alignment still follows the same core component API.',
                'This keeps the component flexible beyond a single horizontal demo.',
              ]}
            />
          </TabsContent>
          <TabsContent className="mt-0" value="product">
            <TabContent
              name="Product"
              description="The animated indicator still reads clearly in a stacked layout."
              points={[
                'Spacing stays calm and compact.',
                'This is useful for side-panel or dashboard contexts.',
                'The registry component works in both orientations.',
              ]}
            />
          </TabsContent>
          <TabsContent className="mt-0" value="ship">
            <TabContent
              name="Ship"
              description="A realistic example for docs and showcase pages."
              points={[
                'The site demonstrates the behavior without hiding the code.',
                'Consumers can install it, inspect it, and keep moving.',
                'That keeps the project aligned with the shadcn ecosystem.',
              ]}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
