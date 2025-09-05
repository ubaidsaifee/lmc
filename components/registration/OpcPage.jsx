"use client";

import React, { useState, useEffect } from "react";
import RegistrationLayout, { RegistrationTabs } from "./RegistrationLayout";
import {
  opcPageSections,
  OpcOverviewSection,
  OpcDocumentsSection,
  OpcComparisonSection,
  OpcBenefitsSection,
  OpcFeeCalculatorAndFormSection,
  OpcFaqSection, // <-- Import the new FAQ section component
} from "./PageSections";

export default function OnePersonCompanyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const pageData = { title: "One Person Company", sections: opcPageSections };

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
      case "OpcOverviewSection":
        return <OpcOverviewSection />;
      case "OpcDocumentsSection":
        return <OpcDocumentsSection />;
      case "OpcComparisonSection":
        return <OpcComparisonSection />;
      case "OpcBenefitsSection":
        return <OpcBenefitsSection />;
      case "OpcFeeCalculatorAndFormSection":
        return <OpcFeeCalculatorAndFormSection />;
      case "OpcFaqSection": // <-- Add case for FAQ component
        return <OpcFaqSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <RegistrationTabs activeTab="opc" />
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