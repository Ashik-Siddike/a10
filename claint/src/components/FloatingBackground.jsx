import React from 'react';

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Example: 3 floating pastel circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-float1" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-30 animate-float2" />
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-float3" />
    </div>
  );
} 