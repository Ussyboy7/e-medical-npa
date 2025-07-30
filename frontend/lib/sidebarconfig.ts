// lib/sidebarconfig.ts
import {
  Home,
  UserPlus,
  Users,
  FilePlus,
  FileText,
  Activity,
  ClipboardCheck,
  Stethoscope,
  Shield,
  Pill,
  Eye,
} from "lucide-react";

export interface SidebarItem {
  name: string;
  href: string;
  icon: any;
}

export interface SidebarModule {
  name: string;
  items: SidebarItem[];
}

export const sidebarModules: SidebarModule[] = [
  {
    name: "Medical Records",
    items: [
      { name: "Dashboard", href: "/medical/dashboard", icon: Home },
      { name: "Register Patient", href: "/medical/register-patient", icon: UserPlus },
      { name: "Patient Overview", href: "/medical/patient-overview", icon: Users },
      { name: "Manage Patient", href: "/medical/manage-patient", icon: Users },
      { name: "Create Visit", href: "/medical/create-visit", icon: FilePlus },
      { name: "Manage Visit", href: "/medical/manage-visit", icon: FileText },
      { name: "Reports", href: "/medical/reports", icon: Activity },
    ],
  },


{
name: "Nursing",
  items: [
    { name: "Dashboard", href: "/nursing/dashboard", icon: Home },
    { name: "Record Vitals", href: "/nursing/record-vitals", icon: ClipboardCheck },
    { name: "Patient Vitals", href: "/nursing/patient-vitals", icon: ClipboardCheck },
    { name: "Nursing Pool Queue", href: "/nursing/pool-queue", icon: Stethoscope },
    { name: "Consultation Room Status", href: "/nursing/consultation-status", icon: Eye },
    { name: "Wards", href: "/nursing/wards", icon: Shield },
    { name: "Injection", href: "/nursing/injection", icon: Pill },
    { name: "Injection Records", href: "/nursing/injection-records", icon: FileText },
    { name: "Dressing", href: "/nursing/dressing", icon: FileText },
  ],
}
];