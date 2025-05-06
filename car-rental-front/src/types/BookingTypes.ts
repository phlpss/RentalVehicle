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