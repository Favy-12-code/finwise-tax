import { Routes, Route, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Homepage from "./pages/Homepage";
import Blogpage from "./pages/Blogpage";
import Calculatorpage from "./pages/Calculatorpage";
import Signinpage from "./pages/Signinpage";
import Signuppage from "./pages/Signuppage";
import Whyuspage from "./pages/Whyuspage";
import Helppage from "./pages/Helppage";
import Features from "./pages/Features";
import Contact from "./pages/Contact";

import VAT from "./calculators/VAT";
import Business from "./calculators/Business";
import Guide from "./calculators/Guide";
import PAYE from "./calculators/PAYE";
import CalculatorIntro from "./calculators/CalculatorIntro";

import Profilesetup from "./pages/Profilesetup";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";
import Dashboarduser from "./Dashboarduser";
import ProtectedRoute from "./ProtectedRoute";

export default function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ["/signup", "/dashboard", "/signin"];
  const hideFooterRoutes = ["/dashboard"];
  
  const hideHeader = hideHeaderRoutes.includes(location.pathname);
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  const guideSections = useRef({});
  const [activeTab, setActiveTab] = useState("vatGuide");

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />

      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<Blogpage />} />

        <Route path="/calculator" element={<Calculatorpage />}>
          <Route index element={<CalculatorIntro />} />
          <Route path="vat" element={<VAT />} />
          <Route path="paye" element={<PAYE />} />
          <Route path="business" element={<Business />} />
          <Route
            path="guide"
            element={
              <Guide
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                guideSections={guideSections}
              />
            }
          />
        </Route>

        <Route path="/signin" element={<Signinpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/why-us" element={<Whyuspage />} />
        <Route path="/help" element={<Helppage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/profile-setup" element={<Profilesetup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboarduser /></ProtectedRoute>} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}