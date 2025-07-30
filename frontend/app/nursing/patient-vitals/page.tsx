"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Activity, TrendingUp, TrendingDown } from "lucide-react";

/**
 * Sample vitals data.
 * This can be replaced with dynamic data from your backend.
 */
const vitals = [
  {
    id: "P001",
    patient: "John Doe",
    lastRecorded: "2024-01-15 14:30",
    bp: "120/80",
    pulse: "72",
    temp: "98.6°F",
    status: "Normal",
  },
  {
    id: "P002",
    patient: "Jane Smith",
    lastRecorded: "2024-01-15 13:45",
    bp: "140/90",
    pulse: "88",
    temp: "99.2°F",
    status: "Elevated",
  },
  {
    id: "P003",
    patient: "Robert Johnson",
    lastRecorded: "2024-01-15 12:15",
    bp: "110/70",
    pulse: "65",
    temp: "98.4°F",
    status: "Normal",
  },
];

/**
 * Get icon based on status.
 */
const getStatusIcon = (status: string) => {
  if (status === "Elevated")
    return <TrendingUp className="h-4 w-4 text-red-500" />;
  if (status === "Low")
    return <TrendingDown className="h-4 w-4 text-blue-500" />;
  return <Activity className="h-4 w-4 text-green-500" />;
};

/**
 * Get badge color class based on status.
 */
const getStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "bg-green-100 text-green-800";
    case "Elevated":
      return "bg-red-100 text-red-800";
    case "Low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * PatientVitals page
 * Matches the styling of Manage Patients.
 */
export default function PatientVitals() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ---------------------------
          Page Header
       --------------------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patient Vitals</h2>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          Record New Vitals
        </Button>
      </div>

      {/* ---------------------------
          Search + Filter Row
       --------------------------- */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* ---------------------------
          Vitals Cards Grid
       --------------------------- */}
      <div className="grid gap-4">
        {vitals.map((vital) => (
          <Card key={vital.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  {/* Patient name + status icon */}
                  <CardTitle className="text-lg flex items-center gap-2">
                    {vital.patient}
                    {getStatusIcon(vital.status)}
                  </CardTitle>
                  <CardDescription>
                    Patient ID: {vital.id} | Last recorded: {vital.lastRecorded}
                  </CardDescription>
                </div>

                {/* Status badge + actions */}
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(vital.status)}>
                    {vital.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                  <Button size="sm">Update</Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Vitals info grid */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">Blood Pressure</div>
                  <div className="text-muted-foreground">
                    {vital.bp} mmHg
                  </div>
                </div>
                <div>
                  <div className="font-medium">Pulse Rate</div>
                  <div className="text-muted-foreground">
                    {vital.pulse} bpm
                  </div>
                </div>
                <div>
                  <div className="font-medium">Temperature</div>
                  <div className="text-muted-foreground">{vital.temp}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}