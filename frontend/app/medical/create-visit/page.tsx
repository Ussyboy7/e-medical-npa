"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Patient, Visit } from "@/types/medical";

// 👉 Replace with your actual patients data later!
const patientsMock: Patient[] = [
  {
    id: "P001",
    fullName: "John Doe",
    personalNumber: "12345",
    age: 35,
    gender: "Male",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    address: "123 Main Street",
    isActive: true,
    employeeCategory: "Employee",
    medicalHistory: ["Hypertension"],
    allergies: ["Peanuts"],
    currentMedications: ["Lisinopril"],
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Wife",
      phoneNumber: "123-555-7890",
    },
  },
  {
    id: "P002",
    fullName: "Jane Smith",
    personalNumber: "67890",
    age: 28,
    gender: "Female",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    address: "456 Oak Avenue",
    isActive: true,
    employeeCategory: "Dependent",
    medicalHistory: ["Asthma"],
    allergies: ["Penicillin"],
    currentMedications: ["Inhaler"],
    emergencyContact: {
      name: "John Smith",
      relationship: "Brother",
      phoneNumber: "987-555-3210",
    },
  },
];

export default function CreateVisitPage() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [visitForm, setVisitForm] = useState({
    visitDate: "",
    visitTime: "",
    visitType: "Consultation",
    clinic: "",
  });

  const [visits, setVisits] = useState<Visit[]>([]);
  const [search, setSearch] = useState("");

  const handleAddVisit = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const newVisit: Visit = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      patientPersonalNumber: selectedPatient.personalNumber,
      visitDate: visitForm.visitDate,
      visitTime: visitForm.visitTime,
      visitType: visitForm.visitType as Visit["visitType"],
      chiefComplaint: "",
      symptoms: [],
      diagnosis: "",
      treatment: "",
      prescription: [],
      notes: "",
      doctorName: "",
      status: "Scheduled",
    };

    setVisits((prev) => [...prev, newVisit]);
    setSelectedPatient(null);
    setVisitForm({
      visitDate: "",
      visitTime: "",
      visitType: "Consultation",
      clinic: "",
    });
    setActiveTab("list");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visit Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            Create Visit
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded ${
              activeTab === "list"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            Visit List
          </button>
        </div>
      </div>

      {/* Create Visit: Show patient list */}
      {activeTab === "create" && !selectedPatient && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Select a Patient</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="bg-white border rounded overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Personal #</th>
                  <th className="text-left px-4 py-2">Age</th>
                  <th className="text-left px-4 py-2">Gender</th>
                  <th className="text-left px-4 py-2">Category</th>
                  <th className="text-left px-4 py-2">Phone</th>
                  <th className="text-left px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {patientsMock
                  .filter(
                    (p) =>
                      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
                      p.personalNumber.includes(search)
                  )
                  .map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{p.fullName}</td>
                      <td className="px-4 py-2">{p.personalNumber}</td>
                      <td className="px-4 py-2">{p.age}</td>
                      <td className="px-4 py-2">{p.gender}</td>
                      <td className="px-4 py-2">{p.employeeCategory}</td>
                      <td className="px-4 py-2">{p.phoneNumber}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleAddVisit(p)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                        >
                          Add Visit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Visit: Show form for selected patient */}
      {activeTab === "create" && selectedPatient && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold">
            Create Visit for {selectedPatient.fullName}
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">Visit Date</label>
            <input
              type="date"
              value={visitForm.visitDate}
              onChange={(e) =>
                setVisitForm((prev) => ({
                  ...prev,
                  visitDate: e.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visit Time</label>
            <input
              type="time"
              value={visitForm.visitTime}
              onChange={(e) =>
                setVisitForm((prev) => ({
                  ...prev,
                  visitTime: e.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visit Type</label>
            <select
              value={visitForm.visitType}
              onChange={(e) =>
                setVisitForm((prev) => ({
                  ...prev,
                  visitType: e.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Check">Routine Check</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Clinic</label>
            <select
              value={visitForm.clinic}
              onChange={(e) =>
                setVisitForm((prev) => ({
                  ...prev,
                  clinic: e.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Clinic</option>
              <option value="General">General</option>
              <option value="Dental">Dental</option>
              <option value="Eye">Eye Clinic</option>
              <option value="ENT">ENT</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedPatient(null)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Visit
            </button>
          </div>
        </form>
      )}

      {/* Visit List */}
      {activeTab === "list" && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">All Visits</h2>
          {visits.length === 0 ? (
            <p className="text-gray-500">No visits yet.</p>
          ) : (
            <ul className="space-y-2">
              {visits.map((visit) => (
                <li key={visit.id} className="border p-4 rounded">
                  <p>
                    <strong>Patient ID:</strong> {visit.patientId}
                  </p>
                  <p>
                    <strong>Date:</strong> {visit.visitDate} at {visit.visitTime}
                  </p>
                  <p>
                    <strong>Type:</strong> {visit.visitType}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}