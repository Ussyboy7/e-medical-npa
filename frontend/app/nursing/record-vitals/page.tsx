"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Thermometer,
  Heart,
  Wind,
  Ruler,
  Weight,
  Droplets,
  Save,
  AlertCircle,
} from "lucide-react";

/**
 * Type definition for a single vital sign entry.
 */
interface VitalSign {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  normalRange: string;
  required: boolean;
}

export default function VitalsForm() {
  // State for all vitals inputs
  const [vitals, setVitals] = useState<VitalSign[]>([
    {
      id: "bloodPressure",
      label: "Blood Pressure",
      value: "",
      unit: "mmHg",
      icon: <Heart className="h-4 w-4" />,
      normalRange: "120/80 - 140/90",
      required: true,
    },
    {
      id: "temperature",
      label: "Temperature",
      value: "",
      unit: "°C",
      icon: <Thermometer className="h-4 w-4" />,
      normalRange: "36.1 - 37.2",
      required: true,
    },
    {
      id: "pulse",
      label: "Pulse",
      value: "",
      unit: "bpm",
      icon: <Activity className="h-4 w-4" />,
      normalRange: "60 - 100",
      required: true,
    },
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      value: "",
      unit: "/min",
      icon: <Wind className="h-4 w-4" />,
      normalRange: "12 - 20",
      required: true,
    },
    {
      id: "height",
      label: "Height",
      value: "",
      unit: "cm",
      icon: <Ruler className="h-4 w-4" />,
      normalRange: "-",
      required: false,
    },
    {
      id: "weight",
      label: "Weight",
      value: "",
      unit: "kg",
      icon: <Weight className="h-4 w-4" />,
      normalRange: "-",
      required: false,
    },
    {
      id: "bloodSugar",
      label: "RBS/FBS",
      value: "",
      unit: "mg/dL",
      icon: <Droplets className="h-4 w-4" />,
      normalRange: "70 - 140",
      required: false,
    },
  ]);

  // Comments/notes input state
  const [comments, setComments] = useState("");

  // Example patient data (could be dynamic)
  const [patientInfo] = useState({
    name: "John Doe",
    id: "P001",
    age: 45,
    gender: "Male",
  });

  /**
   * Handles input changes for any vital sign.
   */
  const handleVitalChange = (id: string, value: string) => {
    setVitals((prev) =>
      prev.map((vital) => (vital.id === id ? { ...vital, value } : vital))
    );
  };

  /**
   * Checks if a vital sign value is out of its normal range.
   * (Placeholder for real validation logic.)
   */
  const isOutOfRange = (vital: VitalSign) => {
    if (!vital.value || vital.normalRange === "-") return false;
    return false; // Add custom logic if needed
  };

  /**
   * Handles form submission.
   */
  const handleSubmit = () => {
    console.log("Submitted vitals:", { vitals, comments });
    // Hook your backend API here
  };

  return (
    <div className="space-y-6 p-6 md:p-8">
      {/* --------------------------
          Patient Overview Card
       -------------------------- */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Patient Overview
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm font-semibold">{patientInfo.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Patient ID</p>
              <p className="text-sm font-semibold">{patientInfo.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="text-sm font-semibold">{patientInfo.age}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="text-sm font-semibold">{patientInfo.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --------------------------
          Vital Signs Recording Card
       -------------------------- */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Vital Signs Recording
          </CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* Vitals grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vitals.map((vital) => (
              <div key={vital.id} className="space-y-2">
                {/* Label and out-of-range badge */}
                <div className="flex items-center justify-between">
                  <Label className="flex items-center space-x-2">
                    {vital.icon}
                    <span>{vital.label}</span>
                    {vital.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </Label>
                  {isOutOfRange(vital) && (
                    <Badge variant="outline" className="text-destructive border-destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Out of range
                    </Badge>
                  )}
                </div>

                {/* Input */}
                <div className="flex items-center space-x-2">
                  <Input
                    value={vital.value}
                    onChange={(e) =>
                      handleVitalChange(vital.id, e.target.value)
                    }
                    placeholder={`Enter ${vital.label.toLowerCase()}`}
                    className={isOutOfRange(vital) ? "border-destructive" : ""}
                  />
                  <span className="text-sm text-muted-foreground min-w-fit">
                    {vital.unit}
                  </span>
                </div>

                {/* Normal range info */}
                <p className="text-xs text-muted-foreground">
                  Normal range: {vital.normalRange}
                </p>
              </div>
            ))}
          </div>

          {/* Comments input */}
          <div className="mt-6 space-y-2">
            <Label>Comments / Others</Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Additional observations..."
              className="min-h-[100px]"
            />
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={handleSubmit}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Vitals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}