"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Award, Plus, CheckCircle2, FileText, QrCode, Lock, Printer } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { calculateBoardGrade } from "@/lib/board-engine";
import { useBoard } from "@/lib/board-context";

export default function AdminExaminationsPage() {
  const { board } = useBoard();
  const isState = board === "state";

  const defaultExam = isState ? "Summative Assessment 1 (SA-1)" : "Periodic Assessment 2";
  const [selectedExam, setSelectedExam] = useState(defaultExam);
  const [reportCardStudent, setReportCardStudent] = useState<any | null>(null);

  const stateExamSubjects = [
    { name: "First Language: Kannada", max: 125, pass: 44 },
    { name: "Second Language: English", max: 100, pass: 35 },
    { name: "Third Language: Hindi", max: 100, pass: 35 },
    { name: "Core Mathematics", max: 100, pass: 35 },
    { name: "General Science", max: 100, pass: 35 },
    { name: "Social Science", max: 100, pass: 35 },
  ];

  const cbseExamSubjects = [
    { name: "English Language & Lit", max: 100, pass: 33 },
    { name: "Mathematics Standard", max: 100, pass: 33 },
    { name: "Science (Theory & Lab)", max: 100, pass: 33 },
    { name: "Social Science", max: 100, pass: 33 },
    { name: "Second Language (Hindi/Sanskrit)", max: 100, pass: 33 },
  ];

  const examSubjects = isState ? stateExamSubjects : cbseExamSubjects;

  const adminName = isState ? "Shri Mahadevappa Kulkarni" : "Dr. Sunitha Radhakrishnan";
  const adminRole = isState ? "Headmaster & State Board Admin" : "Principal & CBSE Admin";
  const adminId = isState ? "ADM-STATE-000001" : "ADM-CBSE-000001";

  return (
    <PortalLayout
      portal="admin"
      userName={adminName}
      userRole={adminRole}
      userHumanId={adminId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isState
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-blue-50 text-blue-800 border-blue-300"
              }`}
            >
              {isState ? "Karnataka State Board CCE Grading" : "CBSE Board Assessment Engine"}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isState ? "State Board CCE Examination & Marks Engine" : "CBSE Examination & Assessment Engine"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isState
              ? "Karnataka KSEAB 6-subject CCE evaluation (625 Marks total, FA1-FA4 & SA1-SA2) with automated A+ distinction grading."
              : "CBSE Continuous Assessment, automated 9-point grade calculation, and tamper-proof report cards."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Active Exam:</span>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="p-2 border rounded-xl bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {isState ? (
              <>
                <option>Formative Assessment 1 (FA-1)</option>
                <option>Formative Assessment 2 (FA-2)</option>
                <option>Summative Assessment 1 (SA-1 Mid-Term)</option>
                <option>Formative Assessment 3 (FA-3)</option>
                <option>Formative Assessment 4 (FA-4)</option>
                <option>Summative Assessment 2 (SA-2 Annual Board)</option>
              </>
            ) : (
              <>
                <option>Periodic Assessment 1</option>
                <option>Periodic Assessment 2</option>
                <option>Half-Yearly Summative Exam</option>
                <option>Annual Board Mock Assessment</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Class 10 Marks Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Class 10-A Marks Sheet ({selectedExam})</span>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Marks Sealed & Locked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
                <th className="p-4">Student</th>
                <th className="p-4">English</th>
                <th className="p-4">Maths</th>
                <th className="p-4">Science</th>
                <th className="p-4">Social Sci</th>
                <th className="p-4">2nd Lang</th>
                <th className="p-4">Aggregate</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_STUDENTS.map((stu, i) => {
                const marks = [
                  i === 0 ? 94 : i === 1 ? 98 : i === 2 ? 78 : i === 3 ? 88 : 52,
                  i === 0 ? 96 : i === 1 ? 99 : i === 2 ? 82 : i === 3 ? 91 : 48,
                  i === 0 ? 91 : i === 1 ? 97 : i === 2 ? 80 : i === 3 ? 85 : 55,
                  i === 0 ? 93 : i === 1 ? 95 : i === 2 ? 76 : i === 3 ? 89 : 50,
                  i === 0 ? 95 : i === 1 ? 98 : i === 2 ? 84 : i === 3 ? 90 : 54,
                ];
                const total = marks.reduce((a, b) => a + b, 0);
                const gradeInfo = calculateBoardGrade(total, 500, "CBSE");

                return (
                  <tr key={stu.id} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                      <span className="font-mono text-[11px] text-blue-700">{stu.humanId}</span>
                    </td>
                    <td className="p-4">{marks[0]}/100</td>
                    <td className="p-4">{marks[1]}/100</td>
                    <td className="p-4">{marks[2]}/100</td>
                    <td className="p-4">{marks[3]}/100</td>
                    <td className="p-4">{marks[4]}/100</td>
                    <td className="p-4 font-bold text-slate-900">{total}/500 ({gradeInfo.percentage}%)</td>
                    <td className="p-4">
                      <span className="font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                        {gradeInfo.grade}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setReportCardStudent({ ...stu, marks, total, gradeInfo })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Generate</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official CBSE Report Card Modal */}
      {reportCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center border-b pb-4 mb-4">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Affiliated to CBSE, New Delhi • Affiliation No. 830123</span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">DELHI PUBLIC SCHOOL BENGALURU NORTH</h2>
              <p className="text-xs text-slate-500">Kogilu Main Road, Yelahanka, Bengaluru - 560064</p>
              <h3 className="text-sm font-bold text-blue-700 mt-2 bg-blue-50 py-1 rounded-md">
                ACADEMIC PROGRESS REPORT CARD • AY-2026-2027
              </h3>
            </div>

            {/* Student Meta */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border">
              <div>Student Name: <strong className="text-slate-900">{reportCardStudent.fullName}</strong></div>
              <div>Permanent ID: <strong className="font-mono text-blue-700">{reportCardStudent.humanId}</strong></div>
              <div>Class & Section: <strong>{reportCardStudent.className} - {reportCardStudent.section}</strong></div>
              <div>Admission No: <strong className="font-mono">{reportCardStudent.admissionNo}</strong></div>
              <div>Roll Number: <strong>#{reportCardStudent.rollNumber}</strong></div>
              <div>Attendance: <strong className="text-emerald-700">{reportCardStudent.attendancePct}%</strong></div>
            </div>

            {/* Scholastic Table */}
            <table className="w-full text-left border-collapse text-xs mb-4 border">
              <thead>
                <tr className="bg-slate-100 border-b text-slate-600 font-bold">
                  <th className="p-2.5">Subject</th>
                  <th className="p-2.5">Max Marks</th>
                  <th className="p-2.5">Marks Scored</th>
                  <th className="p-2.5">CBSE Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {examSubjects.map((sub, idx) => (
                  <tr key={sub.name}>
                    <td className="p-2.5 font-medium">{sub.name}</td>
                    <td className="p-2.5">{sub.max}</td>
                    <td className="p-2.5 font-bold text-slate-900">{reportCardStudent.marks[idx]}</td>
                    <td className="p-2.5 font-bold text-blue-700">
                      {reportCardStudent.marks[idx] >= 90 ? "A1" : reportCardStudent.marks[idx] >= 80 ? "A2" : reportCardStudent.marks[idx] >= 70 ? "B1" : "B2"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Co-Scholastic & Overall */}
            <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-700 mb-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Overall Result: PROMOTED (Passed with Distinction)</span>
                <span className="text-slate-500">Aggregate: {reportCardStudent.total}/500 ({reportCardStudent.gradeInfo.percentage}%)</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-700 block">{reportCardStudent.gradeInfo.grade}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Overall Grade</span>
              </div>
            </div>

            {/* QR Verification Seal */}
            <div className="flex items-center justify-between border-t pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <QrCode className="w-10 h-10 text-slate-900" />
                <span className="text-[10px] text-slate-400 max-w-[200px]">
                  Official Digital Certificate. Scan QR to verify authenticity on board portal.
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-800 block">Dr. Sunitha Radhakrishnan</span>
                <span className="text-[10px]">Principal & Head of Institution</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setReportCardStudent(null)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
