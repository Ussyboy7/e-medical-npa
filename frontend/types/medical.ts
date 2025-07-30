export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface Patient {
  id: string;
  fullName: string;
  personalNumber: string;
  age: number;
  gender: string; // or union: "Male" | "Female" | "Other"
  employeeCategory: string;
  phoneNumber: string;
  email: string;
  address: string;
  isActive: boolean;
  isGuest?: boolean;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  emergencyContact: EmergencyContact;
}
export interface Patientmock extends Patient {
  isGuest?: boolean; // Optional for mock data
}

export interface Visit {
  id: string;
  patientId: string;
  patientPersonalNumber: string;
  visitDate: string;
  visitTime: string;
  visitType: "Consultation" | "Follow-up" | "Emergency" | "Routine Check";
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  prescription: string[];
  notes: string;
  doctorName: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}