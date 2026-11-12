"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Clock, Calendar, CheckCircle2, MessageSquare, Plus, AlertCircle, Search, UserCheck, Video, MapPin, Filter } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function AdminPtmPage() {
  const [activeTab, setActiveTab] = useState<"PTM" | "COMPLAINTS">("PTM");
  const [filterClass, setFilterClass] = useState("ALL");

  const [ptmSlots, setPtmSlots] = useState([
    { id: "ptm-01", studentName: DEMO_STUDENTS[0]?.fullName || "Aarav Kashyap", admissionNo: DEMO_STUDENTS[0]?.admissionNo || "ADM-001", className: "Class 10", parentName: "Manish Kashyap", teacher: "Ms. Ananya Sharma", time: "10:00 AM - 10:15 AM", date: "15 Nov 2026", mode: "In-Person (Room 204)", status: "CONFIRMED" },
    { id: "ptm-02", studentName: DEMO_STUDENTS[1]?.fullName || "Diya Menon", admissionNo: DEMO_STUDENTS[1]?.admissionNo || "ADM-002", className: "Class 10", parentName: "Suresh Menon", teacher: "Ms. Ananya Sharma", time: "10:20 AM - 10:35 AM", date: "15 Nov 2026", mode: "Online (Google Meet)", status: "CONFIRMED" },
    { id: "ptm-03", studentName: DEMO_STUDENTS[2]?.fullName || "Rohan Gupta", admissionNo: DEMO_STUDENTS[2]?.admissionNo || "ADM-003", className: "Class 8", parentName: "Sunil Gupta", teacher: "Mr. Vikram Rao", time: "11:00 AM - 11:15 AM", date: "15 Nov 2026", mode: "In-Person (Room 108)", status: "PENDING" },
    { id: "ptm-04", studentName: DEMO_STUDENTS[3]?.fullName || "Ananya Iyer", admissionNo: DEMO_STUDENTS[3]?.admissionNo || "ADM-004", className: "Class 6", parentName: "Venkat Iyer", teacher: "Mrs. Meenakshi Sundaram", time: "02:00 PM - 02:15 PM", date: "16 Nov 2026", mode: "In-Person (Room 102)", status: "CONFIRMED" },
    { id: "ptm-05", studentName: DEMO_STUDENTS[4]?.fullName || "Vihaan Reddy", admissionNo: DEMO_STUDENTS[4]?.admissionNo || "ADM-005", className: "Class 4", parentName: "Pradeep Reddy", teacher: "Ms. Priya Nair", time: "02:30 PM - 02:45 PM", date: "16 Nov 2026", mode: "Online (Google Meet)", status: "COMPLETED" },
  ]);

  const [complaints, setComplaints] = useState([
    { id: "TKT-8841", studentName: DEMO_STUDENTS[0]?.fullName || "Aarav Kashyap", category: "Transport & Bus Route", issue: "Bus #14 delayed by 15 mins at Sahakarnagar stop due to road work.", priority: "HIGH", status: "RESOLVED", assignedTo: "Transport Fleet In-charge", date: "10 Nov 2026" },
    { id: "TKT-8842", studentName: DEMO_STUDENTS[5]?.fullName || "Aditi Sharma", category: "Canteen & Hygiene", issue: "Request for more hot drinking water dispensers near junior block.", priority: "MEDIUM", status: "IN_REVIEW", assignedTo: "Campus Operations Manager", date: "11 Nov 2026" },
    { id: "TKT-8843", studentName: DEMO_STUDENTS[8]?.fullName || "Kavya Nair", category: "Academic & Homework", issue: "Clarification required on Term 2 Sanskrit project submission date.", priority: "LOW", status: "RESOLVED", assignedTo: "Class Teacher (8-EM)", date: "11 Nov 2026" },
  ]);

  return (
    <PortalLayout
      portal="admin"
      userName="Dr. Sunitha Radhakrishnan"
      userRole="Principal & School Admin"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">PTM Scheduling & Parent Helpdesk</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
              Active Parent Engagement
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Streamlined parent-teacher conference slot booking and centralized resolution of parent inquiries & grievances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("PTM")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "PTM"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            PTM Conferences ({ptmSlots.length})
          </button>
          <button
            onClick={() => setActiveTab("COMPLAINTS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "COMPLAINTS"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Parent Grievances ({complaints.length})
          </button>
        </div>
      </div>

      {activeTab === "PTM" ? (
        <div className="space-y-4">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Slots</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{ptmSlots.length} Booked</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Confirmed</span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
                {ptmSlots.filter((p) => p.status === "CONFIRMED").length}
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">In-Person</span>
              <span className="text-2xl font-extrabold text-blue-600 mt-1 block">3 Slots</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Online Video</span>
              <span className="text-2xl font-extrabold text-purple-600 mt-1 block">2 Slots</span>
            </div>
          </div>

          {/* Slots Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900">Upcoming Parent-Teacher Appointments</h2>
              <span className="text-xs text-slate-500 font-mono">Date: 15-16 Nov 2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="p-3.5">Student / Adm No.</th>
                    <th className="p-3.5">Parent Name</th>
                    <th className="p-3.5">Assigned Teacher</th>
                    <th className="p-3.5">Date & Time Slot</th>
                    <th className="p-3.5">Meeting Mode</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ptmSlots.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{p.studentName}</span>
                        <span className="text-[11px] font-mono text-slate-400">Adm #{p.admissionNo} • {p.className}</span>
                      </td>
                      <td className="p-3.5 font-medium">{p.parentName}</td>
                      <td className="p-3.5 font-medium text-slate-900">{p.teacher}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{p.time}</span>
                        <span className="text-[11px] text-slate-500">{p.date}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                          {p.mode.includes("Online") ? <Video className="w-3.5 h-3.5 text-purple-600" /> : <MapPin className="w-3.5 h-3.5 text-blue-600" />}
                          <span>{p.mode}</span>
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                          p.status === "COMPLETED" ? "bg-slate-100 text-slate-700 border-slate-200" :
                          "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {c.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      c.status === "RESOLVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{c.category}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{c.issue}</p>
                </div>

                <div className="pt-3 border-t text-[11px] text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Student:</span>
                    <strong className="text-slate-800">{c.studentName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned:</span>
                    <span className="text-slate-700">{c.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Filed On:</span>
                    <span>{c.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
