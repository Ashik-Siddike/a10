import React from 'react';

export default function HeroSection({ theme, stats, navigate }) {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-xl p-10 mb-12 overflow-hidden min-h-[340px]"
      style={{
        backgroundImage: `url(${theme === 'dark' ? '/images/dark.png' : '/images/light.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left: Text & CTA */}
      <div className="flex-1 z-10 flex flex-col items-start justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 leading-tight drop-shadow-lg">
          <span className="block">Welcome to <br /> <span className="text-purple-600">Crowdcube</span></span>
          <span className="block text-2xl md:text-3xl font-medium text-blue-700 mt-2">Where Ideas Become Reality</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl font-medium">
          Start, support, and discover inspiring campaigns. Join a vibrant community and help turn dreams into achievements.
        </p>
        <div className="flex gap-4 mb-4">
          <button aria-label="Start a Campaign" onClick={() => navigate('/addCampaign')} className="px-7 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-purple-600 font-bold rounded-xl shadow-lg border-2 border-purple-600 hover:from-blue-700 hover:to-purple-700 hover:text-purple-600 transition text-lg">Start a Campaign</button>
          <button aria-label="Explore Campaigns" onClick={() => navigate('/campaigns')} className="px-7 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition text-lg">Explore Campaigns</button>
        </div>
      </div>
      {/* Right: Floating Stats Card absolutely positioned bottom-4 right-4, aligned with button row */}
      <div className=" relative mt-80 z-10">
        <div className="absolute right-0 bottom-0 mb-4 mr-4">
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg px-8 py-4 flex gap-8 items-center border-t-4 border-blue-200">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-700">{stats.total}</span>
              <span className="text-xs text-gray-500">Total Campaigns</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-700">{stats.running}</span>
              <span className="text-xs text-gray-500">Running Now</span>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#a5b4fc" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    </section>
  );
} 