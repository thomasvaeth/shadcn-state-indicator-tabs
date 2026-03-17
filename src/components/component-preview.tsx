import * as React from 'react';

type ComponentPreviewProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function ComponentPreview({ title, description, children }: ComponentPreviewProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1.5">
          {title && (
            <h3 className="scroll-m-28 text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl">{title}</h3>
          )}
          {description && <p className="leading-relaxed [&:not(:first-child)]:mt-6">{description}</p>}
        </div>
      )}

      <div className="mb-12 overflow-hidden border rounded-xl">
        <div className="flex items-center justify-center min-h-[280px] p-10">{children}</div>
      </div>
    </div>
  );
}
