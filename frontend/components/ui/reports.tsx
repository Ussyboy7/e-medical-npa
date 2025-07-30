// app/components/Reports.tsx

import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, Users, Activity, Printer, Eye } from 'lucide-react';
import { ReportData, ObservationReport, MonthlySummary, PatientStatistics, VisitAnalysis, MedicalConditionsReport, 
    DependentReport, PrescriptionReport} from '@/types/reports';
import { sampleReports } from '@/data/reportdata';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ View handler
  const handleViewReport = (report: ReportData) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // ✅ Print handler
  const handlePrintReport = (report: ReportData) => {
    window.print();
  };

  // ✅ Download handler
  const handleDownloadReport = (report: ReportData) => {
    alert(`Downloading ${report.title}...`);
  };

  // ✅ Observation Report
  const renderObservationReport = (data: ObservationReport) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Observation Report</h2>
      {Object.entries(data.categories).map(([cat, val]) => (
        <div key={cat}>{cat}: {val}</div>
      ))}
      <div className="font-bold">Total: {data.total}</div>
    </div>
  );

  // ✅ Monthly Summary
  const renderMonthlySummary = (data: MonthlySummary) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Monthly Summary</h2>
      <div>Total Patients: {data.totalPatients}</div>
      <div>New Registrations: {data.newRegistrations}</div>
      <div>Visits: {data.totalVisits}</div>
      <div>Emergency Visits: {data.emergencyVisits}</div>
    </div>
  );

  // ✅ Patient Statistics
  const renderPatientStatistics = (data: PatientStatistics) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Patient Statistics</h2>
      <div>Average Age: {data.averageAge}</div>
      <div>Total Dependents: {data.totalDependents}</div>
    </div>
  );

  // ✅ Visit Analysis
  const renderVisitAnalysis = (data: VisitAnalysis) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Visit Analysis</h2>
      <div>Total Visits: {data.totalVisits}</div>
      <div>Average Visits/Patient: {data.averageVisitsPerPatient}</div>
    </div>
  );

  // ✅ Medical Conditions
  const renderMedicalConditionsReport = (data: MedicalConditionsReport) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Medical Conditions</h2>
      {data.conditions.map((c) => (
        <div key={c.condition}>
          {c.condition}: {c.patientCount} ({c.percentage}%)
        </div>
      ))}
    </div>
  );

  // ✅ NEW: Dependent Report
  const renderDependentReport = (data: DependentReport) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dependent Report</h2>
      <div>Total Dependents: {data.totalDependents}</div>
      <h3 className="font-semibold">By Age Group:</h3>
      {Object.entries(data.byAgeGroup).map(([group, count]) => (
        <div key={group}>{group}: {count}</div>
      ))}
      <h3 className="font-semibold">By Employee:</h3>
      {data.byEmployee.map(emp => (
        <div key={emp.employeeId} className="border p-2 mb-2">
          <strong>{emp.employeeName}</strong>
          <ul className="ml-4">
            {emp.dependents.map(dep => (
              <li key={dep.dependentId}>
                {dep.name} ({dep.age} yrs) - {dep.relationship}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // ✅ NEW: Prescription Report
  const renderPrescriptionReport = (data: PrescriptionReport) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Prescription Report</h2>
      <div>Total Prescriptions: {data.totalPrescriptions}</div>
      <h3 className="font-semibold">By Medication:</h3>
      {data.byMedication.map(med => (
        <div key={med.medication}>
          {med.medication}: {med.prescriptionCount} prescriptions, {med.patientCount} patients
        </div>
      ))}
      <h3 className="font-semibold">By Department:</h3>
      {Object.entries(data.byDepartment).map(([dept, count]) => (
        <div key={dept}>{dept}: {count}</div>
      ))}
      <h3 className="font-semibold">Top Prescribers:</h3>
      {data.topPrescribers.map(doc => (
        <div key={doc.doctorId}>{doc.doctorName}: {doc.prescriptions}</div>
      ))}
    </div>
  );

  // ✅ Core switch
  const renderReportContent = (report: ReportData) => {
    switch (report.type) {
      case 'observation':
        return renderObservationReport(report.data as ObservationReport);
      case 'monthly-summary':
        return renderMonthlySummary(report.data as MonthlySummary);
      case 'patient-statistics':
        return renderPatientStatistics(report.data as PatientStatistics);
      case 'visit-analysis':
        return renderVisitAnalysis(report.data as VisitAnalysis);
      case 'medical-conditions':
        return renderMedicalConditionsReport(report.data as MedicalConditionsReport);
      case 'dependent-report':
        return renderDependentReport(report.data as DependentReport);
      case 'prescription-report':
        return renderPrescriptionReport(report.data as PrescriptionReport);
      default:
        return <div>Unknown report type</div>;
    }
  };

  // ✅ Get icon
  const getReportIcon = (type: string) => {
    switch (type) {
      case 'observation': return <Eye className="h-5 w-5" />;
      case 'monthly-summary': return <Calendar className="h-5 w-5" />;
      case 'patient-statistics': return <Users className="h-5 w-5" />;
      case 'visit-analysis': return <BarChart3 className="h-5 w-5" />;
      case 'medical-conditions': return <Activity className="h-5 w-5" />;
      case 'dependent-report': return <Users className="h-5 w-5" />;
      case 'prescription-report': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ✅ Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medical Reports</h1>
        <span>{sampleReports.length} reports</span>
      </div>

      {/* ✅ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleReports.map(report => (
          <div
            key={report.id}
            className="border p-4 rounded shadow hover:shadow-lg"
          >
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center">
                {getReportIcon(report.type)}
                <div>
                  <h3 className="font-bold">{report.title}</h3>
                  <p className="text-xs text-gray-500">{report.generatedBy}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleViewReport(report)}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => handlePrintReport(report)}
                className="text-xs border px-2 py-1 rounded"
              >
                <Printer className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDownloadReport(report)}
                className="text-xs border px-2 py-1 rounded"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedReport.title}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500">
                ✕
              </button>
            </div>
            {renderReportContent(selectedReport)}
          </div>
        </div>
      )}
    </div>
  );
}