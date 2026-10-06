"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { Calendar, Table, Info } from "lucide-react";

function RepaymentPlannerContent() {
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

  // Generate repayment schedule rows (limit view to first 36 months for clean UI preview)
  const scheduleRows = [];
  if (emi > 0 && tenureMonths > 0) {
    let balance = numAmount;
    for (let month = 1; month <= Math.min(tenureMonths, 36); month++) {
      const interestPayment = Math.round(balance * monthlyRate);
      const principalPayment = Math.min(balance, Math.max(0, emi - interestPayment));
      balance = Math.max(0, balance - principalPayment);

      scheduleRows.push({
        month,
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }
  }

  return (
    <PageContainer>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Financial Planning
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Repayment Planner
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-normal">
            View an estimated month-by-month repayment schedule to understand how principal and interest evolve.
          </p>
        </div>
      </div>

      {/* Input Form Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500000"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tenure (Years)
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              placeholder="e.g. 5"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Estimated Amortization Schedule</h2>
          </div>
          {tenureMonths > 36 && (
            <span className="text-xs font-medium text-slate-500">Showing first 36 of {tenureMonths} months</span>
          )}
        </div>

        {scheduleRows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-3">Month</th>
                  <th className="px-5 py-3">EMI (₹)</th>
                  <th className="px-5 py-3">Principal (₹)</th>
                  <th className="px-5 py-3">Interest (₹)</th>
                  <th className="px-6 py-3">Remaining Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-medium">
                {scheduleRows.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-bold text-blue-600">Month {row.month}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">₹{row.emi.toLocaleString()}</td>
                    <td className="px-5 py-3 text-emerald-700 font-semibold">₹{row.principal.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sky-600">₹{row.interest.toLocaleString()}</td>
                    <td className="px-6 py-3 font-bold text-slate-700">₹{row.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl m-6 flex flex-col items-center justify-center">
            <Calendar className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Enter Loan Details
            </h3>
            <p className="text-xs text-slate-500 max-w-xs">
              Enter amount, rate, and tenure above to generate an estimated repayment plan.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed font-normal">
          “This repayment plan is for financial understanding and estimation purposes only. Actual interest calculation may vary depending on bank rules.”
        </p>
      </div>
    </PageContainer>
  );
}

export default function RepaymentPlannerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading repayment planner...</div>}>
      <RepaymentPlannerContent />
    </Suspense>
  );
}
