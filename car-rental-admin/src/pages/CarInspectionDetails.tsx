import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInspectionDetails, submitInspection } from '../services/api';
import { InspectionDetailsResponse, DamageReport, ReturnInspectionRequest } from '../types/InspectionTypes';
import './CarInspectionDetails.css';

const CarInspectionDetails = () => {
  const { rentalId } = useParams<{ rentalId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [inspectionData, setInspectionData] = useState<InspectionDetailsResponse | null>(null);
  
  // Form state
  const [wearLevelPercentage, setWearLevelPercentage] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [notes, setNotes] = useState('');
  const [damageReports, setDamageReports] = useState<DamageReport[]>([]);
  
  // Hardcoded worker ID - in a real app, this would come from authentication
  const workerId = "1";
  
  useEffect(() => {
    if (!rentalId) return;
    
    const fetchInspectionDetails = async () => {
      try {
        setLoading(true);
        const data = await getInspectionDetails(rentalId);
        setInspectionData(data);
      } catch (err) {
        setError('Failed to load inspection details. Please try again later.');
        console.error('Error fetching inspection details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInspectionDetails();
  }, [rentalId]);
  
  const addDamageReport = () => {
    setDamageReports([
      ...damageReports, 
      { partAffected: '', description: '', estimatedRepairCost: 0 }
    ]);
  };
  
  const removeDamageReport = (index: number) => {
    const updatedReports = [...damageReports];
    updatedReports.splice(index, 1);
    setDamageReports(updatedReports);
  };
  
  const updateDamageReport = (index: number, field: keyof DamageReport, value: string | number) => {
    const updatedReports = [...damageReports];
    updatedReports[index] = {
      ...updatedReports[index],
      [field]: value
    };
    setDamageReports(updatedReports);
  };
  
  const calculateTotalDamage = (): number => {
    return damageReports.reduce((total, report) => total + report.estimatedRepairCost, 0);
  };
  
  const calculateTotalFees = (): number => {
    return calculateTotalDamage() + cleaningFee;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rentalId) return;
    
    // Validate form
    if (damageReports.some(report => !report.partAffected || !report.description)) {
      setError('Please complete all damage report fields');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const inspectionData: ReturnInspectionRequest = {
        workerId,
        wearLevelPercentage,
        damagePenalty: calculateTotalDamage(),
        cleaningFee,
        notes,
        damageReports
      };
      
      await submitInspection(rentalId, inspectionData);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Failed to submit inspection. Please try again.');
      console.error('Error submitting inspection:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="inspection-details-container">
        <div className="loading-spinner"></div>
        <p>Loading inspection details...</p>
      </div>
    );
  }
  
  if (error && !success) {
    return (
      <div className="inspection-details-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/dashboard')} className="button">
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="inspection-details-container">
        <div className="success-message">
          <h2>Inspection Completed Successfully</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!inspectionData) {
    return (
      <div className="inspection-details-container">
        <div className="error-message">No inspection data found</div>
        <button onClick={() => navigate('/dashboard')} className="button">
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="inspection-details-container">
      <h1>Car Return Inspection</h1>
      
      <div className="inspection-sections">
        <section className="vehicle-details">
          <h2>Vehicle Details</h2>
          <div className="detail-row">
            <span>Brand & Model:</span>
            <span>{inspectionData.carBrand} {inspectionData.model}</span>
          </div>
          <div className="detail-row">
            <span>License Plate:</span>
            <span>{inspectionData.licensePlateNum}</span>
          </div>
          <div className="detail-row">
            <span>VIN:</span>
            <span>{inspectionData.vin}</span>
          </div>
        </section>
        
        <section className="rental-details">
          <h2>Rental Details</h2>
          <div className="detail-row">
            <span>Client:</span>
            <span>{inspectionData.clientName}</span>
          </div>
          <div className="detail-row">
            <span>Contact:</span>
            <span>{inspectionData.clientContact}</span>
          </div>
          <div className="detail-row">
            <span>Start Date:</span>
            <span>{new Date(inspectionData.startDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span>End Date:</span>
            <span>{new Date(inspectionData.endDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span>Total Price:</span>
            <span>${inspectionData.fullPrice.toFixed(2)}</span>
          </div>
        </section>
      </div>
      
      <form onSubmit={handleSubmit} className="inspection-form">
        <h2>Inspection Details</h2>
        
        <div className="form-group">
          <label htmlFor="wearLevelPercentage">Vehicle Wear Level (%):</label>
          <input
            type="range"
            id="wearLevelPercentage"
            min="0"
            max="100"
            value={wearLevelPercentage}
            onChange={(e) => setWearLevelPercentage(parseInt(e.target.value))}
          />
          <span className="range-value">{wearLevelPercentage}%</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="cleaningFee">Cleaning Fee ($):</label>
          <input
            type="number"
            id="cleaningFee"
            min="0"
            step="0.01"
            value={cleaningFee}
            onChange={(e) => setCleaningFee(parseFloat(e.target.value))}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about the vehicle condition"
          />
        </div>
        
        <div className="damage-reports-section">
          <div className="section-header">
            <h3>Damage Reports</h3>
            <button 
              type="button" 
              className="add-damage-button"
              onClick={addDamageReport}
            >
              + Add Damage Report
            </button>
          </div>
          
          {damageReports.length === 0 ? (
            <p className="no-damage">No damage reports added. Add a damage report if there is any damage to the vehicle.</p>
          ) : (
            <div className="damage-reports-list">
              {damageReports.map((report, index) => (
                <div key={index} className="damage-report-item">
                  <div className="damage-report-header">
                    <h4>Damage Report #{index + 1}</h4>
                    <button 
                      type="button" 
                      className="remove-damage-button"
                      onClick={() => removeDamageReport(index)}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <label>Part Affected:</label>
                    <input
                      type="text"
                      value={report.partAffected}
                      onChange={(e) => updateDamageReport(index, 'partAffected', e.target.value)}
                      placeholder="e.g. Front Bumper, Driver Side Door"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      rows={2}
                      value={report.description}
                      onChange={(e) => updateDamageReport(index, 'description', e.target.value)}
                      placeholder="Describe the damage in detail"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Estimated Repair Cost ($):</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={report.estimatedRepairCost}
                      onChange={(e) => updateDamageReport(index, 'estimatedRepairCost', parseFloat(e.target.value))}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="fee-summary">
          <h3>Fee Summary</h3>
          <div className="fee-row">
            <span>Total Damage Penalty:</span>
            <span>${calculateTotalDamage().toFixed(2)}</span>
          </div>
          <div className="fee-row">
            <span>Cleaning Fee:</span>
            <span>${cleaningFee.toFixed(2)}</span>
          </div>
          <div className="fee-row total">
            <span>Total Fees:</span>
            <span>${calculateTotalFees().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/dashboard')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Complete Inspection'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarInspectionDetails; 