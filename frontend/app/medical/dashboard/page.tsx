// app/medical/dashboard/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";

// === Replace with your real data later ===
const mockPatients = [
  {
    id: "#80762",
    fullName: "Wendi Combs",
    personalNumber: "80762",
    employeeCategory: "Active",
    dependents: 1,
  },
  {
    id: "#82348",
    fullName: "Reba Fisher",
    personalNumber: "82348",
    employeeCategory: "Active",
    dependents: 1,
  },
  {
    id: "#82894",
    fullName: "Nick Morrow",
    personalNumber: "82894",
    employeeCategory: "Retired",
    dependents: 0,
  },
];

const recentVisits = [
  {
    id: "1",
    patientId: "#80762",
    visitDate: "2025-07-30",
    visitTime: "09:00 AM",
    clinic: "General Outpatient",
    category: "Employee",
    status: "Completed",
  },
  {
    id: "2",
    patientId: "#82348",
    visitDate: "2025-07-30",
    visitTime: "11:00 AM",
    clinic: "Dental",
    category: "Employee Dependent",
    status: "In Progress",
  },
  {
    id: "3",
    patientId: "#82894",
    visitDate: "2025-07-29",
    visitTime: "2:00 PM",
    clinic: "Eye Clinic",
    category: "Retiree",
    status: "Scheduled",
  },
];

export default function MedicalDashboard() {
  const totalPatients = mockPatients.length;

  const activePatients = mockPatients.filter(
    (p) => p.employeeCategory === "Active"
  ).length;

  const totalDependents = mockPatients.reduce(
    (sum, p) => sum + p.dependents,
    0
  );

  const todayISO = new Date().toISOString().split("T")[0];
  const todaysVisits = recentVisits.filter(
    (v) => v.visitDate === todayISO
  ).length;

  const recentVisitsSorted = [...recentVisits].sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Medical Dashboard 🎉
          </h1>
          <p className="text-muted-foreground">
            Here’s what’s happening today:
          </p>
        </div>
      </div>

      {/* === Metrics === */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Visits
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysVisits}</div>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Records
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePatients}</div>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Dependents
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDependents}</div>
          </CardContent>
        </Card>
      </div>

      {/* === Recent Visits === */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Visits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clinic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisitsSorted.map((visit) => {
                const patient = mockPatients.find(
                  (p) => p.id === visit.patientId
                );
                return (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {patient?.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient?.personalNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit.visitDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.visitTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.clinic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          visit.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : visit.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : visit.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {visit.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}