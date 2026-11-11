"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Calendar, Sparkles, CheckCircle2, Clock, Users, ArrowRight } from "lucide-react";
import { DEMO_TIMETABLE_TODAY } from "@/lib/mock-data";
import { AiEngine } from "@/lib/ai-engine";

export default function AdminTimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  const handleGenerateAiTimetable = () => {
    setAiGenerating(true);
    setTimeout(() => {
      const res = AiEngine.generateTimetableDraft({
        classes: ["Class 10"],
        sections: ["A"],
        subjects: [
          { name: "Mathematics Standard", weeklyPeriods: 6 },
          { name: "Science (Physics, Chem, Bio)", weeklyPeriods: 6 },
          { name: "English Language & Lit", weeklyPeriods: 5 },
          { name: "Social Science", weeklyPeriods: 5 },
          { name: "Second Language (Kannada/Hindi)", weeklyPeriods: 5 },
          { name: "Physical Education", weeklyPeriods: 3 },
          { name: "Artificial Intelligence Lab", weeklyPeriods: 3 },
        ],
        teachers: [
          { id: "tch-1", name: "Ms. Ananya Sharma", subject: "Mathematics Standard", maxDailyPeriods: 4 },
          { id: "tch-2", name: "Mr. Vikram Hegde", subject: "Science (Physics, Chem, Bio)", maxDailyPeriods: 4 },
          { id: "tch-3", name: "Ms. Priya Nair", subject: "English Language & Lit", maxDailyPeriods: 4 },
          { id: "tch-4", name: "Mr. Ramesh Bhat", subject: "Second Language (Kannada/Hindi)", maxDailyPeriods: 4 },
        ],
      });
      setAiResult(res);
      setAiGenerating(false);
    }, 1200);
  };

  return (
    <PortalLayout
      portal="admin"
      userName="Dr. Sunitha Radhakrishnan"
      userRole="Principal & School Admin"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Institutional Timetable & AI Scheduler</h1>
          <p className="text-xs text-slate-500 mt-1">Constraint satisfaction scheduler avoiding teacher overlap and room conflicts.</p>
        </div>

        <button
          onClick={handleGenerateAiTimetable}
          disabled={aiGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{aiGenerating ? "Optimizing Constraints..." : "AI Generate Timetable"}</span>
        </button>
      </div>

      {aiResult && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {aiResult.message} ({aiResult.totalPeriodsScheduled} weekly slots created with teacher workload limits enforced).
            </span>
          </div>
          <span className="font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
            DRAFT_PENDING_APPROVAL
          </span>
        </div>
      )}

      {/* Today's Schedule Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Today&apos;s Class 10-A Timetable Grid</h2>
            <p className="text-xs text-slate-500">7 Periods • 45 Minutes each • 1 Break & 1 Lunch</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            Room 101 (Main Campus)
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {DEMO_TIMETABLE_TODAY.map((p) => (
            <div key={p.period} className="p-4 flex items-center justify-between hover:bg-slate-50/70">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold">
                  <span className="text-[10px] text-slate-400 leading-none">P</span>
                  <span className="text-sm leading-none">{p.period}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.subject}</h3>
                  <p className="text-xs text-slate-500">Teacher: <strong className="text-slate-700">{p.teacher}</strong> • Room: {p.room}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  {p.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
