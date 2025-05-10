import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow mb-6">
      {/* Logo and Hamburger */}
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl text-blue-600 dark:text-blue-300">Crowdcube</Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/campaigns" className="hover:underline">All Campaigns</Link>
          {user && <Link to="/addCampaign" className="hover:underline">Add New Campaign</Link>}
          {user && <Link to="/myCampaign" className="hover:underline">My Campaign</Link>}
          {user && <Link to="/myDonations" className="hover:underline">My Donations</Link>}
        </div>
      </div>
      {/* Desktop Auth & Theme */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        {!user && <>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </>}
        {user && (
          <div className="flex items-center gap-2">
            <div className="relative group">
              <img src={user.photoURL || 'https://i.ibb.co/2kR5zq0/user.png'} alt="user" className="w-8 h-8 rounded-full border" />
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                {user.displayName || user.email}
              </span>
            </div>
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
          </div>
        )}
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMenuOpen(false)} aria-hidden />
      )}
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 z-50 flex flex-col gap-6 p-6 pt-6 transition-transform duration-300 md:hidden bg-white dark:bg-gray-900 shadow-2xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-2 mt-8">
          <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/campaigns" className="hover:underline" onClick={() => setMenuOpen(false)}>All Campaigns</Link>
          {user && <Link to="/addCampaign" className="hover:underline" onClick={() => setMenuOpen(false)}>Add New Campaign</Link>}
          {user && <Link to="/myCampaign" className="hover:underline" onClick={() => setMenuOpen(false)}>My Campaign</Link>}
          {user && <Link to="/myDonations" className="hover:underline" onClick={() => setMenuOpen(false)}>My Donations</Link>}
        </div>
        <div className="flex items-center gap-4 mt-8">
          <ThemeToggle />
          {!user && <>
            <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
          </>}
          {user && (
            <div className="flex items-center gap-2">
              <img src={user.photoURL || 'https://i.ibb.co/2kR5zq0/user.png'} alt="user" className="w-8 h-8 rounded-full border" />
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 