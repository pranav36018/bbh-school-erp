"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  LogOut,
  User,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";

interface PortalHeaderProps {
  userName: string;
  userRole: string;
  userHumanId: string;
  institutionName?: string;
  academicYear?: string;
}

export default function PortalHeader({
  userName,
  userRole,
  userHumanId,
  institutionName = "Sri Vivekananda Vidya Kendra",
  academicYear = "AY-2026-2027",
}: PortalHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Search & Institution Scope */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-xs font-medium text-slate-800">
          <img src="/images/svvk-logo.png" alt="SVVK" className="w-5 h-5 rounded-full object-contain" />
          <span className="font-bold text-slate-900">{institutionName}</span>
          <span className="text-amber-300">•</span>
          <span className="text-slate-600 font-mono text-[11px]">{academicYear}</span>
        </div>

        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, staff, IDs..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Official Notices</span>
                <span className="text-[10px] text-blue-600 font-semibold">{DEMO_ANNOUNCEMENTS.length} new</span>
              </div>
              <div className="mt-2 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {DEMO_ANNOUNCEMENTS.map((a) => (
                  <div key={a.id} className="py-2.5 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800 text-[11px] line-clamp-1">{a.title}</span>
                      <span className="text-[10px] text-slate-400">{a.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{a.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {userName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <span className="font-semibold text-slate-900 block leading-tight">{userName}</span>
              <span className="text-[10px] text-slate-500 font-mono">{userHumanId}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{userName}</p>
                <p className="text-[10px] text-slate-500 font-mono">{userHumanId}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-200">
                  {userRole}
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
