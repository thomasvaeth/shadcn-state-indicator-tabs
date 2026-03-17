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
        <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">State Indicator Tabs</h1>
        <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance">
          A shadcn registry item that keeps the tabs API familiar while adding a separate indicator for each state —
          active and hover.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <ShowcaseSection>
          <HorizontalTabsShowcase />
        </ShowcaseSection>

        <section className="space-y-4">
          <div className="space-y-1.5">
            <h2 className="font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!">
              Installation
            </h2>
          </div>
          <InstallationSection />
        </section>

        <section className="space-y-4">
          <h2 className="font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!">
            Examples
          </h2>

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
