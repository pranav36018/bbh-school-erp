"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Building2, Layers, MapPin, Users, Award, Shield } from "lucide-react";
import { DEMO_INSTITUTIONS } from "@/lib/mock-data";

export default function DirectorCampusesPage() {
  const allCampuses = DEMO_INSTITUTIONS.flatMap((inst) =>
    inst.campuses.map((c) => ({
      ...c,
      schoolName: inst.name,
      schoolCode: inst.code,
      board: inst.boardType,
    }))
  );

  return (
    <PortalLayout
      portal="director"
      userName="Dr. Rajesh Singhania"
      userRole="Managing Director & Trustee"
      userHumanId="DIR-INS000001-000001"
      institutionName="DPS Bengaluru & Group Schools"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Multi-Campus Performance & Benchmarking</h1>
        <p className="text-xs text-slate-500 mt-1">Cross-campus comparison of infrastructure, enrollment, and operational capacities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allCampuses.map((camp, idx) => (
          <div key={camp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {camp.code}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Active Branch
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{camp.name}</h3>
            <p className="text-[11px] text-blue-600 font-medium mb-3">{camp.schoolName}</p>
            <div className="text-xs text-slate-600 space-y-1.5 border-t pt-3">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{camp.address}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">Capacity:</span>
                <span className="font-bold text-slate-900">{idx === 0 ? "1,800 Students" : idx === 1 ? "650 Students" : "1,500 Students"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Attendance:</span>
                <span className="font-semibold text-emerald-600">{idx === 0 ? "95.2%" : idx === 1 ? "92.8%" : "94.1%"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
