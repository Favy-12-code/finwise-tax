import React, { useState, useEffect } from "react";
import '../styles/calculator.css'
import { useLocation } from "react-router-dom";

const PAYE = () => {

const [salary,setSalary] = useState("");
const [housing,setHousing] = useState("");
const [transport,setTransport] = useState("");
const [nhf,setNhf] = useState("");
const [pension,setPension] = useState("");

const [result,setResult] = useState(null);
const [error,setError] = useState("");

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

const formatNumber = (value) => {
  const num = value.replace(/,/g,"");
  if(num === "") return "";
  return Number(num).toLocaleString();
};

const handleInput = (value,setter) => {

  const raw = value.replace(/,/g,"");

  if(!/^\d*$/.test(raw)) return;

  setter(formatNumber(raw));

};

useEffect(()=>{

  const savedResult = JSON.parse(localStorage.getItem("payeResult"));

  const savedSalary = localStorage.getItem("payeSalary");
  const savedHousing = localStorage.getItem("payeHousing");
  const savedTransport = localStorage.getItem("payeTransport");
  const savedNhf = localStorage.getItem("payeNhf");
  const savedPension = localStorage.getItem("payePension");

  if(savedResult) setResult(savedResult);

  if(savedSalary) setSalary(savedSalary);
  if(savedHousing) setHousing(savedHousing);
  if(savedTransport) setTransport(savedTransport);
  if(savedNhf) setNhf(savedNhf);
  if(savedPension) setPension(savedPension);

},[]);

useEffect(()=>{

  localStorage.setItem("payeSalary",salary);
  localStorage.setItem("payeHousing",housing);
  localStorage.setItem("payeTransport",transport);
  localStorage.setItem("payeNhf",nhf);
  localStorage.setItem("payePension",pension);

},[salary,housing,transport,nhf,pension]);

const taxBands = [

  {limit:800000,rate:0},
  {limit:2200000,rate:0.15},
  {limit:9000000,rate:0.18},
  {limit:13000000,rate:0.21},
  {limit:25000000,rate:0.23},
  {limit:Infinity,rate:0.25}

];

const calculateTax = () => {

  const gross = Number(salary.replace(/,/g,""));
  const house = Number(housing.replace(/,/g,""));
  const trans = Number(transport.replace(/,/g,""));
  const nhfContribution = Number(nhf.replace(/,/g,""));

  if(!gross){

    setError("Please enter your annual salary.");

    setResult(null);

    return;

  }

  setError("");

  const pensionBase = gross + house + trans;

  let pensionValue;

  if(pension === ""){

    pensionValue = pensionBase * 0.08;

  }else{

    pensionValue = Number(pension.replace(/,/g,""));

  }

  const nhis = gross * 0.05;

  const totalDeductions = pensionValue + nhis + nhfContribution;

  const taxableIncome = gross - totalDeductions;

  let remaining = taxableIncome;

  let totalTax = 0;

  for(let band of taxBands){

    if(remaining <= 0) break;

    const taxable = Math.min(remaining,band.limit);

    totalTax += taxable * band.rate;

    remaining -= taxable;

  }

  const netIncome = gross - totalTax - totalDeductions;

  const effectiveRate = (totalTax / gross) * 100;

  const breakdown = {

    gross,
    housing:house,
    transport:trans,

    pension:pensionValue,

    nhis,
    nhf:nhfContribution,

    taxableIncome,

    paye:totalTax,

    netIncome,

    effectiveRate,

    analysis: generateAnalysis(gross,totalTax,netIncome,effectiveRate)

  };

  setResult(breakdown);

  localStorage.setItem("payeResult",JSON.stringify(breakdown));

  };


  const generateAnalysis = (salary,tax,net,rate)=>{

  if(rate < 5){

  return `With an annual salary of ₦${salary.toLocaleString()}, your tax burden is relatively low under Nigeria's PAYE system.

  Your total PAYE tax is approximately ₦${tax.toLocaleString()}, meaning only about ${rate.toFixed(2)}% of your income goes to tax.

  After deductions, your estimated annual take-home pay is ₦${net.toLocaleString()}.`

  }

  if(rate < 15){

  return `Your salary places you within Nigeria's middle PAYE tax bands.

  Your total tax obligation is about ₦${tax.toLocaleString()} per year.

  After pension, NHIS and other deductions, your estimated take-home income is ₦${net.toLocaleString()}.`

  }

  return `Your income falls within the higher PAYE brackets.

  Your estimated PAYE tax is ₦${tax.toLocaleString()} annually.

  After deductions, your estimated net income is ₦${net.toLocaleString()}. Higher income levels are taxed more due to Nigeria's progressive tax system.`

  };


  const resetForm = () => {

    setSalary("");
    setHousing("");
    setTransport("");
    setNhf("");
    setPension("");

    setResult(null);

    setError("");

    localStorage.removeItem("payeSalary");
    localStorage.removeItem("payeHousing");
    localStorage.removeItem("payeTransport");
    localStorage.removeItem("payeNhf");
    localStorage.removeItem("payePension");
    localStorage.removeItem("payeResult");

  };

  return (

    <div className="payeTax-container" id="payeSection">

      <form className="payeTax-form">
        <div className="payeTax-header">
          <div className="payeTax-title">
            <span>
              <svg width="30" height="30" viewBox="0 0 40 40"> 
                <rect x="2" y="2" width="36" height="36" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/> 
                <rect x="12" y="14" width="16" height="18" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/> 
                <rect x="16" y="10" width="8" height="6" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/> 
              </svg> 
            </span>
            <h2>PAYE Calculator</h2>
          </div>
          <p>Nigeria PAYE Tax System (2026)</p>
        </div>

        <p>Gross Annual Salary ₦</p>

        <input
          type="text"
          placeholder="e.g 3,000,000"
          value={salary}
          onChange={(e)=>handleInput(e.target.value,setSalary)}
        />

        <p>Annual Housing Allowance ₦ - optional</p>

        <input
          type="text"
          placeholder="e.g 500,000"
          value={housing}
          onChange={(e)=>handleInput(e.target.value,setHousing)}
        />


        <p>Annual Transport Allowance ₦ - optional</p>

        <input
          type="text"
          placeholder="e.g 300,000"
          value={transport}
          onChange={(e)=>handleInput(e.target.value,setTransport)}
        />

        <p>Annual Pension Contribution ₦ - default 8% </p>

        <input
          type="text"
          placeholder="Optional — auto calculated if empty"
          value={pension}
          onChange={(e)=>handleInput(e.target.value,setPension)}
        />

        <p>NHF Contribution ₦ - default 2.5%</p>

        <input
          type="text"
          placeholder="e.g 50,000"
          value={nhf}
          onChange={(e)=>handleInput(e.target.value,setNhf)}
        />

        {error && <p style={{color:"red", fontSize:'13px', marginBottom:'10px'}}>{error}</p>}


        <div className="payeTax-buttons">

          <button type="button" className="payeTax-calc" onClick={calculateTax}>
          Calculate Tax
          </button>

          <button type="button" className="payeTax-reset" onClick={resetForm}>
          Reset
          </button>

        </div>

      </form>

    <div className="payeTax-result">

      <h3>Tax Summary </h3>

      {!result && (

        <p className="empty">Enter salary details and click Calculate Tax to see your PAYE breakdown.</p>

      )}

      {result && (

      <>

        <p><b className="strng">Gross Salary:</b> ₦{result.gross.toLocaleString()}</p>

        <p><b className="strng">Pension Contribution:</b> ₦{result.pension.toLocaleString()}</p>

        <p><b className="strng">NHIS Contribution:</b> ₦{result.nhis.toLocaleString()}</p>

        <p><b className="strng">NHF Contribution:</b> ₦{result.nhf.toLocaleString()}</p>

        <p><b className="strng">Taxable Income:</b> ₦{result.taxableIncome.toLocaleString()}</p>

        <p><b className="strng">PAYE Tax:</b> ₦{result.paye.toLocaleString()}</p>

        <p><b className="strng">Net Take Home Pay:</b> ₦{result.netIncome.toLocaleString()}</p>

        <p><b className="strng">Effective Tax Rate:</b> {result.effectiveRate.toFixed(2)}%</p>

        <div className="payeTax-analysis">

          <h4>Explanation</h4>
          <p>{result.analysis}</p>

        </div>

      </>

    )}

    </div>

  </div>

  )
}

export default PAYE;