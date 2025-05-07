import { Outlet, Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import UserSwitcher from './UserSwitcher';
import './Layout.css';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  onUserChange?: (user: User) => void;
}

const Layout = ({ user, onLogout, onUserChange }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-text">Car Rental Admin</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {user?.role === 'WORKER' && (
              <>
                <li className={location.pathname === '/inspections' ? 'active' : ''}>
                  <Link to="/inspections">Car Inspections</Link>
                </li>
                <li className={location.pathname === '/completed-inspections' ? 'active' : ''}>
                  <Link to="/completed-inspections">Completed Inspections</Link>
                </li>
              </>
            )}
            {user?.role === 'ADMIN' && (
              <>
                <li className={location.pathname === '/cars' ? 'active' : ''}>
                  <Link to="/cars">Car Management</Link>
                </li>
                <li className={location.pathname === '/reports' ? 'active' : ''}>
                  <Link to="/reports">Reports</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="user-menu">
          {user && onUserChange && <UserSwitcher currentUser={user} onUserChange={onUserChange} />}
        </div>
      </header>
      
      <main className="app-main">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2024 Car Rental Service. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 