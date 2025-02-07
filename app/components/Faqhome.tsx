"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Pump Fun and Moonshot?",
    answer:
      "Pump Fun and Moonshot are platforms where you can buy hot crypto tokens and meme coins. They provide platform to buy newly minted tokens through fair launch strategy.",
  },
  {
    question: "Why is listing on Dex Check helpful for further boost?",
    answer:
      "Listing on Dex Check increases visibility for your token. It helps attract more investors by showcasing your token's market performance and credibility.",
  },
  {
    question: "How to get listed here?",
    answer:
      "To get listed, contact our team with your token details, market performance, and supporting documents. Our team will review and include eligible tokens.",
  },
  {
    question: "How do project owners and investors benefit from here?",
    answer:
      "Project owners gain exposure and credibility, while investors access reliable data to make informed decisions. Dex Check bridges the gap between projects and potential investors.",
  },
  {
    question: "Is investing in meme coins risk-free?",
    answer:
      "No investment is risky, and meme coins can be highly volatile. It's important to do your research and only invest what you can afford to lose.",
  },
  {
    question: "What should be taken care of before investing?",
    answer:
      "Before investing, check the project's credibility, team, use case, and community activity. Avoid FOMO and understand the risks associated with crypto investments.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-white p-6 rounded-xl mt-12 shadow-sm border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg transition-all duration-300 hover:border-green-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-green-50 transition-colors rounded-lg"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className={`text-green-600 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg 
                  className="w-6 h-6"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={openIndex === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                  />
                </svg>
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 pt-2 text-gray-600 bg-green-50 rounded-b-lg border-t border-green-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}