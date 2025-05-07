import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarSearchPage from './pages/CarSearchPage';
import UserBookings from './pages/UserBookings';
import './App.css';

function App() {
  return (
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
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
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
  );
}

export default App;
