"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  GitCompare,
  CheckCircle2,
  Calculator,
  Calendar,
  Zap,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/loan-discovery", label: "Loan Discovery", icon: Compass },
    { href: "/compare-loans", label: "Compare Loans", icon: GitCompare },
    { href: "/eligibility-check", label: "Eligibility Check", icon: CheckCircle2 },
    { href: "/emi-calculator", label: "EMI Calculator", icon: Calculator },
    { href: "/repayment-planner", label: "Repayment Planner", icon: Calendar },
  ];

  const checkIsActive = (href: string) => {
    if (href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-slate-200 z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col">
          {/* App Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-extrabold text-lg group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-white stroke-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight flex items-center gap-1">
                  FINMATCH <span className="text-blue-600">AI</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Financial Decision Support</span>
              </div>
            </Link>
            <button
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="px-6 pt-6 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Main Navigation
            </span>
          </div>

          <nav className="flex flex-col gap-1.5 px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isSelected = checkIsActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <span className="text-xs text-slate-600 font-medium">
              Public Decision Support Online
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug px-1">
            No account required. Free financial discovery tools.
          </p>
        </div>
      </aside>
    </>
  );
}
