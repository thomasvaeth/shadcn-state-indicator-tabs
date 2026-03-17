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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollableTabsShowcase() {
  const [value, setValue] = useState(options[4]?.value ?? 'option-5');

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // The key are the Tab values (not the index or labels), so the useEffect can get the right trigger for the scrolling
  // calculation
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Th initial page load will have auto scroll behavior, but the subsequent selections will be smooth scroll
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeTrigger = triggerRefs.current[value];

    if (!scrollContainer || !activeTrigger) {
      return;
    }

    // Center the active trigger within the scroll container if it is possible to scroll to that position
    const targetLeft = activeTrigger.offsetLeft - scrollContainer.clientWidth / 2 + activeTrigger.offsetWidth / 2;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: clamp(targetLeft, 0, Math.max(maxScrollLeft, 0)),
      behavior: hasMountedRef.current ? 'smooth' : 'auto',
    });

    hasMountedRef.current = true;
  }, [value]);

  return (
    <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar">
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
