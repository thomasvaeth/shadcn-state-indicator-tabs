'use client';

import * as React from 'react';
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
  const [value, setValue] = React.useState(options[0]?.value ?? 'option-1');
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const hasMountedRef = React.useRef(false);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeTrigger = triggerRefs.current[value];
    if (!scrollContainer || !activeTrigger) {
      return;
    }

    const targetLeft = activeTrigger.offsetLeft - scrollContainer.clientWidth / 2 + activeTrigger.offsetWidth / 2;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: clamp(targetLeft, 0, Math.max(maxScrollLeft, 0)),
      behavior: hasMountedRef.current ? 'smooth' : 'auto',
    });

    hasMountedRef.current = true;
  }, [value]);

  return (
    <div>
      <Tabs value={value} onValueChange={setValue}>
        <div ref={scrollContainerRef} className="overflow-x-auto pb-2">
          <TabsList className="mb-0 min-w-max">
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
        </div>
      </Tabs>
    </div>
  );
}
