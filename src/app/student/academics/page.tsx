"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Award, FileText, Printer, CheckCircle2, QrCode, BookOpen, Layers } from "lucide-react";
import { useBoard } from "@/lib/board-context";
import { STATE_ACADEMIC_REPORT, CBSE_ACADEMIC_REPORT } from "@/lib/mock-data";

export default function StudentAcademicsPage() {
  const { board } = useBoard();
  const isState = board === "state";
  const report = isState ? STATE_ACADEMIC_REPORT : CBSE_ACADEMIC_REPORT;

  return (
    <PortalLayout
      portal="student"
      userName={report.studentName}
      userRole={`Student • ${report.className}`}
      userHumanId={isState ? "STU-STATE-000042" : "STU-CBSE-000012"}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isState
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-blue-50 text-blue-800 border-blue-300"
              }`}
            >
              {isState ? "Karnataka State Board (KSEAB) · CCE Pattern" : "CBSE Board · NCERT Standards"}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Performance & Official Marksheet
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified {isState ? "Karnataka CCE Evaluation" : "CBSE Annual Assessment"} report card.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-white font-semibold text-xs rounded-xl shadow-sm transition-all ${
            isState ? "bg-emerald-700 hover:bg-emerald-800" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Marksheet</span>
        </button>
      </div>

      {/* Aggregate Scorecard Banner */}
      <div
        className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${
          isState ? "bg-emerald-50/50 border-emerald-200" : "bg-blue-50/50 border-blue-200"
        }`}
      >
        <div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isState
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : "bg-blue-100 text-blue-800 border-blue-300"
            }`}
          >
            {report.evaluationScheme.split("(")[0]}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Aggregate: {report.totalObtained} / {report.totalMax} ({report.percentage}%)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Status: <strong className="text-emerald-700">{report.resultStatus}</strong> • Attendance:{" "}
            <strong>{report.attendancePercentage}%</strong> ({report.attendanceDays}/{report.totalWorkingDays} days)
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Grading Scale: {report.gradingScale}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span
              className={`text-5xl font-black block ${
                isState ? "text-emerald-700" : "text-blue-700"
              }`}
            >
              {report.overallGrade}
            </span>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              {isState ? "CCE Distinction" : "CBSE Grade"}
            </span>
          </div>
          <div className="w-18 h-18 bg-white p-1.5 rounded-2xl border shadow-sm flex items-center justify-center">
            <QrCode className="w-16 h-16 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Scholastic Subject-Wise Evaluation Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Part 1: Scholastic Academic Evaluation</h3>
            <p className="text-xs text-slate-500">
              {isState
                ? "Karnataka State Board 6-Subject Scheme including 1st Language Kannada (125 Marks)"
                : "CBSE 5-Subject Scheme (Theory 80 Marks + Internal 20 Marks)"}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            Total Subjects: {report.subjects.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b text-slate-600 font-bold uppercase text-[11px]">
                <th className="p-4">Code</th>
                <th className="p-4">Subject Name</th>
                <th className="p-4">Evaluation Breakdown</th>
                <th className="p-4">Maximum</th>
                <th className="p-4">Marks Scored</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Faculty Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {report.subjects.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-500">{s.code}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{s.name}</span>
                    {s.isLanguage && (
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Language Paper
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5">
                      {s.components?.map((c) => (
                        <div key={c.name} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          <span>{c.name}:</span>
                          <strong className="text-slate-700">
                            {c.scored}/{c.max}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-600">{s.maxMarks}</td>
                  <td className="p-4 font-bold text-slate-900 font-mono text-sm">
                    {s.obtainedMarks}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-xs border ${
                        isState
                          ? "text-emerald-700 bg-emerald-50 border-emerald-300"
                          : "text-blue-700 bg-blue-50 border-blue-300"
                      }`}
                    >
                      {s.grade}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs">{s.remarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/80 font-bold border-t-2 border-slate-200 text-slate-900">
                <td colSpan={3} className="p-4 text-right uppercase tracking-wider text-xs">
                  Grand Total
                </td>
                <td className="p-4 font-mono">{report.totalMax}</td>
                <td className="p-4 font-mono text-base text-emerald-700">{report.totalObtained}</td>
                <td className="p-4 font-mono">{report.overallGrade}</td>
                <td className="p-4 text-emerald-800">{report.resultStatus}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Part 2: Co-Scholastic & Life Skills */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-sm text-slate-900 mb-1">
          Part 2: Co-Scholastic Activities & Personality Development
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Holistic evaluation in physical education, values, art, and discipline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.coScholastic.map((cs) => (
            <div key={cs.skill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">{cs.skill}</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Grade {cs.grade}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{cs.remarks}</p>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
