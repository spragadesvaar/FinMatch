"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { LOAN_SCHEMES } from "@/data/loansData";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Building2,
  Wallet,
  GraduationCap,
  Car,
  Briefcase,
  Coins,
} from "lucide-react";

export default function LoanDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Home Loan",
    "Personal Loan",
    "Education Loan",
    "Vehicle Loan",
    "Business Loan",
    "Gold Loan",
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Home Loan":
        return Building2;
      case "Personal Loan":
        return Wallet;
      case "Education Loan":
        return GraduationCap;
      case "Vehicle Loan":
        return Car;
      case "Business Loan":
        return Briefcase;
      case "Gold Loan":
        return Coins;
      default:
        return Building2;
    }
  };

  const filteredLoans = LOAN_SCHEMES.filter((loan) => {
    const matchesCategory = selectedCategory === "All" || loan.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Loan Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Explore Loan Schemes
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-normal">
            Compare features, interest rates, and eligibility criteria for financial decision support.
          </p>
        </div>
      </div>

      {/* Search & Categories Ribbon */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search loans by name or description..."
            className="w-full h-11 pl-12 pr-4 bg-slate-50 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => {
          const Icon = getCategoryIcon(loan.category);
          return (
            <div
              key={loan.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                    {loan.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{loan.name}</h3>
                <p className="text-xs text-slate-600 mb-5 font-normal leading-relaxed">
                  {loan.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl mb-5 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block">Interest Rate</span>
                    <span className="text-base font-extrabold text-blue-600">{loan.interestRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Max Amount</span>
                    <span className="text-base font-bold text-slate-900">{loan.maxAmount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Max Tenure</span>
                    <span className="font-semibold text-slate-900">{loan.maxTenure}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Min Income</span>
                    <span className="font-semibold text-slate-900">{loan.minIncome}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Eligibility Summary
                  </span>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{loan.creditRequirement} • {loan.employmentEligibility}</span>
                  </div>
                </div>
              </div>

              {/* View Details Button ONLY (No Apply Now) */}
              <Link
                href={`/loan-discovery/${loan.id}`}
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
