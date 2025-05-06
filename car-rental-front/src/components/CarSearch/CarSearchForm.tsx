import { useState, useEffect } from 'react';
import type { CarSearchParameters, CarSearchSelectors } from '../../types/CarTypes';
import { getCarSearchSelectors } from '../../services/api';
import './CarSearchForm.css';

interface CarSearchFormProps {
  onSearch: (parameters: CarSearchParameters) => void;
}

const CarSearchForm = ({ onSearch }: CarSearchFormProps) => {
  const [selectors, setSelectors] = useState<CarSearchSelectors | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CarSearchParameters>({});

  useEffect(() => {
    const fetchSelectors = async () => {
      try {
        const data = await getCarSearchSelectors();
        setSelectors(data);
      } catch (error) {
        console.error('Error fetching selectors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? (value ? parseInt(value) : undefined) : value || undefined
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    setFormData({});
    onSearch({});
  };

  if (loading) {
    return <div className="loading">Loading search options...</div>;
  }

  if (!selectors) {
    return <div className="error">Failed to load search options</div>;
  }

  return (
    <div className="car-search-form-container">
      <h2>Find Your Perfect Car</h2>
      <form onSubmit={handleSubmit} className="car-search-form">
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <select 
            id="model" 
            name="model" 
            value={formData.model || ''} 
            onChange={handleChange}
          >
            <option value="">Any Model</option>
            {selectors.models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category || ''} 
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            {selectors.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transmissionType">Transmission</label>
          <select 
            id="transmissionType" 
            name="transmissionType" 
            value={formData.transmissionType || ''} 
            onChange={handleChange}
          >
            <option value="">Any Transmission</option>
            {selectors.transmissionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select 
            id="fuelType" 
            name="fuelType" 
            value={formData.fuelType || ''} 
            onChange={handleChange}
          >
            <option value="">Any Fuel Type</option>
            {selectors.fuelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <select 
            id="year" 
            name="year" 
            value={formData.year?.toString() || ''} 
            onChange={handleChange}
          >
            <option value="">Any Year</option>
            {Array.from(
              { length: selectors.maxYear - selectors.minYear + 1 },
              (_, i) => selectors.minYear + i
            ).map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <select 
            id="city" 
            name="city" 
            value={formData.city || ''} 
            onChange={handleChange}
          >
            <option value="">Any City</option>
            {selectors.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="search-btn">Search</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CarSearchForm; 