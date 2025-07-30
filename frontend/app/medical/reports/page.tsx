"use client";

import React, { useState } from "react";
import {
  Calendar, BarChart3, Users, Activity, Eye, FileText } from "lucide-react";
import { sampleReports } from "@/data/reportdata";
import ReportCard from "@/components/reports/reportcard";
import ReportModal from "@/components/reports/reportsmodal";
import ReportContent from "@/components/reports/reportcontent";
import { ReportData } from "@/types/reports";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "observation":
        return <Eye className="h-4 w-4 text-muted-foreground" />;
      case "monthly-summary":
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
      case "patient-statistics":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "visit-analysis":
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
      case "medical-conditions":
        return <Activity className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleDownload = (report: ReportData) => {
    const blob = new Blob([JSON.stringify(report.data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports Dashboard 📊
          </h1>
          <p className="text-muted-foreground">
            View and manage all generated reports
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {sampleReports.length} reports available
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onView={setSelectedReport}
            getIcon={getIcon}
          />
        ))}
      </div>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onPrint={() => window.print()}
          onDownload={() => handleDownload(selectedReport)}
        >
          <ReportContent report={selectedReport} />
        </ReportModal>
      )}
    </main>
  );
}