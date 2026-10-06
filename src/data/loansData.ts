import { Building2, Wallet, GraduationCap, Car, Briefcase, Coins } from "lucide-react";

export interface LoanScheme {
  id: string;
  name: string;
  category: "Home Loan" | "Personal Loan" | "Education Loan" | "Vehicle Loan" | "Business Loan" | "Gold Loan";
  shortDescription: string;
  overview: string;
  interestRate: string;
  interestRateNum: number;
  maxAmount: string;
  maxAmountNum: number;
  maxTenure: string;
  maxTenureMonths: number;
  processingFee: string;
  minIncome: string;
  ageRequirement: string;
  employmentEligibility: string;
  creditRequirement: string;
  otherConditions: string;
  badge: string;
  documents: string[];
  repaymentInfo: string;
  importantConditions: string[];
}

export const LOAN_SCHEMES: LoanScheme[] = [
  {
    id: "home-loan",
    name: "Home Loan",
    category: "Home Loan",
    shortDescription: "Financing for purchasing, constructing, or renovating residential properties.",
    overview: "A home loan is a financial facility designed to help individuals purchase, construct or renovate residential property with long-term flexible tenure.",
    interestRate: "7.50% onwards",
    interestRateNum: 7.5,
    maxAmount: "₹50,00,000",
    maxAmountNum: 5000000,
    maxTenure: "30 Years",
    maxTenureMonths: 360,
    processingFee: "0.50%",
    minIncome: "₹25,000 per month",
    ageRequirement: "21–60 years",
    employmentEligibility: "Salaried / Self-employed",
    creditRequirement: "700+ CIBIL Recommended",
    otherConditions: "Subject to property valuation, clear title deed, and lender approval.",
    badge: "Popular ⭐",
    documents: [
      "Identity Proof (PAN Card / Aadhaar Card)",
      "Address Proof (Passport / Utility Bill / Voter ID)",
      "Income Proof (Last 6 months salary slips / Form 16 / ITR)",
      "Employment Proof (Offer Letter / Employee ID / Business License)"
    ],
    repaymentInfo: "Repayable via Monthly Equated Installments (EMIs) through auto-debit or ECS. Zero prepayment penalty on floating rates.",
    importantConditions: [
      "Property must have clear and marketable title deeds",
      "Loan-to-Value (LTV) ratio capped up to 80% of property value",
      "Mandatory property insurance policy"
    ]
  },
  {
    id: "personal-loan",
    name: "Personal Loan",
    category: "Personal Loan",
    shortDescription: "Unsecured credit facility for personal, medical, or emergency expenses.",
    overview: "A flexible personal credit loan with no collateral required, offering fast processing and clear repayment terms.",
    interestRate: "10.50% onwards",
    interestRateNum: 10.5,
    maxAmount: "₹10,00,000",
    maxAmountNum: 1000000,
    maxTenure: "7 Years",
    maxTenureMonths: 84,
    processingFee: "1.00%",
    minIncome: "₹20,000 per month",
    ageRequirement: "21–58 years",
    employmentEligibility: "Salaried / Self-employed Professionals",
    creditRequirement: "720+ CIBIL Recommended",
    otherConditions: "No collateral required; approved based on income stability and credit score.",
    badge: "Quick Credit ⚡",
    documents: [
      "Identity Proof (PAN Card / Driving License)",
      "Address Proof (Aadhaar Card / Bank Statement)",
      "Income Proof (Last 3 months salary slips & 6 months bank statement)",
      "Employment Proof (Work email / Official ID card)"
    ],
    repaymentInfo: "Equal monthly installments via ECS or NACH debit with flexible tenure selection.",
    importantConditions: [
      "Prepayment allowed after completing minimum 6 EMIs",
      "Flat or reducing balance interest option depending on lender terms",
      "Minimum 1 year of continuous employment required"
    ]
  },
  {
    id: "education-loan",
    name: "Education Loan",
    category: "Education Loan",
    shortDescription: "Funding higher studies in domestic and foreign accredited universities.",
    overview: "Designed to fund tuition fees, examination fees, library charges, and living expenses for higher education.",
    interestRate: "8.50% onwards",
    interestRateNum: 8.5,
    maxAmount: "₹20,00,000",
    maxAmountNum: 2000000,
    maxTenure: "15 Years",
    maxTenureMonths: 180,
    processingFee: "Nil (For Indian institutes)",
    minIncome: "Co-applicant ₹25,000/mo",
    ageRequirement: "18–35 years",
    employmentEligibility: "Students with Co-applicant (Parent/Guardian)",
    creditRequirement: "Co-applicant CIBIL 680+",
    otherConditions: "Requires admission confirmation letter from a recognized institute.",
    badge: "Subsidized 🎓",
    documents: [
      "Identity & Address Proof of Student & Co-applicant",
      "Admission Letter & Fee Structure from Educational Institution",
      "Academic Marksheets (10th, 12th, Graduation)",
      "Income Proof & Bank Statements of Co-applicant"
    ],
    repaymentInfo: "Repayment begins after Moratorium Period (Course duration + 1 year or 6 months after obtaining job).",
    importantConditions: [
      "Full tax deduction on interest paid under Section 80E",
      "Parent/Guardian mandatory co-borrower",
      "Direct disbursement of tuition fee to university/college bank account"
    ]
  },
  {
    id: "vehicle-loan",
    name: "Vehicle Loan",
    category: "Vehicle Loan",
    shortDescription: "Financing for purchasing new or pre-owned cars and two-wheelers.",
    overview: "Secured vehicle financing offering high on-road funding percentage and attractive interest rates.",
    interestRate: "8.00% onwards",
    interestRateNum: 8.0,
    maxAmount: "₹25,00,000",
    maxAmountNum: 2500000,
    maxTenure: "7 Years",
    maxTenureMonths: 84,
    processingFee: "₹1,500 Flat",
    minIncome: "₹18,000 per month",
    ageRequirement: "21–65 years",
    employmentEligibility: "Salaried / Self-employed / Business Owners",
    creditRequirement: "710+ CIBIL Recommended",
    otherConditions: "Hypothecation of the vehicle in favor of the lender until loan closure.",
    badge: "High LTV 🚗",
    documents: [
      "Identity & Address Proof (PAN, Aadhaar, Passport)",
      "Income Proof (Last 3 months salary slips or ITR)",
      "Proforma Invoice / Dealer Price Quotation",
      "Bank Statement (Last 6 months)"
    ],
    repaymentInfo: "Monthly EMIs structured according to chosen tenure.",
    importantConditions: [
      "Comprehensive vehicle insurance required with lender endorsement",
      "Up to 90% on-road price funding available for selected models",
      "RC hypothecation removal certificate issued upon full closure"
    ]
  },
  {
    id: "business-loan",
    name: "Business Loan",
    category: "Business Loan",
    shortDescription: "Working capital and expansion capital for growing enterprises.",
    overview: "Financial support for businesses to upgrade machinery, expand operations, or manage inventory flow.",
    interestRate: "12.00% onwards",
    interestRateNum: 12.0,
    maxAmount: "₹40,00,000",
    maxAmountNum: 4000000,
    maxTenure: "5 Years",
    maxTenureMonths: 60,
    processingFee: "1.50%",
    minIncome: "Annual Business Turnover ₹15L+",
    ageRequirement: "24–65 years",
    employmentEligibility: "Self-Employed Enterprises / Sole Proprietorship / Pvt Ltd",
    creditRequirement: "720+ CIBIL Recommended",
    otherConditions: "Minimum 2 years of operational business vintage with audited financials.",
    badge: "Enterprise 💼",
    documents: [
      "PAN Card & Aadhaar of Business Owner & Entity",
      "GST Returns & Business Registration Proof (GST / Udyam)",
      "Audited Financial Statements (P&L, Balance Sheet for 2 years)",
      "Bank Statements (Current Account - Last 12 months)"
    ],
    repaymentInfo: "Flexible repayment through monthly or structured installments based on cash flow.",
    importantConditions: [
      "Business must show positive EBITDA for past 2 consecutive financial years",
      "No major default history on existing commercial borrowings",
      "No security required for collateral-free schemes up to limits"
    ]
  },
  {
    id: "gold-loan",
    name: "Gold Loan",
    category: "Gold Loan",
    shortDescription: "Instant liquidity backed by gold ornaments and coins.",
    overview: "Secured credit against gold jewelry providing minimal documentation and fast access to funds.",
    interestRate: "9.00% onwards",
    interestRateNum: 9.0,
    maxAmount: "₹15,00,000",
    maxAmountNum: 1500000,
    maxTenure: "3 Years",
    maxTenureMonths: 36,
    processingFee: "₹500 Flat",
    minIncome: "No minimum income proof",
    ageRequirement: "18–70 years",
    employmentEligibility: "Any Individual holding Gold Ornaments",
    creditRequirement: "No minimum CIBIL required",
    otherConditions: "Gold purity must be 18 to 22 karats, evaluated at branch counter.",
    badge: "Instant Cash 🪙",
    documents: [
      "Identity Proof (Aadhaar / Voter ID / Passport)",
      "Address Proof (Utility Bill / Ration Card)",
      "Passport Size Photographs"
    ],
    repaymentInfo: "Bullet repayment option (interest monthly, principal at end) or standard monthly EMI.",
    importantConditions: [
      "Gold stored in secure institutional vault with insurance coverage",
      "LTV ratio calculated up to RBI sanctioned limit (typically up to 75%)",
      "Immediate ornament return upon complete loan closure"
    ]
  }
];
