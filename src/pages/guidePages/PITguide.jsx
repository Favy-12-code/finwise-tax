import '../../styles/Guide.css';

export default function PITguide() {
  return (
    <div className="vat-guide">

      <div className="vat-section">
        <h2>Who Must File Personal Income Tax (PIT)</h2>

        <p>You must file PIT if you are:</p>

        <ul className="vat-list">
          <li>A Nigerian resident 18 years or older earning income in Nigeria.</li>
          <li>Salaried employees, self-employed persons, or business owners.</li>
          <li>Members of the armed forces earning salaries or allowances.</li>
          <li>Non-residents earning income from Nigerian sources.</li>
        </ul>

        <p>
          <strong>Example:</strong> A freelance graphic designer earning from Nigerian
          clients must file PIT, even if they live abroad.
        </p>
      </div>


      {/* HOW TO FILE PIT */}

      <div className="vat-section">
        <h2>How to File PIT</h2>

        <div className="vat-grid">

          <div className="vat-card">
            <h4>Electronic Filing (e-Filing)</h4>
            <p>
              Use the Nigeria Revenue Service (NRS) or your state tax portal to
              submit your tax return online.
            </p>
          </div>

          <div className="vat-card">
            <h4>Paper Filing</h4>
            <p>
              Fill out tax forms manually and submit them at the nearest tax office.
            </p>
          </div>

          <div className="vat-card">
            <h4>Tax Professional / Agent</h4>
            <p>
              An accredited tax consultant can file the return on your behalf.
            </p>
          </div>

        </div>

        <h3 className="pit-subtitle">Required Documents</h3>

        <ul className="vat-list">
          <li>Tax Identification Number (TIN)</li>
          <li>Completed tax return form</li>
          <li>Proof of income (payslips or bank statements)</li>
          <li>Receipts for deductions and reliefs</li>
          <li>Employer’s tax deduction card</li>
        </ul>
      </div>


      <div className="pit-section">
        <h2>Tax Deductions & Reliefs</h2>

        <p className='pit-para1'>
          Reliefs reduce your taxable income before tax is calculated.
        </p>

        <div className="vat-grid">

          <div className="vat-card">
            <h3>Rent</h3>
            <p>Rent paid for your residential home may qualify for relief.</p>
          </div>

          <div className="vat-card">
            <h3>Home Loan Interest</h3>
            <p>Interest paid on mortgage or housing loans.</p>
          </div>

          <div className="vat-card">
            <h3>Pension Contributions</h3>
            <p>Mandatory pension deductions reduce taxable income.</p>
          </div>

          <div className="vat-card">
            <h3>Life Insurance</h3>
            <p>Premiums paid on life insurance policies.</p>
          </div>

          <div className="vat-card">
            <h3>Donations</h3>
            <p>Approved charitable donations may qualify for deductions.</p>
          </div>

          <div className="vat-card">
            <h3>Dependents / Disability Relief</h3>
            <p>Extra reliefs may apply depending on personal circumstances.</p>
          </div>

        </div>

        <p className='pit-paragraph'>
          <strong>Example:</strong> If you earn ₦3,000,000 and pay ₦500,000 rent,
          you only pay tax on ₦2,500,000.
        </p>
      </div>


      {/* DEADLINES & TAX VERIFICATION */}

      <div className="pit-section" id='pit'>
        <h2>Filing Deadlines & Tax Monitoring</h2>

        <div className="paye-obligations">

          <div className="obligation-item">
            <h4>Employed Individuals</h4>
            <p>
              Must file within 90 days after the tax year ends (March 31).
              Deadline is usually around June 30.
            </p>
          </div>

          <div className="obligation-item">
            <h4>Self-Employed / Businesses</h4>
            <p>
              Must file within 6 months after their accounting year ends.
            </p>
          </div>

          <div className="obligation-item">
            <h4>Dispute Resolution</h4>
            <p>
              Taxpayers can file objections or appeals at their state
              revenue office if they disagree with a tax assessment.
            </p>
          </div>

          <div className="obligation-item">
            <h4>How Government Verifies Income</h4>
            <p>
              Authorities review digital invoices, bank statements,
              and financial records to confirm taxable income.
            </p>
          </div>

        </div>

        <p className='pit-paragraph'>
          <strong>Example:</strong> If a client sends ₦400,000 for materials,
          only the profit after expenses is taxed.
        </p>

      </div>

    </div>
  );
}