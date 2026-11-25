"use client";

import React, { useState } from "react";
import Link from "next/link";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  CheckSquare,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertCircle,
  FileText,
  School,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  QrCode,
} from "lucide-react";
import { DEMO_STUDENTS, DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

export default function AdminDashboard() {
  const { board } = useBoard();
  const isState = board === "state";
  const [absenceAlertSent, setAbsenceAlertSent] = useState(false);

  const handleSendAbsenceAlerts = () => {
    setAbsenceAlertSent(true);
    setTimeout(() => setAbsenceAlertSent(false), 5000);
  };

  const adminName = isState ? "Shri Mahadevappa Kulkarni" : "Dr. Sunitha Radhakrishnan";
  const adminRole = isState ? "Headmaster & State Board Administrator" : "Principal & CBSE Administrator";
  const adminId = isState ? "ADM-STATE-000001" : "ADM-CBSE-000001";
  const affiliationBadge = isState ? "Karnataka State Board (KSEAB)" : "CBSE Affiliation #830680";
  const institutionCode = isState ? "INS-STATE-562114" : "INS-CBSE-562114";

  return (
    <PortalLayout
      portal="admin"
      userName={adminName}
      userRole={adminRole}
      userHumanId={adminId}
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
              {affiliationBadge}
            </span>
            <span className="text-xs text-slate-400 font-mono">{institutionCode}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isState ? "State Board Operations Center" : "CBSE Campus Operations Center"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isState
              ? "Comprehensive management of Karnataka State Board syllabus, CCE formative/summative records, and faculty rosters."
              : "Real-time management of CBSE NCERT curriculum, annual board examinations, and student credentials."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSendAbsenceAlerts}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trigger Absence SMS/WhatsApp</span>
          </button>
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <span>Admission CRM (12)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {absenceAlertSent && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Absence alerts successfully queued and dispatched to 14 absent student guardians via Indian SMS & WhatsApp Business API.
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold">MSG-ACK-9021</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Student Attendance Today</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">95.4%</span>
            <span className="text-xs font-semibold text-emerald-600">2,337 Present</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">113 Absent • 14 Excused Leaves</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Admissions Pipeline (2026-27)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">382</span>
            <span className="text-xs font-semibold text-blue-600">Applications</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">186 Enrolled • 42 Pending Verification</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Term Fee Collected</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">₹9.84 Cr</span>
            <span className="text-xs font-semibold text-emerald-600">92% Target</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">₹86.2 Lakh Pending for Term 2</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Faculty On Duty</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">138 / 142</span>
            <span className="text-xs font-semibold text-purple-600">97.2%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">4 On Leave • Substitutions Arranged</span>
        </div>
      </div>

      {/* Action Inbox & Module Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Inbox */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Intelligent Action Inbox</h2>
              <p className="text-xs text-slate-500">Tasks requiring administrative authorization or processing</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
              4 Tasks
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Verify Transfer Certificate (TC) Application</span>
                <span className="text-[11px] text-slate-500">Student: Snehal Varma (Class 8-B) • Reason: Parent Relocation</span>
              </div>
              <Link href="/admin/students" className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Process TC
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Lock Periodic Assessment 2 Marks</span>
                <span className="text-[11px] text-slate-500">Class 10 All Sections • Mathematics & Science entered</span>
              </div>
              <Link href="/admin/examinations" className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700">
                Publish Results
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Staff Medical Leave Approval</span>
                <span className="text-[11px] text-slate-500">Mr. Vikram Hegde (PGT Physics) • 2 Days</span>
              </div>
              <Link href="/admin/teachers" className="px-3 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800">
                Review Leave
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Module Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">Administrative Modules</h2>
          <p className="text-xs text-slate-500 mb-4">Direct shortcuts to critical workflows</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/admin/admissions"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <GraduationCap className="w-5 h-5 mx-auto text-blue-600 mb-1.5" />
              <span className="font-semibold text-slate-800 block">Admissions</span>
            </Link>
            <Link
              href="/admin/students"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <Users className="w-5 h-5 mx-auto text-emerald-600 mb-1.5" />
              <span className="font-semibold text-slate-800 block">Students</span>
            </Link>
            <Link
              href="/admin/fees"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <CreditCard className="w-5 h-5 mx-auto text-amber-600 mb-1.5" />
              <span className="font-semibold text-slate-800 block">Fee Engine</span>
            </Link>
            <Link
              href="/admin/examinations"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <Award className="w-5 h-5 mx-auto text-purple-600 mb-1.5" />
              <span className="font-semibold text-slate-800 block">Exams</span>
            </Link>
            <Link
              href="/admin/timetable"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <Calendar className="w-5 h-5 mx-auto text-indigo-600 mb-1.5" />
              <span className="font-semibold text-slate-800 block">AI Timetable</span>
            </Link>
            <Link
              href="/admin/operations"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center block"
            >
              <School className="w-5 h-5 mx-auto text-slate-700 mb-1.5" />
              <span className="font-semibold text-slate-800 block">Campus Ops</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Enrolled Students Sample */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Student Enrollments (Sample Roster)</h2>
            <p className="text-xs text-slate-500">Backed by automatic unique ID sequences (STU-INS000001-...)</p>
          </div>
          <Link href="/admin/students" className="text-xs font-semibold text-blue-600 hover:underline">
            View All Students →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4">Student ID & Name</th>
                <th className="p-4">Class & Section</th>
                <th className="p-4">Admission No.</th>
                <th className="p-4">Guardian Contact</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Fee Status</th>
                <th className="p-4">Digital ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_STUDENTS.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                    <span className="font-mono text-[11px] text-blue-700">{stu.humanId}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold">{stu.className} - {stu.section}</span>
                    <span className="text-[11px] text-slate-400 block">Roll #{stu.rollNumber}</span>
                  </td>
                  <td className="p-4 font-mono font-medium">{stu.admissionNo}</td>
                  <td className="p-4">
                    <span className="font-medium text-slate-800">{stu.guardianName}</span>
                    <span className="text-[11px] text-slate-500 block">{stu.guardianPhone}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-bold ${stu.attendancePct < 75 ? "text-red-600" : "text-emerald-600"}`}>
                      {stu.attendancePct}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 rounded font-semibold text-[11px] ${
                      stu.feeStatus === "PAID"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : stu.feeStatus === "PARTIAL"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {stu.feeStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <QrCode className="w-3.5 h-3.5 text-blue-600" />
                      <span>QR Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
