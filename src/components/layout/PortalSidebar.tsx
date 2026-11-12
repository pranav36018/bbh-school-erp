"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  School,
  Building2,
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  CreditCard,
  Clock,
  MessageSquare,
  FileText,
  CheckSquare,
  Layers,
  Sparkles,
  Bus,
  Shield,
  LayoutDashboard,
  BarChart3,
  FileCheck,
  Briefcase,
  QrCode,
  DollarSign,
  Compass,
  Package,
  ShieldCheck,
  UserCheck,
  Home,
  Star,
  BookMarked,
  Brain,
  Gamepad2,
} from "lucide-react";
import { PortalType } from "@/lib/types";

interface PortalSidebarProps {
  portal: PortalType;
}

export default function PortalSidebar({ portal }: PortalSidebarProps) {
  const pathname = usePathname();

  const getNavItems = () => {
    switch (portal) {
      case "director":
        return [
          { name: "Executive Overview", href: "/director/dashboard", icon: LayoutDashboard },
          { name: "Institution Groups", href: "/director/institutions", icon: Building2 },
          { name: "Campus Comparison", href: "/director/campuses", icon: Layers },
          { name: "Academic Benchmarks", href: "/director/academics", icon: BarChart3 },
          { name: "Consolidated Finance", href: "/director/finance", icon: DollarSign },
          { name: "Approval Center", href: "/director/approvals", icon: CheckSquare, badge: "3 Pending" },
          { name: "Director Circulars", href: "/director/announcements", icon: MessageSquare },
        ];
      case "admin":
        return [
          { name: "Operations Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
          { name: "Admission CRM", href: "/admin/admissions", icon: Compass, badge: "12 New" },
          { name: "Student Registry", href: "/admin/students", icon: Users },
          { name: "Teachers & Staff HR", href: "/admin/teachers", icon: Briefcase },
          { name: "Classes & Multi-Board", href: "/admin/academics", icon: Layers },
          { name: "Attendance Roster", href: "/admin/attendance", icon: CheckSquare },
          { name: "Exams & Report Cards", href: "/admin/examinations", icon: Award },
          { name: "Fee Management & UPI", href: "/admin/fees", icon: CreditCard },
          { name: "Timetable & AI Engine", href: "/admin/timetable", icon: Calendar, badge: "AI" },
          { name: "Faculty Substitution", href: "/admin/substitution", icon: UserCheck, badge: "Smart" },
          { name: "Visitor & Gate Pass", href: "/admin/visitors", icon: ShieldCheck, badge: "Security" },
          { name: "Store & Inventory", href: "/admin/inventory", icon: Package },
          { name: "Hostel Management", href: "/admin/hostel", icon: Home },
          { name: "Campus Library", href: "/admin/library", icon: BookOpen },
          { name: "Staff Leaves & Payroll", href: "/admin/payroll", icon: DollarSign },
          { name: "Certificates & TC", href: "/admin/certificates", icon: FileCheck, badge: "TC" },
          { name: "PTM & Appointments", href: "/admin/ptm", icon: Clock },
          { name: "Notices & Broadcasts", href: "/admin/communication", icon: MessageSquare },
          { name: "Operations & Transport", href: "/admin/operations", icon: Bus },
        ];
      case "teacher":
        return [
          { name: "Teacher Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
          { name: "School Bus & Transit", href: "/teacher/transport", icon: Bus, badge: "Live GPS" },
          { name: "Daily Class Diary", href: "/teacher/diary", icon: BookMarked, badge: "Today" },
          { name: "Mark Attendance", href: "/teacher/attendance", icon: CheckSquare },
          { name: "Marks & Assessments", href: "/teacher/marks", icon: Award },
          { name: "Merit & Discipline", href: "/teacher/discipline", icon: Star },
          { name: "AI Lesson Plans", href: "/teacher/lesson-plans", icon: Sparkles, badge: "AI" },
          { name: "AI Question Paper", href: "/teacher/question-paper", icon: FileText, badge: "AI" },
          { name: "Homework & Notes", href: "/teacher/assignments", icon: BookOpen },
          { name: "Campus Calendar", href: "/teacher/calendar", icon: Calendar },
          { name: "Leave Management", href: "/teacher/leaves", icon: Clock },
        ];
      case "student":
        return [
          { name: "Student Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
          { name: "Digital ID Card", href: "/student/profile", icon: QrCode },
          { name: "School Bus & GPS", href: "/student/transport", icon: Bus, badge: "Live GPS" },
          { name: "Daily Class Diary", href: "/student/diary", icon: BookMarked, badge: "Today" },
          { name: "Mind Games & Logic", href: "/student/games", icon: Brain, badge: "3 Games" },
          { name: "Class Timetable", href: "/student/timetable", icon: Calendar },
          { name: "Attendance Records", href: "/student/attendance", icon: CheckSquare },
          { name: "Exam Results & Report", href: "/student/academics", icon: Award },
          { name: "Fee Ledger & Pay UPI", href: "/student/fees", icon: CreditCard },
          { name: "Homework & Studies", href: "/student/homework", icon: BookOpen },
          { name: "Campus Calendar", href: "/student/calendar", icon: Calendar },
          { name: "Library Books", href: "/student/library", icon: FileCheck },
        ];
    }
  };

  const navItems = getNavItems();

  const getPortalBadge = () => {
    switch (portal) {
      case "director":
        return { label: "Director Portal", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "teacher":
        return { label: "Teacher Portal", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "student":
        return { label: "Student Portal", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      case "admin":
      default:
        return { label: "Admin Portal", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
    }
  };

  const badge = getPortalBadge();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
          <School className="w-5 h-5" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight block">UNIFIED ERP</span>
          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-semibold text-slate-400">Tenant Isolation Active</span>
        </div>
        <p className="text-[10px]">Session cryptographically locked to institution authority.</p>
      </div>
    </aside>
  );
}
