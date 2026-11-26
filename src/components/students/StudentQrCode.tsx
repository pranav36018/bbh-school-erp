"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Download, Maximize2, QrCode, X } from "lucide-react";

const CANONICAL_PUBLIC_ORIGIN = "https://bbh-school-erp.vercel.app";

interface StudentQrCodeProps {
  studentId: string;
  studentName?: string;
  admissionNo?: string;
  size?: number;
  variant?: "mini" | "card";
  hideActions?: boolean;
}

/**
 * Renders a genuine ISO/IEC 18004 scannable QR code linking directly to
 * `/id/[studentId]`. Clicking the QR opens a clean expanded QR-only modal
 * optimized for direct smartphone scanning.
 */
export default function StudentQrCode({
  studentId,
  studentName,
  admissionNo,
  size,
  variant = "card",
  hideActions = false,
}: StudentQrCodeProps) {
  const [origin, setOrigin] = useState<string>(CANONICAL_PUBLIC_ORIGIN);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      // Keep canonical HTTPS origin when viewed on localhost so physical phone camera scans resolve externally.
      if (host !== "localhost" && host !== "127.0.0.1") {
        setOrigin(window.location.origin);
      }
    }
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const encodedId = encodeURIComponent(studentId);
  const qrUrl = `${origin}/id/${encodedId}`;

  const { viewBox, pathData } = useMemo(() => {
    try {
      const qr = QRCode.create(qrUrl, { errorCorrectionLevel: "M" });
      const modulesSize = qr.modules.size;
      const data = qr.modules.data;
      const quietZone = 4;
      const total = modulesSize + quietZone * 2;
      let d = "";
      for (let r = 0; r < modulesSize; r++) {
        for (let c = 0; c < modulesSize; c++) {
          if (data[r * modulesSize + c]) {
            d += `M${c + quietZone},${r + quietZone}h1v1h-1z`;
          }
        }
      }
      return { viewBox: `0 0 ${total} ${total}`, pathData: d };
    } catch {
      return { viewBox: "0 0 21 21", pathData: "" };
    }
  }, [qrUrl]);

  const handleDownloadPng = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setDownloading(true);
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 512,
        margin: 4,
        errorCorrectionLevel: "H",
        color: { dark: "#000000", light: "#ffffff" },
      });
      const link = document.createElement("a");
      const safeName = (studentName || studentId).replace(/[^a-zA-Z0-9_-]/g, "_");
      link.href = dataUrl;
      link.download = `SVVK_Student_QR_${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  const renderExpandedModal = () => {
    if (!expanded || !mounted) return null;
    return createPortal(
      <div
        onClick={() => setExpanded(false)}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={`Expanded QR Code for ${studentName || studentId}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 flex flex-col items-center text-center relative"
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Close expanded QR"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold mb-1.5">
              <QrCode className="w-3 h-3" />
              <span>Scan with Phone Camera</span>
            </span>
            {studentName && (
              <h3 className="text-sm font-extrabold text-slate-900">{studentName}</h3>
            )}
            {admissionNo && (
              <p className="text-[11px] font-mono text-slate-500">{admissionNo}</p>
            )}
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-inner">
            <svg
              width={270}
              height={270}
              viewBox={viewBox}
              shapeRendering="crispEdges"
              aria-label={`Large scannable QR code for ${studentName || studentId}`}
              role="img"
              className="max-w-full h-auto"
            >
              <rect width="100%" height="100%" fill="#ffffff" />
              <path d={pathData} fill="#000000" />
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 w-full">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-all disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? "Saving..." : "Download QR"}</span>
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  if (variant === "mini") {
    const px = size || 44;
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          title={`Click to expand QR code for ${studentName || "Student"}`}
          className="inline-flex items-center justify-center p-1 bg-white rounded-lg border border-slate-300 hover:border-blue-500 shadow-xs transition-all hover:scale-105 shrink-0 cursor-zoom-in"
        >
          <svg
            width={px}
            height={px}
            viewBox={viewBox}
            shapeRendering="crispEdges"
            aria-label={`Scannable QR code for ${studentName || studentId}`}
            role="img"
          >
            <rect width="100%" height="100%" fill="#ffffff" />
            <path d={pathData} fill="#000000" />
          </svg>
        </button>
        {renderExpandedModal()}
      </>
    );
  }

  const cardPx = size || 120;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 text-slate-900 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          title="Click to expand QR code for scanning"
          className="p-2 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-all shadow-xs shrink-0 cursor-zoom-in group relative"
        >
          <svg
            width={cardPx}
            height={cardPx}
            viewBox={viewBox}
            shapeRendering="crispEdges"
            aria-label={`Scannable QR code for ${studentName || studentId}`}
            role="img"
          >
            <rect width="100%" height="100%" fill="#ffffff" />
            <path d={pathData} fill="#000000" />
          </svg>
        </button>

        <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
            <QrCode className="w-3 h-3 text-emerald-700" />
            <span>Real Scannable Student QR ID</span>
          </div>
          <p className="text-xs font-bold text-slate-900 leading-snug">
            Scan with Phone Camera for Complete Student, Parent Details &amp; History
          </p>
          {admissionNo && (
            <p className="text-[10px] font-mono text-slate-500 truncate">
              Record: {admissionNo} • {studentId}
            </p>
          )}

          {!hideActions && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 print:hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition-all"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Expand QR</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={downloading}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-[11px] font-bold transition-all disabled:opacity-50"
              >
                <Download className="w-3 h-3" />
                <span>{downloading ? "Saving..." : "Download QR"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {renderExpandedModal()}
    </>
  );
}
