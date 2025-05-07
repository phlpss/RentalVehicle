import { useState, useEffect } from 'react';
import { getUserBookings, pickupBooking, returnBooking } from '../services/api';
import type { UserBooking, DamageReport } from '../types/BookingTypes';
import './UserBookings.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  // Mock user ID - in a real app, this would come from authentication
  const userId = "1";

  useEffect(() => {
    fetchBookings();
  }, [userId]);
  
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings. Please try again later.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePickup = async (bookingId: string) => {
    try {
      setActionLoading(bookingId);
      await pickupBooking(bookingId);
      // Refresh bookings
      fetchBookings();
    } catch (err) {
      setError('Failed to pick up vehicle. Please try again.');
      console.error('Error picking up vehicle:', err);
    } finally {
      setActionLoading(null);
    }
  };
  
  const handleReturn = async (bookingId: string) => {
    try {
      setActionLoading(bookingId);
      await returnBooking(bookingId);
      // Refresh bookings
      fetchBookings();
    } catch (err) {
      setError('Failed to return vehicle. Please try again.');
      console.error('Error returning vehicle:', err);
    } finally {
      setActionLoading(null);
    }
  };
  
  const toggleExpand = (bookingId: string) => {
    if (expandedBooking === bookingId) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(bookingId);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESERVED':
        return 'status-reserved';
      case 'PICKED_UP':
        return 'status-active';
      case 'RETURNED':
        return 'status-returned';
      case 'INSPECTED':
        return 'status-inspected';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="user-bookings-container">
        <div className="loading-spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-bookings-container">
        <div className="error-message">{error}</div>
        <button onClick={() => setError(null)} className="button">
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="user-bookings-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">You don't have any bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header" onClick={() => toggleExpand(booking.id)}>
                <div className="booking-title">
                  <h3>{booking.carBrand} {booking.model}</h3>
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="booking-dates">
                  <p>{new Date(booking.start).toLocaleDateString()} - {new Date(booking.end).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className={`booking-content ${expandedBooking === booking.id ? 'expanded' : ''}`}>
                <div className="booking-details">
                  <div className="detail-row">
                    <span>Pickup/Return Location:</span>
                    <span>{booking.location || 'Unknown location'}</span>
                  </div>
                  
                  {/* Show action buttons based on booking status */}
                  <div className="booking-actions">
                    {booking.status === 'RESERVED' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePickup(booking.id);
                        }}
                        className="button pickup-button"
                        disabled={actionLoading === booking.id}
                      >
                        {actionLoading === booking.id ? 'Processing...' : 'Confirm Pickup'}
                      </button>
                    )}
                    
                    {booking.status === 'PICKED_UP' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReturn(booking.id);
                        }}
                        className="button return-button"
                        disabled={actionLoading === booking.id}
                      >
                        {actionLoading === booking.id ? 'Processing...' : 'Return Vehicle'}
                      </button>
                    )}
                  </div>
                  
                  {/* Show inspection details if available */}
                  {booking.status === 'INSPECTED' && booking.inspectionDetails && (
                    <div className="inspection-details">
                      <h4>Inspection Results</h4>
                      
                      <div className="inspection-summary">
                        <div className="detail-row">
                          <span>Status:</span>
                          <span className={`inspection-status ${booking.inspectionDetails.status.toLowerCase()}`}>
                            {booking.inspectionDetails.status}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span>Wear Level:</span>
                          <span>{booking.inspectionDetails.wearLevelPercentage}%</span>
                        </div>
                        <div className="detail-row">
                          <span>Cleaning Fee:</span>
                          <span>${booking.inspectionDetails.cleaningFee.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                          <span>Damage Penalty:</span>
                          <span>${booking.inspectionDetails.damagePenalty.toFixed(2)}</span>
                        </div>
                        <div className="detail-row total">
                          <span>Total Penalty:</span>
                          <span>${booking.inspectionDetails.totalPenalty.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {booking.inspectionDetails.notes && (
                        <div className="inspection-notes">
                          <h5>Notes</h5>
                          <p>{booking.inspectionDetails.notes}</p>
                        </div>
                      )}
                      
                      {booking.inspectionDetails.damageReports && booking.inspectionDetails.damageReports.length > 0 && (
                        <div className="damage-reports">
                          <h5>Damage Reports</h5>
                          {booking.inspectionDetails.damageReports.map((report: DamageReport, index) => (
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings; 