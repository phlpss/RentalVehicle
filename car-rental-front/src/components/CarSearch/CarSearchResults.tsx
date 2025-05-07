import { useState } from 'react';
import type { CarSearchResult } from '../../types/CarTypes';
import BookingModal from '../Booking/BookingModal';
import { getCarImageUrl, getBrandLogoUrl } from '../../utils/carImageMapper';
import './CarSearchResults.css';

interface CarSearchResultsProps {
  results: CarSearchResult[];
  loading: boolean;
}

const CarSearchResults = ({ results, loading }: CarSearchResultsProps) => {
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const handleBookCar = (carId: string) => {
    setSelectedCarId(carId);
  };

  const handleCloseModal = () => {
    setSelectedCarId(null);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setSelectedCarId(null);
    setBookingSuccess(bookingId);
    // In a real app, you might navigate to a booking details page or show a more detailed success message
    setTimeout(() => {
      setBookingSuccess(null);
    }, 5000); // Clear the success message after 5 seconds
  };

  const handleImageError = (carId: string) => {
    setImageError(prev => ({
      ...prev,
      [carId]: true
    }));
  };

  if (loading) {
    return <div className="loading-results">Searching for cars...</div>;
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        <h3>No cars found</h3>
        <p>Try adjusting your search criteria to find more options.</p>
      </div>
    );
  }

  return (
    <div className="car-search-results">
      {bookingSuccess && (
        <div className="booking-success-banner">
          <p>Booking successful! Your booking ID is: <strong>{bookingSuccess}</strong></p>
        </div>
      )}
      
      <h2>Available Cars ({results.length})</h2>
      <div className="results-grid">
        {results.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-card-header">
              <h3>{car.brand} {car.model}</h3>
              <span className="car-year">{car.year}</span>
            </div>
            <div className="car-card-image">
              {imageError[car.id] ? (
                <div className="car-image-placeholder">
                  <img 
                    src={getBrandLogoUrl(car.brand)} 
                    alt={`${car.brand} logo`} 
                    className="brand-logo"
                    onError={() => handleImageError(`${car.id}-logo`)}
                  />
                </div>
              ) : (
                <img 
                  src={getCarImageUrl(car.brand, car.model, car.category)} 
                  alt={`${car.brand} ${car.model}`} 
                  className="car-image"
                  onError={() => handleImageError(car.id)}
                />
              )}
            </div>
            <div className="car-card-details">
              <div className="car-detail">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{car.category}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Transmission:</span>
                <span className="detail-value">{car.transmissionType}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Fuel:</span>
                <span className="detail-value">{car.fuelType}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Seats:</span>
                <span className="detail-value">{car.seatsNumber}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">License:</span>
                <span className="detail-value">{car.licensePlateNum}</span>
              </div>
              <div className="car-detail">
                <span className="detail-label">Color:</span>
                <span className="detail-value">{car.color}</span>
              </div>
            </div>
            <div className="car-card-footer">
              <div className="car-price">
                <span className="price-amount">${car.dailyRentalCost}</span>
                <span className="price-period">per day</span>
              </div>
              <button 
                className="book-button"
                onClick={() => handleBookCar(car.id)}
                disabled={car.status !== 'AVAILABLE'}
              >
                {car.status === 'AVAILABLE' ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedCarId && (
        <BookingModal 
          carId={selectedCarId} 
          onClose={handleCloseModal}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default CarSearchResults; 