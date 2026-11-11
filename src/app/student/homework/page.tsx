"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { BookOpen, CheckCircle2, Clock, Download, UploadCloud } from "lucide-react";

export default function StudentHomeworkPage() {
  const homework = [
    {
      id: "hw-1",
      title: "Quadratic Equations Problem Set (Exercise 4.3)",
      subject: "Mathematics Standard",
      assignedBy: "Ms. Ananya Sharma",
      dueDate: "14 Nov 2026",
      status: "PENDING_SUBMISSION",
      description: "Solve problems 1 through 10 using factorization and the quadratic formula.",
    },
    {
      id: "hw-2",
      title: "Light: Reflection & Refraction Numerical Problems",
      subject: "Science (Physics)",
      assignedBy: "Mr. Vikram Hegde",
      dueDate: "09 Nov 2026",
      status: "SUBMITTED",
      description: "Mirror formula and magnification numericals from Chapter 10.",
    },
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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Homework & Study Materials</h1>
        <p className="text-xs text-slate-500 mt-1">Class 10-A assignments, practice worksheets, and digital study notes.</p>
      </div>

      <div className="space-y-4">
        {homework.map((h) => (
          <div key={h.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {h.subject}
                </span>
                <span className="text-xs text-slate-400">Due: {h.dueDate}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{h.title}</h3>
              <p className="text-xs text-slate-600 mt-1 mb-2">{h.description}</p>
              <span className="text-[11px] text-slate-400">Teacher: <strong className="text-slate-700">{h.assignedBy}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              {h.status === "SUBMITTED" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Submitted
                </span>
              ) : (
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" /> Upload Homework
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
