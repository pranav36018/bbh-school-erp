"use client";

import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { QrCode, Shield, CheckCircle2, FileText, Download, Printer } from "lucide-react";

export default function StudentProfilePage() {
  return (
    <PortalLayout
      portal="student"
      userName="Aarav Kashyap"
      userRole="Student • Class 10-A"
      userHumanId="STU-INS000001-000001"
      institutionName="Sri Vivekananda Vidya Kendra"
      academicYear="AY-2026-2027"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Digital Identity Card & Document Vault</h1>
        <p className="text-xs text-slate-500 mt-1">Official board credential backed by cryptographic QR verification and DPDP-compliant vault.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Physical / Digital Badge Card */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-700 max-w-md mx-auto w-full">
          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img src="/images/svvk-logo.png" alt="SVVK" className="w-10 h-10 rounded-full object-contain bg-amber-500/10 p-0.5 border border-amber-500/30" />
              <div>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-400 block">Swamy Vivekananda Vidya Kendra Trust</span>
                <h2 className="text-xs font-black tracking-tight text-white">SRI VIVEKANANDA VIDYA KENDRA</h2>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              CBSE: 830680
            </span>
          </div>

          {/* Student Info */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-3xl text-white shadow-lg border border-white/20">
              A
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Aarav Kashyap</h3>
              <p className="text-xs font-mono font-bold text-blue-400">STU-INS000001-000001</p>
              <p className="text-xs text-slate-300 mt-1">Class 10 - Section A • Roll #12</p>
            </div>
          </div>

          {/* QR Verification Seal */}
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between text-slate-900 mb-6">
            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Admission No:</span>
              <span className="font-mono font-bold text-slate-900">ADM-2026-0001</span>
              <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Valid AY-2026-2027
              </span>
            </div>
            <div className="w-20 h-20 bg-slate-50 p-1 rounded-xl flex items-center justify-center border">
              <QrCode className="w-16 h-16 text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            <div>Blood Group: <strong className="text-white">O+</strong></div>
            <div>Emergency: <strong className="text-white">+91 98440 11001</strong></div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => window.print()} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md">
              <Printer className="w-4 h-4" /> Print Identity Card
            </button>
          </div>
        </div>

        {/* Verified Document Vault */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Encrypted Document Vault</h2>
              <p className="text-xs text-slate-500">Government identity & birth records under DPDP Act protections</p>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Shield className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Birth Certificate</span>
                  <span className="text-[11px] text-slate-400">Municipal Corporation of Bengaluru • Verified</span>
                </div>
              </div>
              <button className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white border">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Previous Academic Transfer Certificate (TC)</span>
                  <span className="text-[11px] text-slate-400">National Public School • Sealed on Admission</span>
                </div>
              </div>
              <button className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white border">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900 block">Immunization & Health Record</span>
                  <span className="text-[11px] text-slate-400">School Medical Infirmary • Fit for Sports</span>
                </div>
              </div>
              <button className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white border">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
