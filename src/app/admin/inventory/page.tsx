"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  DollarSign,
  TrendingDown,
  Layers,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: "UNIFORM" | "TEXTBOOK" | "LAB_APPARATUS" | "STATIONERY" | "SPORTS";
  currentStock: number;
  minThreshold: number;
  unitPrice: number;
  unit: string;
  locationRack: string;
  vendor: string;
}

interface IssuanceLog {
  id: string;
  studentName: string;
  humanId: string;
  className: string;
  itemName: string;
  quantity: number;
  issuedDate: string;
  issuedBy: string;
}

export default function AdminInventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "inv-001",
      itemCode: "UNI-10-M-BLAZER",
      name: "Class 10 Formal Blazer (Navy Blue, Size 38)",
      category: "UNIFORM",
      currentStock: 45,
      minThreshold: 20,
      unitPrice: 1850,
      unit: "Pieces",
      locationRack: "Store Bay A-1",
      vendor: "Raymond School Apparel Ltd",
    },
    {
      id: "inv-002",
      itemCode: "TXT-CBSE-MATH-10",
      name: "NCERT Mathematics Textbook Class 10 (Revised Edition)",
      category: "TEXTBOOK",
      currentStock: 12,
      minThreshold: 25,
      unitPrice: 190,
      unit: "Books",
      locationRack: "Textbook Stacks T-4",
      vendor: "NCERT Official Publication Depot",
    },
    {
      id: "inv-003",
      itemCode: "LAB-PHY-OPT-BENCH",
      name: "Optical Bench Dual-Rod Set with Lens Holders",
      category: "LAB_APPARATUS",
      currentStock: 18,
      minThreshold: 10,
      unitPrice: 3400,
      unit: "Sets",
      locationRack: "Physics Lab Room 302",
      vendor: "Scientific Equipment Suppliers Bangalore",
    },
    {
      id: "inv-004",
      itemCode: "STN-DPS-DIARY-26",
      name: "DPS Bengaluru North Annual Student Planner & Diary",
      category: "STATIONERY",
      currentStock: 8,
      minThreshold: 30,
      unitPrice: 120,
      unit: "Copies",
      locationRack: "Store Bay S-2",
      vendor: "Universal Printers Ltd",
    },
    {
      id: "inv-005",
      itemCode: "SPT-CRIC-SG-BAT",
      name: "SG English Willow Cricket Bat (Size 6)",
      category: "SPORTS",
      currentStock: 14,
      minThreshold: 5,
      unitPrice: 2200,
      unit: "Pieces",
      locationRack: "Sports Pavilion R-1",
      vendor: "Decathlon Sports India",
    },
  ]);

  const [issuanceLogs, setIssuanceLogs] = useState<IssuanceLog[]>([
    {
      id: "iss-001",
      studentName: "Aarav Kashyap",
      humanId: "STU-INS000001-000001",
      className: "Class 10-A",
      itemName: "NCERT Mathematics Textbook Class 10",
      quantity: 1,
      issuedDate: "2026-11-10",
      issuedBy: "Store Manager K. V. Mohan",
    },
    {
      id: "iss-002",
      studentName: "Diya Menon",
      humanId: "STU-INS000001-000002",
      className: "Class 10-A",
      itemName: "Class 10 Formal Blazer (Navy Blue, Size 38)",
      quantity: 1,
      issuedDate: "2026-11-09",
      issuedBy: "Store Manager K. V. Mohan",
    },
  ]);

  const filteredItems =
    selectedCategory === "ALL" ? items : items.filter((i) => i.category === selectedCategory);

  const lowStockCount = items.filter((i) => i.currentStock <= i.minThreshold).length;

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
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-purple-600" />
              Edubricz Campus Store & Asset Inventory
            </span>
            <span className="text-xs text-slate-400 font-mono">Central Stores Depot</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Store, Uniforms & Inventory Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage textbooks, uniforms, laboratory apparatus, sports supplies, and monitor student distribution logs.
          </p>
        </div>

        <button
          onClick={() => alert("New stock entry requisition dialog opened.")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stock Inward</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Cataloged SKUs</span>
          <span className="text-2xl font-extrabold text-slate-900">{items.length} Items</span>
          <span className="text-[10px] text-slate-500 block mt-1">Across 5 Department Stores</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Low Stock Alerts</span>
          <span className="text-2xl font-extrabold text-rose-600">{lowStockCount} SKUs</span>
          <span className="text-[10px] text-rose-700 font-bold block mt-1">Below minimum threshold</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Inventory Valuation</span>
          <span className="text-2xl font-extrabold text-emerald-600">₹4.82 Lakh</span>
          <span className="text-[10px] text-slate-500 block mt-1">Audited AY 2026-27</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Recent Student Issuances</span>
          <span className="text-2xl font-extrabold text-blue-700">{issuanceLogs.length} Records</span>
          <span className="text-[10px] text-slate-500 block mt-1">Verified with student ID</span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {["ALL", "UNIFORM", "TEXTBOOK", "LAB_APPARATUS", "STATIONERY", "SPORTS"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedCategory === cat
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Item Code</th>
                <th className="p-3.5">Item Name & Category</th>
                <th className="p-3.5">Available Stock</th>
                <th className="p-3.5">Unit Price</th>
                <th className="p-3.5">Warehouse Location</th>
                <th className="p-3.5">Vendor</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isLow = item.currentStock <= item.minThreshold;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5 font-mono font-bold text-slate-800">{item.itemCode}</td>
                    <td className="p-3.5">
                      <strong className="text-slate-900 block">{item.name}</strong>
                      <span className="text-[10px] uppercase font-bold text-slate-400">{item.category}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-extrabold text-sm ${isLow ? "text-rose-600" : "text-slate-900"}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        {isLow && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 uppercase flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Reorder
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">Min: {item.minThreshold} {item.unit}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-800">₹{item.unitPrice.toLocaleString("en-IN")}</td>
                    <td className="p-3.5 text-slate-600">{item.locationRack}</td>
                    <td className="p-3.5 text-slate-600">{item.vendor}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => alert(`Issuing ${item.name} to student.`)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] rounded-lg transition-all"
                      >
                        Issue to Student
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Issuance Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Recent Student Issuance Log</h3>
        <p className="text-xs text-slate-500 mb-4">Official store ledger records signed by campus store controller.</p>

        <div className="divide-y divide-slate-100 text-xs">
          {issuanceLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{log.studentName}</h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {log.humanId} • {log.className}
                  </span>
                </div>
              </div>

              <div className="text-slate-700">
                <strong>{log.quantity}x {log.itemName}</strong>
                <p className="text-[11px] text-slate-400">Issued on {log.issuedDate} by {log.issuedBy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
