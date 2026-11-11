"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { CheckSquare, CheckCircle2, PhoneCall, QrCode, Filter, AlertTriangle } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function AdminAttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState(
    DEMO_STUDENTS.map((s, idx) => ({
      ...s,
      status: idx === 4 ? "ABSENT" : "PRESENT", // Karan Johar Patel marked absent for demo
      mode: "RFID_GATEWAY_PUNCH",
      punchTime: idx === 4 ? "--:--" : "08:24 AM",
    }))
  );

  const [notificationSent, setNotificationSent] = useState(false);

  const toggleStatus = (id: string) => {
    setAttendanceRecords(
      attendanceRecords.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === "PRESENT" ? "ABSENT" : "PRESENT",
              punchTime: r.status === "PRESENT" ? "--:--" : "08:28 AM",
            }
          : r
      )
    );
  };

  const handleSendAbsenceAlerts = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 4000);
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Daily Campus Attendance Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time biometric, RFID, and QR scan reconciliation for Class 10-A.</p>
        </div>

        <button
          onClick={handleSendAbsenceAlerts}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dispatch Absence SMS / WhatsApp</span>
        </button>
      </div>

      {notificationSent && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Absence SMS and WhatsApp alerts dispatched to guardian contact of absent students.</span>
        </div>
      )}

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <th className="p-4">Student ID & Name</th>
              <th className="p-4">Class</th>
              <th className="p-4">Punch Time</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status Today</th>
              <th className="p-4">Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {attendanceRecords.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="p-4">
                  <span className="font-bold text-slate-900 block">{r.fullName}</span>
                  <span className="font-mono text-[11px] text-blue-700">{r.humanId}</span>
                </td>
                <td className="p-4 font-semibold">{r.className} - {r.section}</td>
                <td className="p-4 font-mono">{r.punchTime}</td>
                <td className="p-4 text-slate-500">{r.mode}</td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    r.status === "PRESENT"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(r.id)}
                    className="px-2.5 py-1 rounded-lg border text-xs font-semibold hover:bg-slate-100"
                  >
                    Mark {r.status === "PRESENT" ? "Absent" : "Present"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}
