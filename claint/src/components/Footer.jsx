export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="font-bold text-lg mb-2 md:mb-0">Crowdcube &copy; {new Date().getFullYear()}</div>
        <div className="flex gap-4 text-sm">
          <span>Empowering ideas, supporting dreams.</span>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200">GitHub</a>
          <a href="/" className="underline hover:text-gray-200">Home</a>
        </div>
      </div>
    </footer>
  );
} 