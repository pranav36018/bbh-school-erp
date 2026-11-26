"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Users, Search, Plus, IdCard, ArrowRight, CheckCircle2, FileText, ArrowLeftRight, Sparkles, Filter, ChevronLeft, ChevronRight, Phone, Calendar } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { getAllRegistryStudents, buildCompleteStudentProfile } from "@/lib/student-records";
import StudentIdRecordView from "@/components/students/StudentIdRecordView";
import StudentQrCode from "@/components/students/StudentQrCode";
import { useBoard } from "@/lib/board-context";

export default function AdminStudentsPage() {
  const { board } = useBoard();
  const isState = board === "state";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("ALL");
  const [selectedMedium, setSelectedMedium] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const [selectedStudentForId, setSelectedStudentForId] = useState<any | null>(null);
  const [promotionModal, setPromotionModal] = useState(false);
  const [promotedSuccess, setPromotedSuccess] = useState(false);

  // Unified list of 592 official roster students + demo/imported students with complete fields
  const ALL_DISPLAY_STUDENTS = getAllRegistryStudents();

  // Distinct classes for filter pills
  const distinctClasses = [
    "ALL",
    "Standard 10",
    "Standard 9",
    "Standard 8",
    "Standard 7",
    "Standard 6",
    "Standard 5",
    "Standard 4",
    "Standard 3",
    "Standard 2",
    "Standard 1",
    "UKG Kreedo",
    "LKG Kreedo",
    "Pre-KG Kreedo",
    "Class 10",
  ];

  const filtered = ALL_DISPLAY_STUDENTS.filter((s: any) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.humanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.guardianPhone && s.guardianPhone.includes(searchTerm)) ||
      (s.legacyUserName && s.legacyUserName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClass =
      selectedClass === "ALL" ||
      s.className === selectedClass ||
      s.className.startsWith(selectedClass);

    const matchesMedium =
      selectedMedium === "ALL" ||
      (selectedMedium === "EM" && s.section === "EM") ||
      (selectedMedium === "KM" && s.section === "KM");

    return matchesSearch && matchesClass && matchesMedium;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Quick stats
  const emCount = ALL_DISPLAY_STUDENTS.filter((s: any) => s.section === "EM").length;
  const kmCount = ALL_DISPLAY_STUDENTS.filter((s: any) => s.section === "KM").length;
  const highAttendanceCount = ALL_DISPLAY_STUDENTS.filter((s: any) => s.attendancePct >= 90).length;

  const handleBulkPromote = () => {
    setPromotedSuccess(true);
    setTimeout(() => {
      setPromotedSuccess(false);
      setPromotionModal(false);
    }, 2500);
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
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Central Registry</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {ALL_DISPLAY_STUDENTS.length} Students Loaded
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete student directory imported from students.csv with official registration IDs, standards, and digital ID cards.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Enrolled</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{ALL_DISPLAY_STUDENTS.length}</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">100% Active Records</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">English Medium (EM)</span>
          <span className="text-2xl font-extrabold text-blue-600 mt-1 block">{emCount}</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Standards 1 to 10 EM</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Kannada Medium (KM)</span>
          <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">{kmCount}</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Standards 2 to 9 KM</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">High Attendance (&gt;90%)</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{highAttendanceCount}</span>
          <span className="text-[11px] text-slate-500 mt-1 block">DPDP Act Compliant</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by student name, admission number (e.g. 57/2020-21, adm554), standard, or mobile..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-slate-400 hover:text-slate-600 px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Class:
            </span>
            {distinctClasses.slice(0, 8).map((cls) => (
              <button
                key={cls}
                onClick={() => { setSelectedClass(cls); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedClass === cls
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Medium:</span>
            {["ALL", "EM", "KM"].map((med) => (
              <button
                key={med}
                onClick={() => { setSelectedMedium(med); setCurrentPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedMedium === med
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {med === "ALL" ? "All Mediums" : med}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3.5">Admission No.</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Class / Standard</th>
                <th className="p-3.5">Admission Date</th>
                <th className="p-3.5">Parent Mobile</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">Grade</th>
                <th className="p-3.5">Digital Identity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginated.map((stu: any) => (
                <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {stu.admissionNo}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{stu.fullName}</span>
                    <span className="text-[11px] text-slate-400">DOB: {stu.dob} • Blood: {stu.bloodGroup}</span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">{stu.className}</span>
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      stu.section === "EM" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      stu.section === "KM" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {stu.section}
                    </span>
                    <span className="text-[11px] text-slate-400 block">Roll #{stu.rollNumber}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 whitespace-nowrap">
                    {stu.admissionDate || "Enrolled"}
                  </td>
                  <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">
                    {stu.guardianPhone || "—"}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`font-bold ${stu.attendancePct < 75 ? "text-red-600" : "text-emerald-600"}`}>
                      {stu.attendancePct}%
                    </span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100 border">
                      {stu.overallGrade}
                    </span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StudentQrCode
                        studentId={stu.id}
                        studentName={stu.fullName}
                        admissionNo={stu.admissionNo}
                        variant="mini"
                        size={40}
                      />
                      <button
                        onClick={() => setSelectedStudentForId(stu)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-all"
                      >
                        <IdCard className="w-3.5 h-3.5" />
                        <span>View ID &amp; History</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-200 bg-slate-50/50 text-xs">
          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
            <strong className="text-slate-900">{Math.min(currentPage * pageSize, filtered.length)}</strong> of{" "}
            <strong className="text-slate-900">{filtered.length}</strong> students
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="font-bold px-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Complete Student ID, Parent Details, Real QR Code & History Modal */}
      {selectedStudentForId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-slate-50 rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Official Student Identity, Parent Details, Scannable QR &amp; History
                </h3>
                <p className="text-xs text-slate-500">
                  Click QR to expand and scan directly with your phone camera for{" "}
                  <strong>{selectedStudentForId.fullName}</strong> (Admission No: {selectedStudentForId.admissionNo})
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForId(null)}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
              >
                Close Record
              </button>
            </div>

            <StudentIdRecordView
              profile={buildCompleteStudentProfile(selectedStudentForId, board)}
              compact={true}
              onClose={() => setSelectedStudentForId(null)}
            />
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
            <div className="space-y-3 text-xs mb-6 bg-slate-50 p-4 rounded-xl border">
              <div className="flex justify-between">
                <span>Total Candidates:</span>
                <strong className="font-mono">{DEMO_STUDENTS.length} Students</strong>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Eligible for Promotion:</span>
                <strong className="font-mono">{Math.floor(DEMO_STUDENTS.length * 0.98)} Students</strong>
              </div>
            </div>

            {promotedSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-bold mb-4 border border-emerald-200">
                ✅ All students successfully promoted to the next academic year!
              </div>
            ) : null}

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setPromotionModal(false)}
                className="px-3.5 py-2 rounded-xl border text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkPromote}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                Execute Bulk Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
