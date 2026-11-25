"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { FileCheck, Search, Printer, Download, Award, CheckCircle2, Shield, QrCode, FileText, ArrowRight, UserCheck } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

export default function AdminCertificatesPage() {
  const { board } = useBoard();
  const isState = board === "state";
  const [searchTerm, setSearchTerm] = useState("");
  const [certType, setCertType] = useState<"BONAFIDE" | "TC" | "CHARACTER">("BONAFIDE");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(DEMO_STUDENTS[0] || null);
  const [tcReason, setTcReason] = useState("Parent Job Relocation");
  const [conduct, setConduct] = useState("Exemplary & Diligent");
  const [printModal, setPrintModal] = useState(false);

  const filteredStudents = DEMO_STUDENTS.filter(
    (s: any) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);

  const handlePrint = () => {
    window.print();
  };

  const adminName = isState ? "Shri Mahadevappa Kulkarni" : "Dr. Sunitha Radhakrishnan";
  const adminRole = isState ? "Headmaster & State Board Admin" : "Principal & CBSE Admin";
  const adminId = isState ? "ADM-STATE-000001" : "ADM-CBSE-000001";

  return (
    <PortalLayout
      portal="admin"
      userName={adminName}
      userRole={adminRole}
      userHumanId={adminId}
      institutionName={`Sri Vivekananda Vidya Kendra (${isState ? "State Board" : "CBSE"})`}
      academicYear="AY-2026-2027"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Official Certificates & TC Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Government & Board Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate and issue verified Transfer Certificates (TC), Bonafide / Study Certificates, and Character Endorsements with cryptographic QR verification.
          </p>
        </div>

        {selectedStudent && (
          <button
            onClick={() => setPrintModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Generate & Preview Certificate</span>
          </button>
        )}
      </div>

      {/* Certificate Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setCertType("BONAFIDE")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            certType === "BONAFIDE"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold">Study / Bonafide Certificate</span>
            <FileText className="w-4 h-4 opacity-80" />
          </div>
          <p className={`text-[11px] leading-relaxed ${certType === "BONAFIDE" ? "text-blue-100" : "text-slate-500"}`}>
            Proof of active enrollment, current standard, and date of admission for passport, visa, and scholarships.
          </p>
        </button>

        <button
          onClick={() => setCertType("TC")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            certType === "TC"
              ? "bg-amber-600 text-white border-amber-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold">Transfer Certificate (TC)</span>
            <Award className="w-4 h-4 opacity-80" />
          </div>
          <p className={`text-[11px] leading-relaxed ${certType === "TC" ? "text-amber-100" : "text-slate-500"}`}>
            Official school leaving transfer credential with reason for leaving, last exam passed, and dues clearance.
          </p>
        </button>

        <button
          onClick={() => setCertType("CHARACTER")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            certType === "CHARACTER"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold">Character & Conduct Certificate</span>
            <UserCheck className="w-4 h-4 opacity-80" />
          </div>
          <p className={`text-[11px] leading-relaxed ${certType === "CHARACTER" ? "text-emerald-100" : "text-slate-500"}`}>
            Attestation of exemplary moral character, co-curricular excellence, and general school discipline.
          </p>
        </button>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Student Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
            <span>1. Select Student Candidate</span>
            <span className="text-[10px] text-slate-400 font-mono">100 Enrolled</span>
          </h2>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by student name or adm no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredStudents.map((stu: any) => (
              <button
                key={stu.id}
                onClick={() => setSelectedStudent(stu)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedStudent?.id === stu.id
                    ? "bg-blue-50 border-blue-500 text-blue-900 shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">{stu.fullName}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Adm: {stu.admissionNo} • {stu.className} ({stu.section})
                  </span>
                </div>
                {selectedStudent?.id === stu.id && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Issue Parameters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900">2. Certificate Parameters</h2>

          {selectedStudent ? (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Candidate Name</label>
                <input
                  type="text"
                  disabled
                  value={selectedStudent.fullName}
                  className="w-full px-3 py-2 bg-slate-100 border rounded-xl font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Admission No.</label>
                  <input
                    type="text"
                    disabled
                    value={selectedStudent.admissionNo}
                    className="w-full px-3 py-2 bg-slate-100 border rounded-xl font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Class / Standard</label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedStudent.className} - ${selectedStudent.section}`}
                    className="w-full px-3 py-2 bg-slate-100 border rounded-xl text-slate-800"
                  />
                </div>
              </div>

              {certType === "TC" && (
                <>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Reason for Leaving School</label>
                    <select
                      value={tcReason}
                      onChange={(e) => setTcReason(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                    >
                      <option value="Parent Job Relocation">Parent Job Relocation</option>
                      <option value="Higher Studies / Board Change">Higher Studies / Board Change</option>
                      <option value="Residence Shifting">Residence Shifting</option>
                      <option value="Completed Course of Study">Completed Course of Study (Class 10)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">School Dues Clearance</label>
                    <input
                      type="text"
                      disabled
                      value="All Tuition & Library Dues Paid (Cleared)"
                      className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold rounded-xl"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">General Conduct & Discipline</label>
                <select
                  value={conduct}
                  onChange={(e) => setConduct(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white text-xs"
                >
                  <option value="Exemplary & Diligent">Exemplary & Diligent</option>
                  <option value="Good & Well-Mannered">Good & Well-Mannered</option>
                  <option value="Satisfactory">Satisfactory</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setPrintModal(true)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Preview & Print Document</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Please select a student from the left panel.</p>
          )}
        </div>

        {/* Right: Live Document Preview */}
        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-6 flex flex-col justify-between text-center min-h-[380px]">
          {selectedStudent ? (
            <div className="bg-white p-6 rounded-xl border shadow-sm text-left space-y-4">
              <div className="text-center pb-3 border-b flex flex-col items-center">
                <img src="/images/svvk-logo.png" alt="SVVK" className="w-10 h-10 rounded-full object-contain mb-1" />
                <span className="text-[9px] font-bold text-amber-800">॥ विद्या ददाति विनयम् ॥</span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Swamy Vivekananda Vidya Kendra Trust</span>
                <h3 className="font-extrabold text-sm text-slate-900">SRI VIVEKANANDA VIDYA KENDRA</h3>
                <p className="text-[10px] text-slate-500">
                  {isState
                    ? "Karnataka State Board (KSEAB) • Hoskote, Bengaluru Rural – 562114"
                    : "Affiliated to CBSE, New Delhi – 830680 • Hoskote, Bengaluru Rural – 562114"}
                </p>
              </div>

              <div className="text-center py-1">
                <span className="px-3 py-1 bg-slate-900 text-white font-mono text-[10px] font-bold uppercase rounded-md tracking-wider">
                  {certType === "BONAFIDE" ? "STUDY & BONAFIDE CERTIFICATE" : certType === "TC" ? "TRANSFER CERTIFICATE" : "CHARACTER CERTIFICATE"}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed indent-4">
                This is to certify that <strong>{selectedStudent.fullName}</strong>, bearing permanent Admission No.{" "}
                <span className="font-mono font-bold text-blue-700">{selectedStudent.admissionNo}</span>, is a bonafide student of this institution studying in{" "}
                <strong>{selectedStudent.className} ({selectedStudent.section})</strong> during academic year <strong>2026-2027</strong>.
              </p>

              {certType === "TC" && (
                <p className="text-xs text-slate-700 leading-relaxed">
                  The student has cleared all school fee obligations and is granted this Transfer Certificate on grounds of: <em>{tcReason}</em>.
                </p>
              )}

              <p className="text-xs text-slate-700">
                Their general conduct, discipline, and participation in academic activities have been <strong>{conduct}</strong>.
              </p>

              <div className="pt-4 border-t flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Date: 12-Nov-2026</span>
                <span className="font-bold text-slate-800">Principal Signature & Seal</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Print Preview Fullscreen Modal */}
      {printModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200">
            {/* Certificate Canvas */}
            <div className="border-4 border-double border-slate-800 p-8 rounded-2xl space-y-6 text-center">
              <div className="space-y-1 flex flex-col items-center">
                <img src="/images/svvk-logo.png" alt="SVVK" className="w-14 h-14 rounded-full object-contain mb-1 shadow-sm" />
                <span className="text-[11px] font-bold text-amber-800">॥ विद्या ददाति विनयम् ॥</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Managed by Swamy Vivekananda Vidya Kendra Trust</span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">SRI VIVEKANANDA VIDYA KENDRA</h2>
                <p className="text-xs text-slate-600">Affiliated to CBSE, New Delhi – Affiliation No: 830680 | Hoskote, Bengaluru Rural – 562114</p>
              </div>

              <div className="inline-block border-y-2 border-slate-800 py-1.5 px-6 my-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
                  {certType === "BONAFIDE" ? "BONAFIDE STUDY CERTIFICATE" : certType === "TC" ? "OFFICIAL TRANSFER CERTIFICATE" : "CHARACTER & DISCIPLINE CERTIFICATE"}
                </h3>
              </div>

              <div className="text-left text-xs text-slate-800 leading-loose space-y-3">
                <p>
                  This is to certify that Master/Kumari <strong>{selectedStudent.fullName}</strong>, holding official Admission Number{" "}
                  <strong className="font-mono text-blue-800">{selectedStudent.admissionNo}</strong>, is/was a bonafide student of Sri Vivekananda Vidya Kendra, Hoskote.
                </p>
                <p>
                  According to school records, the student was enrolled in <strong>{selectedStudent.className} - {selectedStudent.section}</strong> for the academic session <strong>2026-2027</strong> under the Central Board of Secondary Education curriculum.
                </p>
                {certType === "TC" && (
                  <p>
                    Reason for leaving the institution: <strong>{tcReason}</strong>. All financial dues, library loans, and laboratory obligations stand fully cleared.
                  </p>
                )}
                <p>
                  During the student&apos;s tenure at this institution, their character, attendance, and moral conduct were adjudged to be <strong>{conduct}</strong>.
                </p>
              </div>

              {/* Bottom Signatures & Seal */}
              <div className="pt-8 border-t flex items-end justify-between text-xs">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-1 flex items-center justify-center p-1 border rounded-lg bg-slate-50">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 block">HMAC-SHA256 Token</span>
                </div>

                <div className="text-center">
                  <span className="font-bold text-slate-900 block text-xs">Principal</span>
                  <span className="text-[10px] text-slate-500 block">Sri Vivekananda Vidya Kendra</span>
                  <span className="text-[9px] font-mono text-slate-400 block">CBSE Affiliation: 830680</span>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button
                onClick={() => setPrintModal(false)}
                className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Close Preview
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
