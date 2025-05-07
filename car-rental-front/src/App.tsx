import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import CarSearchPage from './pages/CarSearchPage';
import UserBookings from './pages/UserBookings';
import ClientUserSwitcher from './components/ClientUserSwitcher';
import type { ClientUser } from './types/ClientUser';
import './App.css';

// Create a context for the current user
export const ClientUserContext = createContext<{
  user: ClientUser;
  setUser: (user: ClientUser) => void;
}>({
  user: {
    id: '4c0e6a0a-dfd1-404c-88d1-1e9c9cc77885',
    name: 'Daryna Bondar',
    contactNumber: '+380987654324',
    email: 'daryna@email.com'
  },
  setUser: () => {}
});

// Custom hook for using the user context
export const useClientUser = () => useContext(ClientUserContext);

function App() {
  // State for the current user
  const [user, setUser] = useState<ClientUser>({
    id: '4c0e6a0a-dfd1-404c-88d1-1e9c9cc77885',
    name: 'Daryna Bondar',
    contactNumber: '+380987654324',
    email: 'daryna@email.com'
  });

  // Handle user change
  const handleUserChange = (newUser: ClientUser) => {
    setUser(newUser);
  };

  return (
    <ClientUserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="logo">
              <span className="logo-text">Car Rental</span>
            </div>
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/bookings">My Bookings</Link></li>
              </ul>
            </nav>
            <div className="user-menu">
              <ClientUserSwitcher currentUser={user} onUserChange={handleUserChange} />
            </div>
          </header>
          
          <main className="app-main">
            <Routes>
              <Route path="/" element={<CarSearchPage />} />
              <Route path="/bookings" element={<UserBookings />} />
              <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>&copy; 2024 Car Rental Service. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ClientUserContext.Provider>
  );
}

export default App;
