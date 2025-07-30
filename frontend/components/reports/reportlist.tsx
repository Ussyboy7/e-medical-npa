"use client";

import { useState } from 'react';
import { ReportData } from '@/types/reports';
import { sampleReports } from '@/data/reportdata';
import ReportCard from '@/components/reports/reportcard';
import ReportModal from '@/components/reports/reportsmodal';

export default function ReportList() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'observation':
        return '👀';
      case 'monthly-summary':
        return '📅';
      case 'patient-statistics':
        return '👤';
      case 'visit-analysis':
        return '📝';
      case 'dependent-report':
        return '👨‍👩‍👧‍👦';
      case 'medical-conditions':
        return '🧬';
      case 'prescription-report':
        return '💊';
      default:
        return '📄';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          onDownload={() => alert('Download logic here')}
        >
          <pre className="text-xs bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(selectedReport.data, null, 2)}
          </pre>
        </ReportModal>
      )}
    </>
  );
}