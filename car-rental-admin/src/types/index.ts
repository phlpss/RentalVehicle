export type UserRole = 'WORKER' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  status: string;
  licensePlateNum: string;
  vin: string;
  color: string;
  mileage: string;
  fuelType: string;
  transmissionType: string;
  category: string;
  seatsNumber: number;
  dailyRentalCost: number;
  officeId: string;
}

export interface Rental {
  id: string;
  rentalDate: string;
  rentalStart: string;
  rentalEnd: string;
  status: string;
  fullPrice: number;
  client: {
    id: string;
    fullName: string;
    email: string;
    contactNumber: string;
  };
  car: Car;
  worker?: {
    id: string;
    username: string;
  };
} 