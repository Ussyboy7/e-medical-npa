// components/reports/ReportCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportData } from "@/types/reports";

interface ReportCardProps {
  report: ReportData;
  onView: (r: ReportData) => void;
  getIcon: (type: string) => JSX.Element;
}

export default function ReportCard({
  report,
  onView,
  getIcon,
}: ReportCardProps) {
  return (
    <Card
      onClick={() => onView(report)}
      className="transition hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
        {getIcon(report.type)}
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Generated: {report.dateGenerated}
        </div>
        <div className="text-xs text-muted-foreground">
          Period: {report.period.startDate} — {report.period.endDate}
        </div>
      </CardContent>
    </Card>
  );
}