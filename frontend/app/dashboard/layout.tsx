// app/dashboard/layout.tsx

import TopBar from "@/components/ui/topbar";
import Sidebar from "@/components/ui/sidebar";

export const metadata = {
  title: "NPA EMR",
  description: "Modern Electronic Medical Records",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      <Sidebar /> {/* your sidebar component */}
      <div className="flex flex-col flex-1">
        <TopBar /> {/* your top bar */}
        <main className="p-4">{children}</main>
      </div>
    </section>
  );
}