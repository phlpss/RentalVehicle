import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CarInspections from './pages/CarInspections';
import CarManagement from './pages/CarManagement';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { User, UserRole } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Protected route component
  const ProtectedRoute = ({ 
    children, 
    allowedRoles 
  }: { 
    children: React.ReactNode; 
    allowedRoles: UserRole[] 
  }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          } 
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['WORKER', 'ADMIN']}>
              <Layout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Worker routes */}
          <Route
            path="inspections"
            element={
              <ProtectedRoute allowedRoles={['WORKER']}>
                <CarInspections />
              </ProtectedRoute>
            }
          />
          
          {/* Admin routes */}
          <Route
            path="cars"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <CarManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
