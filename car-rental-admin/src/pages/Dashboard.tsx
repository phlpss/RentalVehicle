import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkerDashboard } from '../services/api';
import { WorkerDashboardResponse } from '../types/WorkerTypes';
import { useUser } from '../App';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<WorkerDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role === 'WORKER') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getWorkerDashboard(user.id);
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInspection = (rentalId: string) => {
    navigate(`/inspections/${rentalId}`);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
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
      <h1>Dashboard</h1>
      
      {user.role === 'ADMIN' ? (
        <div className="admin-dashboard">
          <div className="stats-cards">
            <div className="stats-card">
              <h3>Cars</h3>
              <p className="stats-value">View and manage cars</p>
              <button className="stats-action" onClick={() => navigate('/cars')}>
                Go to Car Management
              </button>
            </div>
            <div className="stats-card">
              <h3>Reports</h3>
              <p className="stats-value">View rental and revenue reports</p>
              <button className="stats-action" onClick={() => navigate('/reports')}>
                Go to Reports
              </button>
            </div>
          </div>
        </div>
      ) : (
        dashboardData && (
          <>
            <div className="dashboard-summary">
              <div className="summary-card">
                <h3>Pending Inspections</h3>
                <p className="summary-value">{dashboardData.totalPendingInspections}</p>
              </div>
              <div className="summary-card">
                <h3>Active Rentals</h3>
                <p className="summary-value">{dashboardData.totalActiveRentals}</p>
              </div>
            </div>
            
            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Pending Inspections</h2>
                {dashboardData.pendingInspections.length === 0 ? (
                  <p className="no-items-message">No pending inspections.</p>
                ) : (
                  <div className="inspections-table-container">
                    <table className="inspections-table">
                      <thead>
                        <tr>
                          <th>Car</th>
                          <th>License Plate</th>
                          <th>Client</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.pendingInspections.map((inspection) => (
                          <tr key={inspection.rentalId}>
                            <td>{inspection.carBrand} {inspection.model}</td>
                            <td>{inspection.licensePlateNum}</td>
                            <td>{inspection.clientName}</td>
                            <td>{inspection.clientContact}</td>
                            <td>
                              <span className="status-badge">
                                {inspection.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="action-button"
                                onClick={() => handleStartInspection(inspection.rentalId)}
                              >
                                Start Inspection
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
              
              <section className="dashboard-section">
                <h2>Active Rentals</h2>
                {dashboardData.activeRentals.length === 0 ? (
                  <p className="no-items-message">No active rentals.</p>
                ) : (
                  <div className="rentals-table-container">
                    <table className="rentals-table">
                      <thead>
                        <tr>
                          <th>Car</th>
                          <th>License Plate</th>
                          <th>Client</th>
                          <th>Contact</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.activeRentals.map((rental) => (
                          <tr key={rental.rentalId}>
                            <td>{rental.carBrand} {rental.model}</td>
                            <td>{rental.licensePlateNum}</td>
                            <td>{rental.clientName}</td>
                            <td>{rental.clientContact}</td>
                            <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                            <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                            <td>
                              <span className="status-badge">
                                {rental.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Dashboard; 