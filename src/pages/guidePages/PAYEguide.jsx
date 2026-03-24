import '../../styles/Guide.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function PAYEguide() {
  const location = useLocation();

   useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      if (el) {
        const offset = -80; // adjust for header
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <div className="paye-guide" id='payeGuide'>

      <div className="paye-section">
        <h2>What is PAYE?</h2>

        <p>
          Pay As You Earn (PAYE) is a method of withholding Personal Income
          Tax (PIT) from employees' salaries at source. Employers are
          responsible for deducting and remitting PAYE to the relevant
          State Internal Revenue Service (SIRS).
        </p>
      </div>

      <div className="paye-section">
        <h2>2026 PAYE Tax Bracket (Annual)</h2>

        <div className="paye-table">

          <div className="paye-header">
            <span>Taxable Income</span>
            <span>Tax Rate</span>
          </div>

          <div className="paye-row">
            <span>First 66,666.67</span>
            <span>0%</span>
          </div>

          <div className="paye-row">
            <span>Next 183,333.33</span>
            <span>15%</span>
          </div>

          <div className="paye-row">
            <span>Next 750,000</span>
            <span>18%</span>
          </div>

          <div className="paye-row">
            <span>Next 1,083,333.33</span>
            <span>21%</span>
          </div>

          <div className="paye-row">
            <span> Next 2,083,333.33</span>
            <span>23%</span>
          </div>

          <div className="paye-row">
            <span>Above 4,666,666.67</span>
            <span>25%</span>
          </div>

        </div>
      </div>

      <div className="paye-section">
        <h2>Allowable Deductions (Before Tax)</h2>

        <div className="paye-grid">

          <div className="paye-card">
            <h4>Consolidated Relief Allowance (CRA)</h4>
            <p>
              Higher of ₦200,000 or 1% of gross income + 20% of gross income.
            </p>
          </div>

          <div className="paye-card">
            <h4>Pension Contribution</h4>
            <p>
              8% of monthly emolument (basic, housing, transport).
            </p>
          </div>

          <div className="paye-card">
            <h4>National Housing Fund (NHF)</h4>
            <p>
              2.5% of monthly basic salary.
            </p>
          </div>

          <div className="paye-card">
            <h4>National Health Insurance (NHIS)</h4>
            <p>
              5% of basic salary where applicable.
            </p>
          </div>

          <div className="paye-card">
            <h4>Life Assurance Premium</h4>
            <p>
              Actual premium paid as allowed by FIRS.
            </p>
          </div>

        </div>
      </div>


      <div className="paye-section">
        <h2>PAYE Filing & Employer Obligations</h2>

        <div className="paye-obligations">

          <div className="obligation-item">
            <h4>Remittance Deadline</h4>
            <p>10th day of the following month to the relevant SIRS.</p>
          </div>

          <div className="obligation-item">
            <h4>Annual Return (Form H1)</h4>
            <p>31st January of the following year.</p>
          </div>

          <div className="obligation-item">
            <h4>Who Pays?</h4>
            <p>The employer deducts and remits on behalf of the employee.</p>
          </div>

          <div className="obligation-item">
            <h4>Penalty for Late Remittance</h4>
            <p>10% of tax withheld + interest at CBN lending rate.</p>
          </div>

          <div className="obligation-item">
            <h4>Minimum Tax</h4>
            <p>
              1% of gross income applies where calculated PAYE is lower.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}