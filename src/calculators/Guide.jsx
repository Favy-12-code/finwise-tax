import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import VATguide from "../pages/guidePages/VATguide";
import PAYEguide from "../pages/guidePages/PAYEguide";
import PITguide from "../pages/guidePages/PITguide";
import TaxDeadline from "../pages/guidePages/TaxDeadline";

import "../styles/Guide.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
 FaDownload,
 FaSave,
 FaCopy,
 FaPrint,
 FaFileAlt,
 FaShareAlt
} from "react-icons/fa";

export default function Guide() {

 const location = useLocation();
 const navigate = useNavigate();

 const [activeTab, setActiveTab] = useState("vatGuide");
 const [savedGuides, setSavedGuides] = useState([]);
 const [previewOpen, setPreviewOpen] = useState(false);
 const [popupMessage, setPopupMessage] = useState(null);
 const [progress, setProgress] = useState(0);

 const contentRef = useRef(null);
 const previewRef = useRef(null);

 const guides = [
  { id: "vatGuide", name: "VAT Guide 2026", component: <VATguide /> },
  { id: "payeGuide", name: "PAYE Guide 2026", component: <PAYEguide /> },
  { id: "pitGuide", name: "PIT Guide 2026", component: <PITguide /> },
  { id: "guideDeadline", name: "Tax Deadlines", component: <TaxDeadline /> }
 ];
 


 useEffect(() => {

  const saved = JSON.parse(localStorage.getItem("savedGuides") || "[]");

  setSavedGuides(saved);

  setProgress(Math.floor(Math.random() * 100));

 }, []);


 useEffect(() => {

  if (location.hash) {

   const section = location.hash.replace("#", "");

   setActiveTab(section);

  }

 }, [location]);

 const showPopup = (msg) => {

  setPopupMessage(msg);

  setTimeout(() => setPopupMessage(null), 2500);

 };

 const changeTab = (id) => {

  setActiveTab(id);
  navigate(`/calculator/guide#${id}`);

  setTimeout(() => {

    const section = document.getElementById(id);

    if (section) {

      const sectionTop = section.offsetTop;

      let offset = 220; 

      const width = window.innerWidth;

      if (width <= 60) {
        offset = 100;
      } else if (width > 300 && width <= 630) {
        offset = 100
      } else if (width > 631 && width <= 768) {
        offset = 170;
      } else if (width <= 1024) {
        offset = 140;
      } else {
        offset = 120;
      }

      window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth"
      });

    }

  }, 100);

};

 const saveGuide = () => {

  if (!contentRef.current) return;

  const newGuide = {
   tab: activeTab,
   content: contentRef.current.innerText,
   date: new Date().toLocaleString()
  };

  const updated = [...savedGuides, newGuide];

  setSavedGuides(updated);

  localStorage.setItem("savedGuides", JSON.stringify(updated));

  showPopup("Guide saved locally!");

 };

 const deleteGuide = (index) => {

  const updated = [...savedGuides];

  updated.splice(index, 1);

  setSavedGuides(updated);

  localStorage.setItem("savedGuides", JSON.stringify(updated));

  showPopup("Saved guide deleted.");

 };

 const copyGuide = () => {

  if (!contentRef.current) return;

  navigator.clipboard.writeText(contentRef.current.innerText);

  showPopup("Guide copied!");

 };

 const saveAsTXT = () => {

  if (!contentRef.current) return;

  const blob = new Blob(
   [contentRef.current.innerText],
   { type: "text/plain" }
  );

  const link = document.createElement("a");

  link.download = `${activeTab}-guide.txt`;

  link.href = URL.createObjectURL(blob);

  link.click();

  showPopup("TXT saved!");

 };

 const saveAsPNG = async () => {

  if (!contentRef.current) return;

  const canvas = await html2canvas(contentRef.current, { scale: 2 });

  const imgData = canvas.toDataURL("image/png");

  const link = document.createElement("a");

  link.download = `${activeTab}-guide.png`;

  link.href = imgData;

  link.click();

  showPopup("PNG saved!");

 };

 const exportPDF = async () => {

  if (!previewRef.current) return;

  const canvas = await html2canvas(previewRef.current, { scale: 2 });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  pdf.save(`${activeTab}-guide.pdf`);

  setPreviewOpen(false);

  showPopup("PDF exported!");

 };


 const shareGuide = () => {

  if (!contentRef.current) return;

  const text = contentRef.current.innerText;

  if (navigator.share) {

   navigator.share({
    title: `${activeTab.toUpperCase()} Guide`,
    text,
    url: window.location.href
   });

  } else {

   navigator.clipboard.writeText(text);

   showPopup("Copied for sharing!");

  }

 };

 useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      if (el) {
        const offset = -80; 
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  }, [location]);


 const activeGuide = guides.find((g) => g.id === activeTab);

 return (

  <section className="guide-page" id="guideSection">

   <div className="guide-intro">

    <h2>Nigeria Tax Guide 2026</h2>

    <p>
     A reference guide on VAT, PAYE, PIT and tax deadlines.
    </p>

   </div>

   <div className="guide-container">

    <div className="guide-progress">

     <div className="progress-bar">

      <div
       className="progress-fill"
       style={{ width: `${progress}%` }}
      />

     </div>

     <span>Guide Progress: {progress}%</span>

    </div>

    <div className="guide-nav">

     {guides.map((item) => (

      <button
       key={item.id}
       className={activeTab === item.id ? "active" : ""}
       onClick={() => changeTab(item.id)}
      >
       {item.name}
      </button>

     ))}

    </div>

    <div className="guide-content" ref={contentRef}>

     {activeGuide?.component}

    </div>

    <div className="guide-actions">

     <button onClick={() => setPreviewOpen(true)}><FaDownload /></button>

     <button onClick={saveGuide}><FaSave /></button>

     <button onClick={copyGuide}><FaCopy /></button>

     <button onClick={shareGuide}><FaShareAlt /></button>

     <button onClick={saveAsTXT}><FaFileAlt /></button>

     <button onClick={saveAsPNG}><FaFileAlt /></button>

     <button onClick={() => window.print()}><FaPrint /></button>

    </div>

    <div className="saved-guides">

     <h2>Saved Guides</h2>

     {savedGuides.length === 0 && <p>No saved guides yet.</p>}

     {savedGuides.map((g, i) => (

      <div key={i} className="saved-item">

       <span>[{g.tab?.toUpperCase()}] {g.date}</span>

       <button onClick={() => deleteGuide(i)}>
        Delete
       </button>

      </div>

     ))}

    </div>

    {previewOpen && (

     <div className="pdf-preview-modal">

      <div className="pdf-preview-content">

       <h3>Preview {activeTab.toUpperCase()} Guide</h3>

       <div className="pdf-preview-body"ref={previewRef}>

        {activeGuide?.component}

       </div>

       <div className="pdf-preview-actions"> 
          <button onClick={exportPDF}>
            Download PDF
          </button>

        <button onClick={() => setPreviewOpen(false)}>
          Close
        </button>
       </div>

      </div>

     </div>

    )}

    {popupMessage && (

     <div className="popup-message">

      {popupMessage}

     </div>

    )}

   </div>

  </section>

 );
}
