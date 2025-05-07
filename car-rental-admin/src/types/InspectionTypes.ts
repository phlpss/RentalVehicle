export interface InspectionDetailsResponse {
  rentalId: string;
  carBrand: string;
  model: string;
  licensePlateNum: string;
  vin: string;
  clientName: string;
  clientContact: string;
  startDate: string;
  endDate: string;
  status: string;
  fullPrice: number;
  damageReports: DamageReport[];
}

export interface DamageReport {
  id?: string;
  partAffected: string;
  description: string;
  estimatedRepairCost: number;
}

export interface ReturnInspectionRequest {
  workerId: string;
  wearLevelPercentage: number;
  damagePenalty: number;
  cleaningFee: number;
  notes?: string;
  damageReports: DamageReport[];
}

export interface ReturnInspectionResponse {
  inspectionId: string;
  status: string;
  totalPenalty: number;
}

export interface CompletedInspection {
  inspectionId: string;
  rentalId: string;
  inspectionDate: string;
  carBrand: string;
  model: string;
  licensePlateNum: string;
  clientName: string;
  status: string;
  wearLevelPercentage: number;
  damagePenalty: number;
  cleaningFee: number;
  totalPenalty: number;
  notes?: string;
  damageReports: DamageReport[];
} 