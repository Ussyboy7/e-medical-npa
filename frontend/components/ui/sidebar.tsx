"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { sidebarModules } from "@/lib/sidebarconfig";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const getNavCls = (href: string) =>
    `flex items-center gap-2 py-2 px-2 text-sm rounded transition-colors ${
      isActive(href)
        ? "bg-primary text-primary-foreground font-medium"
        : "hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <aside
      className={`h-screen bg-blue-600 text-white flex flex-col transition-all ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex justify-between p-4">
        {!collapsed && <h1 className="font-bold text-lg">NPA EMR</h1>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {sidebarModules.map((module) => (
          <div key={module.name} className="px-2 py-2">
            {!collapsed && (
              <h3 className="uppercase text-xs text-white/70 mb-1">
                {module.name}
              </h3>
            )}
            <ul>
              {module.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link href={item.href} className={getNavCls(item.href)}>
                      <Icon size={16} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}