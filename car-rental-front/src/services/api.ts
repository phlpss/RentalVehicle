import type { CarSearchParameters, CarSearchResult, CarSearchSelectors } from '../types/CarTypes';
import type { BookingRequest, BookingResponse, AvailableDatesResponse } from '../types/BookingTypes';

const API_URL = 'http://localhost:8080/api';

// Get car search selectors for dropdowns
export const getCarSearchSelectors = async (): Promise<CarSearchSelectors> => {
  try {
    const response = await fetch(`${API_URL}/cars/search/selectors`);
    if (!response.ok) {
      throw new Error('Failed to fetch car search selectors');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching car search selectors:', error);
    // Return default empty selectors
    return {
      models: [],
      categories: [],
      transmissionTypes: [],
      fuelTypes: [],
      cities: [],
      minYear: 0,
      maxYear: 0
    };
  }
};

// Search cars based on parameters
export const searchCars = async (parameters: CarSearchParameters): Promise<CarSearchResult[]> => {
  try {
    const response = await fetch(`${API_URL}/cars/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
    
    if (!response.ok) {
      throw new Error('Failed to search cars');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching cars:', error);
    return [];
  }
};

// Get car details by ID
export const getCarDetails = async (carId: string): Promise<CarSearchResult> => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch car details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};

// Get available dates for booking a car
export const getAvailableDates = async (carId: string): Promise<AvailableDatesResponse> => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}/available-dates`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch available dates');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingRequest: BookingRequest): Promise<BookingResponse> => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to create booking');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}; 