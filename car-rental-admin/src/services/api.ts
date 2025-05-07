import {WorkerDashboardResponse} from "../types/WorkerTypes.ts";
import {InspectionDetailsResponse, ReturnInspectionRequest, ReturnInspectionResponse, CompletedInspection} from "../types/InspectionTypes.ts";
import { Car } from "../types";

// Make sure this matches your backend URL exactly
const API_URL = 'http://localhost:8080';

export const getWorkerDashboard = async (workerId: string): Promise<WorkerDashboardResponse> => {
  try {
    // Simplest possible fetch without extra headers
    const response = await fetch(`${API_URL}/api/bookings/worker/${workerId}/dashboard`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch worker dashboard data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching worker dashboard:', error);
    // Return mock data as fallback
    return {
      pendingInspections: [
        {
          rentalId: 'mock-1',
          carBrand: 'Toyota',
          model: 'Corolla',
          licensePlateNum: 'ABC123',
          clientName: 'John Doe',
          clientContact: '123-456-7890',
          status: 'RETURNED',
          inspectionType: 'RETURN'
        }
      ],
      activeRentals: [
        {
          rentalId: 'mock-2',
          carBrand: 'Honda',
          model: 'Civic',
          licensePlateNum: 'XYZ789',
          clientName: 'Jane Smith',
          clientContact: '987-654-3210',
          startDate: '2023-06-01T10:00:00',
          endDate: '2023-06-08T10:00:00',
          status: 'PICKED_UP'
        }
      ],
      totalPendingInspections: 1,
      totalActiveRentals: 1
    };
  }
};

export const getInspectionDetails = async (rentalId: string): Promise<InspectionDetailsResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/bookings/inspection/${rentalId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch inspection details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching inspection details:', error);
    throw error;
  }
};

export const submitInspection = async (rentalId: string, data: ReturnInspectionRequest): Promise<ReturnInspectionResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/bookings/inspection/${rentalId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit inspection');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting inspection:', error);
    throw error;
  }
};

export const getCompletedInspections = async (workerId: string): Promise<CompletedInspection[]> => {
  try {
    const response = await fetch(`${API_URL}/api/bookings/worker/${workerId}/completed-inspections`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch completed inspections');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching completed inspections:', error);
    // Return empty array as fallback
    return [];
  }
};

// Admin functions

// Get All Offices
export const getOffices = async (): Promise<{ id: string, city: string, address: string }[]> => {
  try {
    const response = await fetch(`${API_URL}/api/offices`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch offices');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching offices:', error);
    return [];
  }
};

// Get Cars By Office
export const getCarsByOffice = async (officeId?: string): Promise<Car[]> => {
  try {
    const url = officeId 
      ? `${API_URL}/api/cars/office/${officeId}` 
      : `${API_URL}/api/cars`;
      
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

// Add New Car
export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  try {
    const response = await fetch(`${API_URL}/api/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add new car');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding new car:', error);
    throw error;
  }
}; 