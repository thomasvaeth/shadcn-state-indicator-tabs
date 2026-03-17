'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

type TabsListVariant = 'default' | 'line';

// Indicators start hidden until the page is loaded, so this value is the default and never actually visible
const ZERO_RECT = {
  top: 0,
  left: 0,
  height: 0,
  width: 0,
};

const INDICATOR_BASE_CLASSNAMES = 'absolute border rounded-md pointer-events-none duration-200 ease-out';

// CSS applied directly to the active Trigger before the indicators takeover. Once showIndicators is true these classes
// are removed and the indicator styling is now visible
const INITIAL_ACTIVE_TRIGGER_CLASSNAMES: Record<TabsListVariant, string> = {
  default: 'data-[state=active]:bg-background data-[state=active]:shadow-sm',
  line: "data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-current data-[state=active]:after:content-['']",
};

// Context to let TabsTrigger know when the indicator overlay styling has taken over, so it can stop rendering its own
// active styling
const TabsIndicatorContext = createContext({
  showIndicators: false,
  variant: 'default' as TabsListVariant,
});

// The measurements change depending on the variant where the line variable collapses to measure only the 2px underline
// height instead of the full height like the default variant
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

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  activeIndicatorClassName?: string;
  hoverIndicatorClassName?: string;
  /**
   * default - button-style background
   * line - 2px underline
   */
  variant?: TabsListVariant;
};

/**
 * Visibility states for the hover indicator
 *
 * hidden - not visible
 * visible - showing the currently hovered Tab
 * resetting - hover/focus just left; fade out in place, but do not slide back toward the active Tab
 */
type HoverIndicatorState = 'hidden' | 'visible' | 'resetting';

const TabsList = forwardRef<ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, activeIndicatorClassName, hoverIndicatorClassName, variant = 'default', ...props }, ref) => {
    const [activeIndicatorStyle, setActiveIndicatorStyle] = useState(ZERO_RECT);
    const [hoverIndicatorStyle, setHoverIndicatorStyle] = useState(ZERO_RECT);

    // 1. Indicators are hidden on initial render and Triggers have their own active styling
    // 2. Measurements take placea after the component has mounted and the indicators are correctly positioned without
    //    transitions. Styling switching between Triggers and indicators
    // 3. Transitions are endabled after next frame and Tab clicks will change indicator positioning
    const [showIndicators, setShowIndicators] = useState(false);
    const [canAnimateActiveIndicator, setCanAnimateActiveIndicator] = useState(false);

    const [hoverState, setHoverState] = useState<HoverIndicatorState>('hidden');

    const tabsListRef = useRef<HTMLDivElement | null>(null);
    const hoveredTabRef = useRef<HTMLElement | null>(null);
    // Guards the one-time transition-enable logic from running more than once
    const transitionEnabledRef = useRef(false);

    const measureTab = useCallback((tab: HTMLElement): typeof ZERO_RECT => {
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

    // Moves the active indicator to whichever Trigger has data-state="active". It also positions the hover indicator on
    // that Tab when nothing is hovered, so the first hover transitions out from the selected tab
    const updateActiveIndicator = useCallback(() => {
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

    // Moves the hover indicator to the correct Tab and adds data-hovered so the text color stays in sync
    const updateHoverIndicator = useCallback(
      (tab: HTMLElement) => {
        hoveredTabRef.current?.removeAttribute('data-hovered');

        hoveredTabRef.current = tab;

        tab.setAttribute('data-hovered', 'true');

        setHoverState('visible');

        requestAnimationFrame(() => {
          setHoverIndicatorStyle(measureTab(tab));
        });
      },
      [measureTab],
    );

    // This is called whenever the hover/focus leaves the TabList entirely. The hoverState is set to resetting so the
    // hover indicator will fade out rather than sliding back. It will snap back to the active positioning once the fade
    // out is complete
    const resetHoverIndicator = useCallback(() => {
      hoveredTabRef.current?.removeAttribute('data-hovered');
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

    useEffect(() => {
      // Wait one tick for Radix to add data-state="active" onto the correct Trigger, then measure and position the
      // active indicator
      const timeout = setTimeout(() => {
        updateActiveIndicator();

        requestAnimationFrame(() => {
          setShowIndicators(true);

          // Enable transitions one frame after reveal, so the indicator appears in place rather than fading and sliding
          // from top: 0; left: 0;
          if (!transitionEnabledRef.current) {
            transitionEnabledRef.current = true;

            requestAnimationFrame(() => setCanAnimateActiveIndicator(true));
          }
        });
      }, 0);

      const handlePointerMove = (event: PointerEvent) => {
        // Delegate from the list rather than individual Triggers. The handler will work even if Tabs are dynamically
        // added or removed
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');

        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        if (hoveredTabRef.current === tab) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handleFocusIn = (event: FocusEvent) => {
        // Keyboard navigation drives the same hover indicator as pointer hover.
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');

        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handleFocusOut = (event: FocusEvent) => {
        // Only reset if focus is truly leaving the TabList and not just within it
        const nextFocused = event.relatedTarget;

        if (nextFocused instanceof Node && tabsListRef.current?.contains(nextFocused)) {
          return;
        }

        resetHoverIndicator();
      };

      // The MutationObserver watches data-state attribute changes without wiring into each Trigger's onClick
      const mutationObserver = new MutationObserver(() => updateActiveIndicator());

      // The ResizeObserver remeasures on layout changes, which includes container resizes that the window resize would
      // miss
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
              'relative inline-flex items-center justify-center gap-[3px] h-9 w-fit p-[3px] bg-muted text-muted-foreground rounded-lg',
              className,
            )}
            {...props}
          />
          {/* Hover */}
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAMES,
              'bg-background/60 border-border',
              hoverIndicatorClassName,
              // Only transition opacity rather than everything when resetting, so the indicator just fades out instead
              // of also sliding back
              hoverState === 'resetting' ? 'transition-[opacity]' : 'transition-[left,top,width,height,opacity]',
              (!showIndicators || hoverState !== 'visible') && 'opacity-0',
            )}
            style={getIndicatorStyle(hoverIndicatorStyle, variant)}
          />
          {/* Active */}
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAMES,
              'bg-background border-transparent shadow-sm',
              // The transitions are disabled until after the page load because the indicator is initially positioned at
              // top: 0; left: 0; until sizing can be measured and should not transition to the correct position
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

const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { showIndicators, variant } = useContext(TabsIndicatorContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex flex-1 items-center justify-center gap-1.5 h-[calc(100%-1px)] border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap select-none rounded-md cursor-pointer transition-[background-color,color,box-shadow] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[hovered=true]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // The Trigger renders its own active state before the indicators are ready, so there is no rendering flash on
        // initial page load
        !showIndicators && INITIAL_ACTIVE_TRIGGER_CLASSNAMES[variant],
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn('flex-1 mt-2 outline-none', className)}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
