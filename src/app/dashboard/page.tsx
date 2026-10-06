"use client";

import React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { LOAN_SCHEMES } from "@/data/loansData";
import {
  Compass,
  GitCompare,
  CheckCircle2,
  Calculator,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const popularLoans = LOAN_SCHEMES.slice(0, 4);

  return (
    <PageContainer>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl text-white shadow-lg">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
              FINMATCH AI
            </span>
            <span className="text-blue-300 text-xs font-medium">| Intelligent Financial Decision Support System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Make Better Loan Decisions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
            Explore loan schemes, compare financial options, understand basic eligibility and estimate repayment costs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/loan-discovery"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Loans</span>
          </Link>
        </div>
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/loan-discovery"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Explore Loans</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Explore available loan schemes and their features.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:gap-2 transition-all">
            <span>Browse Catalogue</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link
          href="/compare-loans"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Compare Loans</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Compare interest rates, tenure, amount and other conditions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all">
            <span>Compare Schemes</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link
          href="/eligibility-check"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Check Eligibility</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Understand whether you meet the basic eligibility requirements.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:gap-2 transition-all">
            <span>Check Criteria</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link
          href="/emi-calculator"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Calculate EMI</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Estimate your monthly loan repayment.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
            <span>Calculate EMI</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>

      {/* Popular Loan Schemes Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Explore Loan Schemes</h2>
            <p className="text-xs text-slate-500 mt-1">
              Popular loan financial options for research and decision support.
            </p>
          </div>
          <Link
            href="/loan-discovery"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLoans.map((loan) => (
            <div
              key={loan.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {loan.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{loan.badge}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{loan.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 font-normal">
                  {loan.shortDescription}
                </p>

                <div className="space-y-2 py-3 border-t border-slate-200/60 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Interest Rate:</span>
                    <span className="font-bold text-blue-600">{loan.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Amount:</span>
                    <span className="font-bold text-slate-900">{loan.maxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Tenure:</span>
                    <span className="font-bold text-slate-900">{loan.maxTenure}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/loan-discovery/${loan.id}`}
                className="w-full mt-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
