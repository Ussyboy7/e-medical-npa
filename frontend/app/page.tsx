// import Sidebar from "@/components/ui/Sidebar"

import Sidebar from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 p-8">This is your dashboard content.</div>
    </main>
  )
}