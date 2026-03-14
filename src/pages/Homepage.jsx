import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection  from '../components/AboutSection'
import GoalSection from '../components/GoalSection'
import FAQsection from '../components/FAQsection'

const Homepage = () => {
  return (
    <div>
      <HeroSection id="Hero-section" />
      <AboutSection id="About-section" />
      <GoalSection id="Goal-section" />
      <FAQsection id="FAQ-section" />
    </div>
  )
}

export default Homepage