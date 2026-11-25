"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Layers, BookOpen, Plus, CheckCircle2, Award, Settings } from "lucide-react";
import { BOARD_TEMPLATES } from "@/lib/board-engine";
import { useBoard } from "@/lib/board-context";

export default function AdminAcademicsPage() {
  const { board } = useBoard();
  const isState = board === "state";
  const [activeTab, setActiveTab] = useState<"classes" | "subjects" | "board">("classes");

  const stateClasses = [
    { name: "Standard 1", sections: ["EM (English Medium)", "KM (Kannada Medium)"], campus: "State Primary Wing", students: 64 },
    { name: "Standard 3", sections: ["EM", "KM"], campus: "State Primary Wing", students: 72 },
    { name: "Standard 5", sections: ["EM", "KM"], campus: "State Middle Wing", students: 86 },
    { name: "Standard 8", sections: ["EM (Section A)", "EM (Section B)", "KM"], campus: "State High School Wing", students: 118 },
    { name: "Standard 9", sections: ["EM", "KM"], campus: "State High School Wing", students: 125 },
    { name: "Standard 10 (SSLC)", sections: ["EM", "KM"], campus: "State High School Wing", students: 132 },
  ];

  const cbseClasses = [
    { name: "Class 1", sections: ["A", "B"], campus: "Junior CBSE Wing", students: 60 },
    { name: "Class 3", sections: ["A", "B"], campus: "Junior CBSE Wing", students: 64 },
    { name: "Class 6", sections: ["A", "B", "C"], campus: "Middle CBSE Wing", students: 96 },
    { name: "Class 8", sections: ["A", "B"], campus: "Middle CBSE Wing", students: 70 },
    { name: "Class 9", sections: ["A", "B"], campus: "Senior CBSE Wing", students: 78 },
    { name: "Class 10 (Board)", sections: ["A", "B"], campus: "Senior CBSE Wing", students: 82 },
  ];

  const stateSubjects = [
    { code: "01K", name: "First Language: Kannada (Compulsory)", type: "First Language", maxMarks: 125 },
    { code: "02E", name: "Second Language: English", type: "Second Language", maxMarks: 100 },
    { code: "03H", name: "Third Language: Hindi", type: "Third Language", maxMarks: 100 },
    { code: "81M", name: "Core Mathematics (DSERT)", type: "Core Subject", maxMarks: 100 },
    { code: "83S", name: "General Science (Physics, Chemistry, Biology)", type: "Core Subject", maxMarks: 100 },
    { code: "85SS", name: "Social Science (Hist, Geo, Pol Sci, Econ)", type: "Core Subject", maxMarks: 100 },
    { code: "PHE", name: "Physical & Health Education", type: "Co-Scholastic", maxMarks: 50 },
    { code: "VAL", name: "Value Education & Moral Science", type: "Co-Scholastic", maxMarks: 50 },
  ];

  const cbseSubjects = [
    { code: "ENG-184", name: "English Language & Literature", type: "Language 1", maxMarks: 100 },
    { code: "HIN-002", name: "Hindi Course-A / Sanskrit", type: "Language 2", maxMarks: 100 },
    { code: "MAT-041", name: "Mathematics Standard (NCERT)", type: "Core Subject", maxMarks: 100 },
    { code: "SCI-086", name: "Science (Theory & Lab Practical)", type: "Core Subject", maxMarks: 100 },
    { code: "SOC-087", name: "Social Science", type: "Core Subject", maxMarks: 100 },
    { code: "AI-417", name: "Artificial Intelligence & Coding", type: "Skill Education", maxMarks: 100 },
  ];

  const classes = isState ? stateClasses : cbseClasses;
  const subjects = isState ? stateSubjects : cbseSubjects;

  const adminName = isState ? "Shri Mahadevappa Kulkarni" : "Dr. Sunitha Radhakrishnan";
  const adminRole = isState ? "Headmaster & State Board Admin" : "Principal & CBSE Admin";
  const adminId = isState ? "ADM-STATE-000001" : "ADM-CBSE-000001";

  return (
    <PortalLayout
      portal="admin"
      userName={adminName}
      userRole={adminRole}
      userHumanId={adminId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isState
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-blue-50 text-blue-800 border-blue-300"
              }`}
            >
              {isState ? "Karnataka State Board (KSEAB) Academic Registry" : "CBSE Board Academic Registry"}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Structure & Syllabus Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isState
              ? "Karnataka DSERT curriculum levels, CCE term configurations, and state language schemes."
              : "CBSE curriculum levels, NCERT subject allocations, and annual assessment rulesets."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "classes"
                ? isState
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Classes & Sections
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "subjects"
                ? isState
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Subjects & Syllabus
          </button>
          <button
            onClick={() => setActiveTab("board")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "board"
                ? isState
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isState ? "KSEAB CCE Rules" : "CBSE Scheme Rules"}
          </button>
        </div>
      </div>

      {activeTab === "classes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-extrabold text-slate-900">{c.name}</span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    isState
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-blue-700 bg-blue-50 border-blue-200"
                  }`}
                >
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
                <th className="p-4">Maximum Marks</th>
                <th className="p-4">Assessment Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {subjects.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50/70">
                  <td
                    className={`p-4 font-mono font-bold ${
                      isState ? "text-emerald-700" : "text-blue-700"
                    }`}
                  >
                    {s.code}
                  </td>
                  <td className="p-4 font-bold text-slate-900">{s.name}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {s.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold">{s.maxMarks}</td>
                  <td className="p-4 text-emerald-700 font-semibold">
                    {isState
                      ? "CCE Scheme (FA1-FA4 Formative + SA1-SA2 Summative)"
                      : "80 Marks Annual Board Exam + 20 Internal"}
                  </td>
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
              <h2 className="text-base font-bold text-slate-900">
                {isState
                  ? "Active Board Template: Karnataka State Board (KSEAB) 2026-27"
                  : "Active Board Template: CBSE 2026-27"}
              </h2>
              <p className="text-xs text-slate-500">
                {isState
                  ? "Continuous and Comprehensive Evaluation (CCE) & State SSLC 625 Marks Format"
                  : "Continuous Assessment & 9-Point Grading Scale Ruleset (500 Marks Scheme)"}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full border ${
                isState
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-blue-50 text-blue-700 border-blue-300"
              }`}
            >
              Version 2026.1 Active
            </span>
          </div>

          {isState ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-2">Karnataka CCE Grading Scale:</span>
                <ul className="space-y-1 text-slate-600">
                  <li>• <strong>A+ (Distinction)</strong>: 90% - 100% (Grade Point 10.0)</li>
                  <li>• <strong>A (First Class with Distinction)</strong>: 80% - 89.99% (GP 8.5)</li>
                  <li>• <strong>B+ (First Class)</strong>: 70% - 79.99% (GP 7.5)</li>
                  <li>• <strong>B (Second Class)</strong>: 60% - 69.99% (GP 6.5)</li>
                  <li>• <strong>C+ (Third Class)</strong>: 50% - 59.99% (GP 5.5)</li>
                  <li>• <strong>C (Pass)</strong>: 35% - 49.99% (GP 4.0)</li>
                  <li>• <strong>D (Needs Improvement)</strong>: Below 35% (Fail)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-2">CCE 6-Assessment Pattern:</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li>• <strong>FA-1 (25 Marks)</strong>: Activity 1 + Activity 2 + Unit Test.</li>
                  <li>• <strong>FA-2 (25 Marks)</strong>: Project work + assignment + slip test.</li>
                  <li>• <strong>SA-1 (50 Marks)</strong>: Mid-term summative written exam.</li>
                  <li>• <strong>FA-3 (25 Marks)</strong>: Continuous class observation & quiz.</li>
                  <li>• <strong>FA-4 (25 Marks)</strong>: Practical demonstration & viva.</li>
                  <li>• <strong>SA-2 (50 Marks)</strong>: Annual Board summative examination.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-2">CBSE 9-Point Grading Scale:</span>
                <ul className="space-y-1 text-slate-600">
                  <li>• <strong>A1</strong>: 91% - 100% (Top 1/8th of passed candidates, GP 10.0)</li>
                  <li>• <strong>A2</strong>: 81% - 90% (Next 1/8th, GP 9.0)</li>
                  <li>• <strong>B1</strong>: 71% - 80% (Next 1/8th, GP 8.0)</li>
                  <li>• <strong>B2</strong>: 61% - 70% (Next 1/8th, GP 7.0)</li>
                  <li>• <strong>C1</strong>: 51% - 60% (Next 1/8th, GP 6.0)</li>
                  <li>• <strong>C2</strong>: 41% - 50% (Next 1/8th, GP 5.0)</li>
                  <li>• <strong>D</strong>: 33% - 40% (Pass Criterion, GP 4.0)</li>
                  <li>• <strong>E</strong>: Below 33% (Essential Repeat, GP 0.0)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-2">CBSE Internal Assessment (20 Marks):</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li>• <strong>Periodic Tests (5 Marks)</strong>: Average of best 2 periodic assessments.</li>
                  <li>• <strong>Multiple Assessment (5 Marks)</strong>: Quizzes, oral tests, class assignments.</li>
                  <li>• <strong>Portfolio (5 Marks)</strong>: Classwork notebook presentation & neatness.</li>
                  <li>• <strong>Subject Enrichment (5 Marks)</strong>: Science practicals, language ASL, math lab.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </PortalLayout>
  );
}
