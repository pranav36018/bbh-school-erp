"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  X,
  Video,
} from "lucide-react";
import { PortalType } from "@/lib/types";
import { useBoard } from "@/lib/board-context";

interface PortalSidebarProps {
  portal: PortalType;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PortalSidebar({ portal, isOpen = false, onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const boardContext = useBoard();
  const isState = boardContext.board === "state";

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
          { name: "Video Lessons Hub", href: "/teacher/videos", icon: Video, badge: "YouTube" },
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
          { name: "Video Classroom", href: "/student/learn", icon: Video, badge: "YouTube" },
          { name: "Mind Games & Logic", href: "/student/games", icon: Brain, badge: "5 Games" },
          { name: "Digital ID Card", href: "/student/profile", icon: QrCode },
          { name: "School Bus & GPS", href: "/student/transport", icon: Bus, badge: "Live GPS" },
          { name: "Daily Class Diary", href: "/student/diary", icon: BookMarked, badge: "Today" },
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

  // Resolve target link path preserving board scope if in URL
  const resolveLinkHref = (baseHref: string) => {
    if (pathname?.startsWith("/state/")) {
      return `/state${baseHref}`;
    }
    if (pathname?.startsWith("/cbse/")) {
      return `/cbse${baseHref}`;
    }
    return baseHref;
  };

  const renderNavList = (isMobile: boolean = false) => (
    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const targetHref = resolveLinkHref(item.href);
        const isActive =
          pathname === targetHref ||
          pathname === item.href ||
          pathname?.startsWith(targetHref + "/") ||
          pathname?.startsWith(item.href + "/");

        return (
          <Link
            key={item.name}
            href={targetHref}
            onClick={() => {
              if (isMobile && onClose) onClose();
            }}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive
                ? isState
                  ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/20"
                  : "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="truncate">{item.name}</span>
            </div>
            {item.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isState
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
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
  );

  return (
    <>
      {/* 1. Desktop Permanent Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col shrink-0 border-r border-slate-800 select-none">
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-800">
          <Link href="/" title="School Homepage">
            <img
              src="/images/svvk-logo.png"
              alt="Sri Vivekananda Vidya Kendra"
              className="w-10 h-10 rounded-full object-contain bg-amber-500/10 p-0.5 border border-amber-500/30 shrink-0"
            />
          </Link>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white tracking-tight block truncate">
              SRI VIVEKANANDA
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold border ${badge.color}`}
              >
                {badge.label}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  isState ? "bg-emerald-950 text-emerald-300" : "bg-blue-950 text-blue-300"
                }`}
              >
                {isState ? "STATE" : "CBSE"}
              </span>
            </div>
          </div>
        </div>

        {/* Nav List */}
        {renderNavList(false)}

        {/* Footer Info & Switcher */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-400 truncate">
              {isState ? "Karnataka State Board" : "CBSE Affil: 830680"}
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            {isState
              ? "CCE Grading & State Syllabus Active."
              : "NCERT & 9-Point CBSE Scale Active."}
          </p>
        </div>
      </aside>

      {/* 2. Mobile Responsive Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden select-none ${
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Mobile Header with Close button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <Link href="/" title="School Homepage">
              <img
                src="/images/svvk-logo.png"
                alt="Sri Vivekananda Vidya Kendra"
                className="w-9 h-9 rounded-full object-contain bg-amber-500/10 p-0.5 border border-amber-500/30 shrink-0"
              />
            </Link>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white tracking-tight block truncate">
                SRI VIVEKANANDA
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-semibold border ${badge.color}`}>
                  {badge.label}
                </span>
                <span
                  className={`text-[9px] font-bold px-1 rounded ${
                    isState ? "bg-emerald-950 text-emerald-300" : "bg-blue-950 text-blue-300"
                  }`}
                >
                  {isState ? "STATE" : "CBSE"}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav List */}
        {renderNavList(true)}

        {/* Mobile Footer Info */}
        <div className="p-3.5 border-t border-slate-800 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-400">
              {isState ? "Karnataka State Board" : "CBSE Board"}
            </span>
          </div>
          <p className="text-[9px]">Hoskote, Bengaluru Rural – 562114</p>
        </div>
      </aside>
    </>
  );
}
