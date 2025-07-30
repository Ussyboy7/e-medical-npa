"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Edit, Eye, Trash2 } from "lucide-react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

// ✅ Patient type — adjust fields to match your backend
interface Patient {
  id: string;
  fullName: string;
  personalNumber: string;
  gender: "Male" | "Female";
  age: number;
  bloodGroup: string;
  employeeCategory: string;
  phoneNumber: string;
  email: string;
  address: string;
}

// ✅ Example static data — replace with real API data
const patientsMock: Patient[] = [
  {
    id: "#80762",
    fullName: "Wendi Combs",
    personalNumber: "80762",
    gender: "Female",
    age: 28,
    bloodGroup: "AB+",
    employeeCategory: "Active",
    phoneNumber: "0987654321",
    email: "test@testing.com",
    address: "360 Branden Knoll",
  },
  {
    id: "#82348",
    fullName: "Reba Fisher",
    personalNumber: "82348",
    gender: "Female",
    age: 59,
    bloodGroup: "A+",
    employeeCategory: "Retired",
    phoneNumber: "0987654321",
    email: "test@testing.com",
    address: "806 Je Alley, Robelfurt",
  },
  {
    id: "#82894",
    fullName: "Nick Morrow",
    personalNumber: "82894",
    gender: "Male",
    age: 69,
    bloodGroup: "A+",
    employeeCategory: "Others",
    phoneNumber: "0987654321",
    email: "test@testing.com",
    address: "835 Lorena Stream",
  },
];

const employeeCategories = ["All", "Active", "Retired", "Others"];

export default function ManagePatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // ✅ Filter by name or personal number and category
  const filteredPatients = patientsMock.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.personalNumber.includes(searchTerm);
    const matchesCategory =
      categoryFilter === "All" || categoryFilter === p.employeeCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ CSV export
  const handleExportCSV = () => {
    const csv = Papa.unparse(
      filteredPatients.map((p) => ({
        ID: p.id,
        Name: p.fullName,
        PersonalNumber: p.personalNumber,
        Gender: p.gender,
        Age: p.age,
        BloodGroup: p.bloodGroup,
        Category: p.employeeCategory,
        Phone: p.phoneNumber,
        Email: p.email,
        Address: p.address,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "patients.csv");
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Patients</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">
            {filteredPatients.length} patients found
          </p>
          <Button onClick={handleExportCSV} className="flex items-center gap-1">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* ✅ Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or personal number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {employeeCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✅ Patient Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">No.</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Patient Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Gender
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Age</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Blood Group
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Employee Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Mobile
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.fullName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.gender === "Male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.gender}
                  </span>
                </td>
                <td className="px-4 py-2">{p.age}</td>
                <td className="px-4 py-2">{p.bloodGroup}</td>
                <td className="px-4 py-2">{p.employeeCategory}</td>
                <td className="px-4 py-2">{p.phoneNumber}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">{p.address}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button size="icon" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}