"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { LOAN_SCHEMES } from "@/data/loansData";
import {
  ArrowLeft,
  Calculator,
  GitCompare,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Info,
} from "lucide-react";

export default function LoanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const loanId = params.id as string;

  const loan = LOAN_SCHEMES.find((item) => item.id === loanId) || LOAN_SCHEMES[0];

  return (
    <PageContainer>
      {/* Back button */}
      <div>
        <button
          onClick={() => router.push("/loan-discovery")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Loan Discovery</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            {loan.category}
          </span>
          <span className="text-blue-300 text-xs font-medium">Demo / Educational Information</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{loan.name}</h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal max-w-3xl">
          {loan.overview}
        </p>
      </div>

      {/* Key Details Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Key Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Interest Rate
            </span>
            <span className="text-xl font-extrabold text-blue-600">{loan.interestRate}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Max Loan Amount
            </span>
            <span className="text-xl font-extrabold text-slate-900">{loan.maxAmount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Maximum Tenure
            </span>
            <span className="text-xl font-extrabold text-slate-900">{loan.maxTenure}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Processing Fee
            </span>
            <span className="text-lg font-bold text-slate-900">{loan.processingFee}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Minimum Income
            </span>
            <span className="text-lg font-bold text-slate-900">{loan.minIncome}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Eligibility & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eligibility Information */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Eligibility Information</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Age Requirement</span>
                <span className="font-bold text-slate-900">{loan.ageRequirement}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Employment Eligibility</span>
                <span className="font-bold text-slate-900">{loan.employmentEligibility}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Minimum Monthly Income</span>
                <span className="font-bold text-slate-900">{loan.minIncome}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Credit Score Requirement</span>
                <span className="font-bold text-blue-600">{loan.creditRequirement}</span>
              </div>

              <div className="pt-2">
                <span className="text-slate-500 font-medium block mb-1">Other Conditions</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-normal">
                  {loan.otherConditions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Required Documents (Information Display Only) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Required Documents</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Standard document checklist required by lenders for verification (Information display only):
            </p>

            <div className="space-y-3">
              {loan.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 text-[11px]">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-slate-800 leading-normal">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0 text-amber-600" />
            <span>This page is for viewing informational guidelines only. No uploads required.</span>
          </div>
        </div>
      </div>

      {/* Repayment & Important Conditions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Repayment Information</h2>
          <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
            {loan.repaymentInfo}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Important Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {loan.importantConditions.map((cond, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{cond}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar at Bottom (ONLY Calculate EMI & Compare This Loan, NO Apply Now) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Make an Informed Decision</h3>
          <p className="text-xs text-slate-500">
            Estimate monthly repayment or compare this scheme with other financial products.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/emi-calculator?amount=${loan.maxAmountNum}&rate=${loan.interestRateNum}&tenure=${loan.maxTenureMonths / 12}`}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate EMI</span>
          </Link>

          <Link
            href={`/compare-loans?loan1=${loan.id}`}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare This Loan</span>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
