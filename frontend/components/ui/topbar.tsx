// components/TopBar.tsx
"use client";

import { useState } from "react";
import { LogOut, Bell, Moon, Sun, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  const handleSignOut = async () => {
    // For now, just redirect — no auth means no real logout logic.
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-b from-blue-500 to-blue-600 text-white px-6 py-4 border-b border-blue-700">
      <div className="flex items-center gap-4">
        <Image
          src="/npalogo.png"
          alt="Organization Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">Hello, Guest</h2>
          <p className="text-sm opacity-80">Role: Demo</p>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button className="hover:text-orange-300 transition">
          <Bell size={20} />
        </button>

        <button
          onClick={toggleDarkMode}
          className="hover:text-yellow-400 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 hover:text-orange-300 transition"
          >
            <User size={20} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border border-gray-200 rounded shadow-lg py-2 z-50">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/user/change-password"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Change Password
              </a>
              <button
                onClick={handleSignOut}
                className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}