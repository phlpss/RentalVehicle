import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import CarInspections from './pages/CarInspections';
import CarManagement from './pages/CarManagement';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { User } from './types';
import './App.css';

function App() {
  // Hardcoded worker user instead of login
  const [user] = useState<User>({
    id: '1',
    username: 'worker',
    role: 'WORKER'
  });

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Navigate to="/dashboard" />} 
        />
        
        <Route
          path="/"
          element={<Layout user={user} onLogout={() => {}} />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Worker routes */}
          <Route path="inspections" element={<CarInspections />} />
          
          {/* Admin routes - these will be inaccessible with the current hardcoded role */}
          <Route path="cars" element={<CarManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
