'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

type TabsListVariant = 'default' | 'line';

// Safe initial value for indicator positions. Indicators are hidden (opacity-0)
// until properly measured, so this position is never visible to the user.
const ZERO_RECT = {
  top: 0,
  left: 0,
  height: 0,
  width: 0,
};

// Shared base styles applied to both indicator overlay elements.
const INDICATOR_BASE_CLASSNAME = 'absolute border rounded-md pointer-events-none duration-200 ease-out';

// Context lets TabsTrigger know when the indicator overlays have taken over
// so it can stop rendering its own active background/border styling.
const TabsIndicatorContext = React.createContext({
  showIndicators: false,
  variant: 'default' as TabsListVariant,
});

// For the "line" variant, collapse the measured tab rect into a 2px underline
// at the bottom edge instead of a full-size background pill.
function getIndicatorStyle(rect: typeof ZERO_RECT, variant: TabsListVariant) {
  if (variant === 'line') {
    const underlineHeight = 2;

    return {
      top: rect.top + Math.max(rect.height - underlineHeight, 0),
      left: rect.left,
      height: underlineHeight,
      width: rect.width,
    };
  }

  return rect;
}

// CSS applied directly to the active trigger before the overlay indicators load.
// Once showIndicators is true these classes are removed — the overlay takes over.
function getInitialActiveTriggerClassName(variant: TabsListVariant) {
  if (variant === 'line') {
    return "data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-current data-[state=active]:after:content-['']";
  }

  return 'data-[state=active]:bg-background data-[state=active]:shadow-sm';
}

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  // Override the active indicator's appearance (position is still measured automatically).
  activeIndicatorClassName?: string;
  // Override the hover/focus indicator's appearance.
  hoverIndicatorClassName?: string;
  // "default" = pill background; "line" = 2px underline.
  variant?: TabsListVariant;
};

// Visibility states for the hover indicator:
//   hidden    – not visible (pointer/focus is outside the tab list)
//   visible   – showing and tracking the current tab
//   resetting – pointer just left; fade out in place (position transition disabled
//               so the indicator doesn't slide back toward the active tab)
type HoverIndicatorState = 'hidden' | 'visible' | 'resetting';

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, activeIndicatorClassName, hoverIndicatorClassName, variant = 'default', ...props }, ref) => {
    // Positions of the two indicator overlays, measured relative to the tab list container.
    const [activeIndicatorStyle, setActiveIndicatorStyle] = React.useState(ZERO_RECT);
    const [hoverIndicatorStyle, setHoverIndicatorStyle] = React.useState(ZERO_RECT);

    // Three-phase initialization (prevents the indicator from visibly animating in on load):
    //   Phase 1 – First render: triggers render their own active styling; overlays are hidden.
    //   Phase 2 – After mount: measure the active tab, place the overlay at the correct position
    //             with no transition, then reveal it (showIndicators = true).
    //   Phase 3 – Next frame: enable CSS transitions so subsequent tab clicks animate smoothly.
    const [showIndicators, setShowIndicators] = React.useState(false);
    const [canAnimateActiveIndicator, setCanAnimateActiveIndicator] = React.useState(false);

    const [hoverState, setHoverState] = React.useState<HoverIndicatorState>('hidden');

    const tabsListRef = React.useRef<HTMLDivElement | null>(null);
    const hoveredTabRef = React.useRef<HTMLElement | null>(null);
    // Guard so the one-time transition-enable logic only fires once even if the
    // effect re-runs (stable deps mean it won't, but this is a safety net).
    const transitionEnabledRef = React.useRef(false);

    // Returns a tab element's bounding rect relative to the tab list container.
    const measureTab = React.useCallback((tab: HTMLElement): typeof ZERO_RECT => {
      if (!tabsListRef.current) {
        return ZERO_RECT;
      }

      const tabRect = tab.getBoundingClientRect();
      const tabListRect = tabsListRef.current.getBoundingClientRect();

      return {
        top: tabRect.top - tabListRect.top,
        left: tabRect.left - tabListRect.left,
        height: tabRect.height,
        width: tabRect.width,
      };
    }, []);

    // Moves the active indicator to whichever trigger has data-state="active".
    // Also parks the hover indicator on that tab when nothing is hovered, so
    // the first hover of a session animates out from the selected tab.
    const updateActiveIndicator = React.useCallback(() => {
      if (!tabsListRef.current) {
        return;
      }

      const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');

      if (!activeTab) {
        return;
      }

      requestAnimationFrame(() => {
        const rect = measureTab(activeTab);

        setActiveIndicatorStyle(rect);

        if (!hoveredTabRef.current) {
          setHoverIndicatorStyle(rect);
        }
      });
    }, [measureTab]);

    // Moves the hover indicator to the given tab and makes it visible.
    const updateHoverIndicator = React.useCallback(
      (tab: HTMLElement) => {
        hoveredTabRef.current = tab;

        setHoverState('visible');

        requestAnimationFrame(() => {
          setHoverIndicatorStyle(measureTab(tab));
        });
      },
      [measureTab],
    );

    // Called when the pointer or focus leaves the tab list entirely.
    // Switches to "resetting" so the indicator fades out without sliding back,
    // then snaps it to the active tab position so the next hover starts from there.
    const resetHoverIndicator = React.useCallback(() => {
      hoveredTabRef.current = null;

      setHoverState('resetting');

      if (!tabsListRef.current) {
        return;
      }

      const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');

      if (!activeTab) {
        return;
      }

      requestAnimationFrame(() => {
        setHoverIndicatorStyle(measureTab(activeTab));
      });
    }, [measureTab]);

    React.useEffect(() => {
      // Phase 1 → 2: wait one tick for Radix to stamp data-state="active" onto
      // the correct trigger, then measure and position the active indicator.
      const timeout = setTimeout(() => {
        updateActiveIndicator();

        // Phase 2: make indicators visible now that they are in the right position.
        requestAnimationFrame(() => {
          setShowIndicators(true);

          // Phase 3: enable transitions one frame after reveal so the indicator
          // appears in place rather than sliding in from 0,0.
          if (!transitionEnabledRef.current) {
            transitionEnabledRef.current = true;

            requestAnimationFrame(() => setCanAnimateActiveIndicator(true));
          }
        });
      }, 0);

      const handlePointerMove = (event: PointerEvent) => {
        // Delegate from the list rather than individual triggers so the handler
        // works even if tabs are dynamically added or removed.
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');

        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        // already tracking this tab
        if (hoveredTabRef.current === tab) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handleFocusIn = (event: FocusEvent) => {
        // Keyboard focus drives the same hover indicator so users see the
        // preview move as they navigate with arrow keys.
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');

        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handleFocusOut = (event: FocusEvent) => {
        // Only reset if focus is truly leaving the tab list, not just moving
        // between triggers within it.
        const nextFocused = event.relatedTarget;

        if (nextFocused instanceof Node && tabsListRef.current?.contains(nextFocused)) {
          return;
        }

        resetHoverIndicator();
      };

      // MutationObserver detects Radix attribute changes (data-state="active") so
      // we don't need to wire into every trigger's onClick individually.
      const mutationObserver = new MutationObserver(() => updateActiveIndicator());

      // ResizeObserver re-measures when the tab list's layout changes — catches
      // container-driven resizes that window "resize" would miss (e.g. a sidebar opening).
      const resizeObserver = new ResizeObserver(() => {
        updateActiveIndicator();

        if (hoveredTabRef.current) {
          updateHoverIndicator(hoveredTabRef.current);
        }
      });

      const tabListElement = tabsListRef.current;

      if (tabListElement) {
        mutationObserver.observe(tabListElement, {
          attributes: true,
          childList: true,
          subtree: true,
        });

        resizeObserver.observe(tabListElement);

        tabListElement.addEventListener('pointerover', handlePointerMove);
        tabListElement.addEventListener('pointerleave', resetHoverIndicator);
        tabListElement.addEventListener('focusin', handleFocusIn);
        tabListElement.addEventListener('focusout', handleFocusOut);
      }

      return () => {
        clearTimeout(timeout);

        mutationObserver.disconnect();
        resizeObserver.disconnect();

        if (tabListElement) {
          tabListElement.removeEventListener('pointerover', handlePointerMove);
          tabListElement.removeEventListener('pointerleave', resetHoverIndicator);
          tabListElement.removeEventListener('focusin', handleFocusIn);
          tabListElement.removeEventListener('focusout', handleFocusOut);
        }
      };
    }, [resetHoverIndicator, updateHoverIndicator, updateActiveIndicator]);

    return (
      <TabsIndicatorContext.Provider value={{ showIndicators, variant }}>
        <div className="relative" ref={tabsListRef}>
          <TabsPrimitive.List
            ref={ref}
            data-slot="tabs-list"
            className={cn(
              'bg-muted text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
              className,
            )}
            {...props}
          />
          {/* Hover indicator — follows the pointer and keyboard focus */}
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAME,
              'border-sky-200/80 bg-sky-100/70',
              hoverIndicatorClassName,
              // While resetting, only transition opacity so the indicator fades out
              // in place rather than sliding back toward the active tab.
              hoverState === 'resetting' ? 'transition-[opacity]' : 'transition-[left,top,width,height,opacity]',
              (!showIndicators || hoverState !== 'visible') && 'opacity-0',
            )}
            style={getIndicatorStyle(hoverIndicatorStyle, variant)}
          />
          {/* Active indicator — follows the selected tab */}
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAME,
              'bg-background border-transparent shadow-sm',
              // Transitions are disabled until after the first reveal so the indicator
              // appears at the correct position without animating in from 0,0.
              canAnimateActiveIndicator ? 'transition-[left,top,width,height,opacity]' : 'transition-none',
              activeIndicatorClassName,
              !showIndicators && 'opacity-0',
            )}
            style={getIndicatorStyle(activeIndicatorStyle, variant)}
          />
        </div>
      </TabsIndicatorContext.Provider>
    );
  },
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { showIndicators, variant } = React.useContext(TabsIndicatorContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:text-foreground relative z-10 inline-flex h-[calc(100%-1px)] flex-1 select-none items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[background-color,color,box-shadow] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Before the overlay indicators are ready, the trigger renders its own
        // active background so there's no flash of unstyled content on load.
        !showIndicators && getInitialActiveTriggerClassName(variant),
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn('mt-2 flex-1 outline-none', className)}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
