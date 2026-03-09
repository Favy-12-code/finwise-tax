import React, { useState, useEffect } from "react";
import '../styles/calculator.css'

const VAT = () => {

  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState("");
  const [vat, setVat] = useState(null);
  const [original, setOriginal] = useState(null);
  const [error, setError] = useState("");

  const VAT_RATE = 0.075;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("vatData"));

    if (savedData) {
      setAmount(savedData.amount);
      setVat(savedData.vat);
      setOriginal(savedData.original);
      setMode(savedData.mode);
    }
  }, []);

  const calculateVAT = () => {

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setError("");

    const value = parseFloat(amount);

    let vatAmount;
    let originalAmount;

    if (mode === "add") {

      vatAmount = value * VAT_RATE;
      originalAmount = value;

    } else {

      originalAmount = value / (1 + VAT_RATE);
      vatAmount = value - originalAmount;

    }

    setVat(vatAmount);
    setOriginal(originalAmount);

    localStorage.setItem(
      "vatData",
      JSON.stringify({
        amount: value,
        vat: vatAmount,
        original: originalAmount,
        mode: mode
      })
    );
  };

  const resetForm = () => {
    setAmount("");
    setVat(null);
    setOriginal(null);
    setError("");
    localStorage.removeItem("vatData");
  };

  return (
    <div className="vat-container">

      <div className="vat-form">

        <div className="vat-header">
          <div className="vat-first">
            <span>
              <svg width='30' height="30" viewBox='0 0 40 40'> 
                <rect x="2" y="2" width='28' height="28" rx="2" stroke='#082B42' strokeWidth='1' fill='none' />
                <text x='40%' y='65%' textAnchor='middle' fontSize='29' fill='#082B42'>₦</text>
              </svg>
            </span>
            <h2>VAT Calculator</h2>
          </div>
          <p>Nigeria VAT rate: 7.5%</p>
        </div>

        <div className="vat-mode">
          <button
            className={mode === "add" ? "active" : ""}
            onClick={() => setMode("add")}
          >
            Add VAT
          </button>

          <button
            className={mode === "remove" ? "active" : ""}
            onClick={() => setMode("remove")}
          >
            Remove VAT
          </button>
        </div>

        <p>
          {mode === "add"
            ? "Add VAT to the original amount ₦"
            : "Remove VAT from the total amount ₦"}
        </p>

        <input
          type="number"
          placeholder="Enter amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <div className="vat-buttons">
          <button onClick={calculateVAT}>Calculate VAT</button>
          <button onClick={resetForm}>Reset</button>
        </div>

      </div>


      <div className="vat-result">

        <h3>Breakdown</h3>

        {vat !== null ? (

          <div>

            <p>
              <strong className="strng">Original Amount: </strong>
              ₦{original.toLocaleString(undefined,{maximumFractionDigits:2})}
            </p>

            <p>
              <strong className="strng">VAT Rate: </strong> 7.5%
            </p>

            <p>
              <strong className="strng">VAT Value: </strong>
              ₦{vat.toLocaleString(undefined,{maximumFractionDigits:2})}
            </p>

            {mode === "remove" && (
              <p>
                <strong className="strng">VAT Inclusive Amount: </strong>
                ₦{Number(amount).toLocaleString()}
              </p>
            )}

            <div className="vat-explanation">

              <h4>Explanation</h4>

              <p>
                Nigeria applies a standard <strong>7.5% Value Added Tax (VAT) </strong>
                on most goods and services.
              </p>

              {mode === "add" ? (
                <p>
                  If a business sells goods worth
                  <strong> ₦{original.toLocaleString()}</strong>,
                  the VAT charged will be
                  <strong> ₦{vat.toLocaleString()}</strong>.
                  This VAT is collected from the customer and later
                  remitted to the government.
                </p>
              ) : (
                <p>
                  The amount you entered already includes VAT.
                  After removing the 7.5% VAT portion,
                  the original price of the goods or service is
                  <strong> ₦{original.toLocaleString()}</strong>.
                </p>
              )}

              <p>
                Businesses do not keep VAT. They collect it
                on behalf of the government and remit the
                difference between VAT collected and VAT already paid
                on purchases.
              </p>

            </div>

          </div>

        ) : (

         <p className="empty"
            
          >
            Enter an amount and click Calculate VAT 
            to see a detailed VAT breakdown.
          </p>

        )}

      </div>

    </div>
  );
};

export default VAT;