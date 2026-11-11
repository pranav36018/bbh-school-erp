"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Award, FileText, Printer, CheckCircle2, QrCode } from "lucide-react";

export default function StudentAcademicsPage() {
  const results = [
    { subject: "English Language & Literature", max: 100, scored: 94, grade: "A1" },
    { subject: "Mathematics Standard", max: 100, scored: 96, grade: "A1" },
    { subject: "Science (Physics, Chem, Bio)", max: 100, scored: 91, grade: "A1" },
    { subject: "Social Science", max: 100, scored: 93, grade: "A1" },
    { subject: "Second Language (Kannada)", max: 100, scored: 95, grade: "A1" },
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Performance & Board Results</h1>
          <p className="text-xs text-slate-500 mt-1">Periodic Assessment 2 official scorecard and verified report card.</p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Progress Report</span>
        </button>
      </div>

      {/* Aggregate Scorecard */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            CBSE 9-Point Scale
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Aggregate: 469 / 500 (93.8%)</h2>
          <p className="text-xs text-slate-500 mt-1">Result: Promoted with Distinction • Rank in Class: #2 of 40</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-blue-700 block">A1</span>
            <span className="text-[11px] text-slate-400 font-semibold">Overall Grade</span>
          </div>
          <div className="w-16 h-16 bg-slate-50 p-1 rounded-xl border flex items-center justify-center">
            <QrCode className="w-14 h-14 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Subject-Wise Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Subject</th>
              <th className="p-4">Theory (80)</th>
              <th className="p-4">Internal (20)</th>
              <th className="p-4">Total Scored (100)</th>
              <th className="p-4">CBSE Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {results.map((r) => (
              <tr key={r.subject} className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">{r.subject}</td>
                <td className="p-4">{Math.round(r.scored * 0.8)} / 80</td>
                <td className="p-4">{Math.round(r.scored * 0.2)} / 20</td>
                <td className="p-4 font-bold text-slate-900">{r.scored} / 100</td>
                <td className="p-4">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {r.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
