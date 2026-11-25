"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Calendar, Clock, MapPin } from "lucide-react";
import { DEMO_TIMETABLE_TODAY } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

export default function StudentTimetablePage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const isState = board === "state";

  const studentName = isState ? "Kiran Kumar S" : "Aarav Kashyap";
  const studentRole = isState ? "Student • Standard 8-EM (KSEAB)" : "Student • Class 10-A (CBSE)";
  const studentHumanId = isState ? "STU-SVVK-STA-000008" : "STU-SVVK-CBSE-000001";
  const institutionName = `${getSchoolName()} (${getBoardName()})`;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <PortalLayout
      portal="student"
      userName={studentName}
      userRole={studentRole}
      userHumanId={studentHumanId}
      institutionName={institutionName}
      academicYear="AY-2026-2027"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            isState ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-sky-100 text-sky-900 border border-sky-300"
          }`}>
            {getBoardName()}
          </span>
          <span className="text-xs text-slate-500 font-medium">Academic Schedule</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Weekly Class Timetable</h1>
        <p className="text-xs text-slate-500 mt-1">
          {isState ? "Standard 8 - Section EM (English Medium) • Room 204 • Hoskote Campus." : "Class 10 - Section A • Room 101 • Hoskote Campus."}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Period Schedule (Wednesday Highlight)</span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
            7 Daily Periods
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {DEMO_TIMETABLE_TODAY.map((p) => (
            <div key={p.period} className="p-4 flex items-center justify-between hover:bg-slate-50/70">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                  P{p.period}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.subject}</h3>
                  <p className="text-slate-500">{p.teacher} • {p.room}</p>
                </div>
              </div>
              <span className="font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-md font-semibold text-xs">
                {p.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
