import React from 'react'
import { Outlet } from "react-router-dom";
import CalculatorNav from '../components/CalculatorNav';
import "../styles/calculator.css";

const Calculatorpage = () => {
  return (
    <section className='calculator-page'>
      <h1><span className='Naija'>Nigeria</span> Tax Calculator</h1>

      <p className='calc-desc'>
        Calculate VAT, PAYE salary tax, and Business income tax - accurately
        and instantly.
      </p>

      <CalculatorNav />

      <div className='calculator-content'>
        <Outlet />
      </div>
    </section>
  )
}

export default Calculatorpage