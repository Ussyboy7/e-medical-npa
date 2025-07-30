// ✅ TYPES
import { Visit } from '@/types/visit';
import { Dependent } from '@/types/dependent';
import { Patient } from '@/types/patient'; // if you have one!

// ✅ PATIENTS
export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    gender: 'Male',
    age: 34,
    employeeCategory: 'employee',
    isActive: true,
    medicalHistory: ['Hypertension', 'Diabetes'],
    allergies: ['Penicillin'],
    currentMedications: ['Metformin', 'Lisinopril']
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    gender: 'Female',
    age: 42,
    employeeCategory: 'employeeDependent',
    isActive: true,
    medicalHistory: ['Asthma'],
    allergies: [],
    currentMedications: ['Albuterol']
  },
  {
    id: 'P003',
    name: 'Mary Johnson',
    gender: 'Female',
    age: 29,
    employeeCategory: 'nonNPA',
    isActive: false,
    medicalHistory: [],
    allergies: ['Peanuts'],
    currentMedications: []
  }
];

// ✅ VISITS
export const mockVisits: Visit[] = [
  {
    id: 'V001',
    patientId: 'P001',
    visitType: 'Routine Check',
    status: 'Completed',
    diagnosis: 'Hypertension',
    symptoms: ['Headache', 'Fatigue'],
    prescriptions: [
      { medication: 'Amlodipine' },
      { medication: 'Lisinopril' }
    ],
    department: 'Cardiology',
    doctorId: 'DR001',
    doctorName: 'Dr. A'
  },
  {
    id: 'V002',
    patientId: 'P002',
    visitType: 'Emergency',
    status: 'Completed',
    diagnosis: 'Asthma Attack',
    symptoms: ['Shortness of Breath', 'Wheezing'],
    prescriptions: [
      { medication: 'Albuterol' }
    ],
    department: 'Pulmonology',
    doctorId: 'DR002',
    doctorName: 'Dr. B'
  },
  {
    id: 'V003',
    patientId: 'P001',
    visitType: 'Follow-up',
    status: 'Pending',
    diagnosis: 'Diabetes',
    symptoms: ['Fatigue'],
    prescriptions: [
      { medication: 'Metformin' }
    ],
    department: 'Endocrinology',
    doctorId: 'DR001',
    doctorName: 'Dr. A'
  }
];

// ✅ DEPENDENTS
export const mockDependents: Dependent[] = [
  {
    dependentId: 'D001',
    name: 'Tim Doe',
    age: 8,
    relationship: 'Son',
    employeeId: 'EMP001',
    employeeName: 'John Doe'
  },
  {
    dependentId: 'D002',
    name: 'Sara Smith',
    age: 5,
    relationship: 'Daughter',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith'
  },
  {
    dependentId: 'D003',
    name: 'Emily Johnson',
    age: 16,
    relationship: 'Daughter',
    employeeId: 'EMP003',
    employeeName: 'Mary Johnson'
  }
];

// ✅ EMPLOYEES (optional helper)
export const mockEmployees = [
  {
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    dependents: [
      { dependentId: 'D001', name: 'Tim Doe', age: 8, relationship: 'Son' }
    ]
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    dependents: [
      { dependentId: 'D002', name: 'Sara Smith', age: 5, relationship: 'Daughter' }
    ]
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Mary Johnson',
    dependents: [
      { dependentId: 'D003', name: 'Emily Johnson', age: 16, relationship: 'Daughter' }
    ]
  }
];

// ✅ PRESCRIPTIONS (optional separate list)
export const mockPrescriptions = [
  {
    prescriptionId: 'RX001',
    patientId: 'P001',
    doctorId: 'DR001',
    doctorName: 'Dr. A',
    medication: 'Metformin',
    department: 'Endocrinology'
  },
  {
    prescriptionId: 'RX002',
    patientId: 'P002',
    doctorId: 'DR002',
    doctorName: 'Dr. B',
    medication: 'Albuterol',
    department: 'Pulmonology'
  },
  {
    prescriptionId: 'RX003',
    patientId: 'P001',
    doctorId: 'DR001',
    doctorName: 'Dr. A',
    medication: 'Lisinopril',
    department: 'Cardiology'
  }
];

// ✅ DOCTORS (optional)
export const mockDoctors = [
  {
    doctorId: 'DR001',
    doctorName: 'Dr. A',
    department: 'Endocrinology',
    prescriptions: 5
  },
  {
    doctorId: 'DR002',
    doctorName: 'Dr. B',
    department: 'Pulmonology',
    prescriptions: 3
  },
  {
    doctorId: 'DR003',
    doctorName: 'Dr. C',
    department: 'Cardiology',
    prescriptions: 4
  }
];