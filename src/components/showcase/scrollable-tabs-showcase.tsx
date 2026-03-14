'use client';

import * as React from 'react';
import TabContent from '@/components/tab-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/animated-tabs';

const options = Array.from({ length: 9 }, (_, index) => {
  const value = `option-${index + 1}`;

  return {
    value,
    label: `Option ${index + 1}`,
    description: `This option demonstrates how the active tab can be scrolled into view and centered when possible.`,
    points: [
      `Selecting ${value} smoothly scrolls the list so the trigger moves closer to the middle.`,
      'This is especially useful once the list overflows on smaller screens.',
      'It keeps the active tab from getting stranded at the far edges of the scroll area.',
    ],
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
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">Scrollable Tabs</h2>
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

        {options.map((option) => (
          <TabsContent key={option.value} value={option.value}>
            <TabContent name={option.label} description={option.description} points={option.points} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
