import { Tabs, TabsList, TabsTrigger } from '@/registry/state-indicator-tabs/tabs';

export default function VerticalTabsShowcase() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="sm:flex-col sm:items-stretch sm:h-auto sm:w-40">
        <TabsTrigger className="sm:justify-start" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger className="sm:justify-start" value="password">
          Password
        </TabsTrigger>
        <TabsTrigger className="sm:justify-start" value="notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
