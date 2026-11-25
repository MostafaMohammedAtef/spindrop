import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getDemoSession } from '../lib/demoAuth';

export default function DemoProtectedRoute() {
  const location = useLocation();
  if (!getDemoSession()) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  return <Outlet />;
}
