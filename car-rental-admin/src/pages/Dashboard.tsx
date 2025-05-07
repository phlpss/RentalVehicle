import { useState, useEffect } from 'react';
import { User } from '../types';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeRentals: 0,
    pendingInspections: 0,
    totalCars: 0,
    availableCars: 0
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock data for now
    setStats({
      activeRentals: 5,
      pendingInspections: 3,
      totalCars: 20,
      availableCars: 12
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <p className="stat-value">{stats.activeRentals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending Inspections</h3>
          <p className="stat-value">{stats.pendingInspections}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Cars</h3>
          <p className="stat-value">{stats.totalCars}</p>
        </div>
        
        <div className="stat-card">
          <h3>Available Cars</h3>
          <p className="stat-value">{stats.availableCars}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 