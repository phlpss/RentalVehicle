import { useState, useEffect } from 'react';
import { getAvailableDates, createBooking, getCarDetails } from '../../services/api';
import type { CarSearchResult } from '../../types/CarTypes';
import './BookingModal.css';

interface BookingModalProps {
  carId: string;
  onClose: () => void;
  onBookingSuccess: (bookingId: string) => void;
}

interface AvailableDates {
  carId: string;
  availableDates: string[];
  earliestAvailableDate: string;
  latestAvailableDate: string;
}

const BookingModal = ({ carId, onClose, onBookingSuccess }: BookingModalProps) => {
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<AvailableDates | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carDetails, setCarDetails] = useState<CarSearchResult | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Mock client ID - in a real app, this would come from authentication
  const clientId = "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both available dates and car details in parallel
        const [datesData, carData] = await Promise.all([
          getAvailableDates(carId),
          getCarDetails(carId)
        ]);
        
        setAvailableDates(datesData);
        setCarDetails(carData);
        
        if (datesData.availableDates && datesData.availableDates.length > 0) {
          setStartDate(datesData.availableDates[0]);
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  // Calculate total price whenever start or end date changes
  useEffect(() => {
    if (startDate && endDate && carDetails) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate number of days (including both start and end days)
      const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const price = days * carDetails.dailyRentalCost;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, carDetails]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Reset end date if it's before the new start date
    if (endDate && new Date(endDate) < new Date(newStartDate)) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setBookingInProgress(true);
      setError(null);
      
      const startDateTime = `${startDate}T10:00:00`;
      const endDateTime = `${endDate}T18:00:00`;
      
      const response = await createBooking({
        clientId,
        carId,
        rentalStart: startDateTime,
        rentalEnd: endDateTime
      });
      
      onBookingSuccess(response.bookingId);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
    } finally {
      setBookingInProgress(false);
    }
  };

  // Filter available end dates based on selected start date
  const getAvailableEndDates = () => {
    if (!availableDates || !startDate) return [];
    
    const startDateObj = new Date(startDate);
    return availableDates.availableDates.filter(date => {
      const dateObj = new Date(date);
      return dateObj >= startDateObj;
    });
  };

  // Format price to 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <div className="booking-modal">
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <h2>Book a Car</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="booking-modal-body centered">
            <div className="loading-spinner"></div>
            <p>Loading available dates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!availableDates || availableDates.availableDates.length === 0) {
    return (
      <div className="booking-modal">
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <h2>Book a Car</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="booking-modal-body centered">
            <p className="no-dates-message">
              Sorry, there are no available dates for booking this car at the moment.
            </p>
            <button className="secondary-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-modal">
      <div className="booking-modal-content">
        <div className="booking-modal-header">
          <h2>Book a Car</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="booking-modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="start-date">Start Date</label>
              <select 
                id="start-date" 
                value={startDate} 
                onChange={handleStartDateChange}
                disabled={bookingInProgress}
                required
              >
                <option value="">Select Start Date</option>
                {availableDates.availableDates.map(date => (
                  <option key={`start-${date}`} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="end-date">End Date</label>
              <select 
                id="end-date" 
                value={endDate} 
                onChange={handleEndDateChange}
                disabled={!startDate || bookingInProgress}
                required
              >
                <option value="">Select End Date</option>
                {getAvailableEndDates().map(date => (
                  <option key={`end-${date}`} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            
            {startDate && endDate && totalPrice > 0 && (
              <div className="price-summary">
                <h4>Price Summary</h4>
                <div className="price-row">
                  <span>Daily Rate:</span>
                  <span>${carDetails?.dailyRentalCost.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Number of Days:</span>
                  <span>{Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1}</span>
                </div>
                <div className="price-row total">
                  <span>Total:</span>
                  <span>${formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}
            
            <div className="booking-actions">
              <button 
                type="button" 
                className="secondary-button" 
                onClick={onClose}
                disabled={bookingInProgress}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="primary-button"
                disabled={!startDate || !endDate || bookingInProgress}
              >
                {bookingInProgress ? 'Booking...' : `Book Now • $${formatPrice(totalPrice)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 