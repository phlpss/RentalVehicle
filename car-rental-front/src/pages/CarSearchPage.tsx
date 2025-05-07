import { useState, useCallback } from 'react';
import CarSearchForm from '../components/CarSearch/CarSearchForm';
import CarSearchResults from '../components/CarSearch/CarSearchResults';
import { searchCars } from '../services/api';
import type { CarSearchParameters, CarSearchResult } from '../types/CarTypes';
import './CarSearchPage.css';

const CarSearchPage = () => {
  const [searchResults, setSearchResults] = useState<CarSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = useCallback(async (parameters: CarSearchParameters) => {
    setLoading(true);
    try {
      const results = await searchCars(parameters);
      setSearchResults(results);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBookCar = useCallback((carId: string) => {
    // This will be implemented later for booking functionality
    console.log(`Booking car with ID: ${carId}`);
    alert(`Booking feature coming soon! Selected car ID: ${carId}`);
  }, []);

  return (
    <div className="car-search-page">
      <div className="page-header">
        <h1>Find and Book Your Ideal Car</h1>
        <p>Select your preferences and find the perfect car for your needs</p>
      </div>
      
      <div className="page-content">
        <CarSearchForm onSearch={handleSearch} />
        
        {searchPerformed && (
          <CarSearchResults 
            results={searchResults} 
            loading={loading} 
            onBookCar={handleBookCar} 
          />
        )}
      </div>
    </div>
  );
};

export default CarSearchPage; 