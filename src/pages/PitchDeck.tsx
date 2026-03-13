import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ChevronRight, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';

const sections = [
  {
    title: "1. Executive Overview",
    objective: "Establish immediate professional credibility with a high-impact mission statement.",
    fields: [
      "Corporate Identity",
      "Mission Statement (Tagline)",
      "Key Contact Personnel"
    ]
  },
  {
    title: "2. Market Disruption Statement (The Problem)",
    objective: "Quantify the inefficiency or \"pain point\" currently existing in the market.",
    fields: [
      "Primary Market Inefficiency",
      "Affected Demographic/Sector",
      "Urgency/Catalyst for Change"
    ]
  },
  {
    title: "3. Value Proposition (The Solution)",
    objective: "Define the unique mechanism by which the venture resolves market friction.",
    fields: [
      "Strategic Solution",
      "Differentiating Outcome 1",
      "Differentiating Outcome 2",
      "The \"Value Realization\" Event"
    ]
  },
  {
    title: "4. Proprietary Technology & Product Architecture",
    objective: "Detail the technical infrastructure and user experience.",
    fields: [
      "Core Functional Pillar 1",
      "Core Functional Pillar 2",
      "Technical Interface Strategy"
    ]
  },
  {
    title: "5. Market Analysis (TAM/SAM/SOM)",
    objective: "Present a top-down and bottom-up analysis of the economic opportunity.",
    fields: [
      "Total Addressable Market (TAM)",
      "Serviceable Addressable Market (SAM)",
      "Serviceable Obtainable Market (SOM)"
    ]
  },
  {
    title: "6. Commercialization & Revenue Model",
    objective: "Articulate the engine for sustained financial growth.",
    fields: [
      "Monetization Framework",
      "Unit Economics/Pricing Tiers",
      "Go-to-Market Strategy"
    ]
  },
  {
    title: "7. Operational Traction & Validation",
    objective: "Provide empirical evidence of market fit and momentum.",
    fields: [
      "Key Performance Indicator (KPI) 1",
      "Key Performance Indicator (KPI) 2",
      "Significant Institutional Milestones"
    ]
  },
  {
    title: "8. Competitive Landscape & Defensibility",
    objective: "Identify the \"moat\" protecting the business from market entrants.",
    fields: [
      "Primary Market Incumbents",
      "Sustainable Competitive Advantage (Moat)",
      "Superiority Logic"
    ]
  },
  {
    title: "9. Customer Acquisition & Scalability",
    objective: "Demonstrate a sustainable and repeatable growth loop.",
    fields: [
      "Acquisition Channels",
      "Target Customer Acquisition Cost (CAC)",
      "Scalability Roadmap"
    ]
  },
  {
    title: "10. Leadership & Governance",
    objective: "Showcase the specialized expertise of the founding team.",
    fields: [
      "Founding Executives & Expertise",
      "Relevant Track Record",
      "Advisory Board Composition"
    ]
  },
  {
    title: "11. Financial Forecasting",
    objective: "Present 3–5 year projections based on conservative assumptions.",
    fields: [
      "Year 1 Target Revenue",
      "Year 3 Target Revenue",
      "Core Financial Assumptions"
    ]
  },
  {
    title: "12. Capital Requirements (The Ask)",
    objective: "Define the investment round and intended use of proceeds.",
    fields: [
      "Capital Sought ($)",
      "Strategic Capital Allocation",
      "18-Month Operational Objectives"
    ]
  },
  {
    title: "13. Strategic Vision & Closing",
    objective: "Conclude with the long-term industry impact.",
    fields: [
      "Long-term Vision"
    ]
  }
];

export default function PitchDeck() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();
      let y = 20;
      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - margin * 2;

      // Title
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("HiveHub Solutions", margin, y);
      y += 10;

      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.text("Strategic Investment Memorandum", margin, y);
      y += 15;

      // Subtitle
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const introText = "This document serves as a structured framework for the investment presentation. Complete each section with data-driven insights to articulate the venture's scalability and market viability.";
      const splitIntro = doc.splitTextToSize(introText, maxLineWidth);
      doc.text(splitIntro, margin, y);
      y += (splitIntro.length * 6) + 15;

      // Sections
      sections.forEach((section, index) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, margin, y);
        y += 8;

        doc.setFontSize(11);
        doc.setFont("helvetica", "italic");
        const objText = `Objective: ${section.objective}`;
        const splitObj = doc.splitTextToSize(objText, maxLineWidth);
        doc.text(splitObj, margin, y);
        y += (splitObj.length * 6) + 6;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        section.fields.forEach(field => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(`• ${field}: _________________________________________________`, margin + 5, y);
          y += 10;
        });
        y += 10;
      });

      // Best Practices
      if (y > 220) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Professional Best Practices", margin, y);
      y += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      const practices = [
        "1. Precision of Language: Avoid superlatives; use data and specific verbs to describe outcomes.",
        "2. Visual Hierarchy: Ensure your corporate logo is prominent on the title and closing slides to build brand recall.",
        "3. Data Integrity: Keep a comprehensive data room (Appendix) ready for the Due Diligence phase following the pitch."
      ];

      practices.forEach(practice => {
        const splitPractice = doc.splitTextToSize(practice, maxLineWidth);
        doc.text(splitPractice, margin, y);
        y += (splitPractice.length * 6) + 4;
      });

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    // Small delay to ensure smooth rendering before heavy PDF generation
    const timer = setTimeout(generatePDF, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              HiveHub Solutions
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-4">
              Strategic Investment Memorandum
            </h2>
            <p className="text-muted max-w-2xl text-lg">
              This document serves as a structured framework for the investment presentation. Complete each section with data-driven insights to articulate the venture's scalability and market viability.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {pdfUrl ? (
              <a 
                href={pdfUrl}
                download="HiveHub_Solutions_Pitch_Deck.pdf"
                className="btn-outline flex items-center gap-2 print:hidden"
                title="Download as PDF"
              >
                <Download className="w-5 h-5" />
                Download Outline
              </a>
            ) : (
              <button className="btn-outline flex items-center gap-2 print:hidden opacity-50 cursor-not-allowed">
                <Download className="w-5 h-5" />
                Preparing PDF...
              </button>
            )}
            <p className="text-xs text-muted/70 flex items-center gap-1 max-w-[200px] text-right">
              <ExternalLink className="w-3 h-3" />
              If download is blocked, please open the app in a new tab.
            </p>
          </div>
        </div>

        <div className="space-y-8 print:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="glass p-8 rounded-2xl print:border print:border-gray-300 print:shadow-none print:break-inside-avoid">
              <h2 className="text-2xl font-bold text-white mb-3 print:text-black">{section.title}</h2>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 print:bg-gray-50 print:border-gray-200">
                <p className="text-sm text-accent font-medium print:text-gray-700">
                  <span className="text-white/50 mr-2 print:text-gray-500">Objective:</span> 
                  {section.objective}
                </p>
              </div>
              
              <div className="space-y-4">
                {section.fields.map((field, fIndex) => (
                  <div key={fIndex} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted flex items-center gap-2 print:text-gray-600">
                      <ChevronRight className="w-4 h-4 text-accent print:text-gray-400" />
                      {field}
                    </label>
                    <div className="h-12 bg-black/20 border border-white/10 rounded-lg print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:border-gray-300 print:bg-transparent print:h-8"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="glass p-8 rounded-2xl mt-12 print:border print:border-gray-300 print:shadow-none print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-white mb-6 print:text-black">Professional Best Practices</h2>
            <ul className="space-y-4 text-muted print:text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-bold">1</span>
                </div>
                <p><strong className="text-white print:text-black">Precision of Language:</strong> Avoid superlatives; use data and specific verbs to describe outcomes.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-bold">2</span>
                </div>
                <p><strong className="text-white print:text-black">Visual Hierarchy:</strong> Ensure your corporate logo is prominent on the title and closing slides to build brand recall.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-bold">3</span>
                </div>
                <p><strong className="text-white print:text-black">Data Integrity:</strong> Keep a comprehensive data room (Appendix) ready for the Due Diligence phase following the pitch.</p>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
