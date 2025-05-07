import {WorkerDashboardResponse} from "../types/WorkerTypes.ts";

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
          status: 'RESERVED',
          inspectionType: 'PICKUP'
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
          status: 'ACTIVE'
        }
      ],
      totalPendingInspections: 1,
      totalActiveRentals: 1
    };
  }
}; 