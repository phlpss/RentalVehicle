// Types that match the backend DTOs

export interface CarSearchParameters {
  model?: string;
  category?: string;
  transmissionType?: string;
  fuelType?: string;
  year?: number;
  city?: string;
}

export interface CarSearchSelectors {
  models: string[];
  categories: string[];
  transmissionTypes: string[];
  fuelTypes: string[];
  cities: string[];
  minYear: number;
  maxYear: number;
}

export interface CarSearchResult {
  id: string;
  vin: string;
  licensePlateNum: string;
  color: string;
  status: string;
  mileage: string;
  fuelType: string;
  transmissionType: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  seatsNumber: number;
  dailyRentalCost: number;
  officeId: string;
} 