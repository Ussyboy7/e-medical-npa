import { Home, Users, Settings } from "lucide-react"

interface SidebarItem {
  name: string
  href: string
  icon: React.ElementType
}

interface SidebarModule {
  name: string
  items: SidebarItem[]
}

export function useSidebarModules(role: string): SidebarModule[] {
  // Example modules
  const common: SidebarModule[] = [
    {
      name: "Dashboard",
      items: [{ name: "Home", href: "/dashboard", icon: Home }],
    },
  ]

  const admin: SidebarModule[] = [
    {
      name: "Admin",
      items: [
        { name: "Users", href: "/users", icon: Users },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ]

  if (role === "admin") {
    return [...common, ...admin]
  }

  return common
}