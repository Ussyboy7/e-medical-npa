// app/types/reports.ts

/**
 * Common report base type
 */
export interface ReportData {
  id: string;
  title: string;
  type: ReportType;
  dateGenerated: string;
  period: {
    startDate: string;
    endDate: string;
  };
  data: any; // Concrete type depends on the `type`
  generatedBy: string;
}

/**
 * Allowed report types
 */
export type ReportType =
  | 'observation'
  | 'monthly-summary'
  | 'patient-statistics'
  | 'visit-analysis'
  | 'dependent-report'
  | 'category-breakdown'
  | 'medical-conditions'
  | 'prescription-report';

/**
 * Observation Report example
 */
export interface ObservationReport {
  month: string;
  year: number;
  categories: {
    employee: number;
    employeeDependent: number;
    pensioner: number;
    pensionerDependent: number;
    nonNPA: number;
  };
  total: number;
}

/**
 * Monthly summary report
 */
export interface MonthlySummary {
  totalPatients: number;
  newRegistrations: number;
  totalVisits: number;
  emergencyVisits: number;
  routineCheckups: number;
  followUps: number;
  consultations: number;
  activePatients: number;
  inactivePatients: number;
}

/**
 * Patient statistics
 */
export interface PatientStatistics {
  byCategory: Record<string, number>;
  byGender: Record<string, number>;
  byAgeGroup: Record<string, number>;
  totalDependents: number;
  averageAge: number;
}

/**
 * Visit analysis
 */
export interface VisitAnalysis {
  totalVisits: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  commonDiagnoses: Array<{ diagnosis: string; count: number }>;
  commonSymptoms: Array<{ symptom: string; count: number }>;
  averageVisitsPerPatient: number;
}

/**
 * Medical conditions
 */
export interface MedicalConditionsReport {
  conditions: Array<{
    condition: string;
    patientCount: number;
    percentage: number;
    byCategory: Record<string, number>;
  }>;
  allergies: Array<{
    allergy: string;
    patientCount: number;
    percentage: number;
  }>;
  medications: Array<{
    medication: string;
    patientCount: number;
    frequency: number;
  }>;
}

/**
 * ✅ NEW: Dependent Report
 */
export interface DependentReport {
  totalDependents: number;
  byAgeGroup: Record<string, number>;
  byEmployee: Array<{
    employeeId: string;
    employeeName: string;
    dependents: Array<{
      dependentId: string;
      name: string;
      age: number;
      relationship: string;
    }>;
  }>;
}

/**
 * ✅ NEW: Prescription Report
 */
export interface PrescriptionReport {
  totalPrescriptions: number;
  byMedication: Array<{
    medication: string;
    prescriptionCount: number;
    patientCount: number;
  }>;
  byDepartment: Record<string, number>;
  topPrescribers: Array<{
    doctorId: string;
    doctorName: string;
    prescriptions: number;
  }>;
}