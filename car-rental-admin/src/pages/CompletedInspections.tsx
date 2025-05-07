import { useState, useEffect } from 'react';
import { getCompletedInspections } from '../services/api';
import { CompletedInspection } from '../types/InspectionTypes';
import './CompletedInspections.css';

const CompletedInspections = () => {
  const [inspections, setInspections] = useState<CompletedInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedInspection, setExpandedInspection] = useState<string | null>(null);
  
  // Hardcoded worker ID - in a real app, this would come from authentication
  const workerId = "1";
  
  useEffect(() => {
    const fetchInspections = async () => {
      try {
        setLoading(true);
        const data = await getCompletedInspections(workerId);
        setInspections(data);
      } catch (err) {
        setError('Failed to load completed inspections. Please try again later.');
        console.error('Error fetching completed inspections:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInspections();
  }, [workerId]);
  
  const toggleInspectionDetails = (inspectionId: string) => {
    if (expandedInspection === inspectionId) {
      setExpandedInspection(null);
    } else {
      setExpandedInspection(inspectionId);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (loading) {
    return (
      <div className="completed-inspections">
        <div className="loading-spinner"></div>
        <p>Loading completed inspections...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="completed-inspections">
        <div className="error-message">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="completed-inspections">
      <h1>Completed Inspections</h1>
      
      {inspections.length === 0 ? (
        <div className="no-inspections">
          <p>No completed inspections found.</p>
        </div>
      ) : (
        <div className="inspections-list">
          {inspections.map((inspection) => (
            <div 
              key={inspection.inspectionId} 
              className={`inspection-item ${expandedInspection === inspection.inspectionId ? 'expanded' : ''}`}
            >
              <div 
                className="inspection-header" 
                onClick={() => toggleInspectionDetails(inspection.inspectionId)}
              >
                <div className="inspection-summary">
                  <h3>{inspection.carBrand} {inspection.model}</h3>
                  <p className="inspection-date">
                    {formatDate(inspection.inspectionDate)}
                  </p>
                </div>
                <div className="inspection-status">
                  <span className={`status-badge ${inspection.status.toLowerCase()}`}>
                    {inspection.status}
                  </span>
                  <span className="penalty-amount">${inspection.totalPenalty.toFixed(2)}</span>
                  <span className="expand-icon">
                    {expandedInspection === inspection.inspectionId ? '▼' : '►'}
                  </span>
                </div>
              </div>
              
              {expandedInspection === inspection.inspectionId && (
                <div className="inspection-details">
                  <div className="details-section">
                    <h4>Vehicle & Client Details</h4>
                    <div className="details-grid">
                      <div className="detail-row">
                        <span>License Plate:</span>
                        <span>{inspection.licensePlateNum}</span>
                      </div>
                      <div className="detail-row">
                        <span>Client:</span>
                        <span>{inspection.clientName}</span>
                      </div>
                      <div className="detail-row">
                        <span>Wear Level:</span>
                        <span>{inspection.wearLevelPercentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h4>Fees</h4>
                    <div className="details-grid">
                      <div className="detail-row">
                        <span>Damage Penalty:</span>
                        <span>${inspection.damagePenalty.toFixed(2)}</span>
                      </div>
                      <div className="detail-row">
                        <span>Cleaning Fee:</span>
                        <span>${inspection.cleaningFee.toFixed(2)}</span>
                      </div>
                      <div className="detail-row total">
                        <span>Total Penalty:</span>
                        <span>${inspection.totalPenalty.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {inspection.notes && (
                    <div className="details-section">
                      <h4>Notes</h4>
                      <div className="notes-content">
                        {inspection.notes}
                      </div>
                    </div>
                  )}
                  
                  {inspection.damageReports && inspection.damageReports.length > 0 && (
                    <div className="details-section">
                      <h4>Damage Reports</h4>
                      <div className="damage-reports">
                        {inspection.damageReports.map((report, index) => (
                          <div key={report.id || index} className="damage-report">
                            <div className="detail-row">
                              <span>Part Affected:</span>
                              <span>{report.partAffected}</span>
                            </div>
                            <div className="detail-row">
                              <span>Description:</span>
                              <span>{report.description}</span>
                            </div>
                            <div className="detail-row">
                              <span>Cost:</span>
                              <span>${report.estimatedRepairCost.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedInspections; 