"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UserPlus, Save } from "lucide-react";
import toast from "react-hot-toast";

// === Option Lists ===
const nameTitles = ["Mr", "Mrs", "Miss", "Master", "Engr", "Dr"];
const locations = [
  "Headquarters",
  "Lagos Port Complex",
  "Tincan Island Port Complex",
  "Rivers Port Complex",
  "Onne Port Complex",
  "Delta Port Complex",
  "Calabar Port",
  "Lekki Deep Sea Port",
];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const genders = ["Male", "Female"];
const otherCategories = ["Police", "IT", "NYSC", "CSR"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genotypes = ["AA", "AS", "SS", "AC", "SC"];
const dependentRelationships = ["Spouse", "Child", "Parent", "Sibling", "Other"];

interface PatientData {
  employeeCategory: "Active" | "Retired" | "Other";
  otherCategory: string;
  title: string;
  surname: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  oracleNumber: string;
  division: string;
  designation: string;
  location: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodGroup: string;
  genotype: string;
}

interface Dependent {
  id: string;
  title: string;
  surname: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  age: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export default function RegisterPatient() {
  const [category, setCategory] = useState<"Active" | "Retired" | "Other">(
    "Active"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [patient, setPatient] = useState<PatientData>({
    employeeCategory: "Active",
    otherCategory: "",
    title: "",
    surname: "",
    firstName: "",
    lastName: "",
    personalNumber: "",
    oracleNumber: "",
    division: "",
    designation: "",
    location: "",
    maritalStatus: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    bloodGroup: "",
    genotype: "",
  });

  const [dependents, setDependents] = useState<Dependent[]>([]);

  // === Update patient field ===
  const updatePatient = (field: keyof PatientData, value: string) => {
    if (field === "dateOfBirth") {
      const age = calcAge(value);
      setPatient({ ...patient, dateOfBirth: value, age });
    } else {
      setPatient({ ...patient, [field]: value });
    }
  };

  // === Calc Age ===
  const calcAge = (dob: string) => {
    if (!dob) return "";
    const diff = new Date().getFullYear() - new Date(dob).getFullYear();
    return diff.toString();
  };

  // === Search Employee ===
  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    setTimeout(() => {
      setSearchResults([
        {
          id: "1",
          surname: "Doe",
          firstName: "Jane",
          lastName: "Smith",
          personalNumber: "PN123",
          oracleNumber: "OR456",
          division: "ICT",
          designation: "DevOps",
          location: "Headquarters",
          maritalStatus: "Single",
          gender: "Female",
          dateOfBirth: "1990-01-01",
          email: "jane@npa.gov",
          phone: "+123456789",
          address: "123 Marine Rd",
          emergencyContact: "John Doe",
          emergencyPhone: "+987654321",
          title: "Mrs",
          bloodGroup: "O+",
          genotype: "AA",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const handleAutoFill = (emp: any) => {
    setPatient({
      ...patient,
      ...emp,
      employeeCategory: category,
      age: calcAge(emp.dateOfBirth),
    });
    setSearchResults([]);
  };

  // === Dependents ===
  const canAddDependent = category !== "Other";
  const addDependent = () =>
    dependents.length < 4 &&
    setDependents([
      ...dependents,
      {
        id: Date.now().toString(),
        title: "",
        surname: "",
        firstName: "",
        lastName: "",
        relationship: "",
        dateOfBirth: "",
        age: "",
        phone: "",
        email: "",
        address: "",
        emergencyContact: "",
        emergencyPhone: "",
      },
    ]);

  const updateDependent = (
    id: string,
    field: keyof Dependent,
    value: string
  ) => {
    setDependents((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              [field]: value,
              ...(field === "dateOfBirth"
                ? { age: calcAge(value) }
                : {}),
            }
          : d
      )
    );
  };

  const removeDependent = (id: string) =>
    setDependents((prev) => prev.filter((d) => d.id !== id));

  const handleSubmit = () => {
    console.log(patient, dependents);
    toast.success("Registered!");
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <UserPlus className="inline mr-2" /> Register New Patient
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* === Category buttons === */}
          <div className="flex gap-2">
            {["Active", "Retired", "Other"].map((t) => (
              <Button
                key={t}
                variant={category === t ? "default" : "outline"}
                onClick={() => {
                  setCategory(t as any);
                  setPatient({
                    ...patient,
                    employeeCategory: t as any,
                    otherCategory: "",
                  });
                }}
              >
                {t === "Other" ? "Others (Police, IT, NYSC, CSR)" : `${t} Employee`}
              </Button>
            ))}
          </div>

          {category === "Other" && (
            <div className="w-full md:w-1/4">
              <Label>Select Other Category</Label>
              <Select
                value={patient.otherCategory}
                onValueChange={(v) => updatePatient("otherCategory", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {otherCategories.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {category !== "Other" && (
            <div className="flex gap-2 flex-wrap">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Personal Number or Surname"
                className="w-full md:w-1/2"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="p-2 bg-muted rounded">
              {searchResults.map((s) => (
                <div key={s.id} className="flex justify-between p-2 border-b">
                  <span>
                    {s.surname} {s.firstName} ({s.personalNumber})
                  </span>
                  <Button size="sm" onClick={() => handleAutoFill(s)}>
                    Use
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* === Patient Fields === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {[
    ["Title", "title", nameTitles],
    ["Surname", "surname"],
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Personal Number", "personalNumber"],
    ["Oracle Number", "oracleNumber"],
    ["Division", "division"],
    ["Designation", "designation"],
    ["Location", "location", locations],
    ["Marital Status", "maritalStatus", maritalStatuses],
    ["Gender", "gender", genders],
    ["Date of Birth", "dateOfBirth"],
    ["Age", "age"],
    ["Blood Group", "bloodGroup", bloodGroups],
    ["Genotype", "genotype", genotypes],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Address", "address"],
    ["Emergency Contact", "emergencyContact"],
    ["Emergency Phone", "emergencyPhone"],
  ]
    .filter(([_, field]) => {
      const skipFields = ["oracleNumber", "division", "designation", "location"];
      return category === "Active" || !skipFields.includes(field as string);
    })
    .map(([label, field, opts]) =>
      opts ? (
        <InputSelect
          key={field as string}
          label={label}
          value={patient[field as keyof PatientData]}
          options={opts as string[]}
          onChange={(v) => updatePatient(field as keyof PatientData, v)}
        />
      ) : (
        <InputWithLabel
          key={field as string}
          label={label}
          value={patient[field as keyof PatientData]}
          onChange={(v) => updatePatient(field as keyof PatientData, v)}
          type={field === "dateOfBirth" ? "date" : "text"}
          disabled={field === "age"}
        />
      )
    )}
</div>

          {/* === Dependents === */}
          {canAddDependent && (
            <>
              <Button onClick={addDependent} size="sm">
                <Users className="inline mr-1" /> Add Dependent
              </Button>
              {dependents.map((d) => (
                <Card key={d.id} className="p-4 space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Dependent</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeDependent(d.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <InputSelect
                      label="Title"
                      value={d.title}
                      options={nameTitles}
                      onChange={(v) => updateDependent(d.id, "title", v)}
                    />
                    <InputWithLabel
                      label="Surname"
                      value={d.surname}
                      onChange={(v) => updateDependent(d.id, "surname", v)}
                    />
                    <InputWithLabel
                      label="First Name"
                      value={d.firstName}
                      onChange={(v) => updateDependent(d.id, "firstName", v)}
                    />
                    <InputWithLabel
                      label="Last Name"
                      value={d.lastName}
                      onChange={(v) => updateDependent(d.id, "lastName", v)}
                    />
                    <InputSelect
                      label="Relationship"
                      value={d.relationship}
                      options={dependentRelationships}
                      onChange={(v) => updateDependent(d.id, "relationship", v)}
                    />
                    <InputWithLabel
                      label="Date of Birth"
                      value={d.dateOfBirth}
                      onChange={(v) => updateDependent(d.id, "dateOfBirth", v)}
                      type="date"
                    />
                    <InputWithLabel
                      label="Age"
                      value={d.age}
                      disabled
                    />
                    <InputWithLabel
                      label="Phone"
                      value={d.phone}
                      onChange={(v) => updateDependent(d.id, "phone", v)}
                    />
                    <InputWithLabel
                      label="Email"
                      value={d.email}
                      onChange={(v) => updateDependent(d.id, "email", v)}
                    />
                    <InputWithLabel
                      label="Address"
                      value={d.address}
                      onChange={(v) => updateDependent(d.id, "address", v)}
                    />
                    <InputWithLabel
                      label="Emergency Contact"
                      value={d.emergencyContact}
                      onChange={(v) =>
                        updateDependent(d.id, "emergencyContact", v)
                      }
                    />
                    <InputWithLabel
                      label="Emergency Phone"
                      value={d.emergencyPhone}
                      onChange={(v) =>
                        updateDependent(d.id, "emergencyPhone", v)
                      }
                    />
                  </div>
                </Card>
              ))}
            </>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>
              <Save className="inline mr-1" /> Register Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const InputWithLabel = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: any) => (
  <div>
    <Label>{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  </div>
);

const InputSelect = ({ label, value, options, onChange }: any) => (
  <div>
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o: string) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);