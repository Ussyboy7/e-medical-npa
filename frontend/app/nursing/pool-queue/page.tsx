"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight } from "lucide-react";

/**
 * Example nursing pool queue data.
 * Replace with your dynamic data from the backend.
 */
const queue = [
  {
    id: "Q001",
    patient: "John Doe",
    priority: "High",
    waitTime: "15 min",
    reason: "Vital signs check",
    assignedTo: "Unassigned",
  },
  {
    id: "Q002",
    patient: "Jane Smith",
    priority: "Medium",
    waitTime: "8 min",
    reason: "Medication administration",
    assignedTo: "Nurse Mary",
  },
  {
    id: "Q003",
    patient: "Robert Johnson",
    priority: "Low",
    waitTime: "22 min",
    reason: "Wound dressing",
    assignedTo: "Unassigned",
  },
  {
    id: "Q004",
    patient: "Sarah Wilson",
    priority: "High",
    waitTime: "5 min",
    reason: "Post-op monitoring",
    assignedTo: "Nurse John",
  },
];

/**
 * Get tailwind color classes for priority.
 */
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * NursingPoolQueue page.
 * Styled to match Manage Patients.
 */
export default function NursingPoolQueue() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ---------------------------------
          Page Header
      --------------------------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nursing Pool Queue</h2>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Add to Queue
        </Button>
      </div>

      {/* ---------------------------------
          Summary Metrics
      --------------------------------- */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total in Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total in Queue</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queue.length}</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>

        {/* Average Wait */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Wait</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 min</div>
            <p className="text-xs text-muted-foreground">Across all priorities</p>
          </CardContent>
        </Card>

        {/* Assigned Cases */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              {queue.filter((q) => q.assignedTo === "Unassigned").length} unassigned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ---------------------------------
          Pool Queue List
      --------------------------------- */}
      <div className="grid gap-4">
        {queue.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                {/* Patient name + details */}
                <div>
                  <CardTitle className="text-lg">{item.patient}</CardTitle>
                  <CardDescription>
                    Queue ID: {item.id} | Reason: {item.reason}
                  </CardDescription>
                </div>

                {/* Priority badge + wait time */}
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.waitTime}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Assigned nurse + actions */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">Assigned to:</span>{" "}
                  {item.assignedTo}
                </div>
                <div className="flex space-x-2">
                  {item.assignedTo === "Unassigned" && (
                    <Button size="sm">Assign to Me</Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Complete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}