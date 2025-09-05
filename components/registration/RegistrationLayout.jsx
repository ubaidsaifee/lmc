"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

// The change is in the flex container and the "flex-1" class on each Link
const RegistrationTabs = ({ activeTab }) => (
  <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
    <Link
      href="/private-limited-company"
      className={`flex-1 p-3 px-5 text-center rounded-lg font-semibold text-white shadow-md transition-colors ${
        activeTab === "pvt"
          ? "bg-gradient-to-r from-orange-500 to-amber-500"
          : "bg-[#003a9b] hover:bg-[#002c7a]"
      }`}
    >
      Private Limited Company
    </Link>
    <Link
      href="/one-person-company"
      className={`flex-1 p-3 px-5 text-center rounded-lg font-semibold text-white shadow-md transition-colors ${
        activeTab === "opc"
          ? "bg-gradient-to-r from-orange-500 to-amber-500"
          : "bg-[#003a9b] hover:bg-[#002c7a]"
      }`}
    >
      One Person Company
    </Link>
    <Link
      href="/limited-liability-partnership"
      className={`flex-1 p-3 px-5 text-center rounded-lg font-semibold text-white shadow-md transition-colors ${
        activeTab === "llp"
          ? "bg-gradient-to-r from-orange-500 to-amber-500"
          : "bg-[#003a9b] hover:bg-[#002c7a]"
      }`}
    >
      Limited Liability Partnership
    </Link>
  </div>
);

// This component now only handles the sidebar and main content layout
export default function RegistrationLayout({
  pageData,
  currentStep,
  completedSteps,
  goToStep,
  handleNext,
  handleBack,
  children,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 p-6 lg:p-8 h-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {pageData.title}
          </h2>
          <p className="text-sm text-slate-500 mb-8">Registration Guide</p>
          <nav>
            <ul className="space-y-2">
              {pageData.sections.map((section) => {
                const isCompleted = completedSteps.includes(section.id);
                const isActive = currentStep === section.id;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => goToStep(section.id)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                          : "hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isActive
                            ? "bg-white"
                            : isCompleted
                            ? "bg-green-100"
                            : "bg-slate-100"
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <section.icon
                            size={20}
                            className={`${
                              isActive ? "text-blue-600" : "text-slate-500"
                            }`}
                          />
                        )}
                      </div>
                      <span className="font-semibold text-base">
                        {section.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 h-full flex flex-col">
          <div className="p-6 md:p-10 lg:p-12 overflow-y-auto flex-1">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="p-6 border-t border-slate-200 bg-white/50 backdrop-blur-sm rounded-b-2xl">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft size={18} /> Back
              </button>
              {currentStep < pageData.sections.length && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                >
                  Next Step <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Export the new Tabs component so other pages can use it
export { RegistrationTabs };