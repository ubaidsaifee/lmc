"use client";

import React, { useState, useEffect } from "react";
import RegistrationLayout, { RegistrationTabs } from "./RegistrationLayout";
import {
  pvtPageSections,
  PvtOverviewSection,
  PvtDocumentsSection,
  PvtProcessSection,
  PvtProsConsSection,
  PvtFeeCalculatorAndFormSection,
  ComparisonSection,
  PvtFaqSection, // <-- Import the new FAQ section component
} from "./PageSections";

export default function PrivateLimitedPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const pageData = { title: "Private Limited Co.", sections: pvtPageSections };

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) setCompletedSteps([...completedSteps, currentStep]);
    if (currentStep < pageData.sections.length) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const goToStep = (stepId) => {
    if (!completedSteps.includes(currentStep)) setCompletedSteps([...completedSteps, currentStep]);
    setCurrentStep(stepId);
  };

  const CurrentComponent = () => {
    const section = pageData.sections.find((s) => s.id === currentStep);
    if (!section) return null;
    switch (section.component) {
        case "PvtOverviewSection": return <PvtOverviewSection />;
        case "PvtDocumentsSection": return <PvtDocumentsSection />;
        case "PvtProcessSection": return <PvtProcessSection />;
        case "PvtProsConsSection": return <PvtProsConsSection />;
        case "PvtFeeCalculatorAndFormSection": return <PvtFeeCalculatorAndFormSection />;
        case "ComparisonSection": return <ComparisonSection />;
        case "PvtFaqSection": return <PvtFaqSection />; // <-- Add case for FAQ component
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <RegistrationTabs activeTab="pvt" />
      <RegistrationLayout
        pageData={pageData}
        currentStep={currentStep}
        completedSteps={completedSteps}
        goToStep={goToStep}
        handleNext={handleNext}
        handleBack={handleBack}
      >
        <CurrentComponent />
      </RegistrationLayout>
    </div>
  );
}