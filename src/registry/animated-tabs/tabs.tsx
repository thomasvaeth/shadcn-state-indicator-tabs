'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const EMPTY_INDICATOR_STYLE = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

type TabsListVariant = 'default' | 'line';

const INDICATOR_BASE_CLASSNAME = 'absolute border rounded-md pointer-events-none duration-200 ease-out';

const TabsIndicatorContext = React.createContext({
  showIndicators: false,
  variant: 'default' as TabsListVariant,
});

// The line variant reuses the same measured tab rectangle but collapses it
// down to a 2px bar at the bottom edge.
function getIndicatorStyle(style: typeof EMPTY_INDICATOR_STYLE, variant: TabsListVariant) {
  if (variant === 'line') {
    const underlineHeight = 2;

    return {
      left: style.left,
      top: style.top + Math.max(style.height - underlineHeight, 0),
      width: style.width,
      height: underlineHeight,
    };
  }

  return style;
}

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
  activeIndicatorClassName?: string;
  hoverIndicatorClassName?: string;
  variant?: TabsListVariant;
};

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, activeIndicatorClassName, hoverIndicatorClassName, variant = 'default', ...props }, ref) => {
    const [activeIndicatorStyle, setActiveIndicatorStyle] = React.useState(EMPTY_INDICATOR_STYLE);
    const [hoverIndicatorStyle, setHoverIndicatorStyle] = React.useState(EMPTY_INDICATOR_STYLE);
    const [isHoverIndicatorVisible, setIsHoverIndicatorVisible] = React.useState(false);
    const [isHoverIndicatorResetting, setIsHoverIndicatorResetting] = React.useState(false);
    const [showIndicators, setShowIndicators] = React.useState(false);
    const [canAnimateActiveIndicator, setCanAnimateActiveIndicator] = React.useState(false);

    const tabsListRef = React.useRef<HTMLDivElement | null>(null);
    const hoveredTabRef = React.useRef<HTMLElement | null>(null);
    const hasEnabledActiveIndicatorTransitionRef = React.useRef(false);

    // All indicator positioning is measured relative to the tab list wrapper so
    // the active and hover layers can move independently of the trigger markup.
    const getRelativeIndicatorStyle = React.useCallback((tab: HTMLElement) => {
      if (!tabsListRef.current) {
        return EMPTY_INDICATOR_STYLE;
      }

      const tabRect = tab.getBoundingClientRect();
      const tabsRect = tabsListRef.current.getBoundingClientRect();

      return {
        left: tabRect.left - tabsRect.left,
        top: tabRect.top - tabsRect.top,
        width: tabRect.width,
        height: tabRect.height,
      };
    }, []);

    const updateIndicator = React.useCallback(() => {
      if (!tabsListRef.current) {
        return;
      }

      const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
      if (!activeTab) {
        return;
      }

      requestAnimationFrame(() => {
        const activeStyle = getRelativeIndicatorStyle(activeTab);
        setActiveIndicatorStyle(activeStyle);
        if (!hoveredTabRef.current) {
          setHoverIndicatorStyle(activeStyle);
        }
      });
    }, [getRelativeIndicatorStyle]);

    const updateHoverIndicator = React.useCallback(
      (tab: HTMLElement | null) => {
        hoveredTabRef.current = tab;

        if (!tab) {
          setIsHoverIndicatorVisible(false);
          return;
        }

        setIsHoverIndicatorResetting(false);
        requestAnimationFrame(() => {
          setHoverIndicatorStyle(getRelativeIndicatorStyle(tab));
          setIsHoverIndicatorVisible(true);
        });
      },
      [getRelativeIndicatorStyle],
    );

    const resetHoverIndicator = React.useCallback(() => {
      hoveredTabRef.current = null;
      setIsHoverIndicatorResetting(true);
      setIsHoverIndicatorVisible(false);

      if (!tabsListRef.current) {
        return;
      }

      const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
      if (!activeTab) {
        return;
      }

      requestAnimationFrame(() => {
        // Reset the hidden hover layer back to the active tab so the next hover
        // animates out from the selected state instead of the previously
        // hovered trigger.
        setHoverIndicatorStyle(getRelativeIndicatorStyle(activeTab));
      });
    }, [getRelativeIndicatorStyle]);

    React.useEffect(() => {
      // Let the selected trigger render the initial active styling first, then
      // reveal the overlay indicators after the client has measured them.
      const timeoutId = window.setTimeout(() => {
        updateIndicator();
        requestAnimationFrame(() => {
          setShowIndicators(true);
          if (!hasEnabledActiveIndicatorTransitionRef.current) {
            hasEnabledActiveIndicatorTransitionRef.current = true;
            requestAnimationFrame(() => {
              setCanAnimateActiveIndicator(true);
            });
          }
        });
      }, 0);

      const handleResize = () => {
        updateIndicator();
        if (hoveredTabRef.current) {
          updateHoverIndicator(hoveredTabRef.current);
        }
      };

      const handlePointerMove = (event: PointerEvent) => {
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        if (hoveredTabRef.current === tab) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handlePointerLeave = () => {
        resetHoverIndicator();
      };

      const handleFocusIn = (event: FocusEvent) => {
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
        if (!tab || !tabsListRef.current?.contains(tab)) {
          return;
        }

        updateHoverIndicator(tab);
      };

      const handleFocusOut = (event: FocusEvent) => {
        const nextFocused = event.relatedTarget;
        if (nextFocused instanceof Node && tabsListRef.current?.contains(nextFocused)) {
          return;
        }

        resetHoverIndicator();
      };

      window.addEventListener('resize', handleResize);

      const observer = new MutationObserver(() => updateIndicator());
      const tabsListElement = tabsListRef.current;
      if (tabsListElement) {
        observer.observe(tabsListElement, {
          attributes: true,
          childList: true,
          subtree: true,
        });
        tabsListElement.addEventListener('pointermove', handlePointerMove);
        tabsListElement.addEventListener('pointerleave', handlePointerLeave);
        tabsListElement.addEventListener('focusin', handleFocusIn);
        tabsListElement.addEventListener('focusout', handleFocusOut);
      }

      return () => {
        window.clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
        tabsListElement?.removeEventListener('pointermove', handlePointerMove);
        tabsListElement?.removeEventListener('pointerleave', handlePointerLeave);
        tabsListElement?.removeEventListener('focusin', handleFocusIn);
        tabsListElement?.removeEventListener('focusout', handleFocusOut);
        observer.disconnect();
      };
    }, [resetHoverIndicator, updateHoverIndicator, updateIndicator]);

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
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAME,
              'border-sky-200/80 bg-sky-100/70',
              hoverIndicatorClassName,
              isHoverIndicatorResetting ? 'transition-[opacity]' : 'transition-[left,top,width,height,opacity]',
              (!showIndicators || !isHoverIndicatorVisible) && 'opacity-0',
            )}
            style={getIndicatorStyle(hoverIndicatorStyle, variant)}
          />
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAME,
              'bg-background border-transparent shadow-sm',
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
