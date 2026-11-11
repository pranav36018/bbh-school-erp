"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { MessageSquare, Plus, CheckCircle2, Megaphone, Send } from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";

export default function DirectorAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(DEMO_ANNOUNCEMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreate = () => {
    if (!newTitle) return;
    const item = {
      id: `ann-${Date.now()}`,
      title: newTitle,
      date: "Today",
      priority: "URGENT",
      target: "All Institutions & Staff",
      author: "Director's Office",
      content: newContent,
    };
    setAnnouncements([item, ...announcements]);
    setModalOpen(false);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="DPS Bengaluru & Group Schools"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Director Executive Circulars</h1>
          <p className="text-xs text-slate-500 mt-1">Broadcast official policy directives and board notices across all institutions.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Group Circular</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                ann.priority === "URGENT" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"
              }`}>
                {ann.priority}
              </span>
              <span className="text-xs text-slate-400">{ann.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{ann.title}</h3>
            <p className="text-xs text-slate-500 mb-3">Published by: <strong className="text-slate-700">{ann.author}</strong> • Target: {ann.target}</p>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{ann.content}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Publish Executive Circular</h3>
            <p className="text-xs text-slate-500 mb-4">
              This message will be instantly visible on all school portals (Admin, Teacher, Student).
            </p>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Circular Title / Subject"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl"
              />
              <textarea
                rows={4}
                placeholder="Full text of the executive directive..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
