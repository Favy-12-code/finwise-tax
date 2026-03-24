import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Blogpage from "./pages/Blogpage";
import Calculatorpage from "./pages/Calculatorpage";
import Signinpage from "./pages/Signinpage";
import Signuppage from "./pages/Signuppage";
import Footer from './components/Footer';
import Whyuspage from "./pages/Whyuspage";
import Helppage from "./pages/Helppage";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import VAT from "./calculators/VAT";
import Business from "./calculators/Business";
import Guide from "./calculators/Guide"
import PAYE from "./calculators/PAYE";
import CalculatorIntro from "./calculators/CalculatorIntro";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";
import PhoneSignup from "./pages/PhoneSignUp";


function App() {

if (window.location.hash) {
  window.history.replaceState(null, "", window.location.pathname);
  window.scrollTo(0, 0);
} else {
  window.scrollTo(0, 0);
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const guideSections = useRef({});
  const [activeTab, setActiveTab] = useState("vatGuide");
  

  return (
    <Router>
      <ScrollToTop />
      <ScrollToHash />
      <Header />  

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/calculator" element={<Calculatorpage />}>
          <Route index element={<CalculatorIntro />} />
          <Route path="vat" element={<VAT />} />
          <Route path="paye" element={<PAYE />} />
          <Route path="business" element={<Business />} />
          <Route path="guide" element={<Guide  activeTab={activeTab}
        setActiveTab={setActiveTab}
        guideSections={guideSections} />} />
        </Route> 
        <Route path="/signin" element={<Signinpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/why-us" element={<Whyuspage />} />
        <Route path="/help" element={<Helppage/>} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      <Footer />
    <PhoneSignup />
    </Router>
  );
}

export default App;