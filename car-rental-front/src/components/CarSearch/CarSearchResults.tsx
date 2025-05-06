import type { CarSearchResult } from '../../types/CarTypes';
import './CarSearchResults.css';

interface CarSearchResultsProps {
  results: CarSearchResult[];
  loading: boolean;
  onBookCar: (carId: string) => void;
}

const CarSearchResults = ({ results, loading, onBookCar }: CarSearchResultsProps) => {
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
      <h2>Available Cars ({results.length})</h2>
      <div className="results-grid">
        {results.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-card-header">
              <h3>{car.brand} {car.model}</h3>
              <span className="car-year">{car.year}</span>
            </div>
            <div className="car-card-image">
              {/* Placeholder for car image */}
              <div className="car-image-placeholder">
                <span>{car.brand.charAt(0)}{car.model.charAt(0)}</span>
              </div>
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
                onClick={() => onBookCar(car.id)}
                disabled={car.status !== 'AVAILABLE'}
              >
                {car.status === 'AVAILABLE' ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSearchResults; 