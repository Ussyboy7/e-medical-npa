// ✅ app/data/reportData.ts

import {
  ReportData,
  ObservationReport,
  MonthlySummary,
  PatientStatistics,
  VisitAnalysis,
  MedicalConditionsReport,
  DependentReport,
  PrescriptionReport
} from '@/types/reports';

import {
  mockPatients,
  mockVisits,
  mockDependents,
  mockEmployees,
  mockPrescriptions
} from '@/data/mockdata';

/**
 * 📌 Generate Observation Report
 */
export const generateObservationReport = (month: string, year: number): ObservationReport => {
  const categories = {
    employee: Math.floor(Math.random() * 10) + 5,
    employeeDependent: Math.floor(Math.random() * 8) + 3,
    pensioner: Math.floor(Math.random() * 8) + 5,
    pensionerDependent: Math.floor(Math.random() * 6) + 2,
    nonNPA: Math.floor(Math.random() * 5) + 3,
  };

  return {
    month,
    year,
    categories,
    total: Object.values(categories).reduce((sum, count) => sum + count, 0),
  };
};

/**
 * 📌 Generate Monthly Summary
 */
export const generateMonthlySummary = (): MonthlySummary => ({
  totalPatients: mockPatients.length,
  newRegistrations: Math.floor(Math.random() * 15) + 5,
  totalVisits: mockVisits.length,
  emergencyVisits: mockVisits.filter((v) => v.visitType === 'Emergency').length,
  routineCheckups: mockVisits.filter((v) => v.visitType === 'Routine Check').length,
  followUps: mockVisits.filter((v) => v.visitType === 'Follow-up').length,
  consultations: mockVisits.filter((v) => v.visitType === 'Consultation').length,
  activePatients: mockPatients.filter((p) => p.isActive).length,
  inactivePatients: mockPatients.filter((p) => !p.isActive).length,
});

/**
 * 📌 Generate Patient Statistics
 */
export const generatePatientStatistics = (): PatientStatistics => {
  const byCategory: Record<string, number> = {};
  const byGender: Record<string, number> = {};
  const byAgeGroup: Record<string, number> = {
    '0-18': 0,
    '19-35': 0,
    '36-50': 0,
    '51-65': 0,
    '65+': 0,
  };

  mockPatients.forEach((patient) => {
    byCategory[patient.employeeCategory] = (byCategory[patient.employeeCategory] || 0) + 1;
    byGender[patient.gender] = (byGender[patient.gender] || 0) + 1;

    if (patient.age <= 18) byAgeGroup['0-18']++;
    else if (patient.age <= 35) byAgeGroup['19-35']++;
    else if (patient.age <= 50) byAgeGroup['36-50']++;
    else if (patient.age <= 65) byAgeGroup['51-65']++;
    else byAgeGroup['65+']++;
  });

  const totalAge = mockPatients.reduce((sum, p) => sum + p.age, 0);
  const averageAge = Math.round(totalAge / mockPatients.length);

  return {
    byCategory,
    byGender,
    byAgeGroup,
    totalDependents: mockDependents.length,
    averageAge,
  };
};

/**
 * 📌 Generate Visit Analysis
 */
export const generateVisitAnalysis = (): VisitAnalysis => {
  const byType: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  const diagnosisCount: Record<string, number> = {};
  const symptomCount: Record<string, number> = {};

  mockVisits.forEach((visit) => {
    byType[visit.visitType] = (byType[visit.visitType] || 0) + 1;
    byStatus[visit.status] = (byStatus[visit.status] || 0) + 1;

    if (visit.diagnosis) {
      diagnosisCount[visit.diagnosis] = (diagnosisCount[visit.diagnosis] || 0) + 1;
    }

    visit.symptoms.forEach((symptom) => {
      symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
    });
  });

  const commonDiagnoses = Object.entries(diagnosisCount)
    .map(([diagnosis, count]) => ({ diagnosis, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const commonSymptoms = Object.entries(symptomCount)
    .map(([symptom, count]) => ({ symptom, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const averageVisitsPerPatient = Math.round((mockVisits.length / mockPatients.length) * 10) / 10;

  return {
    totalVisits: mockVisits.length,
    byType,
    byStatus,
    commonDiagnoses,
    commonSymptoms,
    averageVisitsPerPatient,
  };
};

/**
 * 📌 Generate Medical Conditions Report
 */
export const generateMedicalConditionsReport = (): MedicalConditionsReport => {
  const conditionCount: Record<string, { count: number; byCategory: Record<string, number> }> = {};
  const allergyCount: Record<string, number> = {};
  const medicationCount: Record<string, number> = {};

  mockPatients.forEach((patient) => {
    patient.medicalHistory.forEach((condition) => {
      if (!conditionCount[condition]) {
        conditionCount[condition] = { count: 0, byCategory: {} };
      }
      conditionCount[condition].count++;
      conditionCount[condition].byCategory[patient.employeeCategory] =
        (conditionCount[condition].byCategory[patient.employeeCategory] || 0) + 1;
    });

    patient.allergies.forEach((allergy) => {
      allergyCount[allergy] = (allergyCount[allergy] || 0) + 1;
    });

    patient.currentMedications.forEach((medication) => {
      medicationCount[medication] = (medicationCount[medication] || 0) + 1;
    });
  });

  const conditions = Object.entries(conditionCount)
    .map(([condition, data]) => ({
      condition,
      patientCount: data.count,
      percentage: Math.round((data.count / mockPatients.length) * 100),
      byCategory: data.byCategory,
    }))
    .sort((a, b) => b.patientCount - a.patientCount);

  const allergies = Object.entries(allergyCount)
    .map(([allergy, count]) => ({
      allergy,
      patientCount: count,
      percentage: Math.round((count / mockPatients.length) * 100),
    }))
    .sort((a, b) => b.patientCount - a.patientCount);

  const medications = Object.entries(medicationCount)
    .map(([medication, count]) => ({
      medication,
      patientCount: count,
      frequency: Math.round((count / mockPatients.length) * 100),
    }))
    .sort((a, b) => b.patientCount - a.patientCount);

  return {
    conditions,
    allergies,
    medications,
  };
};

/**
 * 📌 Generate Dependent Report
 */
export const generateDependentReport = (): DependentReport => {
  const byAgeGroup: Record<string, number> = {
    '0-5': 0,
    '6-12': 0,
    '13-18': 0,
    '19-25': 0,
    '26+': 0,
  };

  mockDependents.forEach((dep) => {
    if (dep.age <= 5) byAgeGroup['0-5']++;
    else if (dep.age <= 12) byAgeGroup['6-12']++;
    else if (dep.age <= 18) byAgeGroup['13-18']++;
    else if (dep.age <= 25) byAgeGroup['19-25']++;
    else byAgeGroup['26+']++;
  });

  const byEmployeeMap: Record<string, any> = {};
  mockDependents.forEach((dep) => {
    if (!byEmployeeMap[dep.employeeId]) {
      byEmployeeMap[dep.employeeId] = {
        employeeId: dep.employeeId,
        employeeName: dep.employeeName,
        dependents: [],
      };
    }
    byEmployeeMap[dep.employeeId].dependents.push({
      dependentId: dep.id,
      name: dep.name,
      age: dep.age,
      relationship: dep.relationship,
    });
  });

  return {
    totalDependents: mockDependents.length,
    byAgeGroup,
    byEmployee: Object.values(byEmployeeMap),
  };
};

/**
 * 📌 Generate Prescription Report
 */
export const generatePrescriptionReport = (): PrescriptionReport => {
  const byMedication: Record<string, { prescriptionCount: number; patientSet: Set<string> }> = {};
  const byDepartment: Record<string, number> = {};
  const prescriberCount: Record<string, { doctorName: string; prescriptions: number }> = {};

  mockVisits.forEach((visit) => {
    visit.prescriptions.forEach((pres) => {
      if (!byMedication[pres.medication]) {
        byMedication[pres.medication] = { prescriptionCount: 0, patientSet: new Set() };
      }
      byMedication[pres.medication].prescriptionCount++;
      byMedication[pres.medication].patientSet.add(visit.patientId);
    });

    byDepartment[visit.department] = (byDepartment[visit.department] || 0) + visit.prescriptions.length;

    if (!prescriberCount[visit.doctorId]) {
      prescriberCount[visit.doctorId] = { doctorName: visit.doctorName, prescriptions: 0 };
    }
    prescriberCount[visit.doctorId].prescriptions += visit.prescriptions.length;
  });

  return {
    totalPrescriptions: mockVisits.reduce((acc, v) => acc + v.prescriptions.length, 0),
    byMedication: Object.entries(byMedication).map(([medication, data]) => ({
      medication,
      prescriptionCount: data.prescriptionCount,
      patientCount: data.patientSet.size,
    })),
    byDepartment,
    topPrescribers: Object.entries(prescriberCount)
      .map(([doctorId, data]) => ({
        doctorId,
        doctorName: data.doctorName,
        prescriptions: data.prescriptions,
      }))
      .sort((a, b) => b.prescriptions - a.prescriptions)
      .slice(0, 5),
  };
};

/**
 * 📌 Sample Reports Array
 */
export const sampleReports: ReportData[] = [
  {
    id: '1',
    title: 'Patients Placed on Observation - December 2024',
    type: 'observation',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-12-01', endDate: '2024-12-31' },
    data: generateObservationReport('December', 2024),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '2',
    title: 'Monthly Summary - December 2024',
    type: 'monthly-summary',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-12-01', endDate: '2024-12-31' },
    data: generateMonthlySummary(),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '3',
    title: 'Patient Demographics',
    type: 'patient-statistics',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-01-01', endDate: '2024-12-31' },
    data: generatePatientStatistics(),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '4',
    title: 'Visit Analysis Q4 2024',
    type: 'visit-analysis',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-10-01', endDate: '2024-12-31' },
    data: generateVisitAnalysis(),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '5',
    title: 'Medical Conditions Overview',
    type: 'medical-conditions',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-01-01', endDate: '2024-12-31' },
    data: generateMedicalConditionsReport(),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '6',
    title: 'Dependent Report 2024',
    type: 'dependent-report',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-01-01', endDate: '2024-12-31' },
    data: generateDependentReport(),
    generatedBy: 'Dr. Admin',
  },
  {
    id: '7',
    title: 'Prescription Report 2024',
    type: 'prescription-report',
    dateGenerated: '2024-12-15',
    period: { startDate: '2024-01-01', endDate: '2024-12-31' },
    data: generatePrescriptionReport(),
    generatedBy: 'Dr. Admin',
  },
];