"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Layers, BookOpen, Plus, CheckCircle2, Award, Settings } from "lucide-react";
import { BOARD_TEMPLATES } from "@/lib/board-engine";

export default function AdminAcademicsPage() {
  const [activeTab, setActiveTab] = useState<"classes" | "subjects" | "board">("classes");

  const classes = [
    { name: "Nursery", sections: ["A", "B"], campus: "Junior Wing", students: 48 },
    { name: "Class 1", sections: ["A", "B", "C"], campus: "Junior Wing", students: 105 },
    { name: "Class 5", sections: ["A", "B", "C"], campus: "Junior Wing", students: 112 },
    { name: "Class 9", sections: ["A", "B", "C", "D"], campus: "Main Campus", students: 154 },
    { name: "Class 10", sections: ["A", "B", "C", "D"], campus: "Main Campus", students: 160 },
    { name: "Class 11", sections: ["A (Science)", "B (Commerce)"], campus: "Main Campus", students: 92 },
    { name: "Class 12", sections: ["A (Science)", "B (Commerce)"], campus: "Main Campus", students: 88 },
  ];

  const subjects = [
    { code: "ENG-101", name: "English Language & Literature", type: "Core", maxMarks: 100 },
    { code: "MAT-041", name: "Mathematics (Standard & Basic)", type: "Core", maxMarks: 100 },
    { code: "SCI-086", name: "Science (Physics, Chem, Bio)", type: "Core", maxMarks: 100 },
    { code: "SOC-087", name: "Social Science", type: "Core", maxMarks: 100 },
    { code: "KAN-015", name: "Kannada Language (2nd Lang)", type: "Language", maxMarks: 100 },
    { code: "HIN-002", name: "Hindi Course A", type: "Language", maxMarks: 100 },
    { code: "AI-417", name: "Artificial Intelligence & Coding", type: "Skill Education", maxMarks: 100 },
  ];

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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Structure & Board Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Configure class levels, sections, subjects, and CBSE curriculum templates.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "classes" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Classes & Sections
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "subjects" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Subjects & Syllabus
          </button>
          <button
            onClick={() => setActiveTab("board")}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "board" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            CBSE Scheme Rules
          </button>
        </div>
      </div>

      {activeTab === "classes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-extrabold text-slate-900">{c.name}</span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {c.campus}
                </span>
              </div>
              <div className="text-xs text-slate-600 space-y-1.5 border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sections:</span>
                  <span className="font-semibold">{c.sections.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Enrolled Students:</span>
                  <span className="font-bold text-slate-900">{c.students}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "subjects" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
                <th className="p-4">Subject Code</th>
                <th className="p-4">Subject Name</th>
                <th className="p-4">Classification</th>
                <th className="p-4">Assessment Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {subjects.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50/70">
                  <td className="p-4 font-mono font-bold text-blue-700">{s.code}</td>
                  <td className="p-4 font-bold text-slate-900">{s.name}</td>
                  <td className="p-4">{s.type}</td>
                  <td className="p-4 text-emerald-600 font-semibold">80 Marks Board Exam + 20 Internal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "board" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Board Template: CBSE 2026-27</h2>
              <p className="text-xs text-slate-500">Continuous Assessment & 9-Point Grading Scale Ruleset</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              Version 2026.1 Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2">9-Point Grading Scale:</span>
              <ul className="space-y-1 text-slate-600">
                <li>• <strong>A1</strong>: 91% - 100% (Grade Point 10.0)</li>
                <li>• <strong>A2</strong>: 81% - 90% (Grade Point 9.0)</li>
                <li>• <strong>B1</strong>: 71% - 80% (Grade Point 8.0)</li>
                <li>• <strong>B2</strong>: 61% - 70% (Grade Point 7.0)</li>
                <li>• <strong>C1</strong>: 51% - 60% (Grade Point 6.0)</li>
                <li>• <strong>C2</strong>: 41% - 50% (Grade Point 5.0)</li>
                <li>• <strong>D</strong>: 33% - 40% (Pass Criterion)</li>
                <li>• <strong>E</strong>: Below 33% (Essential Repeat)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2">Internal Assessment (20 Marks):</span>
              <ul className="space-y-1.5 text-slate-600">
                <li>• <strong>Periodic Tests (5 Marks)</strong>: Average of best 2 periodic assessments.</li>
                <li>• <strong>Multiple Assessment (5 Marks)</strong>: Quizzes, oral tests, class assignments.</li>
                <li>• <strong>Portfolio (5 Marks)</strong>: Classwork notebook presentation & neatness.</li>
                <li>• <strong>Subject Enrichment (5 Marks)</strong>: Science practicals, language ASL, math lab.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
