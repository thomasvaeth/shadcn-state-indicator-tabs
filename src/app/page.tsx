import InstallationSection from '@/components/installation-section';
import DefaultValueTabsShowcase from '@/components/showcase/default-value-tabs-showcase';
import HorizontalTabsShowcase from '@/components/showcase/horizontal-tabs-showcase';
import ManualActivationTabsShowcase from '@/components/showcase/manual-activation-tabs-showcase';
import ScrollableTabsShowcase from '@/components/showcase/scrollable-tabs-showcase';
import VerticalTabsShowcase from '@/components/showcase/vertical-tabs-showcase';

export default function HomePage() {
  return (
    <main className="container flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">Animated Tabs</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A shadcn registry item that keeps the tabs API familiar while adding an animated active indicator and a
          separate hover and focus follower.
        </p>
      </div>

      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Showcase</h2>

      <div className="flex flex-row flex-wrap gap-8">
        <HorizontalTabsShowcase />
        <DefaultValueTabsShowcase />
        <ManualActivationTabsShowcase />
        <ScrollableTabsShowcase />
        <VerticalTabsShowcase />
      </div>

      <InstallationSection />
    </main>
  );
}
