"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Sparkles, BookOpen, CheckCircle2, Clock, Plus } from "lucide-react";
import { AiEngine } from "@/lib/ai-engine";

export default function TeacherLessonPlansPage() {
  const [topic, setTopic] = useState("Quadratic Equations & Roots");
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<any | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const generated = AiEngine.generateLessonPlanDraft({
        subject: "Mathematics Standard",
        grade: "Class 10",
        unitTitle: topic,
        learningOutcomes: [
          "Understand the standard form ax^2 + bx + c = 0 (a != 0)",
          "Derive roots using factoring and the quadratic formula",
          "Apply discriminant analysis (D > 0, D = 0, D < 0) to real-world projectile motion problems",
        ],
        durationMinutes: 45,
      });
      setPlan(generated);
      setGenerating(false);
    }, 1000);
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Pedagogical Lesson Planner</h1>
          <p className="text-xs text-slate-500 mt-1">
            Curriculum-linked lesson plan drafting aligned with Indian National Curriculum Framework (NCF) guidelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter chapter or topic..."
            className="p-2 border rounded-xl text-xs w-60"
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-xs shadow-sm hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{generating ? "Drafting Plan..." : "Generate AI Plan"}</span>
          </button>
        </div>
      </div>

      {plan ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                NCF 2023 Aligned
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{plan.title}</h2>
              <p className="text-xs text-slate-500">Duration: {plan.durationMinutes} Minutes • Status: {plan.status}</p>
            </div>
            <button className="px-3.5 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-xl">
              Save to Teaching Diary
            </button>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-xs uppercase mb-2">Pedagogical Learning Outcomes</h3>
            <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border">
              {plan.learningOutcomes.map((lo: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{lo}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-xs uppercase mb-2">Classroom Execution Phases (45 Mins)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {plan.lessonPhases.map((phase: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900">{phase.phase}</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {phase.timeMins} Mins
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{phase.activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-xs text-blue-900">
            <strong>Homework Task Suggested:</strong> {plan.homeworkSuggested}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No Lesson Plan Selected</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Click &quot;Generate AI Plan&quot; above to create a structured classroom pedagogy plan aligned with CBSE competencies.
          </p>
        </div>
      )}
    </PortalLayout>
  );
}
