import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
} 