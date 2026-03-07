import React, {useState} from 'react'
import '../styles/FAQsection.css'
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "Do I have to pay tax in Nigeria?",
    answer:
      "If you earn in Nigeria, you are likely need to pay tax. If you do not earn money, you do not pay tax.",
  },
  {
    question: "What is PAYE?",
    answer:
      'PAYE stands for "Pay As You Earn". Your employer takes tax from your salary and sends it to the government.',
  },
  {
    question: "How much tax will I pay?",
    answer:
      "The amount of tax you will pay depends on how much you earn. Higher income means higher tax.",
  },
  {
    question: "Is money entering my bank account taxed?",
    answer:
      "No. Only the income you earn is taxed, not money transferred as gift or repayment.",
  },
  {
    question: "Do freelancers and online workers pay tax?",
    answer:
      "Yes, if you work online, freelance, or earn money from abroad while living in Nigeria, you need to pay tax.",
  },
  {
    question: "What is TIN and do I need it?",
    answer:
      "TIN stands for Tax Identification Number. You need a TIN to file your taxes and register a business.",
  },
  {
    question: "Do small businesses pay tax?",
    answer:
      "Yes, small businesses pay tax, but very small ones may pay less.",
  },
  {
    question: "What does 'filing tax' mean?",
    answer:
      "Filing tax means submitting your income and tax information to the government.",
  },
  {
    question: "What is VAT?",
    answer:
      "VAT stands for Value Added Tax. It is a tax added to goods and services.",
  },
  {
    question: "Is this tax calculator accurate?",
    answer:
      "Our tax calculator is built based on current Nigerian tax regulations and standard PAYE computation rules.",
  },
];

const FAQsection = () => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((i) => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const leftColumn = faqData.filter((_, i) => i % 2 === 0);
  const rightColumn = faqData.filter((_, i) => i % 2 === 1);
  return (
    <section className="faq-section">

      <Link to="/faq" className="faq-title">
        Frequently Asked Questions
      </Link>

      <div className="faq-columns">

        <div className="faq-col">
          {leftColumn.map((faq, index) => (
            <div className="faq-card" key={index}>
              <div
                className="faq-question"
                onClick={() => toggleItem(index)}
              >
                <h3>{faq.question}</h3>
                <span>{openItems.includes(index) ? "−" : "+"}</span>
              </div>

              {openItems.includes(index) && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="faq-col right">
          {rightColumn.map((faq, index) => (
            <div className="faq-card" key={index + 100}>
              <div
                className="faq-question"
                onClick={() => toggleItem(index + 100)}
              >
                <h3>{faq.question}</h3>
                <span>{openItems.includes(index + 100) ? "−" : "+"}</span>
              </div>

              {openItems.includes(index + 100) && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default FAQsection