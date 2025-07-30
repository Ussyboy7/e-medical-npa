// /types/visit.ts

export interface Visit {
  id: string;
  patientId: string;
  visitType: string;
  status: string;
  diagnosis: string;
  symptoms: string[];
  prescriptions: {
    medication: string;
  }[];
  department: string;
  doctorId: string;
  doctorName: string;
}