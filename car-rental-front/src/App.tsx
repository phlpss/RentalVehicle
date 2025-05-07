import CarSearchPage from './pages/CarSearchPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-text">Car Rental</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li className="active"><a href="/">Home</a></li>
            <li><a href="/bookings">My Bookings</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="app-main">
        <CarSearchPage />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2024 Car Rental Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
