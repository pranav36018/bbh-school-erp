"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { MessageSquare, Plus, Send, CheckCircle2, PhoneCall, Mail } from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/lib/mock-data";

export default function AdminCommunicationPage() {
  const [announcements, setAnnouncements] = useState(DEMO_ANNOUNCEMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleBroadcast = () => {
    if (!title) return;
    setAnnouncements([
      {
        id: `ann-${Date.now()}`,
        title,
        date: "Today",
        priority: "NORMAL",
        target: "Class 10 Parents",
        author: "Principal's Office",
        content,
      },
      ...announcements,
    ]);
    setModalOpen(false);
    setTitle("");
    setContent("");
  };

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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Parent & Staff Communication Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Direct circulars, SMS broadcasts (DLT registered), and WhatsApp announcements.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New School Circular</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {ann.target}
              </span>
              <span className="text-xs text-slate-400">{ann.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{ann.title}</h3>
            <p className="text-xs text-slate-500 mb-3">Issued by: <strong className="text-slate-700">{ann.author}</strong></p>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{ann.content}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Publish Campus Circular</h3>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Circular Subject" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <textarea rows={4} placeholder="Circular Message..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleBroadcast} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Publish & Broadcast</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
