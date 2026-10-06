"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { LOAN_SCHEMES, LoanScheme } from "@/data/loansData";
import { GitCompare, Check, Plus, RefreshCw } from "lucide-react";

export default function CompareLoansPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["home-loan", "personal-loan", "vehicle-loan"]);

  const handleSelectLoan = (index: number, id: string) => {
    const updated = [...selectedIds];
    updated[index] = id;
    setSelectedIds(updated);
  };

  const selectedLoans: LoanScheme[] = selectedIds.map(
    (id) => LOAN_SCHEMES.find((s) => s.id === id) || LOAN_SCHEMES[0]
  );

  return (
    <PageContainer>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Decision Support Tool
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Compare Loan Schemes
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-normal">
            Side-by-side comparison of interest rates, amounts, tenure, processing fees, and eligibility requirements.
          </p>
        </div>
      </div>

      {/* Selectors Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Select Loan Schemes to Compare (Up to 3)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((slotIndex) => (
            <div key={slotIndex} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Loan Slot #{slotIndex + 1}
              </label>
              <select
                value={selectedIds[slotIndex] || ""}
                onChange={(e) => handleSelectLoan(slotIndex, e.target.value)}
                className="h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {LOAN_SCHEMES.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.name} ({scheme.category})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Side-by-Side Comparison Matrix</h2>
          </div>
          <span className="text-xs font-medium text-slate-500">Demo / Educational Data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 min-w-[200px]">Parameter</th>
                {selectedLoans.map((loan, idx) => (
                  <th key={idx} className="px-6 py-4 min-w-[220px] text-blue-700 font-extrabold text-sm">
                    {loan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-medium">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Loan Type</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 font-bold text-slate-700">
                    {loan.category}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Interest Rate</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 font-extrabold text-blue-600 text-sm">
                    {loan.interestRate}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Maximum Amount</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 font-bold text-slate-900">
                    {loan.maxAmount}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Maximum Tenure</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 font-bold text-slate-900">
                    {loan.maxTenure}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Processing Fee</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 text-slate-700">
                    {loan.processingFee}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Minimum Income</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 text-slate-700">
                    {loan.minIncome}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Age Requirement</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 text-slate-700">
                    {loan.ageRequirement}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Employment Eligibility</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 text-slate-700">
                    {loan.employmentEligibility}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900 bg-slate-50/50">Credit Requirement</td>
                {selectedLoans.map((loan, idx) => (
                  <td key={idx} className="px-6 py-4 font-bold text-blue-600">
                    {loan.creditRequirement}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
