import type { CarSearchParameters, CarSearchResult, CarSearchSelectors } from '../types/CarTypes';

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