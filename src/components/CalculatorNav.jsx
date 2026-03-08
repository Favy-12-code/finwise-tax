import React from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/calculator.css'

const CalculatorNav = () => {
  return (
    <div className='calc-grid'>
      <NavLink to='/calculator/vat' className='calc-box' >
        <div className='calc-icon'>
          <svg width='90' height="90" viewBox='0 0 40 40'> 
            <rect x="2" y="2" width='35' height="35" rx="2" stroke='#082B42' strokeWidth='1' fill='none' />
            <text x='49%' y='69%' textAnchor='middle' fontSize='24' fill='#082B42'>₦</text>
          </svg>
        </div>
        <div className='calc-content'>
          <h3>VAT</h3>
          <p>Value Added Tax</p>
        </div>
      </NavLink>

      <NavLink to='/calculator/PAYE' className='calc-box' >
        <div className='calc-icon'>
          <svg width="30" height="30" viewBox="0 0 40 40">
            <rect x="2" y="2" width="36" height="36" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/>
            <rect x="12" y="14" width="16" height="18" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/>
            <rect x="16" y="10" width="8" height="6" rx="2" stroke="#082B42" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className='calc-content'>
          <h3>PAYE</h3>
          <p>Salary Tax</p>
        </div>
      </NavLink>

      <NavLink to='/calculator/business' className='calc-box' >
        <div className='calc-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20" fill="none">
            <rect x="0.5" y="0.5" width="17" height="17" fill="none" stroke="#082B42" stroke-width="0.8" rx='2'/>
            <g transform="translate(3.4,3) scale(0.7)">
              <path 
                d="M14 0H2V16H6V12H10V16H14V0ZM5 3H7V5H5V3ZM7 7H5V9H7V7ZM9 3H11V5H9V3ZM11 7H9V9H11V7Z"
                fill="none"
                stroke="#082B42"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>
        <div className='calc-content'>
          <h3>Business Tax</h3>
          <p>Business Income Tax</p>
        </div>
      </NavLink>

      <NavLink to='/calculator/guide' className='calc-box' >
       <div className='calc-icon'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width='20' height="20" rx="2" stroke='#082B42' strokeWidth='0.8' fill='none' />
          <path d="M18.3801 15.27V7.57999C18.3801 6.80999 17.7601 6.25 17.0001 6.31H16.9601C15.6201 6.42 13.5901 7.11001 12.4501 7.82001L12.3401 7.89002C12.1601 8.00002 11.8501 8.00002 11.6601 7.89002L11.5001 7.79001C10.3701 7.08001 8.34012 6.40999 7.00012 6.29999C6.24012 6.23999 5.62012 6.81001 5.62012 7.57001V15.27C5.62012 15.88 6.1201 16.46 6.7301 16.53L6.9101 16.56C8.2901 16.74 10.4301 17.45 11.6501 18.12L11.6801 18.13C11.8501 18.23 12.1301 18.23 12.2901 18.13C13.5101 17.45 15.6601 16.75 17.0501 16.56L17.2601 16.53C17.8801 16.46 18.3801 15.89 18.3801 15.27Z" stroke="#082B42" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8.1001V17.6601" stroke="#082B42" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
       </div>
        <div className='calc-content'>
          <h3>Tax Guide 2026</h3>
          <p>VAT & PAYE Guide</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CalculatorNav