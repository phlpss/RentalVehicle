import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkerDashboard } from '../services/api';
import { RentalInspection } from '../types/WorkerTypes';
import { useUser } from '../App';
import './CarInspections.css';

const CarInspections = () => {
  const [inspections, setInspections] = useState<RentalInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the current user from context
  const { user } = useUser();
  const workerId = user.id;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchInspections = async () => {
      try {
        setLoading(true);
        const data = await getWorkerDashboard(workerId);
        setInspections(data.pendingInspections);
        console.log("Fetched inspections:", data.pendingInspections); // Debug log
      } catch (err) {
        setError('Failed to load inspections. Please try again later.');
        console.error('Error fetching inspections:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInspections();
  }, [workerId]);
  
  const handleStartInspection = (rentalId: string) => {
    console.log("Navigating to inspection:", rentalId); // Debug log
    if (rentalId) {
      navigate(`/inspections/${rentalId}`);
    } else {
      console.error("Invalid rental ID");
    }
  };
  
  if (loading) {
    return (
      <div className="car-inspections">
        <div className="loading-spinner"></div>
        <p>Loading inspections...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="car-inspections">
        <div className="error-message">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="car-inspections">
      <h1>Car Inspections</h1>
      
      {inspections.length === 0 ? (
        <div className="no-inspections">
          <p>No pending inspections at this time.</p>
        </div>
      ) : (
        <div className="inspections-grid">
          {inspections.map((inspection) => (
            <div key={inspection.rentalId} className="inspection-card">
              <div className="card-header">
                <h3>{inspection.carBrand} {inspection.model}</h3>
                <span className="status-badge return">RETURN</span>
              </div>
              <div className="card-details">
                <p><strong>License Plate:</strong> {inspection.licensePlateNum}</p>
                <p><strong>Client:</strong> {inspection.clientName}</p>
                <p><strong>Contact:</strong> {inspection.clientContact}</p>
                <p><strong>Status:</strong> {inspection.status}</p>
              </div>
              <button 
                className="action-button"
                onClick={() => handleStartInspection(inspection.rentalId)}
              >
                Start Inspection
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarInspections; 