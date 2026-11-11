"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Star,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Award,
  Users,
  Calendar,
  Send,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface DisciplineRecord {
  id: string;
  studentName: string;
  humanId: string;
  className: string;
  type: "MERIT" | "DEMERIT";
  title: string;
  points: number;
  description: string;
  date: string;
  reportedBy: string;
  parentNotified: boolean;
}

export default function TeacherDisciplinePage() {
  const [filterType, setFilterType] = useState<"ALL" | "MERIT" | "DEMERIT">("ALL");

  const [records, setRecords] = useState<DisciplineRecord[]>([
    {
      id: "rec-001",
      studentName: "Aarav Kashyap",
      humanId: "STU-INS000001-000001",
      className: "Class 10-A",
      type: "MERIT",
      title: "State Mathematics Olympiad Gold Medalist",
      points: +10,
      description: "Secured Rank 1 in Karnataka State Level Inter-School Math Olympiad 2026.",
      date: "2026-11-08",
      reportedBy: "Ms. Ananya Sharma",
      parentNotified: true,
    },
    {
      id: "rec-002",
      studentName: "Diya Menon",
      humanId: "STU-INS000001-000002",
      className: "Class 10-A",
      type: "MERIT",
      title: "Environmental Sustainability Club Leadership",
      points: +5,
      description: "Organized campus zero-plastic drive and collected 40kg recyclable paper.",
      date: "2026-11-05",
      reportedBy: "Dr. Deepa Shenoy",
      parentNotified: true,
    },
    {
      id: "rec-003",
      studentName: "Karan Johar Patel",
      humanId: "STU-INS000001-000005",
      className: "Class 10-A",
      type: "DEMERIT",
      title: "Repeated Uniform & ID Card Default",
      points: -2,
      description: "Reported without formal school blazer and identity card for morning assembly.",
      date: "2026-11-10",
      reportedBy: "Discipline In-Charge Mr. Suresh",
      parentNotified: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState("Aarav Kashyap (10-A)");
  const [recordType, setRecordType] = useState<"MERIT" | "DEMERIT">("MERIT");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newRec: DisciplineRecord = {
      id: `rec-${Date.now()}`,
      studentName: studentName.split(" (")[0],
      humanId: "STU-INS000001-000001",
      className: "Class 10-A",
      type: recordType,
      title,
      points: recordType === "MERIT" ? 5 : -2,
      description,
      date: new Date().toISOString().split("T")[0],
      reportedBy: "Ms. Ananya Sharma",
      parentNotified: true,
    };

    setRecords([newRec, ...records]);
    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  const filtered =
    filterType === "ALL" ? records : records.filter((r) => r.type === filterType);

  const totalMerits = records.filter((r) => r.type === "MERIT").length;
  const totalDemerits = records.filter((r) => r.type === "DEMERIT").length;

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
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-600" />
              Edubricz 360° Student Profiling
            </span>
            <span className="text-xs text-slate-400 font-mono">Character & Conduct Registry</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Merit, Laurels & Disciplinary Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Record academic honors, sports achievements, citizenship badges, and disciplinary remarks with automated parent SMS intimation.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Incident / Laurel</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Class 10-A Merit Commendations</span>
          <span className="text-2xl font-extrabold text-emerald-600">{totalMerits} Laurels</span>
          <span className="text-[10px] text-slate-500 block mt-1">+15 Total Class Points</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Disciplinary Defaults</span>
          <span className="text-2xl font-extrabold text-rose-600">{totalDemerits} Defaults</span>
          <span className="text-[10px] text-slate-500 block mt-1">All parents notified via WhatsApp</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Class 10-A Conduct Index</span>
          <span className="text-2xl font-extrabold text-blue-700">96.8 / 100</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Grade: Exemplary (A+)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setFilterType("ALL")}
          className={`pb-3 transition-colors ${
            filterType === "ALL" ? "border-b-2 border-slate-900 text-slate-900" : "text-slate-500"
          }`}
        >
          All Entries ({records.length})
        </button>
        <button
          onClick={() => setFilterType("MERIT")}
          className={`pb-3 transition-colors ${
            filterType === "MERIT" ? "border-b-2 border-emerald-600 text-emerald-700" : "text-slate-500"
          }`}
        >
          Merits & Laurels ({totalMerits})
        </button>
        <button
          onClick={() => setFilterType("DEMERIT")}
          className={`pb-3 transition-colors ${
            filterType === "DEMERIT" ? "border-b-2 border-rose-600 text-rose-700" : "text-slate-500"
          }`}
        >
          Disciplinary Incidents ({totalDemerits})
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {filtered.map((r) => {
          const isMerit = r.type === "MERIT";

          return (
            <div
              key={r.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm text-xs transition-all ${
                isMerit ? "border-emerald-200 bg-emerald-50/15" : "border-rose-200 bg-rose-50/15"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold ${
                      isMerit ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isMerit ? <Award className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{r.title}</h4>
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          isMerit ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {isMerit ? `+${r.points} Points` : `${r.points} Points`}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Student: <strong>{r.studentName}</strong> • {r.className} ({r.humanId})
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  <span>{r.date}</span>
                </div>
              </div>

              <p className="text-slate-700 font-medium leading-relaxed mb-3">{r.description}</p>

              <div className="flex items-center justify-between pt-2 border-t text-[11px] text-slate-500">
                <span>Recorded by: <strong>{r.reportedBy}</strong></span>
                {r.parentNotified && (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Parent Notified via WhatsApp
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 text-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">Record Merit or Disciplinary Remark</h2>
            <p className="text-slate-500 text-xs mb-4">
              Adds to student&apos;s permanent 360-degree conduct dossier.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Student:</label>
                  <select
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="Aarav Kashyap (10-A)">Aarav Kashyap (10-A)</option>
                    <option value="Diya Menon (10-A)">Diya Menon (10-A)</option>
                    <option value="Rohan Gupta (10-A)">Rohan Gupta (10-A)</option>
                    <option value="Karan Johar Patel (10-A)">Karan Johar Patel (10-A)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Type:</label>
                  <select
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="MERIT">Merit / Achievement (+5 pts)</option>
                    <option value="DEMERIT">Disciplinary Default (-2 pts)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Incident / Laurel Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Science Exhibition 1st Prize or Late Arrival"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Remarks:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed notes for counseling dossier and parent notification..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log & Send Parent Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
