"use client";

import React from "react";
import { Search, Menu, ShieldCheck, HelpCircle } from "lucide-react";

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onMenuToggle: () => void;
}

export function Header({ searchQuery = "", setSearchQuery, onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 px-4 sm:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-blue-600"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search loan schemes, compare rates, calculators..."
            className="w-full h-11 pl-12 pr-4 bg-slate-50 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all shadow-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Financial Decision Support</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-medium">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Public Portal</span>
        </div>
      </div>
    </header>
  );
}
