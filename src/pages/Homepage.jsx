import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection  from '../components/AboutSection'
import GoalSection from '../components/GoalSection'
import FAQsection from '../components/FAQsection'

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <GoalSection />
      <FAQsection />
    </div>
  )
}

export default Homepage