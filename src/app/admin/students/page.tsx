"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Users, Search, Plus, QrCode, ArrowRight, CheckCircle2, FileText, ArrowLeftRight, Sparkles } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentForId, setSelectedStudentForId] = useState<any | null>(null);
  const [promotionModal, setPromotionModal] = useState(false);
  const [promotedSuccess, setPromotedSuccess] = useState(false);

  const filtered = DEMO_STUDENTS.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.humanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBulkPromote = () => {
    setPromotedSuccess(true);
    setTimeout(() => {
      setPromotedSuccess(false);
      setPromotionModal(false);
    }, 2500);
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Central Registry</h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete student directory backed by collision-resistant human IDs (STU-INS000001-...) and QR-enabled cards.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPromotionModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bulk Student Promotion</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by student name, human ID (STU-...), or admission number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4">Permanent Student ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Class & Section</th>
                <th className="p-4">Admission No.</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Digital Identity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-blue-700">{stu.humanId}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                    <span className="text-[11px] text-slate-400">DOB: {stu.dob} • Blood: {stu.bloodGroup}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold">{stu.className} - {stu.section}</span>
                    <span className="text-[11px] text-slate-500 block">Roll #{stu.rollNumber}</span>
                  </td>
                  <td className="p-4 font-mono font-medium">{stu.admissionNo}</td>
                  <td className="p-4">
                    <span className={`font-bold ${stu.attendancePct < 75 ? "text-red-600" : "text-emerald-600"}`}>
                      {stu.attendancePct}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100 border">
                      {stu.overallGrade}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedStudentForId(stu)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View ID Card</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital ID Card Modal */}
      {selectedStudentForId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center pb-4 border-b">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">DPS Bengaluru North</span>
              <h3 className="text-base font-extrabold text-slate-900">Student Identity Card</h3>
            </div>

            <div className="my-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-blue-600 p-1 flex items-center justify-center font-bold text-2xl text-blue-800 mb-3">
                {selectedStudentForId.fullName.charAt(0)}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{selectedStudentForId.fullName}</h4>
              <p className="text-xs font-mono font-bold text-blue-700">{selectedStudentForId.humanId}</p>
              <p className="text-xs text-slate-600 mt-1">{selectedStudentForId.className} - {selectedStudentForId.section} • Roll #{selectedStudentForId.rollNumber}</p>

              {/* QR Code */}
              <div className="mt-4 p-3 bg-slate-50 border rounded-xl flex flex-col items-center">
                <QrCode className="w-20 h-20 text-slate-900" />
                <span className="text-[9px] font-mono text-slate-400 mt-1">HMAC-SHA256 Encrypted Token</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t pt-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Admission No:</span>
                <span className="font-mono font-bold">{selectedStudentForId.admissionNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Phone:</span>
                <span>{selectedStudentForId.guardianPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <span>{selectedStudentForId.bloodGroup}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudentForId(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              Close ID Card
            </button>
          </div>
        </div>
      )}

      {/* Bulk Promotion Modal */}
      {promotionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Bulk Academic Promotion</h3>
            <p className="text-xs text-slate-500 mb-4">
              Transition enrolled students from AY-2025-2026 to AY-2026-2027 based on annual examination passing criteria.
            </p>

            {promotedSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Promotion successful! 1,240 eligible students promoted with new session enrollments.</span>
              </div>
            ) : (
              <div className="space-y-3 text-xs mb-6">
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="font-semibold block text-slate-700">Source Grade:</span>
                  <select className="w-full mt-1 p-2 border rounded-lg bg-white">
                    <option>Class 9 (Promote to Class 10)</option>
                    <option>Class 10 (Promote to Class 11)</option>
                    <option>Class 11 (Promote to Class 12)</option>
                  </select>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                  Notice: Historical academic marks and previous admission records will be preserved in perpetuity according to DPDP standards.
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 text-xs">
              <button onClick={() => setPromotionModal(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              {!promotedSuccess && (
                <button onClick={handleBulkPromote} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700">
                  Execute Bulk Promotion
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
