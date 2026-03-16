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
          >
            You have 12 active projects and 3 pending tasks.
          </TabContent>
        </TabsContent>
        <TabsContent value="analytics">
          <TabContent
            name="Analytics"
            description="Track performance and user engagement metrics. Monitor trends and identify growth opportunities."
          >
            Page views are up 25% compared to last month.
          </TabContent>
        </TabsContent>
        <TabsContent value="reports">
          <TabContent
            name="Reports"
            description="Generate and download your detailed reports. Export data in multiple formats for analysis."
          >
            You have 5 reports ready and available to export.
          </TabContent>
        </TabsContent>
        <TabsContent value="settings">
          <TabContent
            name="Settings"
            description="Manage your account preferences and options. Customize your experience to fit your needs."
          >
            Configure notifications, security, and themes.
          </TabContent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
