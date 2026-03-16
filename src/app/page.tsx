import InstallationSection from '@/components/installation-section';
import HorizontalTabsShowcase from '@/components/showcase/horizontal-tabs-showcase';
import ManualActivationTabsShowcase from '@/components/showcase/manual-activation-tabs-showcase';
import ScrollableTabsShowcase from '@/components/showcase/scrollable-tabs-showcase';
import UnderlineTabsShowcase from '@/components/showcase/underline-tabs-showcase';
import VerticalTabsShowcase from '@/components/showcase/vertical-tabs-showcase';
import ShowcaseSection from '@/components/showcase-section';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">Animated Tabs</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A shadcn registry item that keeps the tabs API familiar while adding an animated active indicator and a
          separate hover and focus follower.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <ShowcaseSection>
          <HorizontalTabsShowcase />
        </ShowcaseSection>

        <section className="space-y-4">
          <div className="space-y-1.5">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Installation</h2>
            <p className="text-sm text-muted-foreground">
              Add the registry item directly to a shadcn project with the generated URL below.
            </p>
          </div>
          <InstallationSection />
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>

          <ShowcaseSection
            title="Manual Activation"
            description="Arrow keys move focus first and Enter or Space commits the selection."
          >
            <ManualActivationTabsShowcase />
          </ShowcaseSection>

          <ShowcaseSection
            title="Scrollable"
            description="Selecting a tab smoothly scrolls it toward the center when space allows."
          >
            <ScrollableTabsShowcase />
          </ShowcaseSection>

          <ShowcaseSection
            title="Underline"
            description="An underline-only treatment keeps the tabs lighter and more navigation-like."
          >
            <UnderlineTabsShowcase />
          </ShowcaseSection>

          <ShowcaseSection
            title="Vertical"
            description="A stacked layout for settings-style pages, side panels, and dashboards."
          >
            <VerticalTabsShowcase />
          </ShowcaseSection>
        </section>
      </div>
    </div>
  );
}
