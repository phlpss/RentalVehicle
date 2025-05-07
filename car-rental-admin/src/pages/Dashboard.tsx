import { useState, useEffect } from 'react';
import { getWorkerDashboard } from '../services/api';
import type { WorkerDashboardResponse } from '../types/WorkerTypes';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<WorkerDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded worker ID
  const workerId = "1";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getWorkerDashboard(workerId);
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Worker Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Inspections</h3>
          <p className="stat-value">{dashboardData?.totalPendingInspections || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <p className="stat-value">{dashboardData?.totalActiveRentals || 0}</p>
        </div>
      </div>

      {dashboardData?.pendingInspections.length ? (
        <section className="dashboard-section">
          <h2>Pending Inspections</h2>
          <div className="inspection-grid">
            {dashboardData.pendingInspections.map((inspection) => (
              <div key={inspection.rentalId} className="inspection-card">
                <div className="card-header">
                  <h3>{inspection.carBrand} {inspection.model}</h3>
                  <span className="status-badge return">RETURN</span>
                </div>
                <div className="card-details">
                  <p><strong>License Plate:</strong> {inspection.licensePlateNum}</p>
                  <p><strong>Client:</strong> {inspection.clientName}</p>
                  <p><strong>Contact:</strong> {inspection.clientContact}</p>
                </div>
                <button className="action-button">
                  Start Inspection
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {dashboardData?.activeRentals.length ? (
        <section className="dashboard-section">
          <h2>Active Rentals</h2>
          <div className="rental-grid">
            {dashboardData.activeRentals.map((rental) => (
              <div key={rental.rentalId} className="rental-card">
                <div className="card-header">
                  <h3>{rental.carBrand} {rental.model}</h3>
                  <span className="status-badge active">ACTIVE</span>
                </div>
                <div className="card-details">
                  <p><strong>License Plate:</strong> {rental.licensePlateNum}</p>
                  <p><strong>Client:</strong> {rental.clientName}</p>
                  <p><strong>Contact:</strong> {rental.clientContact}</p>
                  <p><strong>Start Date:</strong> {new Date(rental.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(rental.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Dashboard; 