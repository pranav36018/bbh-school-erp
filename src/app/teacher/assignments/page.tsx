"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { BookOpen, Plus, CheckCircle2, Clock, UploadCloud, FileText } from "lucide-react";

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    {
      id: "asg-1",
      title: "Quadratic Formula Practice Set (NCERT Ex 4.3)",
      subject: "Mathematics Standard",
      dueDate: "14 Nov 2026",
      submittedCount: 36,
      totalCount: 40,
      status: "ACTIVE",
    },
    {
      id: "asg-2",
      title: "Real Numbers & Fundamental Theorem of Arithmetic (Quiz)",
      subject: "Mathematics Standard",
      dueDate: "05 Nov 2026",
      submittedCount: 40,
      totalCount: 40,
      status: "EVALUATED",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = () => {
    if (!newTitle) return;
    setAssignments([
      {
        id: `asg-${Date.now()}`,
        title: newTitle,
        subject: "Mathematics Standard",
        dueDate: dueDate || "18 Nov 2026",
        submittedCount: 0,
        totalCount: 40,
        status: "ACTIVE",
      },
      ...assignments,
    ]);
    setModalOpen(false);
    setNewTitle("");
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Homework & Study Materials</h1>
          <p className="text-xs text-slate-500 mt-1">Publish homework tasks, problem sheets, and PDF study notes for Class 10-A.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((asg) => (
          <div key={asg.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {asg.subject}
                </span>
                <span className="text-xs text-slate-400">Due: {asg.dueDate}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Submissions: <strong className="text-slate-800">{asg.submittedCount} / {asg.totalCount}</strong> students completed
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2.5 py-1 rounded-full font-bold ${
                asg.status === "ACTIVE" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}>
                {asg.status}
              </span>
              <button className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800">
                Review Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Create Classroom Assignment</h3>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Assignment Title & Chapter" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white" />
              <textarea rows={3} placeholder="Instructions for students..." className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold">Publish Task</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
