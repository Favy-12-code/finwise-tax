import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/Guide.css';

export default function TaxDeadline() {
  const location = useLocation();
  useEffect(() => {

if(location.hash){

const element = document.querySelector(location.hash);

if(element){

element.scrollIntoView({ behavior: "smooth" });

}

}

},[location]);
  const taxDeadlines = [
    {
      type: "Company Income Tax (CIT)",
      due: "Within 6 months after your company’s accounting year ends",
      explanation: "Businesses pay tax on their profits every year. You have 6 months after your yearly accounts to pay."
    },
    {
      type: "Personal Income Tax (PIT)",
      due: "By 31st March every year",
      explanation: "Individuals and self-employed people file tax for the previous year by March 31st."
    },
    {
      type: "Value Added Tax (VAT)",
      due: "By 24th day of the month after the month of the sale",
      explanation: "If you sell goods or services, you collect VAT. You must report and pay it by the 24th of the next month."
    },
    {
      type: "Withholding Tax (WHT)",
      due: "By 21st day of the month after deduction",
      explanation: "If you deduct tax when paying someone (like contractor fees), you must send it to tax authorities by the 21st of the next month."
    },
    {
      type: "Pay-As-You-Earn (PAYE)",
      due: "By 10th day of the following month",
      explanation: "Employers deduct tax from employees’ salaries and send it to the tax office by the 10th of the next month."
    },
    {
      type: "Petroleum Profits Tax (PPT)",
      due: "Within 5 months after accounting period ends",
      explanation: "Oil companies pay tax on profits; due 5 months after the end of their financial year."
    },
    {
      type: "Stamp Duties",
      due: "Within 30 days of signing an official document",
      explanation: "Taxes on contracts, agreements, or legal documents must be paid within 30 days of signing."
    },
  ];

  const complianceSteps = [
    "Use official portals: File and pay online through NRS or State Internal Revenue Service (SBIRs).",
    "Paper submissions: Submit paper forms at the nearest tax office if online is difficult.",
    "Ask for help: Accredited tax agents or professionals can guide you for complicated taxes.",
    "Stay updated: Subscribe to tax authority newsletters or alerts to know about any changes.",
    "Set reminders: Use phone/calendar reminders and keep digital or physical copies of filings and payments."
  ];

  return (
    <div className="tax-deadline-guide" id="deadline">

      {/* Intro Section */}
      <div className="tax-section">
        <h2>Why You Need to Track Tax Deadlines</h2>
        <ul>
          <li>Both individuals and businesses in Nigeria must file taxes and pay on time.</li>
          <li>Filing or paying late can cause <strong>penalties</strong>, extra charges, or trouble with tax authorities.</li>
          <li>Using a <strong>tax calendar</strong> helps you know when each tax is due so you don’t miss anything.</li>
        </ul>
      </div>

      {/* Tax Table */}
      <div className="tax-section">
        <h2>Important Tax Deadlines (Practical Steps)</h2>
        <div className="tax-table">
          {taxDeadlines.map((item, idx) => (
            <div className="tax-row" key={idx}>
              <span className="tax-type">{item.type}</span>
              <span className="tax-due">{item.due}</span>
              <span className="tax-explanation">{item.explanation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Steps */}
      <div className="tax-section">
        <h2>How to Stay Compliant</h2>
        <ol className="compliance-list">
          {complianceSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Quick Tip */}
      <div className="tax-section">
        <h2>Quick Tip</h2>
        <ul>
          <li>Missing deadlines can cost you money or get you in trouble.</li>
          <li>Always plan ahead and check the type of tax, amount, and due date.</li>
        </ul>
      </div>

    </div>
  );
}