// BlogDetailSkeleton.tsx
import React from "react";

const Line = ({ w = "w-full", h = "h-4", className = "" }: { w?: string; h?: string; className?: string }) => (
  <div className={`bg-gray-300/40 rounded ${w} ${h} ${className}`} />
);

const Circle = ({ size = 10 }: { size?: number }) => (
  <div className={`rounded-full bg-gray-300/40`} style={{ width: `${size}px`, height: `${size}px` }} />
);

const BlogDetailSkeleton = () => {
  return (
    <main aria-busy="true" className="space-y-6 md:w-5xl w-full mt-20 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="w-32 h-4 bg-gray-300/40 rounded" />
      </div>

      {/* Meta row: category + dot + reading time */}
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-300/40" />
          <div className="w-24 h-4 bg-gray-300/40 rounded" />
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300/40" />
        <div className="flex items-center gap-x-2">
          <div className="w-5 h-4 bg-gray-300/40 rounded" />
          <div className="w-12 h-4 bg-gray-300/40 rounded" />
        </div>
      </div>

      {/* Header (title + description) */}
      <div className="border-b border-gray-200 pb-6 space-y-6">
        <div className="md:h-14 h-10 rounded bg-gray-300/40 w-full"></div>
        <div className="md:h-8 h-6 rounded bg-gray-300/40 w-4/6"></div>
      </div>

      {/* Author row */}
      <div className="flex items-center gap-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-300/40 overflow-hidden" />
        <div className="flex flex-col gap-y-2">
          <div className="w-40 h-4 bg-gray-300/40 rounded" />
          <div className="w-28 h-4 bg-gray-300/40 rounded" />
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full h-64 md:h-96 rounded-lg bg-gray-300/40 overflow-hidden" />

      {/* Content (many lines to simulate paragraphs & headings) */}
      <div className="space-y-4">
        <div className="w-3/4 h-5 bg-gray-300/40 rounded" />
        <div className="space-y-3">
          <Line w="w-full" h="h-4" />
          <Line w="w-full" h="h-4" />
          <Line w="w-5/6" h="h-4" />
          <Line w="w-4/6" h="h-4" />
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Line w="w-full" h="h-4" />
              <Line w="w-full" h="h-4" />
            </div>
            <div className="space-y-2">
              <Line w="w-full" h="h-4" />
              <Line w="w-4/5" h="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Comments header */}
      <div className="pt-6 border-t border-gray-200">
        <div className="w-48 h-5 bg-gray-300/40 rounded mb-4" />
        {/* small list of comment placeholders */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300/40" />
              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-gray-300/40 rounded" />
                <div className="w-full h-4 bg-gray-300/40 rounded" />
                <div className="w-3/4 h-4 bg-gray-300/40 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogDetailSkeleton;
