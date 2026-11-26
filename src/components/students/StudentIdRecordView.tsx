"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Download,
  Printer,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Calendar,
  CreditCard,
  Award,
  Phone,
  Mail,
  MapPin,
  Bus,
  BookOpen,
  History,
  Heart,
} from "lucide-react";
import { CompleteStudentProfile } from "@/lib/student-records";
import StudentQrCode from "./StudentQrCode";

interface StudentIdRecordViewProps {
  profile: CompleteStudentProfile;
  compact?: boolean;
  onClose?: () => void;
}

type HistoryFilter = "ALL" | "ACADEMIC" | "ATTENDANCE" | "FEES" | "CONDUCT";

export default function StudentIdRecordView({
  profile,
  compact = false,
  onClose,
}: StudentIdRecordViewProps) {
  const [historyTab, setHistoryTab] = useState<HistoryFilter>("ALL");
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);
  const isState = profile.board === "state";

  const handleDownloadSummary = (docTitle: string) => {
    setDownloadedDoc(docTitle);
    setTimeout(() => setDownloadedDoc(null), 2500);
  };

  const showSection = (section: HistoryFilter) =>
    historyTab === "ALL" || historyTab === section;

  return (
    <div className="space-y-6">
      {downloadedDoc && (
        <div className="fixed top-5 right-5 z-[100] bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-emerald-500/40 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Prepared record for download: <strong>{downloadedDoc}</strong></span>
        </div>
      )}

      {/* TOP SECTION: OFFICIAL STUDENT ID CARD (WITH REAL SCANNABLE QR CODE) + TOP STUDENT & PARENT DETAILS */}
      <div className={`grid grid-cols-1 ${compact ? "lg:grid-cols-1" : "xl:grid-cols-12"} gap-6 items-start`}>
        {/* Official Student Identity Card — Student Details, Parent Details, and Real Scannable QR Code */}
        <div
          className={`${compact ? "" : "xl:col-span-5"} text-white rounded-3xl p-6 shadow-2xl border w-full ${
            isState
              ? "bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-emerald-800"
              : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-blue-800"
          }`}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/images/svvk-logo.png"
                alt="SVVK"
                className="w-11 h-11 rounded-full object-contain bg-amber-500/10 p-0.5 border border-amber-500/30 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-400 block truncate">
                  Swamy Vivekananda Vidya Kendra Trust
                </span>
                <h2 className="text-xs font-black tracking-tight text-white truncate">
                  SRI VIVEKANANDA VIDYA KENDRA
                </h2>
                <span className="text-[10px] text-slate-400 block">Hoskote, Bengaluru Rural – 562114</span>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border shrink-0 ${
                isState
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
              }`}
            >
              {profile.boardBadge}
            </span>
          </div>

          {/* 1. Primary Student Identity Hero */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-lg border border-white/20 shrink-0 ${
                isState
                  ? "bg-gradient-to-tr from-emerald-600 to-teal-700"
                  : "bg-gradient-to-tr from-blue-600 to-indigo-600"
              }`}
            >
              {profile.initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                  {profile.enrollmentStatus}
                </span>
                <span className="text-[10px] font-mono text-slate-300">{profile.academicYear}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1 truncate">{profile.fullName}</h3>
              <p className={`text-xs font-mono font-bold ${isState ? "text-emerald-400" : "text-blue-400"}`}>
                ID: {profile.humanId}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {profile.className} • Section {profile.section} • Roll #{profile.rollNumber}
              </p>
            </div>
          </div>

          {/* 2. Student Particulars + Parent / Guardian Details right after Student Details */}
          <div className="bg-white/95 text-slate-900 rounded-2xl p-4 space-y-3 mb-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px]">
              <span className="font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                Student &amp; Parent Identity Details
              </span>
              <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Admission No.</span>
                <span className="font-mono font-bold text-slate-900">{profile.admissionNo}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Admission Date</span>
                <span className="font-semibold text-slate-800">{profile.admissionDate}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Date of Birth</span>
                <span className="font-semibold text-slate-800">{profile.dob}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Gender &amp; Blood Group</span>
                <span className="font-semibold text-slate-800">
                  {profile.gender} • <strong className="text-rose-700">{profile.bloodGroup}</strong>
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Medium &amp; Board</span>
                <span className="font-semibold text-slate-800">{profile.medium}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Grade &amp; Att.</span>
                <span className="font-bold text-emerald-700">
                  Grade {profile.overallGrade} ({profile.attendanceSummary.percentage}%)
                </span>
              </div>

              {/* Parent Details immediately below Student Particulars */}
              <div className="col-span-2 pt-2 mt-1 border-t border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase block mb-1">
                  Parent / Guardian Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Guardian Name:</span>
                    <span className="font-bold text-slate-900 block">{profile.guardianName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Emergency Mobile:</span>
                    <span className="font-mono font-bold text-slate-900 block">{profile.guardianPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Real Working Scannable Student QR Code */}
          <div className="mb-4">
            <StudentQrCode
              studentId={profile.id}
              studentName={profile.fullName}
              admissionNo={profile.admissionNo}
              variant="card"
              size={104}
            />
          </div>

          {/* Quick Card Summary Strip + Print Action */}
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300 border-t border-slate-800 pt-3 mb-4">
            <div>
              <span className="text-slate-400 block text-[10px]">Fee Status</span>
              <strong className={profile.feeSummary.balance === 0 ? "text-emerald-400" : "text-amber-400"}>
                {profile.feeSummary.status} (₹{profile.feeSummary.balance})
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Bus Route</span>
              <strong className="text-white">
                {profile.transport.opted ? profile.transport.busNumber : "Private"}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Conduct</span>
              <strong className="text-emerald-400">Exemplary</strong>
            </div>
          </div>

          <div className="flex gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              className={`flex-1 py-2.5 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                isState ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Print ID &amp; Full Record</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* COMPLETE DETAILS PANELS: #1 STUDENT DETAILS -> #2 PARENTS DETAILS RIGHT AT TOP AFTER STUDENT DETAILS -> ADMISSION & TRANSPORT */}
        <div className={`${compact ? "" : "xl:col-span-7"} grid grid-cols-1 md:grid-cols-2 gap-4`}>
          {/* 1. STUDENT DETAILS (FIRST AT TOP) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" /> 1. Student Details
              </h3>
              <span className="text-[10px] font-mono text-slate-400">{profile.humanId}</span>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Full Name</dt>
                <dd className="font-bold text-slate-900 text-right">{profile.fullName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Class / Section / Roll</dt>
                <dd className="font-bold text-slate-900">
                  {profile.className} - {profile.section} (#{profile.rollNumber})
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Date of Birth</dt>
                <dd className="font-semibold text-slate-800">{profile.dob}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Gender &amp; Blood Group</dt>
                <dd className="font-semibold text-slate-800">{profile.gender} ({profile.bloodGroup})</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Nationality / Tongue</dt>
                <dd className="font-semibold text-slate-800">{profile.nationality} • {profile.motherTongue}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Aadhaar Status</dt>
                <dd className="font-mono text-[11px] font-semibold text-emerald-700">{profile.aadhaarMasked}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Portal Email ID</dt>
                <dd className="font-mono text-[11px] text-blue-700 truncate max-w-[180px]" title={profile.studentEmail}>
                  {profile.studentEmail}
                </dd>
              </div>
            </dl>
          </div>

          {/* 2. PARENT / GUARDIAN DETAILS (AT TOP IMMEDIATELY AFTER STUDENT DETAILS) */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500/25 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" /> 2. Parent / Guardian Details
              </h3>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Primary Contact
              </span>
            </div>
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Parent / Guardian Name</dt>
                <dd className="font-bold text-slate-900 text-right">{profile.guardianName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Emergency Mobile</dt>
                <dd className="font-mono font-bold text-slate-900">{profile.guardianPhone}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Guardian Email
                </dt>
                <dd className="font-mono text-[11px] text-slate-700 truncate max-w-[180px]" title={profile.guardianEmail}>
                  {profile.guardianEmail}
                </dd>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <dt className="text-slate-500 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 text-red-500" /> Residential Address
                </dt>
                <dd className="font-medium text-slate-800">{profile.address}</dd>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900">
                Authorized Guardian Gate Pickup &amp; SMS Alerts Active
              </div>
            </dl>
          </div>

          {/* 3. ADMISSION & BOARD REGISTRATION */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" /> 3. Admission &amp; Board Registration
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {profile.academicYear}
              </span>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Admission Number</dt>
                <dd className="font-mono font-bold text-blue-700">{profile.admissionNo}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Date of Admission</dt>
                <dd className="font-semibold text-slate-800">{profile.admissionDate}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Education Board</dt>
                <dd className="font-semibold text-slate-800 text-right">{profile.boardBadge}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Medium of Study</dt>
                <dd className="font-semibold text-slate-800">{profile.medium}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Class Teacher</dt>
                <dd className="font-semibold text-slate-800 text-right">{profile.classTeacher}</dd>
              </div>
            </dl>
          </div>

          {/* 4. School Bus & Campus Commute */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-amber-600" /> 4. Transport &amp; Commute Record
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  profile.transport.opted
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {profile.transport.opted ? "School Bus Opted" : "Parent / Private Drop"}
              </span>
            </div>
            {profile.transport.opted ? (
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Bus &amp; Vehicle No.</dt>
                  <dd className="font-mono font-bold text-slate-900">
                    {profile.transport.busNumber} ({profile.transport.vehicleNumber})
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Assigned Route</dt>
                  <dd className="font-semibold text-slate-800 text-right">{profile.transport.routeName}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Pickup / Drop Stop</dt>
                  <dd className="font-semibold text-slate-800 text-right">{profile.transport.pickupStop}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Timings</dt>
                  <dd className="font-mono text-slate-700">
                    {profile.transport.pickupTime} – {profile.transport.dropTime}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Driver Contact</dt>
                  <dd className="font-medium text-slate-800">
                    {profile.transport.driverName} ({profile.transport.driverPhone})
                  </dd>
                </div>
              </dl>
            ) : (
              <div className="text-xs text-slate-600 space-y-2">
                <p>Student commutes via authorized parent / guardian pickup and drop-off.</p>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                  Campus Gate Verification: Verified against Guardian Phone{" "}
                  <strong className="font-mono text-slate-900">{profile.guardianPhone}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HISTORY SECTION HEADER & FILTER PILLS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">
              Complete Student Academic, Attendance, Fee &amp; Conduct History
            </h2>
            <p className="text-[11px] text-slate-500">
              Historical school records for {profile.fullName} (Admission No: {profile.admissionNo})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs">
          {(
            [
              { key: "ALL", label: "All History" },
              { key: "ACADEMIC", label: "Academic & Marks" },
              { key: "ATTENDANCE", label: "Attendance Log" },
              { key: "FEES", label: "Fee Ledger" },
              { key: "CONDUCT", label: "Conduct & Vault" },
            ] as { key: HistoryFilter; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setHistoryTab(tab.key)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                historyTab === tab.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* HISTORY 1: ACADEMIC PROGRESSION & SUBJECT MARKS */}
      {showSection("ACADEMIC") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Year-wise Enrollment & Promotion History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Enrollment &amp; Class Progression History
                </h3>
              </div>
              <span className="text-[11px] font-bold text-blue-700">{profile.academicHistory.length} Years</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[10px]">
                    <th className="p-3">Academic Year</th>
                    <th className="p-3">Standard</th>
                    <th className="p-3">Score / Grade</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {profile.academicHistory.map((item) => (
                    <tr key={item.academicYear} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-slate-800">{item.academicYear}</td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{item.className}</span>
                        <span className="text-[10px] text-slate-500">{item.board}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-extrabold text-slate-900">{item.percentage}</span>
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                          {item.grade}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status.includes("Active")
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Year Subject Performance */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Current Assessment Performance ({profile.academicYear})
                </h3>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-700">
                Overall: {profile.overallPct} ({profile.overallGrade})
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[10px]">
                    <th className="p-3">Code</th>
                    <th className="p-3">Subject / Domain</th>
                    <th className="p-3">Marks</th>
                    <th className="p-3">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {profile.subjectPerformance.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono text-slate-500 font-bold">{sub.code}</td>
                      <td className="p-3 font-semibold text-slate-900">{sub.subject}</td>
                      <td className="p-3 font-mono font-bold text-slate-800">
                        {sub.obtainedMarks} / {sub.maxMarks}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY 2: ATTENDANCE & FEE PAYMENT LEDGER */}
      {(showSection("ATTENDANCE") || showSection("FEES")) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance History */}
          {showSection("ATTENDANCE") && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Attendance History ({profile.academicYear})
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {profile.attendanceSummary.percentage}% ({profile.attendanceSummary.presentDays}/
                  {profile.attendanceSummary.workingDays} Days) •{" "}
                  {profile.attendanceSummary.eligible ? "Board Exam Eligible" : "Below 75%"}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[10px]">
                      <th className="p-3">Month</th>
                      <th className="p-3">Working</th>
                      <th className="p-3">Present</th>
                      <th className="p-3">Absent</th>
                      <th className="p-3">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {profile.attendanceHistory.map((m) => (
                      <tr key={m.month} className="hover:bg-slate-50/60">
                        <td className="p-3 font-bold text-slate-900">{m.month}</td>
                        <td className="p-3 text-slate-600">{m.workingDays}</td>
                        <td className="p-3 font-semibold text-emerald-700">{m.present}</td>
                        <td className="p-3 text-rose-600">{m.absent}</td>
                        <td className="p-3 font-bold text-slate-900">{m.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fee Payment Ledger History */}
          {showSection("FEES") && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      Fee Payment &amp; Receipt History
                    </h3>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      profile.feeSummary.balance === 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    Paid: ₹{profile.feeSummary.paidAmount.toLocaleString("en-IN")} | Dues: ₹
                    {profile.feeSummary.balance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[10px]">
                        <th className="p-3">Receipt No.</th>
                        <th className="p-3">Term &amp; Method</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {profile.feeHistory.map((f) => (
                        <tr key={f.receiptNo} className="hover:bg-slate-50/60">
                          <td className="p-3 font-mono font-bold text-blue-700">{f.receiptNo}</td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{f.term}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{f.method}</span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">₹{f.amount.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-slate-600 whitespace-nowrap">{f.date}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                f.status === "PAID"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : f.status === "PARTIAL"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {f.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Annual Fee</span>
                  <strong className="text-slate-900">₹{profile.feeSummary.annualFee.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Settled</span>
                  <strong className="text-emerald-700">₹{profile.feeSummary.paidAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Balance Due</span>
                  <strong className={profile.feeSummary.balance === 0 ? "text-blue-700" : "text-rose-700"}>
                    ₹{profile.feeSummary.balance.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HISTORY 3: CONDUCT, CO-SCHOLASTIC HIGHLIGHTS & VERIFIED DOCUMENT VAULT */}
      {showSection("CONDUCT") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conduct & Co-Scholastic History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Conduct, Library &amp; Co-Scholastic History
                </h3>
                <p className="text-[11px] text-slate-500">
                  Overall Character, Discipline &amp; Holistic Skills Record
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                {profile.conductAndMilestones.conductRating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Disciplinary Record</span>
                <span className="font-bold text-slate-900">{profile.conductAndMilestones.disciplinaryRemarks}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Library Record</span>
                <span className="font-bold text-slate-900">{profile.conductAndMilestones.libraryStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {profile.conductAndMilestones.coScholasticHighlights.map((cs) => (
                <div key={cs.area} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{cs.area}</span>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      Grade {cs.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{cs.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Document Vault */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Verified Student Document Vault</h3>
                <p className="text-[11px] text-slate-500">
                  Official institutional records &amp; statutory certificates under DPDP Act protections
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                {
                  title: "Birth Certificate & Age Proof",
                  subtitle: `Verified DOB: ${profile.dob} · Government of Karnataka`,
                  color: "text-blue-600",
                },
                {
                  title: isState
                    ? "Karnataka CCE Cumulative Academic Record"
                    : "CBSE Cumulative Academic Transcript",
                  subtitle: `Admission #${profile.admissionNo} · Enrolled ${profile.admissionDate}`,
                  color: "text-emerald-600",
                },
                {
                  title: "Aadhaar Identity Record",
                  subtitle: `${profile.aadhaarMasked} · Masked Statutory Copy`,
                  color: "text-purple-600",
                },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className={`w-5 h-5 ${doc.color} shrink-0`} />
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block truncate">{doc.title}</span>
                      <span className="text-[11px] text-slate-500 block truncate">{doc.subtitle}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSummary(doc.title)}
                    className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white border border-slate-200 shrink-0"
                    title={`Download ${doc.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
