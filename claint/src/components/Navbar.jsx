import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow mb-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl text-blue-600 dark:text-blue-300">Crowdcube</Link>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/campaigns" className="hover:underline">All Campaigns</Link>
        {user && <Link to="/addCampaign" className="hover:underline">Add New Campaign</Link>}
        {user && <Link to="/myCampaign" className="hover:underline">My Campaign</Link>}
        {user && <Link to="/myDonations" className="hover:underline">My Donations</Link>}
      </div>
      <div className="flex items-center gap-4">
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
    </nav>
  );
} 