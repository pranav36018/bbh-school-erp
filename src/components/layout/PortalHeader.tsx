"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Search,
  LogOut,
  User,
  ShieldCheck,
  Building,
  CheckCircle2,
  Menu,
  Home,
} from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

interface PortalHeaderProps {
  userName: string;
  userRole: string;
  userHumanId: string;
  institutionName?: string;
  academicYear?: string;
  onToggleSidebar?: () => void;
}

export default function PortalHeader({
  userName,
  userRole,
  userHumanId,
  institutionName: propInstitutionName,
  academicYear = "AY-2026-2027",
  onToggleSidebar,
}: PortalHeaderProps) {
  const router = useRouter();
  const boardContext = useBoard();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isState = boardContext.board === "state";
  const defaultInstName = isState
    ? "Sri Vivekananda Vidya Kendra (Karnataka State Board)"
    : "Sri Vivekananda Vidya Kendra (CBSE - Affiliation 830680)";
  const institutionName = (!propInstitutionName || propInstitutionName.includes("DPS"))
    ? defaultInstName
    : propInstitutionName;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-3 sm:px-6 flex items-center justify-between gap-2">
      {/* Left: Hamburger (mobile), Mobile Brand, & Institution Scope */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 -ml-1 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/" title="Home">
            <img src="/images/svvk-logo.png" alt="SVVK" className="w-7 h-7 rounded-full object-contain shrink-0" />
          </Link>
          <span className="font-bold text-xs text-slate-900 truncate max-w-[120px]">
            SVVK {isState ? "(State)" : "(CBSE)"}
          </span>
        </div>

        {/* Desktop School & Board Scope Pill */}
        <div
          className={`hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
            isState
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
              : "bg-blue-50/70 border-blue-200 text-blue-950"
          }`}
        >
          <Link href="/" title="Return to School Home">
            <img src="/images/svvk-logo.png" alt="SVVK" className="w-5 h-5 rounded-full object-contain shrink-0" />
          </Link>
          <span className="font-extrabold text-slate-900">{institutionName}</span>
          <span className="text-slate-300">•</span>
          <span
            className={`font-bold text-[10px] px-2 py-0.5 rounded-md ${
              isState ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {isState ? "Karnataka State Board (KSEAB)" : "CBSE Affil: 830680"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-mono text-[11px]">{academicYear}</span>
        </div>

        {/* Global Search */}
        <div className="relative hidden xl:block w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, staff, IDs..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Mobile Board Badge */}
        <span
          className={`md:hidden font-bold text-[10px] px-2 py-1 rounded-md ${
            isState ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
          }`}
        >
          {isState ? "STATE" : "CBSE"}
        </span>

        {/* Return to Home link */}
        <Link
          href="/"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Return to School Homepage"
        >
          <Home className="w-4 h-4" />
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Official Notices</span>
                <span className="text-[10px] text-amber-600 font-semibold">{DEMO_ANNOUNCEMENTS.length} new</span>
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
            <div
              className={`w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center ${
                isState
                  ? "bg-gradient-to-tr from-emerald-600 to-teal-700"
                  : "bg-gradient-to-tr from-blue-600 to-indigo-700"
              }`}
            >
              {userName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <span className="font-semibold text-slate-900 block leading-tight">{userName}</span>
              <span className="text-[10px] text-slate-500 font-mono">{userHumanId}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{userName}</p>
                <p className="text-[10px] text-slate-500 font-mono">{userHumanId}</p>
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                    {userRole}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isState
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-blue-50 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {isState ? "State Board" : "CBSE"}
                  </span>
                </div>
              </div>
              <div className="py-1">
                <Link
                  href="/"
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Home className="w-3.5 h-3.5 text-slate-500" />
                  <span>School Homepage</span>
                </Link>
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
