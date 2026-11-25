"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Award, BookOpen, BarChart3, CheckCircle2, TrendingUp } from "lucide-react";
import { BOARD_TEMPLATES } from "@/lib/board-engine";

export default function DirectorAcademicsPage() {
  const boards = Object.values(BOARD_TEMPLATES);

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="Swamy Vivekananda Vidya Kendra Trust"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Benchmarks & Multi-Board Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">Comparative academic schemes across CBSE and Indian State Boards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {boards.map((b) => (
          <div key={b.boardType} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {b.boardType.replace(/_/g, " ")}
              </span>
              <span className="text-xs font-mono text-slate-400">Ruleset v{b.version}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Grading Scales & Assessment Scheme</h3>
            <p className="text-xs text-slate-500 mb-4">{b.assessmentPattern.terms[0]?.name}</p>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">Passing Scale</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {b.gradingRules.slice(0, 4).map((r) => (
                  <div key={r.grade} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="font-bold text-slate-900 block text-sm">{r.grade}</span>
                    <span className="text-[10px] text-slate-500">{r.minPercentage}% - {r.maxPercentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block mb-1">Languages Offered:</span>
              <p className="text-[11px] text-slate-500">{b.languageScheme.firstLanguage.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
