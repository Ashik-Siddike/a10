import { FaGithub, FaTwitter, FaLinkedin, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 text-white pt-16 pb-8 mt-10 shadow-2xl">
      {/* Wavy SVG Top Border */}
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#4f46e5" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="font-extrabold text-2xl md:text-3xl mb-2 md:mb-0 drop-shadow-lg flex items-center gap-2">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">Crowdcube</span>
          <span className="text-lg font-semibold text-blue-200">&copy; {year}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-base font-medium">
          <span className="text-blue-100 drop-shadow">Empowering ideas, supporting dreams.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition text-2xl"><FaGithub /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition text-2xl"><FaTwitter /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 transition text-2xl"><FaLinkedin /></a>
          </div>
          <a href="/" className="underline hover:text-yellow-200 transition ml-0 md:ml-4">Home</a>
        </div>
        <button onClick={scrollToTop} aria-label="Back to Top" className="absolute right-4 top-2 bg-white bg-opacity-20 hover:bg-opacity-40 text-blue-900 rounded-full p-2 shadow-lg transition border border-blue-200">
          <FaArrowUp className="text-xl" />
        </button>
      </div>
    </footer>
  );
} 