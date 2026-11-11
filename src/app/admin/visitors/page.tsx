"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  ShieldCheck,
  Plus,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  QrCode,
  UserCheck,
  Car,
  AlertTriangle,
  Building,
  FileText,
} from "lucide-react";

interface VisitorRecord {
  id: string;
  passNumber: string;
  visitorName: string;
  phone: string;
  purpose: string;
  personToMeet: string;
  department: string;
  vehicleNumber: string;
  checkInTime: string;
  checkOutTime?: string;
  status: "INSIDE_CAMPUS" | "CHECKED_OUT";
  idProof: string;
}

interface StudentGatePass {
  id: string;
  passNo: string;
  studentName: string;
  className: string;
  reason: string;
  accompanyingPerson: string;
  relation: string;
  approvedBy: string;
  issuedAt: string;
  securityVerified: boolean;
}

export default function AdminVisitorManagementPage() {
  const [activeTab, setActiveTab] = useState<"VISITORS" | "STUDENT_GATE_PASS">("VISITORS");

  const [visitors, setVisitors] = useState<VisitorRecord[]>([
    {
      id: "vis-001",
      passNumber: "GP-2026-0842",
      visitorName: "Sunil Kumar V",
      phone: "+91 98450 11223",
      purpose: "Parent-Teacher Consultation (Class 10-A)",
      personToMeet: "Ms. Ananya Sharma",
      department: "Senior Academic Wing",
      vehicleNumber: "KA-04-MB-4512",
      checkInTime: "10:15 AM",
      status: "INSIDE_CAMPUS",
      idProof: "Aadhaar Verified",
    },
    {
      id: "vis-002",
      passNumber: "GP-2026-0841",
      visitorName: "M. G. Chandrashekar",
      phone: "+91 98455 33441",
      purpose: "Laboratory Chemical Supply Delivery",
      personToMeet: "Mr. Suresh (Lab Assistant)",
      department: "Chemistry Laboratory",
      vehicleNumber: "KA-01-EE-8877",
      checkInTime: "09:40 AM",
      status: "INSIDE_CAMPUS",
      idProof: "Driving License",
    },
    {
      id: "vis-003",
      passNumber: "GP-2026-0840",
      visitorName: "Dr. Kavitha Raman",
      phone: "+91 94480 99881",
      purpose: "CBSE Inspection & Affiliation Documentation",
      personToMeet: "Principal Dr. Rajesh Sharma",
      department: "Principal Office",
      vehicleNumber: "KA-03-MN-1122",
      checkInTime: "08:30 AM",
      checkOutTime: "10:45 AM",
      status: "CHECKED_OUT",
      idProof: "Official Govt ID",
    },
  ]);

  const [studentPasses, setStudentPasses] = useState<StudentGatePass[]>([
    {
      id: "sgp-001",
      passNo: "SGP-2026-0129",
      studentName: "Karan Johar Patel",
      className: "Class 10-A",
      reason: "High Fever / Medical Attention required at Baptist Hospital",
      accompanyingPerson: "Hitesh Patel (Father)",
      relation: "Father",
      approvedBy: "Principal Dr. Rajesh Sharma",
      issuedAt: "10:30 AM",
      securityVerified: true,
    },
  ]);

  const [showNewVisitorModal, setShowNewVisitorModal] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("Parent Consultation");
  const [personToMeet, setPersonToMeet] = useState("Ms. Ananya Sharma (Class 10-A)");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !phone) return;

    const newRecord: VisitorRecord = {
      id: `vis-${Date.now()}`,
      passNumber: `GP-2026-0${Math.floor(850 + Math.random() * 50)}`,
      visitorName,
      phone,
      purpose,
      personToMeet,
      department: "Administrative Block",
      vehicleNumber: vehicleNumber || "Walk-In (No Vehicle)",
      checkInTime: "Just now",
      status: "INSIDE_CAMPUS",
      idProof: "Phone OTP Verified",
    };

    setVisitors([newRecord, ...visitors]);
    setShowNewVisitorModal(false);
    setVisitorName("");
    setPhone("");
    setVehicleNumber("");
  };

  const handleCheckOut = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: "CHECKED_OUT",
              checkOutTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          : v
      )
    );
  };

  const insideCount = visitors.filter((v) => v.status === "INSIDE_CAMPUS").length;

  return (
    <PortalLayout
      portal="admin"
      userName="Admin S. R. Venkatraman"
      userRole="Chief Administrative Officer"
      userHumanId="ADM-INS000001-000001"
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Edubricz Security & Campus Gate Control
            </span>
            <span className="text-xs text-slate-400 font-mono">Main Gate 1 & 2 Security Terminal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Visitor Management & Digital Gate Pass
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track visitors inside the school campus, issue secure QR entry passes, and manage student early departure authorizations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewVisitorModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Check-In New Visitor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Visitors Currently Inside</span>
          <span className="text-2xl font-extrabold text-emerald-600">{insideCount} Persons</span>
          <span className="text-[10px] text-slate-500 block mt-1">Main Gate 1 & 2 Active Log</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Total Visits Today</span>
          <span className="text-2xl font-extrabold text-slate-900">{visitors.length} Visitors</span>
          <span className="text-[10px] text-slate-500 block mt-1">100% Identity Verified</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Student Early Gate Passes</span>
          <span className="text-2xl font-extrabold text-blue-700">{studentPasses.length} Issued</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">✓ Principal Verified</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Vehicle Entries</span>
          <span className="text-2xl font-extrabold text-purple-600">2 Vehicles</span>
          <span className="text-[10px] text-slate-500 block mt-1">Parking Bay B & C</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab("VISITORS")}
          className={`pb-3 transition-colors ${
            activeTab === "VISITORS"
              ? "border-b-2 border-emerald-600 text-emerald-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Campus Visitor Register ({visitors.length})
        </button>
        <button
          onClick={() => setActiveTab("STUDENT_GATE_PASS")}
          className={`pb-3 transition-colors ${
            activeTab === "STUDENT_GATE_PASS"
              ? "border-b-2 border-emerald-600 text-emerald-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Student Early Exit Gate Passes ({studentPasses.length})
        </button>
      </div>

      {/* Tab 1: Visitors Register */}
      {activeTab === "VISITORS" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="p-3.5">Gate Pass #</th>
                  <th className="p-3.5">Visitor Name & Phone</th>
                  <th className="p-3.5">Purpose & Meeting With</th>
                  <th className="p-3.5">Vehicle</th>
                  <th className="p-3.5">Check-In / Out</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-mono font-bold text-slate-800 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-slate-400" />
                      {v.passNumber}
                    </td>
                    <td className="p-3.5">
                      <strong className="text-slate-900 block">{v.visitorName}</strong>
                      <span className="text-[11px] text-slate-500 font-mono">{v.phone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800 block">{v.purpose}</span>
                      <span className="text-[11px] text-slate-500">Meeting: {v.personToMeet}</span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">
                      {v.vehicleNumber}
                    </td>
                    <td className="p-3.5 text-[11px]">
                      <div>In: <strong className="text-slate-800">{v.checkInTime}</strong></div>
                      {v.checkOutTime && <div>Out: <span className="text-slate-500">{v.checkOutTime}</span></div>}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          v.status === "INSIDE_CAMPUS"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {v.status === "INSIDE_CAMPUS" ? "INSIDE CAMPUS" : "CHECKED OUT"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {v.status === "INSIDE_CAMPUS" ? (
                        <button
                          onClick={() => handleCheckOut(v.id)}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] rounded-lg transition-all"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tab 2: Student Early Exit Gate Passes */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Authorized Student Early Departure Gate Passes</h3>
              <p className="text-xs text-slate-500">
                Issued with parent authentication and Principal digital signature.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {studentPasses.map((pass) => (
              <div key={pass.id} className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{pass.studentName}</h4>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">
                        {pass.passNo}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      Class: <strong>{pass.className}</strong> • Reason: {pass.reason}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Accompanying: <strong>{pass.accompanyingPerson}</strong> ({pass.relation}) • Approved By: <strong>{pass.approvedBy}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Gate 1 Cleared
                  </span>
                  <button
                    onClick={() => alert(`Printing Gate Pass ${pass.passNo} with Security Hologram QR.`)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    title="Print Gate Pass"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Check-In New Visitor */}
      {showNewVisitorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 text-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">Check-In Campus Visitor</h2>
            <p className="text-slate-500 text-xs mb-4">
              Registers visitor in digital gate register and issues instant SMS entry pass.
            </p>

            <form onSubmit={handleCheckIn} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Visitor Full Name:</label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Number:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Purpose of Visit:</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Parent Consultation">Parent Consultation</option>
                    <option value="Fee Payment / Accounts">Fee Payment / Accounts</option>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="Vendor / Delivery">Vendor / Delivery</option>
                    <option value="Official Inspection">Official Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Person / Office to Meet:</label>
                  <input
                    type="text"
                    value={personToMeet}
                    onChange={(e) => setPersonToMeet(e.target.value)}
                    placeholder="e.g. Ms. Ananya Sharma"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Vehicle Registration No (Optional):</label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. KA-01-AB-1234 or leave blank if walk-in"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono uppercase"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowNewVisitorModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Issue Gate Pass & Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
