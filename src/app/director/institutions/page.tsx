"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Building2, School, MapPin, Phone, Mail, Plus, CheckCircle2, ChevronRight } from "lucide-react";
import { DEMO_INSTITUTIONS } from "@/lib/mock-data";

export default function DirectorInstitutionsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="Swamy Vivekananda Vidya Kendra Trust"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Institution Group Management</h1>
          <p className="text-xs text-slate-500 mt-1">Autonomous institutions registered under the trust umbrella.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Register New School</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_INSTITUTIONS.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2.5 py-1 bg-slate-100 rounded-md font-semibold text-slate-700">
                  {inst.code}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {inst.boardType.replace(/_/g, " ")}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-1">{inst.name}</h2>
              <p className="text-xs text-slate-500 mb-4">{inst.groupName}</p>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{inst.district}, {inst.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{inst.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{inst.contactEmail}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-700 block mb-1">Campuses ({inst.campuses.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {inst.campuses.map((c) => (
                    <span key={c.id} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Principal: <strong className="text-slate-700">{inst.principalName}</strong></span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Onboard New Institution</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter school affiliation and regulatory information to generate a collision-free ID sequence.
            </p>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Institution Name (e.g. Sri Vivekananda Vidya Kendra - Branch 2)" className="w-full px-3 py-2 border rounded-xl" />
              <select className="w-full px-3 py-2 border rounded-xl bg-white">
                <option>CBSE</option>
                <option>Karnataka State Board (KSEAB)</option>
                <option>Maharashtra State Board</option>
                <option>Tamil Nadu State Board</option>
                <option>Kerala State Board</option>
              </select>
              <input type="text" placeholder="Board Affiliation / Recognition No." className="w-full px-3 py-2 border rounded-xl" />
              <input type="text" placeholder="State & District" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold">Save & Generate INS ID</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
