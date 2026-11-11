"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { Bus, BookOpen, FileCheck, QrCode, Plus, CheckCircle2, MapPin, Printer } from "lucide-react";

export default function AdminOperationsPage() {
  const [activeTab, setActiveTab] = useState<"transport" | "library" | "certificates">("transport");
  const [certModal, setCertModal] = useState(false);
  const [certGenerated, setCertGenerated] = useState<any | null>(null);

  const busRoutes = [
    { route: "Route 14", vehicle: "KA-01-AB-1234", driver: "Somanna Gowda", phone: "+91 98450 33441", stops: "Hebbal → Sahakarnagar → Kogilu", students: 38 },
    { route: "Route 21", vehicle: "KA-01-EF-5678", driver: "Manjunath K", phone: "+91 98450 33442", stops: "Manyata Tech Park → Thanisandra → Yelahanka", students: 42 },
    { route: "Route 08", vehicle: "KA-01-XY-9012", driver: "Ravi Kumar", phone: "+91 98450 33443", stops: "Jakkur Airfield → Vidyaranyapura → Campus", students: 35 },
  ];

  const libraryBooks = [
    { title: "NCERT Mathematics Class 10", author: "NCERT Board", isbn: "978-81-7450-634-4", copies: 85, shelf: "Rack 3B" },
    { title: "Concepts of Physics (Vol 1 & 2)", author: "Dr. H.C. Verma", isbn: "978-81-7709-187-8", copies: 40, shelf: "Rack 5A" },
    { title: "Wings of Fire", author: "Dr. A.P.J. Abdul Kalam", isbn: "978-81-7371-146-6", copies: 25, shelf: "Biography 1" },
  ];

  const handleGenerateCertificate = () => {
    setCertGenerated({
      certNo: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "Aarav Kashyap",
      humanId: "STU-INS000001-000001",
      type: "Bonafide Certificate",
      date: new Date().toLocaleDateString("en-IN"),
    });
    setCertModal(false);
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
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Campus Operations & Logistics</h1>
          <p className="text-xs text-slate-500 mt-1">GPS bus transport routes, library catalog, and tamper-proof certificate generation.</p>
        </div>

        {/* Tab switch */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("transport")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "transport" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}
          >
            Bus Transport & GPS
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "library" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}
          >
            Library Catalog
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-3 py-1.5 rounded-lg ${activeTab === "certificates" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}
          >
            Certificates & Bonafide
          </button>
        </div>
      </div>

      {activeTab === "transport" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {busRoutes.map((b) => (
            <div key={b.route} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-base text-slate-900">{b.route}</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  GPS Active
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-blue-700 mb-2">{b.vehicle}</p>
              <div className="text-xs text-slate-600 space-y-1.5 border-t pt-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{b.stops}</span>
                </div>
                <div>Driver: <strong className="text-slate-800">{b.driver}</strong> ({b.phone})</div>
                <div>Assigned Students: <strong>{b.students}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "library" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
                <th className="p-4">Book Title & Author</th>
                <th className="p-4">ISBN</th>
                <th className="p-4">Shelf Location</th>
                <th className="p-4">Available Copies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {libraryBooks.map((book) => (
                <tr key={book.isbn} className="hover:bg-slate-50/70">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{book.title}</span>
                    <span className="text-[11px] text-slate-400">By {book.author}</span>
                  </td>
                  <td className="p-4 font-mono">{book.isbn}</td>
                  <td className="p-4 font-semibold">{book.shelf}</td>
                  <td className="p-4 font-bold text-emerald-700">{book.copies} Copies Available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b">
            <div>
              <h2 className="text-base font-bold text-slate-900">Certificate Generation Engine</h2>
              <p className="text-xs text-slate-500">Issue Bonafide, Transfer (TC), and Study certificates with QR verification.</p>
            </div>
            <button
              onClick={() => setCertModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              Generate Certificate
            </button>
          </div>

          {certGenerated ? (
            <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl max-w-lg mx-auto text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">DPS Bengaluru North</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">{certGenerated.type}</h3>
              <p className="text-xs font-mono font-bold text-blue-700 mt-0.5">{certGenerated.certNo}</p>
              <p className="text-xs text-slate-600 my-4">
                This is to certify that <strong>{certGenerated.name}</strong> ({certGenerated.humanId}) is a bonafide student of Class 10 for the academic session AY-2026-2027.
              </p>
              <div className="flex justify-center mb-4">
                <QrCode className="w-16 h-16 text-slate-900" />
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Certificate
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Select a student to generate an official digital certificate.
            </div>
          )}
        </div>
      )}

      {certModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Issue Student Certificate</h3>
            <div className="space-y-3 text-xs">
              <select className="w-full px-3 py-2 border rounded-xl bg-white">
                <option>Bonafide Certificate</option>
                <option>Transfer Certificate (TC)</option>
                <option>Study & Conduct Certificate</option>
                <option>Fee Paid Certificate</option>
              </select>
              <input type="text" defaultValue="Aarav Kashyap (STU-INS000001-000001)" readOnly className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-medium" />
              <input type="text" placeholder="Purpose (e.g. Passport Application / Bank Account)" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="flex justify-end gap-2 text-xs mt-6">
              <button onClick={() => setCertModal(false)} className="px-3.5 py-2 rounded-xl border text-slate-600">Cancel</button>
              <button onClick={handleGenerateCertificate} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">Generate with QR</button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
