import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Dashboard from './pages/Dashboard';
import CarInspections from './pages/CarInspections';
import CarInspectionDetails from './pages/CarInspectionDetails';
import CompletedInspections from './pages/CompletedInspections';
import CarManagement from './pages/CarManagement';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { User } from './types';
import './App.css';

// Create a context for the current user
export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: {
    id: '1',
    username: 'Worker 1',
    role: 'WORKER'
  },
  setUser: () => {}
});

// Custom hook for using the user context
export const useUser = () => useContext(UserContext);

function App() {
  // State for the current user
  const [user, setUser] = useState<User>({
    id: '1',
    username: 'Worker 1',
    role: 'WORKER'
  });

  // Handle user change
  const handleUserChange = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={<Navigate to="/dashboard" />} 
          />
          
          <Route
            path="/"
            element={<Layout user={user} onLogout={() => {}} onUserChange={handleUserChange} />}
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Worker routes */}
            <Route path="inspections" element={<CarInspections />} />
            <Route path="inspections/:rentalId" element={<CarInspectionDetails />} />
            <Route path="completed-inspections" element={<CompletedInspections />} />
            
            {/* Admin routes - these will be inaccessible with the current hardcoded role */}
            <Route path="cars" element={<CarManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
