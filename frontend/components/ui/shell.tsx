"use client";

import Sidebar from "@/components/ui/sidebar";
import TopBar from "@/components/ui/topbar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto">
        <TopBar />
        {children}
      </main>
    </div>
  );
}