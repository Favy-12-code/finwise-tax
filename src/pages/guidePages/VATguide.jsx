 import '../../styles/Guide.css';
 import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function VATguide() {
  const location = useLocation();

useEffect(() => {

if(location.hash){

const element = document.querySelector(location.hash);

if(element){

element.scrollIntoView({ behavior: "smooth" });

}

}

},[location]);
  return (
    <div className="vat-guide" id="vat">

      <div className="vat-section">
        <h2>What is VAT?</h2>
        <p>
          Value Added Tax (VAT) is a consumption tax levied at each stage of
          production and distribution in Nigeria. It is governed by the VAT Act
          (as amended by the Finance Acts).
        </p>

        <p>
          The current VAT rate is 7.5%, effective from February
          2020 following the Finance Act 2019.
        </p>
      </div>


      <div className="vat-section">
        <h2>Who Must Register for VAT</h2>

        <p>
          Any person or business that makes taxable supplies with an annual
          turnover of ₦25 million and above must register for VAT
          with FIRS.
        </p>

        <ul className="vat-list">
          <li>Businesses supplying taxable goods and services</li>
          <li>Imported goods and services</li>
          <li>
            Companies operating in Nigeria regardless of size if they import
            services
          </li>
        </ul>
      </div>


      {/* VAT EXEMPT GOODS */}
      <div className="vat-section">
        <h2>VAT Exempt Goods and Services</h2>

        <div className="vat-grid">

          <div className="vat-card">
            <h3>Basic Food Items</h3>
            <p>Unprocessed foodstuffs and locally produced agricultural products.</p>
          </div>

          <div className="vat-card">
            <h3>Medical & Pharmaceutical</h3>
            <p>Drugs and medical equipment.</p>
          </div>

          <div className="vat-card">
            <h3>Educational Materials</h3>
            <p>Books, newspapers and educational materials.</p>
          </div>

          <div className="vat-card">
            <h3>Baby Products</h3>
            <p>Infant and baby products.</p>
          </div>

          <div className="vat-card">
            <h3>Exports</h3>
            <p>Goods exported out of Nigeria (zero-rated).</p>
          </div>

          <div className="vat-card">
            <h3>Plant & Machinery</h3>
            <p>Used for production of goods/services for export.</p>
          </div>

        </div>
      </div>

      <div className="vat-section">
        <h2>VAT Filing and Remittance</h2>

        <div className="vat-filing">

          <div className="filing-item">
            <h4>Filing Frequency</h4>
            <p>Monthly — on or before the 21st of the following month.</p>
          </div>

          <div className="filing-item">
            <h4>Payment Platform</h4>
            <p>FIRS e-Tax portal or designated banks.</p>
          </div>

          <div className="filing-item">
            <h4>Penalty for Late Filing</h4>
            <p>₦50,000 for the first month, ₦25,000 for subsequent months.</p>
          </div>

          <div className="filing-item">
            <h4>Penalty for Late Payment</h4>
            <p>Interest at bank lending rate + 5% per annum.</p>
          </div>

        </div>
      </div>

    </div>
  );
}