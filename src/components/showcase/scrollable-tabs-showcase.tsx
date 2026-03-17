'use client';

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/registry/animated-tabs/tabs';

const options = Array.from({ length: 9 }, (_, index) => {
  const value = `option-${index + 1}`;

  return {
    value,
    label: `Option ${index + 1}`,
  };
});

// Keeps a scroll target within the valid scroll range of the container.
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollableTabsShowcase() {
  const [value, setValue] = useState(options[4]?.value ?? 'option-5');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // Keyed by tab value so the effect can look up the active trigger's DOM node.
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Distinguishes the initial load (instant scroll) from subsequent selections (smooth scroll).
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeTrigger = triggerRefs.current[value];
    if (!scrollContainer || !activeTrigger) {
      return;
    }

    // Scroll position that places the active trigger in the center of the container:
    // start at the trigger's left edge, subtract half the container to align the left
    // edge to center, then add back half the trigger's width to land on its midpoint.
    const targetLeft = activeTrigger.offsetLeft - scrollContainer.clientWidth / 2 + activeTrigger.offsetWidth / 2;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: clamp(targetLeft, 0, Math.max(maxScrollLeft, 0)),
      behavior: hasMountedRef.current ? 'smooth' : 'auto',
    });

    hasMountedRef.current = true;
  }, [value]);

  return (
    <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hidden">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          {options.map((option) => (
            <TabsTrigger
              key={option.value}
              ref={(node) => {
                triggerRefs.current[option.value] = node;
              }}
              value={option.value}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
