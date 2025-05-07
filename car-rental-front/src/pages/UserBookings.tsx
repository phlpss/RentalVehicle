import { useState, useEffect } from 'react';
import { getUserBookings } from '../services/api';
import './UserBookings.css';

interface UserBooking {
  id: string;
  start: string;
  end: string;
  carBrand: string;
  model: string;
  location: string;
}

const UserBookings = () => {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user ID - in a real app, this would come from authentication
  const userId = "1";

  useEffect(() => {
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

    fetchBookings();
  }, [userId]);

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
      </div>
    );
  }

  return (
    <div className="user-bookings-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">You don't have any bookings yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.carBrand} {booking.model}</h3>
              <div className="booking-details">
                <p>
                  <strong>Start:</strong> {new Date(booking.start).toLocaleDateString()}
                </p>
                <p>
                  <strong>End:</strong> {new Date(booking.end).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {booking.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings; 