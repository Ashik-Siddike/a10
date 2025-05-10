import { Link } from 'react-router-dom';
import FloatingBackground from '../components/FloatingBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative py-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      <FloatingBackground />
      <div className="z-10 flex flex-col items-center">
        <div className="w-64 h-64 mb-6 flex items-center justify-center">
          {/* SVG Illustration */}
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 h-56">
            <circle cx="150" cy="150" r="140" fill="#e0e7ff" className="dark:fill-gray-800" />
            <text x="50%" y="50%" textAnchor="middle" fill="#6366f1" className="dark:fill-blue-300" fontSize="80" fontWeight="bold" dy=".3em">404</text>
            <ellipse cx="150" cy="220" rx="60" ry="12" fill="#a5b4fc" className="dark:fill-blue-900" opacity=".5" />
            <circle cx="110" cy="140" r="8" fill="#6366f1" />
            <circle cx="190" cy="140" r="8" fill="#6366f1" />
            <rect x="130" y="170" width="40" height="10" rx="5" fill="#6366f1" opacity=".7" />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-blue-700 dark:text-blue-200 mb-2 drop-shadow-lg">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-300 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg">Go Home</Link>
      </div>
    </div>
  );
} 