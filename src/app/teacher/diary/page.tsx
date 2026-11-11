"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  BookMarked,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Paperclip,
  Send,
  Users,
  Eye,
  BookOpen,
} from "lucide-react";

interface DiaryEntry {
  id: string;
  date: string;
  subject: string;
  className: string;
  section: string;
  topicCovered: string;
  homeworkTask: string;
  submissionDate: string;
  attachments: string[];
  readByCount: number;
  totalStudents: number;
}

export default function TeacherDiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "diary-001",
      date: "2026-11-11",
      subject: "Mathematics Standard",
      className: "Class 10",
      section: "A",
      topicCovered: "Chapter 4: Quadratic Equations - Derivation of Quadratic Formula and Nature of Roots",
      homeworkTask: "Complete NCERT Exercise 4.3 questions 1 to 6 in Homework Notebook. Revise discriminant formulas.",
      submissionDate: "2026-11-12",
      attachments: ["Quadratic_Formulas_Summary_Sheet.pdf"],
      readByCount: 38,
      totalStudents: 40,
    },
    {
      id: "diary-002",
      date: "2026-11-11",
      subject: "Mathematics Standard",
      className: "Class 10",
      section: "B",
      topicCovered: "Chapter 5: Arithmetic Progressions - nth Term Formula applications",
      homeworkTask: "NCERT Exercise 5.2 Question 10 to 18. Self-evaluate with standard solutions.",
      submissionDate: "2026-11-13",
      attachments: ["AP_Solved_Examples_Set2.pdf"],
      readByCount: 35,
      totalStudents: 40,
    },
  ]);

  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState("Mathematics Standard");
  const [newClass, setNewClass] = useState("Class 10-A");
  const [newTopic, setNewTopic] = useState("");
  const [newHomework, setNewHomework] = useState("");
  const [newDueDate, setNewDueDate] = useState("2026-11-12");

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic || !newHomework) return;

    const newEntry: DiaryEntry = {
      id: `diary-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      subject: newSubject,
      className: newClass.split("-")[0],
      section: newClass.split("-")[1] || "A",
      topicCovered: newTopic,
      homeworkTask: newHomework,
      submissionDate: newDueDate,
      attachments: ["Class_Notes_Nov11.pdf"],
      readByCount: 1,
      totalStudents: 40,
    };

    setEntries([newEntry, ...entries]);
    setShowNewModal(false);
    setNewTopic("");
    setNewHomework("");
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
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
              Edubricz-Compatible Digital Diary
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Parent Sync</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Classwork & Homework Diary
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish daily classroom topics, assign homework, share reference attachments, and track parent acknowledgements.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Daily Diary Entry</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Today&apos;s Diary Entries</span>
          <span className="text-2xl font-extrabold text-slate-900">{entries.length} Classes</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">✓ Synced to Parent Mobile App</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Class 10-A Parent Read Rate</span>
          <span className="text-2xl font-extrabold text-blue-700">95% (38/40)</span>
          <span className="text-[10px] text-slate-500 block mt-1">2 parents pending signature</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Homework Due Tomorrow</span>
          <span className="text-2xl font-extrabold text-amber-600">Exercise 4.3</span>
          <span className="text-[10px] text-slate-500 block mt-1">Quadratic Equations (Ex 1 to 6)</span>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm">
                  {entry.className.split(" ")[1]}-{entry.section}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{entry.subject}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {entry.className} - Section {entry.section}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Posted on {entry.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Eye className="w-3 h-3 text-emerald-600" />
                    {entry.readByCount} of {entry.totalStudents} Parents Acknowledged
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Classwork & Topics Covered Today:
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">{entry.topicCovered}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-amber-900 block">
                    Homework Task & Practice:
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due: {entry.submissionDate}
                  </span>
                </div>
                <p className="text-slate-900 font-medium leading-relaxed">{entry.homeworkTask}</p>
              </div>
            </div>

            {/* Attachments */}
            {entry.attachments.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Study Materials:</span>
                {entry.attachments.map((att, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all border"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    {att}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Add Diary Entry */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 text-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">Publish New Daily Diary Entry</h2>
            <p className="text-slate-500 text-xs mb-4">
              Dispatches instant push notifications and WhatsApp updates to enrolled parents.
            </p>

            <form onSubmit={handleCreateEntry} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Select Class:</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
                  >
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 10-B">Class 10-B</option>
                    <option value="Class 9-C">Class 9-C</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subject:</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
                  >
                    <option value="Mathematics Standard">Mathematics Standard</option>
                    <option value="Science (Physics)">Science (Physics)</option>
                    <option value="English Communicative">English Communicative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Classwork / Topics Covered Today:</label>
                <textarea
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Completed Chapter 4 Quadratic Formula derivation with examples."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Homework Task Assigned:</label>
                <textarea
                  value={newHomework}
                  onChange={(e) => setNewHomework(e.target.value)}
                  placeholder="e.g. Solve questions 1 to 6 of Exercise 4.3 in homework notebook."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Submission Deadline:</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Parents</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
