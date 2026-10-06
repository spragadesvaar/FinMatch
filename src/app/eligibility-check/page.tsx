"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { ShieldCheck, Info, CheckCircle2, AlertCircle, RotateCcw, XCircle } from "lucide-react";

interface EvaluationResult {
  isEligible: boolean;
  emiRatio: number;
  conditions: {
    age: { met: boolean; text: string };
    income: { met: boolean; text: string };
    credit: { met: boolean; text: string };
    emi: { met: boolean; text: string };
    amount: { met: boolean; text: string };
  };
}

export default function EligibilityCheckPage() {
  const [age, setAge] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [existingEMI, setExistingEMI] = useState<string>("");
  const [creditScore, setCreditScore] = useState<string>("");
  const [requestedAmount, setRequestedAmount] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleReset = () => {
    setAge("");
    setMonthlyIncome("");
    setEmploymentType("");
    setExistingEMI("");
    setCreditScore("");
    setRequestedAmount("");
    setErrors({});
    setResult(null);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    const numAge = Number(age);
    if (!age || isNaN(numAge) || numAge < 21 || numAge > 65) {
      newErrors.age = "Age must be between 21 and 65.";
    }

    const numIncome = Number(monthlyIncome);
    if (!monthlyIncome || isNaN(numIncome) || numIncome <= 0) {
      newErrors.monthlyIncome = "Please enter a valid monthly income.";
    }

    if (!employmentType) {
      newErrors.employmentType = "Please select employment type.";
    }

    const numEMI = Number(existingEMI);
    if (existingEMI !== "" && (isNaN(numEMI) || numEMI < 0)) {
      newErrors.existingEMI = "Existing EMI must be 0 or greater.";
    }

    const numScore = Number(creditScore);
    if (!creditScore || isNaN(numScore) || numScore < 300 || numScore > 900) {
      newErrors.creditScore = "Credit score must be between 300 and 900.";
    }

    const numAmount = Number(requestedAmount);
    if (!requestedAmount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.requestedAmount = "Please enter a valid requested loan amount.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    setErrors({});

    const actualEMI = existingEMI === "" ? 0 : numEMI;
    const emiRatio = (actualEMI / numIncome) * 100;

    const condAge = numAge >= 21 && numAge <= 65;
    const condIncome = numIncome >= 25000;
    const condCredit = numScore >= 650;
    const condEMI = emiRatio <= 50;
    const condAmount = numAmount > 0;

    const allSatisfied = condAge && condIncome && condCredit && condEMI && condAmount;

    setResult({
      isEligible: allSatisfied,
      emiRatio: Math.round(emiRatio * 10) / 10,
      conditions: {
        age: {
          met: condAge,
          text: condAge
            ? "Age requirement satisfied (21–65 years)"
            : "Age requirement is outside the supported range (21–65 years)",
        },
        income: {
          met: condIncome,
          text: condIncome
            ? "Minimum income requirement satisfied (₹25,000+)"
            : "Monthly income is below minimum requirement of ₹25,000",
        },
        credit: {
          met: condCredit,
          text: condCredit
            ? "Credit score requirement satisfied (650+)"
            : "Credit score is below 650",
        },
        emi: {
          met: condEMI,
          text: condEMI
            ? `Existing EMI is within acceptable range (${Math.round(emiRatio)}% of income)`
            : `Existing EMI exceeds 50% of monthly income (${Math.round(emiRatio)}% of income)`,
        },
        amount: {
          met: condAmount,
          text: condAmount
            ? "Requested loan amount is valid"
            : "Requested loan amount must be greater than 0",
        },
      },
    });
  };

  return (
    <PageContainer>
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Informational Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Eligibility Check
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-normal">
            Understand whether you meet basic eligibility requirements before inquiring with financial institutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <form onSubmit={handleCheck} noValidate className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              Financial & Demographic Inputs
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Age (Years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (errors.age) setErrors((prev) => ({ ...prev, age: "" }));
                }}
                placeholder="Enter age"
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.age ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white`}
              />
              {errors.age && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Monthly Income (₹)
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => {
                  setMonthlyIncome(e.target.value);
                  if (errors.monthlyIncome) setErrors((prev) => ({ ...prev, monthlyIncome: "" }));
                }}
                placeholder="Enter monthly income"
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.monthlyIncome ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white`}
              />
              {errors.monthlyIncome && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.monthlyIncome}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => {
                  setEmploymentType(e.target.value);
                  if (errors.employmentType) setErrors((prev) => ({ ...prev, employmentType: "" }));
                }}
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.employmentType ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer`}
              >
                <option value="">Select employment type</option>
                <option value="Salaried Employee">Salaried Employee</option>
                <option value="Self-Employed Professional">Self-Employed Professional</option>
                <option value="Business Owner">Business Owner</option>
              </select>
              {errors.employmentType && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.employmentType}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Existing Monthly EMIs (₹)
              </label>
              <input
                type="number"
                value={existingEMI}
                onChange={(e) => {
                  setExistingEMI(e.target.value);
                  if (errors.existingEMI) setErrors((prev) => ({ ...prev, existingEMI: "" }));
                }}
                placeholder="Enter existing monthly EMI"
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.existingEMI ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white`}
              />
              {errors.existingEMI && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.existingEMI}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Credit Score (CIBIL)
              </label>
              <input
                type="number"
                value={creditScore}
                onChange={(e) => {
                  setCreditScore(e.target.value);
                  if (errors.creditScore) setErrors((prev) => ({ ...prev, creditScore: "" }));
                }}
                placeholder="Enter CIBIL score"
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.creditScore ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white`}
              />
              {errors.creditScore && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.creditScore}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Requested Loan Amount (₹)
              </label>
              <input
                type="number"
                value={requestedAmount}
                onChange={(e) => {
                  setRequestedAmount(e.target.value);
                  if (errors.requestedAmount) setErrors((prev) => ({ ...prev, requestedAmount: "" }));
                }}
                placeholder="Enter requested loan amount"
                className={`w-full h-11 px-4 rounded-xl bg-slate-50 border ${
                  errors.requestedAmount ? "border-red-500 bg-red-50/20" : "border-slate-200"
                } text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white`}
              />
              {errors.requestedAmount && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.requestedAmount}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            Check Eligibility
          </button>
        </form>

        {/* Assessment Result Panel */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          {result ? (
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Assessment Status
              </span>

              {result.isEligible ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg mb-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Likely Eligible</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-medium">
                    You meet basic income, credit, age, and EMI burden requirements.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-5">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-lg mb-1">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                    <span>May Not Meet Basic Criteria</span>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    One or more criteria do not meet typical lender guidelines.
                  </p>
                </div>
              )}

              {/* EMI Burden Ratio */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-5 flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Calculated EMI Burden Ratio:</span>
                <span className={`font-bold ${result.emiRatio > 50 ? "text-amber-600" : "text-slate-900"}`}>
                  {result.emiRatio}% of monthly income
                </span>
              </div>

              {/* Conditions Feedback */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold text-slate-700 block">Eligibility Conditions:</span>
                {Object.entries(result.conditions).map(([key, item]) => (
                  <div
                    key={key}
                    className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${
                      item.met
                        ? "bg-emerald-50/60 border-emerald-100 text-emerald-800"
                        : "bg-red-50/60 border-red-100 text-red-800"
                    }`}
                  >
                    {item.met ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center my-auto py-12">
              <ShieldCheck className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Informational Assessment
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Enter your financial information and check your basic eligibility.
              </p>
            </div>
          )}

          {/* Mandatory Disclaimer */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed font-normal">
              “This is an educational/decision-support estimate and does not represent approval from a financial institution.”
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
