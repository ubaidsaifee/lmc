"use client";

import React, { useState, useEffect } from "react";
import RegistrationLayout, { RegistrationTabs } from "./RegistrationLayout";
import {
  llpPageSections,
  LlpOverviewSection,
  LlpDocumentsSection,
  LlpProcessSection,
  LlpFeeCalculatorAndFormSection,
  LlpComparisonSection,
  LlpFaqSection, // <-- Import the new FAQ section component
} from "./PageSections";

export default function LimitedLiabilityPartnershipPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const pageData = { title: "Limited Liability Partnership", sections: llpPageSections };

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < pageData.sections.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep(stepId);
  };

  const CurrentComponent = () => {
    const section = pageData.sections.find((s) => s.id === currentStep);
    if (!section) return null;
    switch (section.component) {
        case "LlpOverviewSection": return <LlpOverviewSection />;
        case "LlpDocumentsSection": return <LlpDocumentsSection />;
        case "LlpProcessSection": return <LlpProcessSection />;
        case "LlpComparisonSection": return <LlpComparisonSection />;
        case "LlpFeeCalculatorAndFormSection": return <LlpFeeCalculatorAndFormSection />;
        case "LlpFaqSection": return <LlpFaqSection />; // <-- Add case for FAQ component
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <RegistrationTabs activeTab="llp" />
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