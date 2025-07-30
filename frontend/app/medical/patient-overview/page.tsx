"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from "recharts";
import {
  Download,
  FileText,
  Calendar,
  User,
  Heart,
  Activity,
} from "lucide-react";

// Mock data for charts
const bpData = [
  { date: "2024-01-15", systolic: 120, diastolic: 80 },
  { date: "2024-02-10", systolic: 125, diastolic: 82 },
  { date: "2024-03-05", systolic: 118, diastolic: 78 },
  { date: "2024-03-20", systolic: 122, diastolic: 81 },
  { date: "2024-04-01", systolic: 119, diastolic: 79 },
];

const heartRateData = [
  { date: "2024-01-15", rate: 72 },
  { date: "2024-02-10", rate: 75 },
  { date: "2024-03-05", rate: 68 },
  { date: "2024-03-20", rate: 71 },
  { date: "2024-04-01", rate: 69 },
];

const sugarData = [
  { date: "2024-01-15", level: 95 },
  { date: "2024-02-10", level: 102 },
  { date: "2024-03-05", level: 88 },
  { date: "2024-03-20", level: 91 },
  { date: "2024-04-01", level: 93 },
];

const reports = [
  {
    fileNumber: "RPT-2024-001",
    reportName: "Blood Test Results",
    date: "2024-04-01",
    link: "#",
  },
  {
    fileNumber: "RPT-2024-002",
    reportName: "X-Ray Chest",
    date: "2024-03-20",
    link: "#",
  },
  {
    fileNumber: "RPT-2024-003",
    reportName: "ECG Report",
    date: "2024-03-05",
    link: "#",
  },
];

const timeline = [
  {
    date: "2024-04-01",
    time: "10:30 AM",
    activity: "Consultation with Dr. Smith",
    type: "consultation",
  },
  {
    date: "2024-03-28",
    time: "02:15 PM",
    activity: "Blood test completed",
    type: "lab",
  },
  {
    date: "2024-03-20",
    time: "11:00 AM",
    activity: "X-Ray examination",
    type: "radiology",
  },
  {
    date: "2024-03-15",
    time: "09:45 AM",
    activity: "Vital signs recorded",
    type: "nursing",
  },
];

export default function PatientOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patient Overview</h1>
      </div>

      {/* Patient Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="text-lg font-semibold">John Doe</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gender</p>
              <Badge variant="secondary">Male</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold">45 years</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Blood Group</p>
              <Badge variant="outline">O+</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vitals Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blood Pressure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Systolic"
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Diastolic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Recent Visits:</p>
              <ul className="pl-6 list-disc text-xs text-muted-foreground space-y-1">
                {bpData.map((visit, index) => (
                  <li key={index}>
                    {visit.date}: {visit.systolic}/{visit.diastolic} mmHg
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Heart Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="BPM"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Recent Visits:</p>
              <ul className="pl-6 list-disc text-xs text-muted-foreground space-y-1">
                {heartRateData.map((visit, index) => (
                  <li key={index}>
                    {visit.date}: {visit.rate} BPM
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Sugar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Blood Sugar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sugarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="mg/dL"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Recent Visits:</p>
              <ul className="pl-6 list-disc text-xs text-muted-foreground space-y-1">
                {sugarData.map((visit, index) => (
                  <li key={index}>
                    {visit.date}: {visit.level} mg/dL
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Visit + Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last Visit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Last Visit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Clinic</p>
                <p className="font-medium">General Medicine</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">April 1, 2024</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium">Dr. Sarah Smith</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visit Summary</p>
              <p className="text-sm mt-1">
                Patient presented with mild hypertension. Vital signs stable.
                BP slightly elevated but manageable. Lifestyle changes recommended.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{report.reportName}</p>
                  <p className="text-xs text-muted-foreground">
                    File: {report.fileNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {report.date}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-4"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Patient Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.activity}</p>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.date} at {item.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}