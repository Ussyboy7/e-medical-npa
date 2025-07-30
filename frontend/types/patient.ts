// /types/patient.ts
export interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  employeeCategory: string;
  isActive: boolean;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
}