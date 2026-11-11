"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Award, CheckCircle2, Lock, Save } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { calculateBoardGrade } from "@/lib/board-engine";

export default function TeacherMarksPage() {
  const [marksState, setMarksState] = useState<Record<string, number>>({
    "stu-001": 96,
    "stu-002": 99,
    "stu-003": 82,
    "stu-004": 91,
    "stu-005": 48,
  });

  const [saved, setSaved] = useState(false);

  const handleScoreChange = (id: string, val: string) => {
    const num = Math.min(Math.max(Number(val) || 0, 0), 100);
    setMarksState({ ...marksState, [id]: num });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PortalLayout
      portal="teacher"
      userName="Ms. Ananya Sharma"
      userRole="Senior Mathematics Faculty & Class 10-A In-Charge"
      userHumanId="TCH-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Marks & Assessment Entry</h1>
          <p className="text-xs text-slate-500 mt-1">Class 10-A • Mathematics Standard (Code: MAT-041) • Periodic Assessment 2.</p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Marks Draft</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Marks recorded and validated against CBSE 9-point scale.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Roll</th>
              <th className="p-4">Student</th>
              <th className="p-4">Theory (80 Max)</th>
              <th className="p-4">Internal (20 Max)</th>
              <th className="p-4">Total (100)</th>
              <th className="p-4">CBSE Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {DEMO_STUDENTS.map((stu) => {
              const currentScore = marksState[stu.id] ?? 80;
              const grade = calculateBoardGrade(currentScore, 100, "CBSE");

              return (
                <tr key={stu.id} className="hover:bg-slate-50/70">
                  <td className="p-4 font-bold text-slate-900">#{stu.rollNumber}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                    <span className="font-mono text-[11px] text-blue-700">{stu.humanId}</span>
                  </td>
                  <td className="p-4 font-semibold">{Math.round(currentScore * 0.8)} / 80</td>
                  <td className="p-4 font-semibold">{Math.round(currentScore * 0.2)} / 20</td>
                  <td className="p-4">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={currentScore}
                      onChange={(e) => handleScoreChange(stu.id, e.target.value)}
                      className="w-16 p-1.5 border rounded-lg font-bold text-slate-900 text-center text-xs"
                    />
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                      {grade.grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
