// app/medical/layout.tsx
import Sidebar from "@/components/ui/sidebar";
import TopBar from "@/components/ui/topbar";

export default function MedicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </section>
  );
}