"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Sparkles, FileText, CheckCircle2, Printer, Download } from "lucide-react";
import { AiEngine } from "@/lib/ai-engine";

export default function TeacherQuestionPaperPage() {
  const [generating, setGenerating] = useState(false);
  const [paper, setPaper] = useState<any | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const generated = AiEngine.generateQuestionPaperDraft({
        subject: "Mathematics Standard (Code 041)",
        grade: "Class 10",
        topics: ["Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations", "Triangles"],
        totalMarks: 40,
        distribution: {
          mcq: 5,
          shortAnswer: 5,
          longAnswer: 4,
        },
      });
      setPaper(generated);
      setGenerating(false);
    }, 1200);
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Assessment & Question Paper Engine</h1>
          <p className="text-xs text-slate-500 mt-1">
            Constructs balanced summative papers categorized under Bloom&apos;s Taxonomy (Recall, Application, Analysis).
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{generating ? "Generating Blueprint..." : "Create Question Paper"}</span>
        </button>
      </div>

      {paper ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center border-b pb-4">
            <span className="text-[10px] font-bold uppercase text-slate-400">DPS Bengaluru North • Department of Mathematics</span>
            <h2 className="text-lg font-extrabold text-slate-900 mt-1">{paper.paperTitle}</h2>
            <div className="flex justify-center gap-4 text-xs font-semibold text-slate-600 mt-2">
              <span>Time Allowed: {paper.durationMinutes} Mins</span>
              <span>•</span>
              <span>Maximum Marks: {paper.totalMarks}</span>
            </div>
          </div>

          <div className="space-y-4">
            {paper.questions.map((q: any) => (
              <div key={q.questionNumber} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-blue-700">{q.section}</span>
                  <span className="font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border">
                    [{q.marks} Mark{q.marks > 1 ? "s" : ""}] • {q.cognitiveLevel}
                  </span>
                </div>
                <p className="font-medium text-slate-900 text-sm mb-2">
                  Q{q.questionNumber}. {q.questionText}
                </p>
                {q.options && (
                  <div className="grid grid-cols-2 gap-2 text-slate-700 mt-2">
                    {q.options.map((opt: string, i: number) => (
                      <div key={i} className="p-2 bg-white rounded border">
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 text-xs pt-4 border-t">
            <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl flex items-center gap-1.5">
              <Printer className="w-4 h-4" /> Print Question Paper
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No Question Paper Generated Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Click &quot;Create Question Paper&quot; above to synthesize a test blueprint with Bloom&apos;s Taxonomy distributions.
          </p>
        </div>
      )}
    </PortalLayout>
  );
}
