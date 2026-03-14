import React from 'react'
import "../styles/About.css"
import piggy from "../images/piggy.png"

const AboutSection = () => {
  return (
     <div className='About-section'>
        <div id='About' className='About'>
            <h1 className='abt'>About Us</h1>
            <h1 className='abt2'>Making Tax Simple for Every <br/> <span className="text">Nigerian</span></h1>
            <h6 className='abt3'>Tax shouldn't feel confusing, overwhelming, or stressful. We built this platform to <br/>give Nigerians a smarter way to calculate and understand their taxes clearly, <br/> accurately, and instantly</h6>
            <p className='abt4'>Whether you're a salary earner, freelancer, or business owner, you deserve full clarity on <br/> what you earn, what you owe, and why.</p>
        </div>
        <div className='problem-section'>
          <div className='The-problem'>
            <h1 className='prob'>THE PROBLEM</h1>
            <h1 className='prob1'>Taxes in Nigeria Are <br/> Unnecessarily confusing</h1>
            <p>Understanding Nigerian tax brackets, PAYE deductions, <br/>and salary breakdowns can be complicated. Many people<br/>rely on guesswork, spreadsheets, or unclear payroll summaries.</p>
            <p>We believe financial clarity should be accessible to everyone-not<br/> just accountants.</p>
            <h1 className='sol'>OUR SOLUTION</h1>
            <h1 className="sol1">
            Built Specifically for <span className="text">Nigeria's</span>
                        <br />
                        Tax System </h1>
            <p>No jargon. No confusion, just clarity in every naira </p>
          </div>
          <div className='image-sec'>
            <img className='image' src={piggy} alt="Piggy Bank" />
          </div>
        </div>
      </div>
  )
}

export default AboutSection
