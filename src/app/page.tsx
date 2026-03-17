import Link from 'next/link';
import InstallationSection from '@/components/installation-section';
import HorizontalTabsShowcase from '@/components/showcase/horizontal-tabs-showcase';
import ManualActivationTabsShowcase from '@/components/showcase/manual-activation-tabs-showcase';
import ScrollableTabsShowcase from '@/components/showcase/scrollable-tabs-showcase';
import UnderlineTabsShowcase from '@/components/showcase/underline-tabs-showcase';
import VerticalTabsShowcase from '@/components/showcase/vertical-tabs-showcase';
import ComponentPreview from '@/components/component-preview';
import Section from '@/components/section';

export default function HomePage() {
  return (
    <>
      <Section>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">State Indicator Tabs</h1>
          <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance">
            A shadcn registry item that keeps the tabs API familiar while adding a separate indicator for each state —
            active and hover.
          </p>

          <Link
            href="https://github.com/thomasvaeth/shadcn-tabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-foreground text-sm font-medium rounded-md"
          >
            <svg role="img" viewBox="0 0 24 24" className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>View on GitHub</span>
          </Link>
        </div>

        <ComponentPreview>
          <HorizontalTabsShowcase />
        </ComponentPreview>
      </Section>

      <Section>
        <h2 className="text-xl font-medium tracking-tight">Installation</h2>

        <InstallationSection />
      </Section>

      <Section>
        <h2 className="text-xl font-medium tracking-tight">Examples</h2>

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
      </Section>
    </>
  );
}
