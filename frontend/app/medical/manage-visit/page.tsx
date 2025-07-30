"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, Edit, Calendar } from "lucide-react";

import { Visit, Patient } from "@/types/medical";

// ✅ Add clinic to Visit structure for local mock
type ExtendedVisit = Visit & {
  clinic: "General" | "Eye" | "Physiotherapy" | "Sickle Cell" | "Diamond";
};

const patientsMock: Patient[] = [
  {
    id: "P001",
    fullName: "John Doe",
    personalNumber: "12345",
    age: 30,
    gender: "Male",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    address: "123 Main Street",
    isActive: true,
    employeeCategory: "Employee",
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    emergencyContact: { name: "", relationship: "", phoneNumber: "" },
  },
  {
    id: "P002",
    fullName: "Jane Smith",
    personalNumber: "67890",
    age: 55,
    gender: "Female",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    address: "456 Oak Avenue",
    isActive: true,
    employeeCategory: "Retired",
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    emergencyContact: { name: "", relationship: "", phoneNumber: "" },
  },
];

const visitsMock: ExtendedVisit[] = [
  {
    id: "V001",
    patientId: "P001",
    patientPersonalNumber: "12345",
    visitDate: "2025-07-30",
    visitTime: "10:00",
    visitType: "Consultation",
    chiefComplaint: "N/A",
    symptoms: [],
    diagnosis: "",
    treatment: "",
    prescription: [],
    notes: "",
    doctorName: "Dr. House",
    status: "Scheduled",
    clinic: "General",
  },
  {
    id: "V002",
    patientId: "P002",
    patientPersonalNumber: "67890",
    visitDate: "2025-07-30",
    visitTime: "14:00",
    visitType: "Follow-up",
    chiefComplaint: "N/A",
    symptoms: [],
    diagnosis: "",
    treatment: "",
    prescription: [],
    notes: "",
    doctorName: "Dr. Grey",
    status: "Scheduled",
    clinic: "Eye",
  },
];

const getPatient = (id: string) => patientsMock.find((p) => p.id === id);

export default function ManageVisit() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* ✅ Page header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Visits</h2>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          New Visit
        </Button>
      </div>

      {/* ✅ Search bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search visits..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* ✅ Visit list */}
      <div className="grid gap-4">
        {visitsMock.map((visit) => {
          const patient = getPatient(visit.patientId);
          return (
            <Card key={visit.id} className="border p-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {patient?.fullName || "Unknown"}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      Visit ID: {visit.id} | Visit Type: {visit.visitType} | Age:{" "}
                      {patient?.age} | {patient?.employeeCategory} |{" "}
                      {visit.visitDate} at {visit.visitTime}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-1 text-sm text-muted-foreground">
                <strong>Attending Clinic:</strong> {visit.clinic}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}