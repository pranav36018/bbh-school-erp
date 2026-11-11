"use client";

import React from "react";
import Link from "next/link";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  GraduationCap,
  Calendar,
  CheckSquare,
  Award,
  CreditCard,
  QrCode,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { DEMO_TIMETABLE_TODAY, DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";

export default function StudentDashboard() {
  return (
    <PortalLayout
      portal="student"
      userName="Aarav Kashyap"
      userRole="Student • Class 10-A"
      userHumanId="STU-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-blue-100 border border-white/20">
              Roll #12 • Section 10-A • CBSE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Namaste, Aarav Kashyap!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
              You are on track for CBSE Board preparation. Today you have 7 scheduled classes. Your attendance is in the top 5% of the grade.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/student/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-blue-50 transition-all"
            >
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Digital ID Card</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Attendance Percentage</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">94.5%</span>
            <span className="text-xs font-semibold text-emerald-600">Excellent</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">154 of 163 Days Present</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Latest Assessment Result</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-600">469 / 500</span>
            <span className="text-xs font-semibold text-blue-600">93.8%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">CBSE Grade: A1 (Distinction)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Fee Payment Status</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">₹0 Dues</span>
            <span className="text-xs font-semibold text-emerald-600">Paid in Full</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Term 1 & 2 Composite Fee Settled</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Pending Homework</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-purple-600">1 Task</span>
            <span className="text-xs font-semibold text-slate-500">Due Friday</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Mathematics: Quadratic Equations Ex 4.3</span>
        </div>
      </div>

      {/* Main Grid: Today's Schedule + School Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today&apos;s Class Schedule</h2>
              <p className="text-xs text-slate-500">Wednesday, 11 Nov 2026 • Room 101</p>
            </div>
            <Link href="/student/timetable" className="text-xs font-semibold text-blue-600 hover:underline">
              Weekly Timetable →
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {DEMO_TIMETABLE_TODAY.slice(0, 5).map((p) => (
              <div key={p.period} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    {p.period}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{p.subject}</h3>
                    <p className="text-slate-500">{p.teacher} • {p.room}</p>
                  </div>
                </div>
                <span className="font-mono text-slate-600 font-semibold bg-white px-2.5 py-1 rounded-md border text-[11px]">
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">Campus Bulletins</h2>
          <p className="text-xs text-slate-500 mb-4">Official school updates</p>

          <div className="space-y-3 text-xs">
            {DEMO_ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-blue-600 font-semibold block mb-0.5">{a.date}</span>
                <h4 className="font-bold text-slate-900 leading-snug">{a.title}</h4>
                <p className="text-slate-500 text-[11px] mt-1 line-clamp-2">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
