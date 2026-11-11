"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CheckSquare, Calendar, Award, CheckCircle2 } from "lucide-react";

export default function StudentAttendancePage() {
  const months = [
    { month: "June 2026", workingDays: 22, present: 21, absent: 1, pct: "95.5%" },
    { month: "July 2026", workingDays: 24, present: 23, absent: 1, pct: "95.8%" },
    { month: "August 2026", workingDays: 21, present: 20, absent: 1, pct: "95.2%" },
    { month: "September 2026", workingDays: 23, present: 22, absent: 1, pct: "95.6%" },
    { month: "October 2026", workingDays: 20, present: 19, absent: 1, pct: "95.0%" },
    { month: "November 2026 (MTD)", workingDays: 10, present: 10, absent: 0, pct: "100.0%" },
  ];

  return (
    <PortalLayout
      portal="student"
      userName="Aarav Kashyap"
      userRole="Student • Class 10-A"
      userHumanId="STU-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Personal Attendance Tracker</h1>
        <p className="text-xs text-slate-500 mt-1">
          Statutory requirement: Maintain minimum 75% attendance to qualify for CBSE Board Examinations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Cumulative Attendance</span>
          <span className="text-3xl font-extrabold text-emerald-600">94.5%</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Eligible for Board Exams</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total School Days</span>
          <span className="text-3xl font-extrabold text-slate-900">120 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">June to November 2026</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Days Present</span>
          <span className="text-3xl font-extrabold text-blue-600">115 Days</span>
          <span className="text-[11px] text-slate-400 block mt-1">5 Days Excused Leave</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xs font-bold text-slate-900">Monthly Attendance History</h2>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Month</th>
              <th className="p-4">Working Days</th>
              <th className="p-4">Days Present</th>
              <th className="p-4">Days Absent</th>
              <th className="p-4">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {months.map((m) => (
              <tr key={m.month} className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">{m.month}</td>
                <td className="p-4">{m.workingDays}</td>
                <td className="p-4 text-emerald-700 font-semibold">{m.present}</td>
                <td className="p-4 text-red-600">{m.absent}</td>
                <td className="p-4 font-bold text-emerald-600">{m.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
