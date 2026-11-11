"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { GraduationCap, Plus, CheckCircle2, UserCheck, AlertCircle, ArrowRight, Search, FileText } from "lucide-react";

export default function AdminAdmissionsPage() {
  const [applications, setApplications] = useState([
    {
      id: "app-1",
      appNo: "APP-2026-0101",
      studentName: "Devansh Nambiar",
      parentName: "Suresh Nambiar",
      targetClass: "Class 1",
      phone: "+91 98450 11991",
      submittedDate: "10 Nov 2026",
      status: "UNDER_VERIFICATION",
      docsUploaded: "Birth Cert, Aadhaar Masked, Transfer Cert",
    },
    {
      id: "app-2",
      appNo: "APP-2026-0102",
      studentName: "Tanvi Kulkarni",
      parentName: "Girish Kulkarni",
      targetClass: "Class 6",
      phone: "+91 98450 11992",
      submittedDate: "09 Nov 2026",
      status: "OFFERED",
      docsUploaded: "Birth Cert, Previous Marksheet",
    },
    {
      id: "app-3",
      appNo: "APP-2026-0103",
      studentName: "Mohammed Zaid",
      parentName: "Irfan Zaid",
      targetClass: "Class 11 (Science)",
      phone: "+91 98450 11993",
      submittedDate: "08 Nov 2026",
      status: "ENROLLED",
      docsUploaded: "Class 10 CBSE Board Marksheet, Migration Cert",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [parentName, setParentName] = useState("");
  const [targetClass, setTargetClass] = useState("Class 1");
  const [phone, setPhone] = useState("");

  const handleEnroll = (id: string) => {
    setApplications(
      applications.map((a) =>
        a.id === id ? { ...a, status: "ENROLLED" } : a
      )
    );
  };

  const handleCreateEnquiry = () => {
    if (!applicantName) return;
    const newApp = {
      id: `app-${Date.now()}`,
      appNo: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: applicantName,
      parentName,
      targetClass,
      phone,
      submittedDate: "Today",
      status: "UNDER_VERIFICATION",
      docsUploaded: "Submitted for Verification",
    };
    setApplications([newApp, ...applications]);
    setModalOpen(false);
    setApplicantName("");
    setParentName("");
    setPhone("");
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admission CRM & Enrollment Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Manage intake pipeline, verify identity documents, and auto-generate permanent student IDs.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Admission Form</span>
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Recent Intake Applications</span>
          <span className="text-xs text-slate-500">{applications.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-4">App Number</th>
                <th className="p-4">Applicant & Parent</th>
                <th className="p-4">Class</th>
                <th className="p-4">Submitted Documents</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70">
                  <td className="p-4 font-mono font-bold text-blue-700">{app.appNo}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{app.studentName}</span>
                    <span className="text-[11px] text-slate-500">Parent: {app.parentName} ({app.phone})</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{app.targetClass}</td>
                  <td className="p-4">
                    <span className="text-[11px] text-slate-600 block">{app.docsUploaded}</span>
                    <span className="text-[10px] text-emerald-600 font-medium">DPDP Consent Recorded</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      app.status === "ENROLLED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : app.status === "OFFERED"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {app.status !== "ENROLLED" ? (
                      <button
                        onClick={() => handleEnroll(app.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-all"
                      >
                        Enroll Student
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled (STU Generated)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Register Student Admission</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter applicant information to start the automated enrollment workflow.
            </p>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Applicant Full Name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Parent / Guardian Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl"
              />
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-white"
              >
                <option>Nursery</option>
                <option>Class 1</option>
                <option>Class 5</option>
                <option>Class 8</option>
                <option>Class 10</option>
                <option>Class 11 (Science)</option>
                <option>Class 11 (Commerce)</option>
              </select>
              <input
                type="text"
                placeholder="Guardian Phone (+91 ...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setModalOpen(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleCreateEnquiry} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Save Application</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
