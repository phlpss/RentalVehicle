import { useState, useEffect } from 'react';
import { useUser } from '../App';
import { getOffices, getCarsByOffice, addCar, updateCarStatus } from '../services/api';
import { Car } from '../types';
import './CarManagement.css';

interface Office {
  id: string;
  city: string;
  address: string;
}

interface NewCar extends Omit<Car, 'id'> {
  id?: string;
}

const CarManagement = () => {
  const { user } = useUser();
  const [offices, setOffices] = useState<Office[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New car form
  const [showForm, setShowForm] = useState(false);
  const [newCar, setNewCar] = useState<NewCar>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    status: 'AVAILABLE',
    licensePlateNum: '',
    vin: '',
    color: '',
    mileage: '0',
    fuelType: 'GASOLINE',
    transmissionType: 'AUTOMATIC',
    category: 'SEDAN',
    seatsNumber: 5,
    dailyRentalCost: 0,
    officeId: ''
  });
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  
  useEffect(() => {
    fetchOffices();
  }, []);
  
  useEffect(() => {
    if (selectedOffice) {
      fetchCars();
    } else if (offices.length > 0) {
      // Select first office by default
      setSelectedOffice(offices[0].id);
    }
  }, [selectedOffice, offices]);
  
  const fetchOffices = async () => {
    try {
      setLoading(true);
      const data = await getOffices();
      setOffices(data);
    } catch (err) {
      setError('Failed to load offices. Please try again later.');
      console.error('Error fetching offices:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getCarsByOffice(selectedOffice);
      setCars(data);
    } catch (err) {
      setError('Failed to load cars. Please try again later.');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffice(e.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert number inputs to numbers
    if (type === 'number') {
      setNewCar({
        ...newCar,
        [name]: name === 'year' || name === 'seatsNumber' ? parseInt(value) : parseFloat(value)
      });
    } else {
      setNewCar({
        ...newCar,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the office ID to the selected office
    const carToAdd = {
      ...newCar,
      officeId: selectedOffice
    };
    
    try {
      setLoading(true);
      await addCar(carToAdd);
      
      // Reset form and fetch updated cars
      setNewCar({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        status: 'AVAILABLE',
        licensePlateNum: '',
        vin: '',
        color: '',
        mileage: '0',
        fuelType: 'GASOLINE',
        transmissionType: 'AUTOMATIC',
        category: 'SEDAN',
        seatsNumber: 5,
        dailyRentalCost: 0,
        officeId: selectedOffice
      });
      setShowForm(false);
      fetchCars();
    } catch (err) {
      setError('Failed to add new car. Please try again.');
      console.error('Error adding car:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async () => {
    if (!selectedCar || !newStatus) return;
    
    try {
      setStatusUpdateLoading(true);
      await updateCarStatus(selectedCar.id, newStatus);
      
      // Refresh the car list to show updated status
      fetchCars();
      setShowStatusModal(false);
      setSelectedCar(null);
    } catch (err) {
      setError('Failed to update car status. Please try again.');
      console.error('Error updating car status:', err);
    } finally {
      setStatusUpdateLoading(false);
    }
  };
  
  const openStatusModal = (car: Car) => {
    setSelectedCar(car);
    setNewStatus(car.status);
    setShowStatusModal(true);
  };
  
  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedCar(null);
  };
  
  const getOfficeNameById = (id: string) => {
    const office = offices.find(o => o.id === id);
    return office ? `${office.city} (${office.address})` : 'Unknown Office';
  };
  
  if (user.role !== 'ADMIN') {
    return (
      <div className="car-management">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }
  
  return (
    <div className="car-management">
      <div className="page-header">
        <h1>Car Management</h1>
        <button 
          className="button add-car-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Car'}
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
          <button className="dismiss-button" onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      <div className="office-filter">
        <label htmlFor="office-select">Filter by Office:</label>
        <select 
          id="office-select" 
          value={selectedOffice} 
          onChange={handleOfficeChange}
          disabled={loading || offices.length === 0}
        >
          {offices.map(office => (
            <option key={office.id} value={office.id}>
              {office.city} - {office.address}
            </option>
          ))}
        </select>
      </div>
      
      {showForm && (
        <div className="add-car-form-container">
          <h2>Add New Car</h2>
          <form onSubmit={handleSubmit} className="add-car-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand*</label>
                <input 
                  type="text" 
                  id="brand" 
                  name="brand" 
                  value={newCar.brand} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model*</label>
                <input 
                  type="text" 
                  id="model" 
                  name="model" 
                  value={newCar.model} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year*</label>
                <input 
                  type="number" 
                  id="year" 
                  name="year" 
                  value={newCar.year} 
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="licensePlateNum">License Plate*</label>
                <input 
                  type="text" 
                  id="licensePlateNum" 
                  name="licensePlateNum" 
                  value={newCar.licensePlateNum} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vin">VIN*</label>
                <input 
                  type="text" 
                  id="vin" 
                  name="vin" 
                  value={newCar.vin} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color*</label>
                <input 
                  type="text" 
                  id="color" 
                  name="color" 
                  value={newCar.color} 
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mileage">Mileage*</label>
                <input 
                  type="text" 
                  id="mileage" 
                  name="mileage" 
                  value={newCar.mileage} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type*</label>
                <select 
                  id="fuelType" 
                  name="fuelType" 
                  value={newCar.fuelType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="GASOLINE">Gasoline</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="ELECTRIC">Electric</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="transmissionType">Transmission*</label>
                <select 
                  id="transmissionType" 
                  name="transmissionType" 
                  value={newCar.transmissionType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL">Manual</option>
                  <option value="SEMI_AUTOMATIC">Semi-Automatic</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select 
                  id="category" 
                  name="category" 
                  value={newCar.category} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="SEDAN">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="COUPE">Coupe</option>
                  <option value="HATCHBACK">Hatchback</option>
                  <option value="WAGON">Wagon</option>
                  <option value="CONVERTIBLE">Convertible</option>
                  <option value="MINIVAN">Minivan</option>
                  <option value="PICKUP">Pickup</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="seatsNumber">Number of Seats*</label>
                <input 
                  type="number" 
                  id="seatsNumber" 
                  name="seatsNumber" 
                  value={newCar.seatsNumber} 
                  min="1"
                  max="12"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dailyRentalCost">Daily Rental Cost ($)*</label>
                <input 
                  type="number" 
                  id="dailyRentalCost" 
                  name="dailyRentalCost" 
                  value={newCar.dailyRentalCost} 
                  min="0"
                  step="0.01"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="button cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="button submit-button"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Car'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          {cars.length === 0 ? (
            <div className="no-cars-message">
              <p>No cars found for this office. Add a new car to get started.</p>
            </div>
          ) : (
            <div className="cars-table-container">
              <table className="cars-table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>License Plate</th>
                    <th>Status</th>
                    <th>Seats</th>
                    <th>Daily Cost</th>
                    <th>Office</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(car => (
                    <tr key={car.id}>
                      <td>{car.brand}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.licensePlateNum}</td>
                      <td>
                        <span className={`status-badge status-${car.status?.toLowerCase()}`}>
                          {car.status}
                        </span>
                      </td>
                      <td>{car.seatsNumber}</td>
                      <td>${car.dailyRentalCost.toFixed(2)}</td>
                      <td>{getOfficeNameById(car.officeId)}</td>
                      <td>
                        <button 
                          className="button action-button"
                          onClick={() => openStatusModal(car)}
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      
      {/* Status Update Modal */}
      {showStatusModal && selectedCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Car Status</h2>
            <p>
              <strong>Car:</strong> {selectedCar.brand} {selectedCar.model} ({selectedCar.licensePlateNum})
            </p>
            <p>
              <strong>Current Status:</strong> {selectedCar.status}
            </p>
            
            <div className="form-group">
              <label htmlFor="newStatus">New Status</label>
              <select 
                id="newStatus" 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
                disabled={statusUpdateLoading}
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NEEDS_REPAIR">NEEDS_REPAIR</option>
                <option value="IN_REPAIR">IN_REPAIR</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                className="button cancel-button"
                onClick={closeStatusModal}
                disabled={statusUpdateLoading}
              >
                Cancel
              </button>
              <button 
                className="button submit-button"
                onClick={handleStatusChange}
                disabled={statusUpdateLoading || newStatus === selectedCar.status}
              >
                {statusUpdateLoading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement; 