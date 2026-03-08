import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Blogpage from "./pages/Blogpage";
import FAQpage from "./pages/FAQpage";
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

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/faq" element={<FAQpage />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/calculator" element={<Calculatorpage />}>
          <Route index element={<CalculatorIntro />} />
          <Route path="vat" element={<VAT />} />
          <Route path="paye" element={<PAYE />} />
          <Route path="business" element={<Business />} />
          <Route path="guide" element={<Guide />} />
        </Route> 
        <Route path="/signin" element={<Signinpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/why-us" element={<Whyuspage />} />
        <Route path="/help" element={<Helppage/>} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;