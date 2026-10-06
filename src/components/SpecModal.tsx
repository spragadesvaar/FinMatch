"use client";

import React from "react";
import { X, CheckCircle, HelpCircle } from "lucide-react";

export interface LoanSpec {
  name: string;
  rate: string;
  amount: string;
  tenure: string;
  fee: string;
  collateral: string;
  cibil: string;
}

interface SpecModalProps {
  spec: LoanSpec | null;
  onClose: () => void;
  onApply: () => void;
}

export function SpecModal({ spec, onClose, onApply }: SpecModalProps) {
  if (!spec) return null;

  return (
    <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-primary-fixed relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-black text-on-surface leading-tight">
                {spec.name} Specifications
              </h3>
              <span className="text-xs text-secondary font-semibold">
                Regulatory Banking Guidelines
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3 py-1">
          <div className="grid grid-cols-2 gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <div>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                Interest Rate
              </span>
              <p className="text-lg font-black text-primary">{spec.rate}</p>
            </div>
            <div>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                Max Sanction
              </span>
              <p className="text-lg font-black text-on-surface">{spec.amount}</p>
            </div>
            <div>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                Max Tenure
              </span>
              <p className="text-xs text-on-surface font-bold">{spec.tenure}</p>
            </div>
            <div>
              <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
                Processing Fee
              </span>
              <p className="text-xs text-on-surface font-bold">{spec.fee}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-secondary uppercase font-bold tracking-wider">
              Risk & Underwriting Criteria
            </span>
            <div className="flex justify-between items-center py-2 px-3 bg-surface-container-low rounded-xl">
              <span className="text-xs text-on-surface-variant font-medium">
                Collateral / Security
              </span>
              <span className="text-xs text-on-surface font-bold">{spec.collateral}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-surface-container-low rounded-xl">
              <span className="text-xs text-on-surface-variant font-medium">
                Recommended CIBIL Threshold
              </span>
              <span className="text-xs text-primary font-black">{spec.cibil}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all"
          >
            Dismiss
          </button>
          <button
            onClick={onApply}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Proceed to Application</span>
          </button>
        </div>
      </div>
    </div>
  );
}
