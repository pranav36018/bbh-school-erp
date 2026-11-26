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
  IdCard,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Bus,
  MapPin,
  Phone,
  Radio,
  Brain,
  Zap,
  Gamepad2,
} from "lucide-react";
import { DEMO_TIMETABLE_TODAY, DEMO_ANNOUNCEMENTS, DEMO_STUDENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

export default function StudentDashboard() {
  const { board } = useBoard();
  const isState = board === "state";
  const currentStudent = isState
    ? DEMO_STUDENTS.find((s) => s.id === "stu-state-001") || DEMO_STUDENTS[0]
    : DEMO_STUDENTS[1] || DEMO_STUDENTS[0];
  const transport = currentStudent.transport;

  return (
    <PortalLayout
      portal="student"
      userName={currentStudent.fullName}
      userRole={`Student • ${currentStudent.className}-${currentStudent.section}`}
      userHumanId={currentStudent.humanId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      {/* Personalized Welcome Banner */}
      <div
        className={`text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden ${
          isState
            ? "bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900"
            : "bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800"
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              Roll #{currentStudent.rollNumber} • Section {currentStudent.section} • {isState ? "Karnataka State Board (KSEAB)" : "CBSE Affil: 830680"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Namaste, {currentStudent.fullName}!
            </h1>
            <p className="text-slate-100 text-xs sm:text-sm mt-1 max-w-xl">
              {isState
                ? "You are on track for Karnataka State Board CCE evaluations. Today you have 7 scheduled classes with Kannada First Language."
                : "You are on track for CBSE Board preparation. Today you have 7 scheduled classes. Your attendance is in the top 5% of the grade."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {transport?.opted && (
              <Link
                href="/student/transport"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <Bus className="w-4 h-4 text-slate-950" />
                <span>Track School Bus (Live)</span>
              </Link>
            )}
            <Link
              href="/student/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-blue-50 transition-all"
            >
              <IdCard className="w-4 h-4 text-blue-600" />
              <span>Student ID &amp; History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Live School Bus Location Widget (When Opted) */}
      {transport?.opted ? (
        <div className="bg-white rounded-2xl border-2 border-amber-400/40 p-5 shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    LIVE GPS • EN ROUTE
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800">{transport.vehicleNumber} ({transport.busNumber})</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {transport.routeName}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    Current: <strong>{transport.currentLocationName}</strong>
                  </span>
                  <span>•</span>
                  <span>Your Stop: <strong>{transport.pickupStop}</strong></span>
                  <span>•</span>
                  <span>Speed: <strong className="text-emerald-700">{transport.speedKmh} km/h</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <div className="text-right">
                <span className="text-xl font-extrabold text-amber-600 block">{transport.etaMinutes} Mins</span>
                <span className="text-[10px] text-slate-400 font-semibold">Estimated Arrival</span>
              </div>
              <Link
                href="/student/transport"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Live Map View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <Bus className="w-5 h-5 text-slate-400" />
            <span>School Bus Transport is currently <strong>Not Opted</strong> for this student.</span>
          </div>
          <Link href="/student/transport" className="font-semibold text-blue-600 hover:underline">
            Opt-In for Bus Route →
          </Link>
        </div>
      )}

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

      {/* Daily Mind Sparks Arena (3 Mind Games) */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-indigo-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Cognitive Workout
              </span>
              <span className="text-xs text-indigo-300 font-mono">Daily Brain Spark</span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Sharpen Your Critical Thinking with 3 Mind Games
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Play <strong>Vedic Math Blitz</strong> (speed math), <strong>Logic Word Cipher</strong> (deduction), and <strong>Matrix Memory Recall</strong> (spatial span).
            </p>
          </div>
        </div>

        <Link
          href="/student/games"
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play Mind Games</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
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
