import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

export default function HorizontalTabsShowcase() {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TabContent
            name="Overview"
            description="View your key metrics and recent project activity. Track progress across all your active projects."
            points={['You have 12 active projects and 3 pending tasks.']}
          />
        </TabsContent>
        <TabsContent value="analytics">
          <TabContent
            name="Analytics"
            description="Track performance and user engagement metrics. Monitor trends and identify growth opportunities."
            points={['Page views are up 25% compared to last month.']}
          />
        </TabsContent>
        <TabsContent value="reports">
          <TabContent
            name="Reports"
            description="Generate and download your detailed reports. Export data in multiple formats for analysis."
            points={['You have 5 reports ready and available to export.']}
          />
        </TabsContent>
        <TabsContent value="settings">
          <TabContent
            name="Settings"
            description="Manage your account preferences and options. Customize your experience to fit your needs."
            points={['Configure notifications, security, and themes.']}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
