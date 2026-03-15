import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function VerticalTabsShowcase() {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList className="sm:h-auto sm:w-40 sm:flex-col sm:items-stretch">
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
    </div>
  );
}
