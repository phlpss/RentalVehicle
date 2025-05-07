export interface WorkerDashboardResponse {
  pendingInspections: RentalInspection[];
  activeRentals: ActiveRental[];
  totalPendingInspections: number;
  totalActiveRentals: number;
}

export interface RentalInspection {
  rentalId: string;
  carBrand: string;
  model: string;
  licensePlateNum: string;
  clientName: string;
  clientContact: string;
  status: string;
  inspectionType: 'RETURN';
}

export interface ActiveRental {
  rentalId: string;
  carBrand: string;
  model: string;
  licensePlateNum: string;
  clientName: string;
  clientContact: string;
  startDate: string;
  endDate: string;
  status: string;
} 