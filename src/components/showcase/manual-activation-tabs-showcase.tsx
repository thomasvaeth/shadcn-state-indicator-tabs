import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function ManualActivationTabsShowcase() {
  return (
    <Tabs defaultValue="overview" activationMode="manual">
      <TabsList className="mb-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
