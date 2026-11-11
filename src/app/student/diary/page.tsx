"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  BookMarked,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Paperclip,
  CheckSquare,
  Square,
  Download,
  Award,
  Sparkles,
} from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function StudentDiaryPage() {
  const student = DEMO_STUDENTS[0]; // Aarav Kashyap

  const [diaryItems, setDiaryItems] = useState([
    {
      id: "diary-001",
      subject: "Mathematics Standard",
      teacher: "Ms. Ananya Sharma",
      topicCovered: "Chapter 4: Quadratic Equations - Nature of roots and discriminant formula",
      homeworkTask: "Complete NCERT Exercise 4.3 questions 1 to 6 in Homework Notebook.",
      dueDate: "Tomorrow, 12 Nov 2026",
      completed: true,
      attachment: "Quadratic_Formulas_Summary_Sheet.pdf",
      parentAcknowledged: true,
      parentSignedAt: "Today, 04:30 PM by Rajesh Kashyap",
    },
    {
      id: "diary-002",
      subject: "Science (Physics)",
      teacher: "Mr. Rajesh Nair",
      topicCovered: "Chapter 10: Light Reflection and Refraction - Lens Formula and Magnification",
      homeworkTask: "Solve numerical problems 12 to 16 from textbook page 186. Draw ray diagrams.",
      dueDate: "Friday, 13 Nov 2026",
      completed: false,
      attachment: "Lens_Ray_Diagrams_Reference.pdf",
      parentAcknowledged: true,
      parentSignedAt: "Today, 04:30 PM by Rajesh Kashyap",
    },
    {
      id: "diary-003",
      subject: "English Language & Literature",
      teacher: "Mrs. Jennifer D'Souza",
      topicCovered: "First Flight: Chapter 3 - Two Stories About Flying (His First Flight analysis)",
      homeworkTask: "Write character sketch of the young seagull and theme of conquering fear (150 words).",
      dueDate: "Tomorrow, 12 Nov 2026",
      completed: false,
      attachment: "First_Flight_Glossary.pdf",
      parentAcknowledged: false,
      parentSignedAt: "Pending parent signature",
    },
    {
      id: "diary-004",
      subject: "Social Science (History)",
      teacher: "Mr. Suresh Kulkarni",
      topicCovered: "Nationalism in India - The Non-Cooperation Movement and Salt Satyagraha",
      homeworkTask: "Mark Dandi, Champaran, and Kheda on outline map of India.",
      dueDate: "Monday, 16 Nov 2026",
      completed: false,
      attachment: "India_Map_Work_Guide.pdf",
      parentAcknowledged: false,
      parentSignedAt: "Pending parent signature",
    },
  ]);

  const toggleTask = (id: string) => {
    setDiaryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = diaryItems.filter((i) => i.completed).length;

  return (
    <PortalLayout
      portal="student"
      userName={student.fullName}
      userRole={`Student • ${student.className}-${student.section}`}
      userHumanId={student.humanId}
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
              Edubricz Digital School Diary
            </span>
            <span className="text-xs text-slate-400 font-mono">Today: Wednesday, 11 Nov 2026</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Classwork & Homework Diary
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review topics taught today in school, complete assigned homework tasks, and view parent acknowledgements.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
          <span className="font-semibold text-slate-600">Homework Progress:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-extrabold">
            {completedCount} of {diaryItems.length} Done
          </span>
        </div>
      </div>

      {/* Diary Feed */}
      <div className="space-y-4">
        {diaryItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${
              item.completed ? "border-emerald-200 bg-emerald-50/20" : "border-slate-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(item.id)}
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Toggle task completion"
                >
                  {item.completed ? (
                    <CheckSquare className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-300" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{item.subject}</h3>
                    {item.completed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Faculty: {item.teacher}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due: {item.dueDate}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Classwork Covered in School:
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">{item.topicCovered}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200">
                <span className="text-[10px] font-bold uppercase text-blue-900 block mb-1">
                  Assigned Homework Task:
                </span>
                <p className="text-slate-900 font-medium leading-relaxed">{item.homeworkTask}</p>
              </div>
            </div>

            {/* Bottom Bar: Attachments & Parent Signature */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Attached Material:</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer border">
                  <Download className="w-3 h-3 text-blue-600" />
                  {item.attachment}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                {item.parentAcknowledged ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Parent Signed: {item.parentSignedAt}
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Pending Parent Signature in Edubricz App
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
