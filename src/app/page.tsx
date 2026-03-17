import InstallationSection from '@/components/installation-section';
import HorizontalTabsShowcase from '@/components/showcase/horizontal-tabs-showcase';
import ManualActivationTabsShowcase from '@/components/showcase/manual-activation-tabs-showcase';
import ScrollableTabsShowcase from '@/components/showcase/scrollable-tabs-showcase';
import UnderlineTabsShowcase from '@/components/showcase/underline-tabs-showcase';
import VerticalTabsShowcase from '@/components/showcase/vertical-tabs-showcase';
import ComponentPreview from '@/components/component-preview';

export default function HomePage() {
  return (
    <>
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">State Indicator Tabs</h1>
          <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance">
            A shadcn registry item that keeps the tabs API familiar while adding a separate indicator for each state —
            active and hover.
          </p>
        </div>

        <ComponentPreview>
          <HorizontalTabsShowcase />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-28 text-xl font-medium tracking-tight">Installation</h2>
        <InstallationSection />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-28 text-xl font-medium tracking-tight">Examples</h2>

        <div>
          <ComponentPreview
            title="Manual Activation"
            description="Arrow keys move focus first and Enter or Space commits the selection."
          >
            <ManualActivationTabsShowcase />
          </ComponentPreview>

          <ComponentPreview
            title="Scrollable"
            description="Selecting a tab smoothly scrolls it toward the center when space allows."
          >
            <ScrollableTabsShowcase />
          </ComponentPreview>

          <ComponentPreview
            title="Underline"
            description="An underline-only treatment keeps the tabs lighter and more navigation-like."
          >
            <UnderlineTabsShowcase />
          </ComponentPreview>

          <ComponentPreview
            title="Vertical"
            description="A stacked layout for settings-style pages, side panels, and dashboards."
          >
            <VerticalTabsShowcase />
          </ComponentPreview>
        </div>
      </section>
    </>
  );
}
