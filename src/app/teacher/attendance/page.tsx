"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CheckSquare, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState(
    DEMO_STUDENTS.map((s, idx) => ({
      ...s,
      status: idx === 4 ? "ABSENT" : "PRESENT",
    }))
  );

  const [saved, setSaved] = useState(false);

  const toggleStatus = (id: string) => {
    setStudents(
      students.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "PRESENT" ? "ABSENT" : "PRESENT" }
          : s
      )
    );
  };

  const markAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, status: "PRESENT" })));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = students.filter((s) => s.status === "PRESENT").length;

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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Class 10-A Daily Attendance</h1>
          <p className="text-xs text-slate-500 mt-1">Roll-call roster for Wednesday, 11 Nov 2026.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={markAllPresent}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm"
          >
            Submit & Lock Attendance
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance submitted successfully! ({presentCount} present, {students.length - presentCount} absent). Dispatched to school database.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Roll</th>
              <th className="p-4">Student ID & Name</th>
              <th className="p-4">Attendance Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {students.map((stu) => (
              <tr key={stu.id} className="hover:bg-slate-50/70">
                <td className="p-4 font-bold text-slate-900">#{stu.rollNumber}</td>
                <td className="p-4">
                  <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                  <span className="font-mono text-[11px] text-blue-700">{stu.humanId}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    stu.status === "PRESENT" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {stu.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(stu.id)}
                    className="px-3 py-1 rounded-lg border text-xs font-semibold hover:bg-slate-100"
                  >
                    Toggle {stu.status === "PRESENT" ? "Absent" : "Present"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
