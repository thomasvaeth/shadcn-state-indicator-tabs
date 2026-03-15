import { Tabs, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

export default function ManualActivationTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <Tabs defaultValue="focus" activationMode="manual">
        <TabsList className="mb-2">
          <TabsTrigger value="focus">Focus</TabsTrigger>
          <TabsTrigger value="select">Select</TabsTrigger>
          <TabsTrigger value="why">Why</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
