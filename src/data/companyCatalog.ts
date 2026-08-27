export type CompanyGroup = {
  id: string;
  name: string;
  description: string;
  companies: string[];
  focus: string[];
};

export const companyGroups: CompanyGroup[] = [
  {
    id: "it-services",
    name: "IT Services & Consulting",
    description: "Aptitude, communication, core CS, and reliable implementation rounds.",
    companies: [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini",
      "HCLTech",
      "Tech Mahindra",
      "LTIMindtree",
      "IBM",
      "Deloitte",
      "EY",
      "PwC",
      "KPMG",
    ],
    focus: ["Aptitude", "Arrays & Strings", "SQL", "OOP", "Communication"],
  },
  {
    id: "india-product",
    name: "Indian Product & Consumer Tech",
    description: "DSA patterns, product thinking, debugging, and practical system design.",
    companies: [
      "Zoho",
      "Freshworks",
      "Razorpay",
      "PhonePe",
      "Paytm",
      "Flipkart",
      "Meesho",
      "Swiggy",
      "Zomato",
      "Ola",
      "OYO",
      "Jio Platforms",
      "Airtel",
    ],
    focus: ["Problem Solving", "Backend Design", "SQL", "Debugging", "Machine Coding"],
  },
  {
    id: "finance",
    name: "Banking, Fintech & Analytics",
    description: "Strong fundamentals, data handling, probability, SQL, and clean coding.",
    companies: [
      "Goldman Sachs",
      "JPMorgan Chase",
      "Morgan Stanley",
      "Barclays",
      "UBS",
      "American Express",
      "Wells Fargo",
      "Visa",
      "Mastercard",
    ],
    focus: ["Arrays", "Probability", "SQL", "OOP", "Data Interpretation"],
  },
  {
    id: "enterprise",
    name: "Enterprise, SaaS & Hardware",
    description: "Core CS, maintainable code, domain fundamentals, and scalable architecture.",
    companies: [
      "SAP",
      "Oracle",
      "Adobe",
      "Salesforce",
      "Atlassian",
      "Intuit",
      "Nvidia",
      "Qualcomm",
      "Samsung R&D",
      "Walmart Global Tech",
    ],
    focus: ["Core CS", "Trees & Graphs", "Concurrency", "System Design", "OOP"],
  },
  {
    id: "global-product",
    name: "Global Product Companies",
    description: "Deep DSA, scalable systems, behavioral signals, and rigorous problem solving.",
    companies: [
      "Amazon",
      "Microsoft",
      "Google",
      "Meta",
      "Apple",
      "Uber",
      "LinkedIn",
      "ServiceNow",
    ],
    focus: ["DSA Patterns", "System Design", "Behavioral", "Concurrency", "Problem Solving"],
  },
];

export const companyNames = companyGroups.flatMap((group) => group.companies);

export function getCompanyGroup(company: string) {
  return companyGroups.find((group) => group.companies.includes(company));
}
