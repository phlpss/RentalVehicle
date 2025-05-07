// TypeScript interfaces for booking-related types

export interface BookingRequest {
  clientId: string;
  carId: string;
  rentalStart: string;
  rentalEnd: string;
  extraServiceIds?: string[];
}

export interface BookingResponse {
  bookingId: string;
  status: string;
  totalCost: number;
}

export interface AvailableDatesResponse {
  carId: string;
  availableDates: string[];
  earliestAvailableDate: string | null;
  latestAvailableDate: string | null;
}

export interface UserBooking {
  id: string;
  start: string;
  end: string;
  carBrand: string;
  model: string;
  location: string;
  status: string;
  inspectionDetails?: InspectionDetails;
}

export interface InspectionDetails {
  inspectionId: string;
  wearLevelPercentage: number;
  damagePenalty: number;
  cleaningFee: number;
  totalPenalty: number;
  notes?: string;
  damageReports: DamageReport[];
  status: string;
}

export interface DamageReport {
  id?: string;
  partAffected: string;
  description: string;
  estimatedRepairCost: number;
} 