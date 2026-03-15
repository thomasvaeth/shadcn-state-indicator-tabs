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

type IndicatorVariant = 'pill' | 'underline';

const INDICATOR_BASE_CLASSNAME = 'pointer-events-none absolute rounded-md duration-200 ease-out';

const TabsIndicatorContext = React.createContext({
  isIndicatorReady: false,
  fallbackActiveTriggerClassName: undefined as string | undefined,
});

function getIndicatorStyle(style: typeof EMPTY_INDICATOR_STYLE, variant: IndicatorVariant) {
  if (variant === 'underline') {
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

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  activeIndicatorClassName?: string;
  hoverIndicatorClassName?: string;
  fallbackActiveTriggerClassName?: string;
  indicatorVariant?: IndicatorVariant;
};

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  (
    {
      className,
      activeIndicatorClassName,
      hoverIndicatorClassName,
      fallbackActiveTriggerClassName,
      indicatorVariant = 'pill',
      ...props
    },
    ref,
  ) => {
    const [activeIndicatorStyle, setActiveIndicatorStyle] = React.useState(EMPTY_INDICATOR_STYLE);
    const [hoverIndicatorStyle, setHoverIndicatorStyle] = React.useState(EMPTY_INDICATOR_STYLE);
    const [isHoverIndicatorVisible, setIsHoverIndicatorVisible] = React.useState(false);
    const [isHoverIndicatorResetting, setIsHoverIndicatorResetting] = React.useState(false);
    const [isIndicatorReady, setIsIndicatorReady] = React.useState(false);
    const [isActiveIndicatorTransitionEnabled, setIsActiveIndicatorTransitionEnabled] = React.useState(false);

    const tabsListRef = React.useRef<HTMLDivElement | null>(null);
    const hoveredTabRef = React.useRef<HTMLElement | null>(null);
    const hasEnabledActiveIndicatorTransitionRef = React.useRef(false);

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

    const updateIndicator = React.useCallback(
      (markReady = false) => {
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
          if (markReady) {
            setIsIndicatorReady(true);
            if (!hasEnabledActiveIndicatorTransitionRef.current) {
              hasEnabledActiveIndicatorTransitionRef.current = true;
              requestAnimationFrame(() => {
                setIsActiveIndicatorTransitionEnabled(true);
              });
            }
          }
        });
      },
      [getRelativeIndicatorStyle],
    );

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
        setHoverIndicatorStyle(getRelativeIndicatorStyle(activeTab));
      });
    }, [getRelativeIndicatorStyle]);

    React.useEffect(() => {
      const timeoutId = window.setTimeout(() => updateIndicator(true), 0);
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
      <TabsIndicatorContext.Provider value={{ isIndicatorReady, fallbackActiveTriggerClassName }}>
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
              'border border-sky-200/80 bg-sky-100/70',
              hoverIndicatorClassName,
              isHoverIndicatorResetting ? 'transition-[opacity]' : 'transition-[left,top,width,height,opacity]',
              (!isIndicatorReady || !isHoverIndicatorVisible) && 'opacity-0',
            )}
            style={getIndicatorStyle(hoverIndicatorStyle, indicatorVariant)}
          />
          <div
            className={cn(
              INDICATOR_BASE_CLASSNAME,
              'bg-background border border-transparent shadow-sm',
              isActiveIndicatorTransitionEnabled ? 'transition-[left,top,width,height,opacity]' : 'transition-none',
              activeIndicatorClassName,
              !isIndicatorReady && 'opacity-0',
            )}
            style={getIndicatorStyle(activeIndicatorStyle, indicatorVariant)}
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
  const { isIndicatorReady, fallbackActiveTriggerClassName } = React.useContext(TabsIndicatorContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:text-foreground z-10 inline-flex h-[calc(100%-1px)] flex-1 select-none items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[background-color,color,box-shadow] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        !isIndicatorReady && 'data-[state=active]:bg-background data-[state=active]:shadow-sm',
        !isIndicatorReady && fallbackActiveTriggerClassName,
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
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn('mt-2 flex-1 outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
