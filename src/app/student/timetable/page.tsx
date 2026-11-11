"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Calendar, Clock, MapPin } from "lucide-react";
import { DEMO_TIMETABLE_TODAY } from "@/lib/mock-data";

export default function StudentTimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Weekly Class Timetable</h1>
        <p className="text-xs text-slate-500 mt-1">Class 10 - Section A • Room 101 • Main Campus.</p>
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
