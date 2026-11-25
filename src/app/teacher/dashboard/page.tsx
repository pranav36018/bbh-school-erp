"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Award,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle2,
  Bus,
  MapPin,
  ShieldCheck,
  Radio,
  BookMarked,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DEMO_TIMETABLE_TODAY, DEMO_STUDENTS, DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

const LiveBusMap = dynamic(() => import("@/components/transport/LiveBusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-800">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-semibold">Initializing AIS-140 OpenStreetMap Transit Feed...</span>
    </div>
  ),
});

export default function TeacherDashboard() {
  const { board } = useBoard();
  const isState = board === "state";
  const [showMap, setShowMap] = useState(false);

  const teacherName = isState ? "Shri Ramesh Gowda" : "Ms. Ananya Sharma";
  const teacherRole = isState
    ? "Faculty • Kannada First Language & State CCE Evaluator"
    : "Senior Mathematics Faculty & Class 10-A In-Charge";
  const teacherId = isState ? "TCH-STATE-000001" : "TCH-CBSE-000001";
  const teacherBadge = isState ? "Karnataka State Board (KSEAB)" : "CBSE Affil #830680";

  return (
    <PortalLayout
      portal="teacher"
      userName={teacherName}
      userRole={teacherRole}
      userHumanId={teacherId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isState
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {teacherBadge}
            </span>
            <span className="text-xs text-slate-400 font-mono">{teacherId}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isState ? "State Board Faculty Console" : "CBSE Academic Classroom Console"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isState
              ? "Manage daily State Board periods, DSERT syllabus lesson plans, CCE formative marks entry, and Kannada literature diary."
              : "Manage your daily teaching periods, evaluate CBSE student assignments, and plan NCERT syllabus units."}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/teacher/attendance"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Mark 10-A Attendance</span>
          </Link>
          <Link
            href="/teacher/lesson-plans"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Lesson Planner</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Assigned Class</span>
          <span className="text-2xl font-extrabold text-slate-900">Class 10 - A</span>
          <span className="text-[11px] text-slate-400 block mt-1">40 Students Enrolled</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Today&apos;s Periods</span>
          <span className="text-2xl font-extrabold text-emerald-600">3 Classes</span>
          <span className="text-[11px] text-slate-400 block mt-1">Period 1 (10-A), P4 (10-B), P6 (9-C)</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Syllabus Completion</span>
          <span className="text-2xl font-extrabold text-blue-600">78.5%</span>
          <span className="text-[11px] text-slate-400 block mt-1">Unit 9: Quadratic Equations in progress</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Casual Leave Balance</span>
          <span className="text-2xl font-extrabold text-purple-600">8 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">4 of 12 Casual Leaves used</span>
        </div>
      </div>

      {/* Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today&apos;s Assigned Periods</h2>
              <p className="text-xs text-slate-500">Classroom schedule for Wednesday, 11 Nov 2026</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
              Active Schedule
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  P1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Class 10-A • Mathematics</h3>
                  <p className="text-slate-500">08:30 AM - 09:15 AM • Room 101 • Topic: Quadratic Equations</p>
                </div>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  P4
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Class 10-B • Mathematics Standard</h3>
                  <p className="text-slate-500">11:00 AM - 11:45 AM • Room 104 • Topic: Arithmetic Progressions</p>
                </div>
              </div>
              <span className="text-blue-700 font-bold">Next Class</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                  P6
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Class 9-C • Remedial Mathematics</h3>
                  <p className="text-slate-500">01:15 PM - 02:00 PM • Math Lab • Doubt Clearing Session</p>
                </div>
              </div>
              <span className="text-slate-400">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Teacher Quick Tools */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">Teacher Shortcuts</h2>
          <p className="text-xs text-slate-500 mb-4">Classroom tools & lesson generators</p>

          <div className="space-y-2 text-xs">
            <Link
              href="/teacher/attendance"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">Class 10-A Attendance</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/marks"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">Enter Exam Marks</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/lesson-plans"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-800">AI Lesson Plan Draft</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/question-paper"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-slate-800">AI Question Generator</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/diary"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <BookMarked className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">Daily Class Diary (Edubricz)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/transport"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-800">Bus Fleet & Live GPS</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/discipline"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-slate-800">Student 360 & Discipline</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/teacher/leaves"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-slate-800">Apply for Leave</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Live School Bus Fleet & Transit Radar for Teachers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">School Bus Transit & Arrival Radar</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  AIS-140 GPS
                </span>
              </div>
              <p className="text-xs text-slate-500">Live GPS tracking for 10-A student transit routes & campus gate ETA</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{showMap ? "Collapse Live Map" : "Open Interactive OpenStreetMap"}</span>
              {showMap ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <Link
              href="/teacher/transport"
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1"
            >
              <span>Full Transit Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Route Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-slate-900">Bus #14 (Sahakarnagar Express)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">
                KA-01-AB-1234
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Driver: <strong>Somanna Gowda</strong></span>
                <span className="text-emerald-600 font-bold">36 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>ETA to Campus Gate 2:</span>
                <strong className="text-blue-700 font-extrabold">7 Mins</strong>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t">
                <span>Class 10-A Students:</span>
                <span className="font-semibold text-slate-700">Aarav, Diya (2 Boarded)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-slate-900">Bus #21 (Thanisandra / Manyata)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">
                KA-01-CD-5678
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Driver: <strong>Manjunath K</strong></span>
                <span className="text-emerald-600 font-bold">28 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>ETA to Campus Gate 2:</span>
                <strong className="text-emerald-600 font-extrabold">Inside Geofence (3 Mins)</strong>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t">
                <span>Class 10-A Students:</span>
                <span className="font-semibold text-slate-700">Ananya Iyer (1 Boarded)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-slate-900">Bus #08 (Jakkur Airfield)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-800 font-bold rounded">
                KA-01-EF-9012
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Driver: <strong>Ramesh Babu</strong></span>
                <span className="text-emerald-600 font-bold">32 km/h</span>
              </div>
              <div className="flex justify-between">
                <span>ETA to Campus Gate 2:</span>
                <strong className="text-slate-700 font-extrabold">14 Mins</strong>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t">
                <span>Class 10-A Students:</span>
                <span className="font-semibold text-slate-700">Rohan (Private Drop)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Interactive Leaflet OpenStreetMap */}
        {showMap && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <LiveBusMap
              busNumber="Bus #14"
              vehicleNumber="KA-01-AB-1234"
              driverName="Somanna Gowda"
              driverPhone="+91 98450 33441"
              pickupStopName="DPS Bengaluru North Gate 2"
              pickupStopCoords={[13.1205, 77.6180]}
              initialBusCoords={[13.0924, 77.5976]}
              studentName="Class 10-A Bus Batch"
            />
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
