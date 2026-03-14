import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function ManualActivationTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">Manual Activation Tabs</h2>
      <Tabs defaultValue="focus" activationMode="manual">
        <TabsList className="mb-2">
          <TabsTrigger value="focus">Focus</TabsTrigger>
          <TabsTrigger value="select">Select</TabsTrigger>
          <TabsTrigger value="why">Why</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-0" value="focus">
          <TabContent
            name="Focus First"
            description="Arrow keys move focus without immediately changing the active panel."
            points={[
              'This matches the behavior some people expect from tab UIs.',
              'You can still see the focus follower move across the triggers.',
              'Selection only changes once you confirm with Enter or Space.',
            ]}
          />
        </TabsContent>
        <TabsContent className="mt-0" value="select">
          <TabContent
            name="Explicit Selection"
            description="Useful when changing panels has a bigger cognitive or visual cost."
            points={[
              'People can preview where focus is going before committing.',
              'This can feel calmer when tab panels are dense or expensive to scan.',
              'It is also a good teaching example for the Radix activation modes.',
            ]}
          />
        </TabsContent>
        <TabsContent className="mt-0" value="why">
          <TabContent
            name="Why It Exists"
            description="A side-by-side showcase makes the default behavior easier to understand."
            points={[
              'Automatic activation is Radix’s default.',
              'Manual activation is available through the same Tabs API.',
              'This demo gives consumers a concrete example of both patterns.',
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
