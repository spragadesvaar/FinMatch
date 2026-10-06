"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { Calculator, ArrowRight } from "lucide-react";

function EmiCalculatorContent() {
  const searchParams = useSearchParams();

  const [amount, setAmount] = useState<string>(searchParams.get("amount") || "");
  const [rate, setRate] = useState<string>(searchParams.get("rate") || "");
  const [tenureYears, setTenureYears] = useState<string>(searchParams.get("tenure") || "");

  const numAmount = Number(amount) || 0;
  const numRate = Number(rate) || 0;
  const numTenureYears = Number(tenureYears) || 0;

  const tenureMonths = numTenureYears * 12;
  const monthlyRate = numRate / 12 / 100;

  const emi =
    numAmount > 0 && numRate > 0 && numTenureYears > 0
      ? monthlyRate === 0
        ? numAmount / tenureMonths
        : Math.round(
            (numAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
              (Math.pow(1 + monthlyRate, tenureMonths) - 1)
          )
      : 0;

  const totalPayable = emi * tenureMonths;
  const totalInterest = Math.max(0, totalPayable - numAmount);

  const hasCalculation = emi > 0;
  const principalPercent = hasCalculation ? ((numAmount / totalPayable) * 100).toFixed(1) : "0";
  const interestPercent = hasCalculation ? ((totalInterest / totalPayable) * 100).toFixed(1) : "0";

  return (
    <PageContainer>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Financial Calculator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            EMI Calculator
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-normal">
            Calculate estimated monthly installments and interest breakdown to plan your loan repayment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Loan Details Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter requested loan amount"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              placeholder="Enter tenure in years"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          {hasCalculation ? (
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                Monthly Repayment Summary
              </span>

              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 mb-6 text-center">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Estimated Monthly EMI
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mt-1">
                  ₹{emi.toLocaleString()}
                </h2>
                <span className="text-xs text-slate-500 mt-1 block">For {tenureMonths} Months</span>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Principal Loan Amount</span>
                  <span className="font-bold text-slate-900">₹{numAmount.toLocaleString()} ({principalPercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Interest Payable</span>
                  <span className="font-bold text-blue-600">₹{totalInterest.toLocaleString()} ({interestPercent}%)</span>
                </div>
                <div className="h-px bg-slate-200 my-1" />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-900">Total Amount Payable</span>
                  <span className="font-extrabold text-slate-900">₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>

              {/* Simple Principal vs Interest Visualization */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-blue-600">Principal ({principalPercent}%)</span>
                  <span className="text-sky-500">Interest ({interestPercent}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                  <div style={{ width: `${principalPercent}%` }} className="bg-blue-600 h-full" />
                  <div style={{ width: `${interestPercent}%` }} className="bg-sky-400 h-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center my-auto py-12">
              <Calculator className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Calculate Monthly EMI
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Enter loan details to calculate EMI.
              </p>
            </div>
          )}

          {hasCalculation && (
            <Link
              href={`/repayment-planner?amount=${numAmount}&rate=${numRate}&tenure=${numTenureYears}`}
              className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>View Repayment Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default function EmiCalculatorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading EMI calculator...</div>}>
      <EmiCalculatorContent />
    </Suspense>
  );
}
