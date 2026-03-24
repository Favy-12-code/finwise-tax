import React, { useState, useEffect } from "react";
import '../styles/calculator.css'
import { useLocation } from "react-router-dom";

const Business = () => {
  const [businessType, setBusinessType] = useState("large");
  const [revenue, setRevenue] = useState("");
  const [profit, setProfit] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem("businessTaxResult"));
    const savedRevenue = localStorage.getItem("businessRevenue");
    const savedProfit = localStorage.getItem("businessProfit");
    const savedType = localStorage.getItem("businessType");

    if (savedResult) setResult(savedResult);
    if (savedRevenue) setRevenue(savedRevenue);
    if (savedProfit) setProfit(savedProfit);
    if (savedType) setBusinessType(savedType);
  }, []);

  useEffect(() => {
    localStorage.setItem("businessRevenue", revenue);
    localStorage.setItem("businessProfit", profit);
    localStorage.setItem("businessType", businessType);
  }, [revenue, profit, businessType]);

  const formatNumber = (value) => {
    const num = value.replace(/,/g, "");
    if (!num) return "";
    return Number(num).toLocaleString();
  };

  const handleInput = (value,setter) => {
    const raw = value.replace(/,/g,"");
    if(!/^\d*$/.test(raw)) return;
    setter(formatNumber(raw));
  };

  const location = useLocation();

  useEffect(() => {
      if (location.state?.scrollTo) {
        const el = document.getElementById(location.state.scrollTo);
  
        if (el) {
          const offset = -80;
          const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
  
          window.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      }
    }, [location]);

  const calculateTax = () => {
    const turnover = Number(revenue.replace(/,/g,""));
    const taxableProfit = Number(profit.replace(/,/g,""));

    if (!turnover || (businessType === "large" && !taxableProfit)) {
      setError("Please fill in all required fields.");
      setResult(null);
      return;
    }
    setError("");

    let breakdown = {};

    if (businessType === "large") {
      let citRate = turnover <= 100_000_000 ? 0 : 0.3;
      let companyCategory = turnover <= 100_000_000 ? "Small Company" : "Large Company";

      const cit = taxableProfit * citRate;
      const educationTax = turnover * 0.025;
      const totalTax = cit + educationTax;
      const effectiveRate = (totalTax / turnover) * 100;

      breakdown = {
        type: companyCategory,
        revenue: turnover,
        profit: taxableProfit,
        citRate: citRate * 100,
        cit,
        educationTax,
        totalTax,
        effectiveRate,
        analysis: generateLargeAnalysis(turnover, taxableProfit, totalTax, effectiveRate),
      };
    }

    if (businessType === "small") {
      const vatRate = 0.075;
      const vatPayable = turnover * vatRate;

      breakdown = {
        type: "Small Business",
        revenue: turnover,
        vatRate: 7.5,
        vat: vatPayable,
        analysis: generateSmallAnalysis(turnover, vatPayable),
      };
    }

    setResult(breakdown);
    localStorage.setItem("businessTaxResult", JSON.stringify(breakdown));
  };

const generateLargeAnalysis = (rev,profit,tax,rate)=>{

if(rev <= 100000000){

return `Good news! Based on your annual revenue of ₦${rev.toLocaleString()}, your company qualifies as a SMALL COMPANY under the new Nigerian Finance Act.

Companies earning ₦100 million or less annually do NOT pay Company Income Tax.

However, education tax may still apply depending on reporting rules.

Your estimated tax liability comes mainly from statutory obligations such as education tax.

This means your total tax exposure is about ₦${tax.toLocaleString()} which equals roughly ${rate.toFixed(2)}% of your revenue.

This is considered a relatively light tax burden and allows your company to reinvest profits into growth, hiring, and expansion.`

}

return `Based on your revenue of ₦${rev.toLocaleString()}, your business qualifies as a LARGE COMPANY under Nigerian tax law.

Large companies are required to pay:

• 30% Company Income Tax on taxable profit  
• 2.5% Education Tax on turnover

Your taxable profit is ₦${profit.toLocaleString()} which generates a CIT liability.

Your total estimated tax comes to ₦${tax.toLocaleString()}.

This means your effective tax rate is approximately ${rate.toFixed(2)}% of your revenue.

Large corporations typically use strategic deductions, capital allowances, and reinvestment planning to reduce their effective tax rate.

You may consider working with a tax professional to optimize deductions and reduce taxable exposure.`

}



const generateSmallAnalysis = (rev,vat)=>{

return `Your business reported annual revenue of ₦${rev.toLocaleString()}.

Under Nigerian tax regulations, businesses are required to charge Value Added Tax (VAT) at a rate of 7.5% on taxable goods and services.
VAT at 7.5% applies, totaling ₦${vat.toLocaleString()}. 
Maintaining proper invoices and VAT records ensures compliance with the Federal Inland Revenue Service (FIRS).

If your business grows beyond ₦100 million in revenue, additional corporate tax obligations may apply.`

}

const resetForm = () => {
  setRevenue("");
  setProfit("");
  setResult(null);
  setError("");
  localStorage.removeItem("businessTaxResult");
  localStorage.removeItem("businessRevenue");
  localStorage.removeItem("businessProfit");
  localStorage.removeItem("businessType");
};

return (
  <div className="business-container" id="businessSection">

    <form className="business-form">
      <div className="business-header">
        <div className="business-first">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20" fill="none">
              <rect x="0.5" y="0.5" width="17" height="17" fill="none" stroke="#082B42" strokeWidth="0.8" rx='2'/>
              <g transform="translate(3.4,3) scale(0.7)">
                <path 
                  d="M14 0H2V16H6V12H10V16H14V0ZM5 3H7V5H5V3ZM7 7H5V9H7V7ZM9 3H11V5H9V3ZM11 7H9V9H11V7Z"
                  fill="none"
                  stroke="#082B42"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </span>
          <h2 className="business">Business Tax Calculator</h2>
        </div>
        <p>Nigeria VAT rate: 7.5%</p>
      </div>

      <p className="businType">Business Type</p>

      <div className="vat-mode">
        <button
          type="button"
          onClick={() => setBusinessType("large")}
          className={businessType === "large" ? "active" : ''}
        > 
          Large company (CIT 30%)
        </button>
        <button
          type="button"
          onClick={() => setBusinessType("small")}
          className={businessType === "small" ? "active" : " "}
        >
          Small business
        </button>
      </div>

      {businessType === "large" && (
        <>
          <p>Annual Turnover / Revenue ₦</p>
          <input type="text" placeholder="e.g 10000000" value={revenue}onChange={(e)=>handleInput(e.target.value,setRevenue)} />

          <p>Accessible / Taxable profit ₦</p>
          <input type="text" placeholder="e.g 15000000" value={profit} onChange={(e)=>handleInput(e.target.value,setProfit)} />

          <div className="list">
            <ul className="list-item">
              <li>CIT 30% of taxable profit</li>
              <li>Education Tax 2.5% of turnover</li>
            </ul>
          </div>
        </>
      )}

      {businessType === "small" && (
        <>
          <p>Annual Turnover / Revenue ₦</p>
          <input type="text" placeholder="e.g 10000000" value={revenue} onChange={(e)=>handleInput(e.target.value,setRevenue)} />
          <div className="list">
            <ul className="list-item">
              <li>Micro business (25M turnover) ; 0% tax </li>
              <li>Small business (25M- 100M turnover) ; 0% tax </li>
              <li>Above 100M ; is treated as large company 9(CIT 30%)</li>
            </ul>
          </div>
        </>
      )}

      {error && <p style={{ color: "red", marginTop: "5px", fontSize: "13px"}}>{error}</p>}

      <div className="button2">
        <button type="button" className="vat" onClick={calculateTax}>Calculate Tax</button>
        <button type="button" className="reset" onClick={resetForm}>Reset</button>
      </div>
    </form>

    <div className="business-result">
      <h3>Tax Breakdown</h3>
      {!result && <p className="empty">Please fill in the form on the left and click Calculate Tax to see results.</p>}

      {result && (
        <>
          <p><b className="strng">Business Category:</b> {result.type}</p>
          <p><b className="strng">Revenue:</b> ₦{result.revenue.toLocaleString()}</p>
          {result.profit !== undefined && <p><b className="strng">Taxable Profit:</b> ₦{result.profit.toLocaleString()}</p>}
          {result.cit !== undefined && <p><b className="strng">CIT ({result.citRate}%):</b> ₦{result.cit.toLocaleString()}</p>}
          {result.educationTax !== undefined && <p><b className="strng">Education Tax:</b> ₦{result.educationTax.toLocaleString()}</p>}
          {result.vat !== undefined && <p><b className="strng">VAT ({result.vatRate}%):</b> ₦{result.vat.toLocaleString()}</p>}
          {result.totalTax !== undefined && <p><b className="strng">Total Tax:</b> ₦{result.totalTax.toLocaleString()}</p>}
          {result.effectiveRate !== undefined && <p><b className="strng">Effective Tax Rate:</b> {result.effectiveRate.toFixed(2)}%</p>}

          <div className="list">
            <h4>Explanation</h4>
            <p style={{ fontSize: "14px", lineHeight: "25px" }}>{result.analysis}</p>
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default Business;