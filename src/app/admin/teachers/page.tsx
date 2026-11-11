"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Briefcase, Plus, CheckCircle2, Phone, Mail, Award, Clock } from "lucide-react";
import { DEMO_USERS } from "@/lib/mock-data";

export default function AdminTeachersPage() {
  const teachers = DEMO_USERS.filter((u) => u.role === "TEACHER");
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Faculty & Staff HR Engine</h1>
          <p className="text-xs text-slate-500 mt-1">
            Teacher roster, qualifications, departmental allocations, biometric IDs, and payroll records.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {t.humanId}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Active Faculty
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{t.firstName} {t.lastName}</h3>
              <p className="text-xs text-slate-500 mt-0.5 mb-3">{t.designation}</p>

              <div className="space-y-1.5 text-xs text-slate-600 border-t pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{t.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs">
              <span className="text-slate-400">Payroll Status:</span>
              <span className="font-semibold text-emerald-600">Disbursed (Oct 2026)</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Register New Faculty</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter teacher credentials to generate an atomic TCH-INS000001-... ID code.
            </p>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="text" placeholder="Subject / Specialization" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              <input type="email" placeholder="Official Email Address" className="w-full px-3 py-2 border rounded-xl" />
              <input type="text" placeholder="Contact Mobile (+91 ...)" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Generate TCH ID & Save</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
