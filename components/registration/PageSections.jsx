"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Building,
  FileCheck2,
  Scale,
  Table,
  Calculator,
  Send,
  X,
  ListChecks,
  User,
  Mail,
  Phone,
  ChevronsUpDown,
  Landmark,
  Search,
  UserCheck,
  Users,
  TrendingUp,
  HelpCircle, // <-- Import HelpCircle icon
  ChevronDown, // <-- Import ChevronDown for FAQ
} from "lucide-react";

// --- Reusable UI Components ---
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="mb-10">
    {" "}
    <div className="flex items-center gap-4 mb-4">
      {" "}
      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
        {" "}
        <Icon size={28} />{" "}
      </div>{" "}
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</h1>{" "}
    </div>{" "}
    <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>{" "}
  </div>
);
const InputField = ({
  icon: Icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) => (
  <div className="relative group">
    {" "}
    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
      {" "}
      {Icon && <Icon className="text-slate-400" size={20} />}{" "}
    </div>{" "}
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pt-3 pb-2 pl-10 bg-transparent border-b-2 border-slate-300 text-slate-800 placeholder-slate-400/70 focus:outline-none peer"
    />{" "}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 peer-focus:w-full peer-focus:left-0"></span>{" "}
    {error && <p className="text-red-600 text-sm mt-1.5">{error}</p>}{" "}
  </div>
);
const StyledCombobox = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const comboboxRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="relative" ref={comboboxRef}>
      {" "}
      <div className="text-sm text-slate-500 mb-1">{label}</div>{" "}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 border border-slate-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {" "}
        <span className="text-slate-800">
          {" "}
          {selectedOption ? selectedOption.label : `Select ${label}`}{" "}
        </span>{" "}
        <ChevronsUpDown className="text-slate-400" size={20} />{" "}
      </button>{" "}
      <AnimatePresence>
        {" "}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl"
          >
            {" "}
            <div className="p-2">
              {" "}
              <div className="relative">
                {" "}
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />{" "}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />{" "}
              </div>{" "}
            </div>{" "}
            <ul className="max-h-60 overflow-y-auto p-1">
              {" "}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li key={option.value}>
                    {" "}
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`w-full text-left p-2 rounded-md ${
                        option.value === value
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {" "}
                      {option.label}{" "}
                    </button>{" "}
                  </li>
                ))
              ) : (
                <li className="p-2 text-slate-500 text-center">
                  {" "}
                  No options found.{" "}
                </li>
              )}{" "}
            </ul>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
};
const FeeDisplayInput = ({ value, isTotal = false }) => (
  <div className="relative">
    {" "}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
      ₹
    </div>{" "}
    <input
      type="text"
      readOnly
      value={value?.toLocaleString("en-IN") || "..."}
      className={`w-full p-3 pl-7 border-slate-300/80 border-dashed border focus:outline-none rounded-lg bg-slate-100/80 text-right font-mono ${
        isTotal
          ? "text-blue-700 text-xl font-bold"
          : "text-slate-800 font-semibold"
      }`}
    />{" "}
  </div>
);
const CalcRow = ({ label, children, isTotal = false, alignTop = false }) => (
  <div
    className={`flex flex-col md:flex-row md:justify-between gap-2 ${
      alignTop ? "md:items-start pt-2" : "md:items-center"
    }`}
  >
    {" "}
    <p
      className={`font-semibold shrink-0 ${
        isTotal ? "text-blue-700 text-lg" : "text-slate-600"
      }`}
    >
      {label}
    </p>{" "}
    <div className="w-full md:w-1/2">{children}</div>{" "}
  </div>
);
const AddonCheckbox = ({ name, checked, onChange, label, price }) => (
  <label className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-slate-200/60 cursor-pointer transition-colors border border-transparent hover:border-slate-300">
    {" "}
    <div className="flex items-center gap-3">
      {" "}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
      />{" "}
      <span className="text-slate-700">{label}</span>{" "}
    </div>{" "}
    <span className="font-semibold text-slate-800">₹{price}</span>{" "}
  </label>
);

// --- START: NEW FAQ COMPONENTS ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-slate-500" size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-slate-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = ({ title, faqs }) => (
  <div>
    <SectionHeader title={title} icon={HelpCircle} />
    <div className="mt-8 space-y-2">
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.q} answer={faq.a} />
      ))}
    </div>
  </div>
);
// --- END: NEW FAQ COMPONENTS ---

// --- Data Exports ---
export const pvtPageSections = [
  { id: 1, title: "Overview", icon: Building, component: "PvtOverviewSection" },
  {
    id: 2,
    title: "Documents Checklist",
    icon: ListChecks,
    component: "PvtDocumentsSection",
  },
  {
    id: 3,
    title: "Incorporation Process",
    icon: FileCheck2,
    component: "PvtProcessSection",
  },
  {
    id: 4,
    title: "Pros and Cons",
    icon: Scale,
    component: "PvtProsConsSection",
  },
  { id: 5, title: "Comparison", icon: Table, component: "ComparisonSection" },
  {
    id: 6,
    title: "Fee & Registration",
    icon: Calculator,
    component: "PvtFeeCalculatorAndFormSection",
  },
  // --- NEW FAQ Section Added ---
  { id: 7, title: "FAQs", icon: HelpCircle, component: "PvtFaqSection" },
];
export const opcPageSections = [
  {
    id: 1,
    title: "Overview",
    icon: UserCheck,
    component: "OpcOverviewSection",
  },
  {
    id: 2,
    title: "Documents Checklist",
    icon: ListChecks,
    component: "OpcDocumentsSection",
  },
  {
    id: 3,
    title: "Comparison",
    icon: Scale,
    component: "OpcComparisonSection",
  },
  {
    id: 4,
    title: "Benefits of OPC",
    icon: TrendingUp,
    component: "OpcBenefitsSection",
  },
  {
    id: 5,
    title: "Fee & Registration",
    icon: Calculator,
    component: "OpcFeeCalculatorAndFormSection",
  },
  // --- NEW FAQ Section Added ---
  { id: 6, title: "FAQs", icon: HelpCircle, component: "OpcFaqSection" },
];
export const llpPageSections = [
  { id: 1, title: "Overview", icon: Users, component: "LlpOverviewSection" },
  {
    id: 2,
    title: "Documents Checklist",
    icon: ListChecks,
    component: "LlpDocumentsSection",
  },
  {
    id: 3,
    title: "Incorporation Process",
    icon: FileCheck2,
    component: "LlpProcessSection",
  },
  { id: 4, title: "Comparison", icon: Scale, component: "LlpComparisonSection" },
  {
    id: 5,
    title: "Fee & Registration",
    icon: Calculator,
    component: "LlpFeeCalculatorAndFormSection",
  },
  // --- NEW FAQ Section Added ---
  { id: 6, title: "FAQs", icon: HelpCircle, component: "LlpFaqSection" },
];
export const statesOfIndia = [
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadar Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Orissa",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// --- Section Component Exports ---

// Generic Comparison Table (Used by Pvt Ltd & LLP)
export const ComparisonSection = () => (
  <div>
    {" "}
    <SectionHeader
      title="Comparison of Business Structures"
      icon={Table}
    />{" "}
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      {" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="w-full text-left">
          {" "}
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            {" "}
            <tr>
              {" "}
              <th className="p-4 font-semibold text-slate-600 uppercase text-sm tracking-wider">
                Particulars
              </th>{" "}
              <th className="p-4 font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 uppercase text-sm tracking-wider">
                Pvt Ltd Company
              </th>{" "}
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">
                OPC
              </th>{" "}
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">
                LLP
              </th>{" "}
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">
                Proprietorship
              </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody className="text-slate-700 divide-y divide-slate-200">
            {" "}
            {[
              {
                feature: "Registration",
                pvt: "Mandatory",
                opc: "Mandatory",
                llp: "Mandatory",
                prop: "Optional",
              },
              {
                feature: "Liability",
                pvt: "Limited",
                opc: "Limited",
                llp: "Limited",
                prop: "Unlimited",
              },
              {
                feature: "Separate Legal Entity",
                pvt: "Yes",
                opc: "Yes",
                llp: "Yes",
                prop: "No",
              },
              {
                feature: "Compliance",
                pvt: "High",
                opc: "High",
                llp: "Moderate",
                prop: "Low",
              },
              {
                feature: "Perpetual Existence",
                pvt: "Yes",
                opc: "Yes",
                llp: "Yes",
                prop: "No",
              },
            ].map((row) => (
              <tr
                key={row.feature}
                className="hover:bg-slate-50 transition-colors"
              >
                {" "}
                <td className="p-4 font-semibold">{row.feature}</td>{" "}
                <td className="p-4 text-center font-bold bg-blue-50/70 text-blue-800">
                  {row.pvt}
                </td>{" "}
                <td className="p-4 text-center">{row.opc}</td>{" "}
                <td className="p-4 text-center">{row.llp}</td>{" "}
                <td className="p-4 text-center">{row.prop}</td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);

// --- PVT LTD Components ---
export const PvtOverviewSection = () => (
  <div>
    {" "}
    <SectionHeader
      title="What is a Private Limited Company?"
      icon={Building}
    />{" "}
    <p className="mt-8 text-slate-600 leading-relaxed text-lg">
      {" "}
      A <strong>Private Limited Company</strong> is the most popular business
      structure in India. It's a separate legal entity, which means the owners'
      (shareholders') personal assets are protected from business debts. It
      offers limited liability while allowing full control over business
      operations.{" "}
    </p>{" "}
    <div className="mt-10 aspect-video rounded-2xl overflow-hidden shadow-2xl ring-8 ring-slate-100 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {" "}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/ETPnsEZNziA?si=ODNT68yls6Cm2xm-"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>{" "}
    </div>{" "}
  </div>
);
export const PvtDocumentsSection = () => (
  <div>
    {" "}
    <SectionHeader title="Documents Checklist" icon={ListChecks} />{" "}
    <div className="mt-10 grid md:grid-cols-2 gap-8">
      {" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-blue-700">
          For Directors / Promoters
        </h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">PAN Card:</strong> Mandatory
              for all Indian nationals.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Identity Proof:</strong>{" "}
              Aadhaar Card, Voter ID, or Passport.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Address Proof:</strong> Latest
              Bank Statement or Utility Bill.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Photograph:</strong> Recent
              passport-sized color photo.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-orange-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-orange-600">
          For Registered Office
        </h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Address Proof:</strong> Latest
              Utility Bill.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">
                No Objection Certificate (NOC)
              </strong>{" "}
              from owner.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Rental Agreement:</strong> If
              the property is rented.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
export const PvtProcessSection = () => (
  <div>
    {" "}
    <SectionHeader title="Incorporation Process" icon={FileCheck2} />{" "}
    <p className="mt-4 text-slate-600 text-lg">
      A streamlined 4-step journey to bring your company to life.
    </p>{" "}
    <div className="relative mt-12 pl-4">
      {" "}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200 rounded-full"></div>{" "}
      {[
        {
          title: "Name Approval (RUN)",
          description:
            "Choose a unique name for your company. We file an application with the Registrar of Companies (ROC) to reserve the name.",
        },
        {
          title: "Obtain DSC & DIN",
          description:
            "We procure a Digital Signature Certificate (DSC) for all directors and apply for the Director Identification Number (DIN).",
        },
        {
          title: "File SPICe+ Form",
          description:
            "We draft the Memorandum of Association (MoA) & Articles of Association (AoA) and file the comprehensive SPICe+ incorporation form.",
        },
        {
          title: "Certificate of Incorporation",
          description:
            "Once approved, you receive the Certificate of Incorporation, along with your company's PAN and TAN.",
        },
      ].map((step, index) => (
        <div key={index} className="relative pl-12 pb-10 last:pb-0">
          {" "}
          <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold ring-8 ring-white shadow-md">
            {" "}
            {index + 1}{" "}
          </div>{" "}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all">
            {" "}
            <h3 className="font-bold text-blue-700 text-xl mb-2">
              {step.title}
            </h3>{" "}
            <p className="text-slate-600">{step.description}</p>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>{" "}
  </div>
);
export const PvtProsConsSection = () => (
  <div>
    {" "}
    <SectionHeader title="Pros and Cons" icon={Scale} />{" "}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {" "}
      <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500 shadow-sm">
        {" "}
        <h3 className="font-bold text-xl text-teal-800 mb-4">
          Advantages
        </h3>{" "}
        <ul className="space-y-3 text-teal-900/80">
          {" "}
          <li className="flex gap-3">
            <Check size={20} className="text-teal-600 mt-1 flex-shrink-0" />
            <span>Limited Liability Protection</span>
          </li>{" "}
          <li className="flex gap-3">
            <Check size={20} className="text-teal-600 mt-1 flex-shrink-0" />
            <span>Separate Legal Entity</span>
          </li>{" "}
          <li className="flex gap-3">
            <Check size={20} className="text-teal-600 mt-1 flex-shrink-0" />
            <span>Easier to attract funding & investment</span>
          </li>{" "}
          <li className="flex gap-3">
            <Check size={20} className="text-teal-600 mt-1 flex-shrink-0" />
            <span>Perpetual existence</span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="bg-rose-50 p-6 rounded-lg border-l-4 border-rose-500 shadow-sm">
        {" "}
        <h3 className="font-bold text-xl text-rose-800 mb-4">
          Disadvantages
        </h3>{" "}
        <ul className="space-y-3 text-rose-900/80">
          {" "}
          <li className="flex gap-3">
            <X size={20} className="text-rose-600 mt-1 flex-shrink-0" />
            <span>Higher compliance requirements</span>
          </li>{" "}
          <li className="flex gap-3">
            <X size={20} className="text-rose-600 mt-1 flex-shrink-0" />
            <span>More complex to set up and manage</span>
          </li>{" "}
          <li className="flex gap-3">
            <X size={20} className="text-rose-600 mt-1 flex-shrink-0" />
            <span>Restrictions on transfer of shares</span>
          </li>{" "}
          <li className="flex gap-3">
            <X size={20} className="text-rose-600 mt-1 flex-shrink-0" />
            <span>Cannot raise funds from the public</span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
// --- START: NEW PVT LTD FAQ Section ---
const pvtFaqs = [
  { q: "What is the minimum number of directors and shareholders required?", a: "A Private Limited Company must have a minimum of two directors and two shareholders. The maximum number of shareholders is limited to 200. A director and shareholder can be the same person." },
  { q: "Is there a minimum capital requirement for a Pvt. Ltd. Co.?", a: "As per the Companies (Amendment) Act, 2015, there is no minimum paid-up share capital requirement. You can start a company with any amount of capital." },
  { q: "Can a foreigner be a director in an Indian Private Limited Company?", a: "Yes, a foreign national can be a director. However, at least one director on the board must be a resident of India, meaning they have stayed in India for at least 182 days in the previous calendar year." },
  { q: "What is a Director Identification Number (DIN)?", a: "A DIN is a unique 8-digit identification number that is allotted by the Central Government to any individual intending to be a director of a company. It is mandatory for all directors." },
  { q: "What are the annual compliance requirements?", a: "Key annual compliances include filing an Annual Return (Form MGT-7), Financial Statements (Form AOC-4), and Income Tax Returns. Additionally, companies must hold board meetings and an Annual General Meeting (AGM) as per the Companies Act, 2013." },
  { q: "Can a Private Limited Company accept deposits from the public?", a: "No, a private limited company is prohibited from accepting deposits from the public. It can only accept deposits from its members, directors, or their relatives, subject to certain conditions." },
  { q: "What is the difference between Authorized Capital and Paid-up Capital?", a: "Authorized Capital is the maximum amount of share capital that a company is authorized to issue to shareholders. Paid-up Capital is the amount of money a company has received from shareholders in exchange for shares. Paid-up capital can be less than or equal to the authorized capital." },
  { q: "How long does the registration process typically take?", a: "The entire process, from obtaining Digital Signature Certificates (DSC) to receiving the Certificate of Incorporation, typically takes around 10-15 working days, provided all documents are in order and there are no delays from the MCA portal." }
];
export const PvtFaqSection = () => <FaqSection title="Private Limited Co. - FAQs" faqs={pvtFaqs} />;
// --- END: NEW PVT LTD FAQ Section ---


// --- OPC Components ---
export const OpcOverviewSection = () => (
  <div>
    {" "}
    <SectionHeader
      title="What is One Person Company (OPC)?"
      icon={UserCheck}
    />{" "}
    <p className="mt-8 text-slate-600 leading-relaxed text-lg">
      {" "}
      A <strong>One Person Company (OPC)</strong> is a type of business entity
      established under the Companies Act, 2013. It allows a single individual
      to operate a company with limited liability and also be entitled to 100%
      of the profit. An OPC is a separate legal entity, offering limited
      liability protection to its sole owner.{" "}
    </p>{" "}
    <div className="mt-10 aspect-video rounded-2xl overflow-hidden shadow-2xl ring-8 ring-slate-100 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {" "}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/GYp8O6Cz2S8?si=hmr7s5TidcPLE5Je"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>{" "}
    </div>{" "}
  </div>
);
export const OpcDocumentsSection = () => (
  <div>
    {" "}
    <SectionHeader title="Documents Checklist for OPC" icon={ListChecks} />{" "}
    <div className="mt-10 grid md:grid-cols-2 gap-8">
      {" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-blue-700">
          For Director & Nominee
        </h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">
                PAN Card & Aadhaar Card:
              </strong>{" "}
              Mandatory for Director and Nominee.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Address Proof:</strong> Latest
              bank statement or utility bill (not older than 2 months).
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Photograph:</strong> Recent
              passport-sized color photo.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-orange-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-orange-600">
          For Registered Office
        </h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Utility Bill:</strong> Latest
              electricity or telephone bill for the office address.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">
                No Objection Certificate (NOC)
              </strong>{" "}
              from the property owner.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Rental Agreement:</strong> If
              the property is rented.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
export const OpcComparisonSection = () => (
  <div>
    {" "}
    <SectionHeader title="OPC vs. Proprietorship" icon={Scale} />{" "}
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      {" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="w-full text-left">
          {" "}
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            {" "}
            <tr>
              {" "}
              <th className="p-4 font-semibold text-slate-600 uppercase text-sm tracking-wider">
                Aspect
              </th>{" "}
              <th className="p-4 font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 uppercase text-sm tracking-wider">
                One Person Company (OPC)
              </th>{" "}
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">
                Proprietorship
              </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody className="text-slate-700 divide-y divide-slate-200">
            {" "}
            {[
              {
                aspect: "Legal Structure",
                opc: "Separate Legal Entity",
                prop: "Not a separate legal entity",
              },
              {
                aspect: "Liability",
                opc: "Limited Liability",
                prop: "Unlimited Liability",
              },
              {
                aspect: "Governed By",
                opc: "Companies Act, 2013",
                prop: "No specific governing laws",
              },
              {
                aspect: "Taxation",
                opc: "Corporate Taxes",
                prop: "Individual Taxes",
              },
              {
                aspect: "Continuity",
                opc: "Perpetual Succession",
                prop: "Ends with proprietor",
              },
            ].map((row) => (
              <tr
                key={row.aspect}
                className="hover:bg-slate-50 transition-colors"
              >
                {" "}
                <td className="p-4 font-semibold">{row.aspect}</td>{" "}
                <td className="p-4 text-center font-bold bg-blue-50/70 text-blue-800">
                  {row.opc}
                </td>{" "}
                <td className="p-4 text-center">{row.prop}</td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
export const OpcBenefitsSection = () => (
  <div>
    {" "}
    <SectionHeader title="Benefits of an OPC" icon={TrendingUp} />{" "}
    <div className="mt-10 space-y-6">
      {" "}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        {" "}
        <h3 className="font-bold text-blue-700 text-xl mb-2">
          Legal Recognition
        </h3>{" "}
        <p className="text-slate-600">
          OPC registration grants legal recognition and separate legal entity
          status to the business, enhancing credibility and trust.
        </p>{" "}
      </div>{" "}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        {" "}
        <h3 className="font-bold text-blue-700 text-xl mb-2">
          Continuity with Inheritance
        </h3>{" "}
        <p className="text-slate-600">
          OPCs ensure business continuity and succession planning through a
          nominee, securing operations even in the absence of the owner.
        </p>{" "}
      </div>{" "}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        {" "}
        <h3 className="font-bold text-blue-700 text-xl mb-2">
          Ease of Conversion
        </h3>{" "}
        <p className="text-slate-600">
          OPCs can easily convert into private limited companies as the business
          grows, facilitating scalability and market competitiveness.
        </p>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
// --- START: NEW OPC FAQ Section ---
const opcFaqs = [
  { q: "Who is eligible to form an OPC?", a: "Only a natural person who is an Indian citizen and resident in India is eligible to incorporate a One Person Company. A person can be a member of only one OPC at any given time." },
  { q: "What is the role of a nominee in an OPC?", a: "The nominee is a crucial part of an OPC. In the event of the sole member's death or incapacity, the nominee will become the new member of the company, ensuring perpetual succession." },
  { q: "Can an OPC be converted into a Private Limited Company?", a: "Yes. An OPC can voluntarily convert into a private limited company after two years from the date of incorporation. It must mandatorily convert if its paid-up share capital exceeds ₹50 lakhs or its average annual turnover exceeds ₹2 crores." },
  { q: "Are the compliance requirements for an OPC less than a Private Limited Company?", a: "Yes, an OPC enjoys certain exemptions in compliance. For instance, it is only required to hold one Board Meeting in each half of a calendar year, and the gap between the two meetings should not be less than ninety days. There is no need to hold an Annual General Meeting (AGM)." },
  { q: "Can an OPC raise funds from external sources?", a: "An OPC can raise funds through debentures, and from banks and financial institutions. However, it cannot issue shares to the public or more than one person, which limits its equity funding options compared to a private limited company." },
  { q: "What happens if the nominee withdraws their consent?", a: "If the nominee withdraws their consent, the sole member must nominate another person within 15 days of receiving the notice of withdrawal. The company must then file this change with the Registrar of Companies." },
  { q: "Can a Non-Resident Indian (NRI) form an OPC?", a: "No, as of the current regulations, only an Indian citizen who is a resident of India can form an OPC. The residency criteria require a stay in India for at least 120 days during the immediately preceding financial year." },
  { q: "What are the tax implications for an OPC?", a: "An OPC is taxed at a flat rate of 30% on its profits, similar to a private limited company. The provisions of the Dividend Distribution Tax (DDT) are also applicable." }
];
export const OpcFaqSection = () => <FaqSection title="One Person Co. - FAQs" faqs={opcFaqs} />;
// --- END: NEW OPC FAQ Section ---

// --- LLP Components ---
export const LlpOverviewSection = () => (
  <div>
    {" "}
    <SectionHeader
      title="What is a Limited Liability Partnership (LLP)?"
      icon={Users}
    />{" "}
    <p className="mt-8 text-slate-600 leading-relaxed text-lg">
      {" "}
      A <strong>Limited Liability Partnership (LLP)</strong> is a business
      structure that combines features of partnerships and corporations. It
      offers limited liability protection to its partners, shielding personal
      assets from business debts. Partners manage the LLP directly and share
      profits according to their agreement.{" "}
    </p>{" "}
    <div className="mt-10 aspect-video rounded-2xl overflow-hidden shadow-2xl ring-8 ring-slate-100 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {" "}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/8C3pflvFOfU?si=yDQBR_52qKo_ClPk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>{" "}
    </div>{" "}
  </div>
);
export const LlpDocumentsSection = () => (
  <div>
    {" "}
    <SectionHeader title="Documents Checklist for LLP" icon={ListChecks} />{" "}
    <div className="mt-10 grid md:grid-cols-2 gap-8">
      {" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-blue-700">
          For Partners
        </h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">
                PAN Card & Aadhaar Card:
              </strong>{" "}
              Mandatory for all partners.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Address Proof:</strong> Latest
              bank statement or utility bill.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">Photograph:</strong> Recent
              passport-sized color photo of all partners.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-orange-300 transform hover:-translate-y-1 transition-all duration-300">
        {" "}
        <h3 className="font-bold text-xl mb-4 text-orange-600">For LLP</h3>{" "}
        <ul className="space-y-4 text-slate-600">
          {" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">
                Registered Office Proof:
              </strong>{" "}
              Latest utility bill and a No Objection Certificate (NOC) from the
              owner.
            </span>
          </li>{" "}
          <li className="flex items-start gap-3">
            <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
            <span>
              <strong className="text-slate-700">LLP Agreement:</strong> The
              agreement detailing the rights and duties of partners.
            </span>
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
export const LlpProcessSection = () => (
  <div>
    {" "}
    <SectionHeader title="LLP Incorporation Process" icon={FileCheck2} />{" "}
    <p className="mt-4 text-slate-600 text-lg">
      A streamlined 5-step journey to register your LLP.
    </p>{" "}
    <div className="relative mt-12 pl-4">
      {" "}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200 rounded-full"></div>{" "}
      {[
        {
          title: "Obtain Digital Signature Certificate (DSC)",
          description:
            "The first step is to acquire DSC for all the designated partners of the LLP.",
        },
        {
          title: "Apply for Director Identification Number (DIN)",
          description:
            "All designated partners must apply for a DIN if they don't already have one.",
        },
        {
          title: "Name Approval (RUN-LLP)",
          description:
            "File an application for reservation of a unique name for the LLP with the Registrar.",
        },
        {
          title: "Incorporation of LLP (FiLLiP)",
          description:
            "File the FiLLiP form with the Registrar for incorporating the new LLP.",
        },
        {
          title: "File LLP Agreement",
          description:
            "After incorporation, the LLP agreement must be filed with the MCA within 30 days.",
        },
      ].map((step, index) => (
        <div key={index} className="relative pl-12 pb-10 last:pb-0">
          {" "}
          <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold ring-8 ring-white shadow-md">
            {" "}
            {index + 1}{" "}
          </div>{" "}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all">
            {" "}
            <h3 className="font-bold text-blue-700 text-xl mb-2">
              {step.title}
            </h3>{" "}
            <p className="text-slate-600">{step.description}</p>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>{" "}
  </div>
);
export const LlpComparisonSection = () => (
  <div>
    <SectionHeader title="LLP vs. Partnership vs. Pvt. Ltd. Co." icon={Scale} />
    <p className="mt-4 text-slate-600 text-lg mb-10">
      Choosing the right business structure is critical. Here’s how an LLP compares to other common entities.
    </p>
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b-2 border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600 uppercase text-sm tracking-wider">Basis of Difference</th>
              <th className="p-4 font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 uppercase text-sm tracking-wider">Limited Liability Partnership (LLP)</th>
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">Partnership Firm</th>
              <th className="p-4 font-semibold text-center text-slate-600 uppercase text-sm tracking-wider">Private Limited Company</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-200">
            {[
              { basis: 'Governing Act', llp: 'Limited Liability Partnership Act, 2008', partnership: 'Indian Partnership Act, 1932', pvt: 'Companies Act, 2013' },
              { basis: 'Legal Status', llp: 'Separate Legal Entity', partnership: 'Not a Separate Legal Entity', pvt: 'Separate Legal Entity' },
              { basis: 'Liability', llp: 'Limited to each partner\'s contribution', partnership: 'Unlimited, joint and several liability', pvt: 'Limited to shares held by members' },
              { basis: 'Registration', llp: 'Mandatory with Registrar of Companies (MCA)', partnership: 'Optional with Registrar of Firms', pvt: 'Mandatory with Registrar of Companies (MCA)' },
              { basis: 'Number of Members', llp: 'Min 2 partners, no max limit', partnership: 'Min 2, Max 50 partners', pvt: 'Min 2, Max 200 members' },
              { basis: 'Compliance Burden', llp: 'Moderate (Annual Filing required)', partnership: 'Low (No annual filing with registrar)', pvt: 'High (Many annual filings, board meetings)' },
            ].map((row) => (
              <tr key={row.basis} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold">{row.basis}</td>
                <td className="p-4 text-center font-bold bg-blue-50/70 text-blue-800">{row.llp}</td>
                <td className="p-4 text-center">{row.partnership}</td>
                <td className="p-4 text-center">{row.pvt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
// --- START: NEW LLP FAQ Section ---
const llpFaqs = [
  { q: "What is the difference between a Partner and a Designated Partner in an LLP?", a: "Every LLP must have at least two Designated Partners who are individuals, and at least one of them must be a resident of India. Designated Partners are responsible for the legal and regulatory compliances of the LLP. Other partners are not responsible for these compliances but have rights and duties as per the LLP agreement." },
  { q: "Is the LLP Agreement mandatory?", a: "Yes, the LLP Agreement is a crucial document that outlines the mutual rights and duties of the partners and their rights and duties in relation to the LLP. It must be filed with the MCA in Form 3 within 30 days of incorporation." },
  { q: "What are the annual compliance requirements for an LLP?", a: "An LLP is required to file two main annual forms with the MCA: Form 11 (Annual Return) and Form 8 (Statement of Account & Solvency). LLPs are also required to file Income Tax Returns annually." },
  { q: "Can an existing partnership firm be converted into an LLP?", a: "Yes, an existing partnership firm can be converted into an LLP by complying with the provisions of the LLP Act, 2008. This allows the firm to retain its identity and goodwill while gaining the benefits of limited liability." },
  { q: "Is there a limit on the number of partners in an LLP?", a: "An LLP requires a minimum of two partners to start, but there is no maximum limit on the number of partners it can have. This provides great flexibility for expansion." },
  { q: "How is an LLP taxed?", a: "An LLP is taxed as a separate entity. The profits are taxed at a flat rate of 30% plus applicable cess and surcharge. The profit shared with partners is exempt from tax in the hands of the partners." },
  { q: "Can a company or another LLP be a partner in an LLP?", a: "Yes, a body corporate (which includes a company or another LLP, whether incorporated in India or outside) can become a partner in an LLP." },
  { q: "Is Foreign Direct Investment (FDI) allowed in an LLP?", a: "Yes, FDI is permitted in LLPs under the automatic route in sectors where 100% FDI is allowed and there are no FDI-linked performance conditions. This makes LLPs an attractive option for foreign investors." }
];
export const LlpFaqSection = () => <FaqSection title="LLP - FAQs" faqs={llpFaqs} />;
// --- END: NEW LLP FAQ Section ---


// --- CALCULATOR COMPONENTS ---

export const PvtFeeCalculatorAndFormSection = () => {
  const [internalStep, setInternalStep] = useState(1);
  const [calcData, setCalcData] = useState({
    capital: 100000,
    state: "Delhi",
    noOfPromoters: 2,
    addons: { pic: false, govtFees: false, gstReg: false, msmeReg: false },
  });
  const [fees, setFees] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const p = (v) => parseInt(v, 10) || 0;
    const getStampDutyFees = (state, capital) => {
      let aoaStamp = 0,
        moaStamp = 0,
        stampDuty = 0;
      switch (state.toLowerCase()) {
        case "delhi":
          aoaStamp = (capital * 0.15) / 100;
          moaStamp = 200;
          stampDuty = 10;
          break;
        case "bihar":
          let scvBihar = (capital * 0.15) / 100;
          aoaStamp = scvBihar < 1000 ? 1000 : scvBihar;
          moaStamp = 500;
          stampDuty = 20;
          break;
        case "jammu and kashmir":
          aoaStamp = capital <= 100000 ? 150 : 300;
          moaStamp = 150;
          stampDuty = 10;
          break;
        case "kerala":
          if (capital <= 10000000) {
            aoaStamp =
              capital <= 1000000
                ? 2000
                : capital <= 2500000
                ? 5000
                : (capital * 0.5) / 100;
          }
          moaStamp = 1000;
          stampDuty = 25;
          break;
        case "madhya pradesh":
          let scvMP = (capital * 0.15) / 100;
          aoaStamp = scvMP <= 5000 ? 5000 : scvMP <= 2500000 ? scvMP : 2500000;
          moaStamp = 2500;
          stampDuty = 50;
          break;
        case "chhattisgarh":
          let scvChhat = (capital * 0.15) / 100;
          aoaStamp =
            scvChhat <= 1000 ? 1000 : scvChhat <= 500000 ? scvChhat : 500000;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "rajasthan":
          aoaStamp = (capital * 0.5) / 100;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "punjab":
          aoaStamp = capital <= 100000 ? 5000 : 10000;
          moaStamp = 5000;
          stampDuty = 25;
          break;
        case "tamil nadu":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 20;
          break;
        case "puducherry":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 10;
          break;
        case "jharkhand":
          aoaStamp = 105;
          moaStamp = 63;
          stampDuty = 5;
          break;
        case "assam":
          aoaStamp = 310;
          moaStamp = 200;
          stampDuty = 15;
          break;
        case "meghalaya":
          aoaStamp = 300;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "manipur":
        case "nagaland":
        case "tripura":
        case "mizoram":
          aoaStamp = 150;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "arunachal pradesh":
          aoaStamp = 500;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "karnataka":
          aoaStamp = Math.ceil(capital / 1000000) * 500;
          moaStamp = 1000;
          stampDuty = 20;
          break;
        case "gujarat":
          aoaStamp = (capital * 0.5) / 100;
          moaStamp = 100;
          stampDuty = 20;
          break;
        case "goa":
        case "daman and diu":
          aoaStamp = Math.ceil(capital / 500000) * 1000;
          moaStamp = 150;
          stampDuty = 20;
          break;
        case "himachal pradesh":
          aoaStamp = capital <= 100000 ? 60 : 120;
          moaStamp = 60;
          stampDuty = 3;
          break;
        case "chandigarh":
          aoaStamp = 1000;
          moaStamp = 500;
          stampDuty = 3;
          break;
        case "uttar pradesh":
        case "uttarakhand":
          aoaStamp = 500;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "west bengal":
          aoaStamp = 300;
          moaStamp = 60;
          stampDuty = 10;
          break;
        case "dadar nagar haveli":
          aoaStamp = 25;
          moaStamp = 15;
          stampDuty = 1;
          break;
        case "andaman and nicobar":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 20;
          break;
        case "haryana":
          aoaStamp = capital <= 100000 ? 60 : 120;
          moaStamp = 60;
          stampDuty = 15;
          break;
        case "maharashtra":
          aoaStamp =
            capital <= 500000
              ? 1000
              : Math.min(5000000, Math.ceil(capital / 500000) * 1000);
          moaStamp = 200;
          stampDuty = 100;
          break;
        case "andhra pradesh":
        case "telangana":
          aoaStamp = Math.min(500000, Math.max(1000, (capital * 0.15) / 100));
          moaStamp = 500;
          stampDuty = 20;
          break;
        case "orissa":
          aoaStamp = 300;
          moaStamp = 300;
          stampDuty = 10;
          break;
        default:
          break;
      }
      return { aoaStamp, moaStamp, stampDuty };
    };
    const getCapitalGovFees = (capital) => {
      const normalGov = capital <= 1500000 ? 0 : 500;
      let aoaGov = 0;
      if (capital > 1500000 && capital < 2500000) {
        aoaGov = 400;
      } else if (capital >= 2500000 && capital < 10000000) {
        aoaGov = 500;
      } else if (capital >= 10000000) {
        aoaGov = 600;
      }
      return { normalGov, aoaGov };
    };
    const getMoaGovFee = (capital) => {
      if (capital <= 1500000) {
        return 0;
      } else if (capital <= 5000000) {
        const moaGovValue = capital - 1000000;
        let slicepart = moaGovValue / 10000;
        slicepart =
          (slicepart > Math.round(slicepart)
            ? p(slicepart) + 1
            : p(slicepart)) * 200;
        return 2000 + slicepart;
      } else {
        const cr1 = 100000 + 400000 + 4500000;
        const cutoff =
          (100000 / 10000) * 500 +
          (400000 / 10000) * 400 +
          (4500000 / 10000) * 300;
        if (capital <= 10000000) {
          const moaGovValue = capital - cr1;
          let slicepart = moaGovValue / 10000;
          slicepart =
            (slicepart > Math.round(slicepart)
              ? p(slicepart) + 1
              : p(slicepart)) * 100;
          return cutoff + slicepart;
        } else {
          const netcutoff = cutoff + (5000000 / 10000) * 100;
          let slicepart = (capital - 10000000) / 10000;
          slicepart =
            (slicepart > Math.round(slicepart)
              ? p(slicepart) + 1
              : p(slicepart)) * 75;
          return netcutoff + slicepart;
        }
      }
    };
    const capital = p(calcData.capital);
    const promoters = p(calcData.noOfPromoters);
    const prof = 3499 + (promoters - 2) * 999;
    const dsc = promoters * 2250;
    const { aoaStamp, moaStamp, stampDuty } = getStampDutyFees(
      calcData.state,
      capital
    );
    const { normalGov, aoaGov } = getCapitalGovFees(capital);
    const moaGov = getMoaGovFee(capital);
    const panTanFee = 1631;
    const govt =
      p(panTanFee) +
      p(aoaStamp) +
      p(moaStamp) +
      p(stampDuty) +
      p(normalGov) +
      p(aoaGov) +
      p(moaGov);
    const gstOnBase = Math.round((dsc + prof) * 0.18);
    const preAddonTotal = dsc + prof + govt + gstOnBase;
    let addonProfFee = 0;
    if (calcData.addons.pic) addonProfFee += 3000;
    if (calcData.addons.govtFees) addonProfFee += 1000;
    if (calcData.addons.gstReg) addonProfFee += 3000;
    if (calcData.addons.msmeReg) addonProfFee += 2199;
    const gstOnAddon = Math.round(addonProfFee * 0.18);
    const orderValuePayable = preAddonTotal + addonProfFee + gstOnAddon;
    setFees({
      dsc,
      prof,
      govt,
      gstOnBase,
      preAddonTotal,
      addonProfFee,
      gstOnAddon,
      orderValuePayable,
    });
  }, [calcData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    else if (!/^\+?91[6-9]\d{9}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Please enter a valid Indian mobile number.";
    if (!formData.name) newErrors.name = "Your name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCalcInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCalcData((prev) => ({
        ...prev,
        addons: { ...prev.addons, [name]: checked },
      }));
    } else {
      setCalcData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleComboboxChange = (name, value) => {
    setCalcData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Registration Submitted for ${
          formData.companyName
        } with a final fee of ₹${fees.orderValuePayable?.toLocaleString(
          "en-IN"
        )}.`
      );
    }
  };

  return (
    <div>
      <SectionHeader title="Calculate Fee & Get Started" icon={Calculator} />
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-slate-50/70 p-6 md:p-8 rounded-2xl shadow-inner border border-slate-200"
      >
        <AnimatePresence mode="wait">
          {internalStep === 1 ? (
            <motion.div
              key="step1"
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 1: Basic Details
              </h3>
              <StyledCombobox
                label="Authorised Capital"
                options={[
                  { value: 100000, label: "₹ 1,00,000" },
                  { value: 500000, label: "₹ 5,00,000" },
                  { value: 1000000, label: "₹ 10,00,000" },
                  { value: 1500000, label: "₹ 15,00,000" },
                  { value: 2500000, label: "₹ 25,00,000" },
                  { value: 5000000, label: "₹ 50,00,000" },
                ]}
                value={calcData.capital}
                onChange={(value) => handleComboboxChange("capital", value)}
              />
              <StyledCombobox
                label="State of Registration"
                options={statesOfIndia.map((s) => ({ value: s, label: s }))}
                value={calcData.state}
                onChange={(value) => handleComboboxChange("state", value)}
              />
              <StyledCombobox
                label="Number of Directors"
                options={[...Array(14)].map((_, i) => ({
                  value: i + 2,
                  label: `${i + 2}`,
                }))}
                value={calcData.noOfPromoters}
                onChange={(value) =>
                  handleComboboxChange("noOfPromoters", value)
                }
              />
              <div className="border-b border-blue-200 border-dashed pt-2"></div>
              <CalcRow label="Final Payable Amount" isTotal={true}>
                {" "}
                <FeeDisplayInput
                  value={fees.orderValuePayable}
                  isTotal={true}
                />{" "}
              </CalcRow>
              <div className="pt-4 flex justify-end">
                {" "}
                <button
                  type="button"
                  onClick={() => setInternalStep(2)}
                  className="px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {" "}
                  Select Add-ons{" "}
                </button>{" "}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 2: Fee Breakdown & Add-ons
              </h3> 
              <CalcRow label="Package Total">
                {" "}
                <FeeDisplayInput value={fees.preAddonTotal} />{" "}
              </CalcRow>
              <CalcRow label="Other Services" alignTop={true}>
                <div className="w-full space-y-2">
                  <AddonCheckbox
                    name="pic"
                    label="Post Incorporation Compliances"
                    price="3,000"
                    checked={calcData.addons.pic}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="govtFees"
                    label="Govt. Fees (Approx)"
                    price="1,000"
                    checked={calcData.addons.govtFees}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="gstReg"
                    label="GST Registration"
                    price="3,000"
                    checked={calcData.addons.gstReg}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="msmeReg"
                    label="MSME Registration"
                    price="2,199"
                    checked={calcData.addons.msmeReg}
                    onChange={handleCalcInputChange}
                  />
                </div>
              </CalcRow>
              <div className="border-b border-blue-200 border-dashed pt-2"></div>
              <CalcRow label="Final Payable Amount" isTotal={true}>
                {" "}
                <FeeDisplayInput
                  value={fees.orderValuePayable}
                  isTotal={true}
                />{" "}
              </CalcRow>
              <div className="mt-12 space-y-6">
                <h3 className="font-bold text-xl text-slate-700">
                  Step 3: Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  <InputField
                    icon={Landmark}
                    name="companyName"
                    placeholder="Proposed Company Name"
                    value={formData.companyName}
                    onChange={handleFormInputChange}
                    error={errors.companyName}
                  />
                  <InputField
                    icon={User}
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    error={errors.name}
                  />
                  <InputField
                    icon={Phone}
                    name="contactNumber"
                    placeholder="Contact Number (+91)"
                    value={formData.contactNumber}
                    onChange={handleFormInputChange}
                    error={errors.contactNumber}
                  />
                  <InputField
                    icon={Mail}
                    name="email"
                    placeholder="Your Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    error={errors.email}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setInternalStep(1)}
                  className="px-5 py-2.5 font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  {" "}
                  Back{" "}
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                >
                  {" "}
                  Complete Registration <Send size={20} />{" "}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export const OpcFeeCalculatorAndFormSection = () => {
  const [internalStep, setInternalStep] = useState(1);
  const [calcData, setCalcData] = useState({
    capital: 100000,
    state: "Delhi",
    noOfPromoters: 2,
    addons: { inc20a: false, gstReg: false, msmeReg: false },
  });
  const [fees, setFees] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const p = (v) => parseInt(v, 10) || 0;
    const getStampDutyFees = (state, capital) => {
      let aoaStamp = 0,
        moaStamp = 0,
        stampDuty = 0;
      switch (state.toLowerCase()) {
        case "delhi":
          aoaStamp = (capital * 0.15) / 100;
          moaStamp = 200;
          stampDuty = 10;
          break;
        case "bihar":
          let scvBihar = (capital * 0.15) / 100;
          aoaStamp = scvBihar < 1000 ? 1000 : scvBihar;
          moaStamp = 500;
          stampDuty = 20;
          break;
        case "jammu and kashmir":
          aoaStamp = capital <= 100000 ? 150 : 300;
          moaStamp = 150;
          stampDuty = 10;
          break;
        case "kerala":
          if (capital <= 10000000) {
            aoaStamp =
              capital <= 1000000
                ? 2000
                : capital <= 2500000
                ? 5000
                : (capital * 0.5) / 100;
          }
          moaStamp = 1000;
          stampDuty = 25;
          break;
        case "madhya pradesh":
          let scvMP = (capital * 0.15) / 100;
          aoaStamp = scvMP <= 5000 ? 5000 : scvMP <= 2500000 ? scvMP : 2500000;
          moaStamp = 2500;
          stampDuty = 50;
          break;
        case "chhattisgarh":
          let scvChhat = (capital * 0.15) / 100;
          aoaStamp =
            scvChhat <= 1000 ? 1000 : scvChhat <= 500000 ? scvChhat : 500000;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "rajasthan":
          aoaStamp = (capital * 0.5) / 100;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "punjab":
          aoaStamp = capital <= 100000 ? 5000 : 10000;
          moaStamp = 5000;
          stampDuty = 25;
          break;
        case "tamil nadu":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 20;
          break;
        case "puducherry":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 10;
          break;
        case "jharkhand":
          aoaStamp = 105;
          moaStamp = 63;
          stampDuty = 5;
          break;
        case "assam":
          aoaStamp = 310;
          moaStamp = 200;
          stampDuty = 15;
          break;
        case "meghalaya":
          aoaStamp = 300;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "manipur":
        case "nagaland":
        case "tripura":
        case "mizoram":
          aoaStamp = 150;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "arunachal pradesh":
          aoaStamp = 500;
          moaStamp = 100;
          stampDuty = 10;
          break;
        case "karnataka":
          aoaStamp = Math.ceil(capital / 1000000) * 500;
          moaStamp = 1000;
          stampDuty = 20;
          break;
        case "gujarat":
          aoaStamp = (capital * 0.5) / 100;
          moaStamp = 100;
          stampDuty = 20;
          break;
        case "goa":
        case "daman and diu":
          aoaStamp = Math.ceil(capital / 500000) * 1000;
          moaStamp = 150;
          stampDuty = 20;
          break;
        case "himachal pradesh":
          aoaStamp = capital <= 100000 ? 60 : 120;
          moaStamp = 60;
          stampDuty = 3;
          break;
        case "chandigarh":
          aoaStamp = 1000;
          moaStamp = 500;
          stampDuty = 3;
          break;
        case "uttar pradesh":
        case "uttarakhand":
          aoaStamp = 500;
          moaStamp = 500;
          stampDuty = 10;
          break;
        case "west bengal":
          aoaStamp = 300;
          moaStamp = 60;
          stampDuty = 10;
          break;
        case "dadar nagar haveli":
          aoaStamp = 25;
          moaStamp = 15;
          stampDuty = 1;
          break;
        case "andaman and nicobar":
          aoaStamp = 300;
          moaStamp = 200;
          stampDuty = 20;
          break;
        case "haryana":
          aoaStamp = capital <= 100000 ? 60 : 120;
          moaStamp = 60;
          stampDuty = 15;
          break;
        case "maharashtra":
          aoaStamp =
            capital <= 500000
              ? 1000
              : Math.min(5000000, Math.ceil(capital / 500000) * 1000);
          moaStamp = 200;
          stampDuty = 100;
          break;
        case "andhra pradesh":
        case "telangana":
          aoaStamp = Math.min(500000, Math.max(1000, (capital * 0.15) / 100));
          moaStamp = 500;
          stampDuty = 20;
          break;
        case "orissa":
          aoaStamp = 300;
          moaStamp = 300;
          stampDuty = 10;
          break;
        default:
          break;
      }
      return { aoaStamp, moaStamp, stampDuty };
    };
    const getCapitalGovFees = (capital) => {
      const normalGov = capital <= 1500000 ? 0 : 500;
      let aoaGov = 0;
      if (capital > 1500000 && capital < 2500000) {
        aoaGov = 400;
      } else if (capital >= 2500000 && capital < 10000000) {
        aoaGov = 500;
      } else if (capital >= 10000000) {
        aoaGov = 600;
      }
      return { normalGov, aoaGov };
    };
    const getMoaGovFee = (capital) => {
      if (capital <= 1500000) {
        return 0;
      } else if (capital <= 5000000) {
        const moaGovValue = capital - 1000000;
        let slicepart = moaGovValue / 10000;
        slicepart =
          (slicepart > Math.round(slicepart)
            ? p(slicepart) + 1
            : p(slicepart)) * 200;
        return 2000 + slicepart;
      } else {
        const cr1 = 100000 + 400000 + 4500000;
        const cutoff =
          (100000 / 10000) * 500 +
          (400000 / 10000) * 400 +
          (4500000 / 10000) * 300;
        if (capital <= 10000000) {
          const moaGovValue = capital - cr1;
          let slicepart = moaGovValue / 10000;
          slicepart =
            (slicepart > Math.round(slicepart)
              ? p(slicepart) + 1
              : p(slicepart)) * 100;
          return cutoff + slicepart;
        } else {
          const netcutoff = cutoff + (5000000 / 10000) * 100;
          let slicepart = (capital - 10000000) / 10000;
          slicepart =
            (slicepart > Math.round(slicepart)
              ? p(slicepart) + 1
              : p(slicepart)) * 75;
          return netcutoff + slicepart;
        }
      }
    };

    const capital = p(calcData.capital);
    const promoters = p(calcData.noOfPromoters);
    const prof = 3499 + (promoters - 2) * 999;
    const dsc = promoters * 2250;
    const { aoaStamp, moaStamp, stampDuty } = getStampDutyFees(
      calcData.state,
      capital
    );
    const { normalGov, aoaGov } = getCapitalGovFees(capital);
    const moaGov = getMoaGovFee(capital);
    const panTanFee = 1631;
    const govt =
      p(panTanFee) +
      p(aoaStamp) +
      p(moaStamp) +
      p(stampDuty) +
      p(normalGov) +
      p(aoaGov) +
      p(moaGov);
    const gstOnBase = Math.round((dsc + prof) * 0.18);
    const preAddonTotal = dsc + prof + govt + gstOnBase;

    let addonProfFee = 0;
    if (calcData.addons.inc20a) addonProfFee += 1999;
    if (calcData.addons.gstReg) addonProfFee += 1499;
    if (calcData.addons.msmeReg) addonProfFee += 999;
    const gstOnAddon = Math.round(addonProfFee * 0.18);
    const orderValuePayable = preAddonTotal + addonProfFee + gstOnAddon;
    setFees({
      dsc,
      prof,
      govt,
      gstOnBase,
      preAddonTotal,
      addonProfFee,
      gstOnAddon,
      orderValuePayable,
    });
  }, [calcData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    else if (!/^\+?91[6-9]\d{9}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Please enter a valid Indian mobile number.";
    if (!formData.name) newErrors.name = "Your name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCalcInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCalcData((prev) => ({
        ...prev,
        addons: { ...prev.addons, [name]: checked },
      }));
    } else {
      setCalcData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleComboboxChange = (name, value) => {
    setCalcData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Registration Submitted for ${
          formData.companyName
        } with a final fee of ₹${fees.orderValuePayable?.toLocaleString(
          "en-IN"
        )}.`
      );
    }
  };

  return (
    <div>
      <SectionHeader
        title="OPC Fee Calculator & Registration"
        icon={Calculator}
      />
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-slate-50/70 p-6 md:p-8 rounded-2xl shadow-inner border border-slate-200"
      >
        <AnimatePresence mode="wait">
          {internalStep === 1 ? (
            <motion.div
              key="step1"
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 1: Basic Details
              </h3>
              <StyledCombobox
                label="Authorised Capital"
                options={[
                  { value: 100000, label: "₹ 1,00,000" },
                  { value: 500000, label: "₹ 5,00,000" },
                  { value: 1000000, label: "₹ 10,00,000" },
                  { value: 1500000, label: "₹ 15,00,000" },
                  { value: 2500000, label: "₹ 25,00,000" },
                  { value: 5000000, label: "₹ 50,00,000" },
                ]}
                value={calcData.capital}
                onChange={(value) => handleComboboxChange("capital", value)}
              />
              <StyledCombobox
                label="State of Registration"
                options={statesOfIndia.map((s) => ({ value: s, label: s }))}
                value={calcData.state}
                onChange={(value) => handleComboboxChange("state", value)}
              />
              <StyledCombobox
                label="Number of Promoters"
                options={[...Array(14)].map((_, i) => ({
                  value: i + 2,
                  label: `${i + 2}`,
                }))}
                value={calcData.noOfPromoters}
                onChange={(value) =>
                  handleComboboxChange("noOfPromoters", value)
                }
              />
              <div className="border-b border-blue-200 border-dashed pt-2"></div>
              <CalcRow label="Final Payable Amount" isTotal={true}>
                {" "}
                <FeeDisplayInput
                  value={fees.orderValuePayable}
                  isTotal={true}
                />{" "}
              </CalcRow>
              <div className="pt-4 flex justify-end">
                {" "}
                <button
                  type="button"
                  onClick={() => setInternalStep(2)}
                  className="px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {" "}
                  Select Add-ons{" "}
                </button>{" "}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 2: Fee Breakdown & Add-ons
              </h3>
              <CalcRow label="Package Total">
                {" "}
                <FeeDisplayInput value={fees.preAddonTotal} />{" "}
              </CalcRow>
              <CalcRow label="Other Services" alignTop={true}>
                <div className="w-full space-y-2">
                  <AddonCheckbox
                    name="inc20a"
                    label="INC-20A Filing"
                    price="1,999"
                    checked={calcData.addons.inc20a}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="gstReg"
                    label="GST Registration"
                    price="1,499"
                    checked={calcData.addons.gstReg}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="msmeReg"
                    label="MSME Registration"
                    price="999"
                    checked={calcData.addons.msmeReg}
                    onChange={handleCalcInputChange}
                  />
                </div>
              </CalcRow>
              <div className="border-b border-blue-200 border-dashed pt-2"></div>
              <CalcRow label="Final Payable Amount" isTotal={true}>
                {" "}
                <FeeDisplayInput
                  value={fees.orderValuePayable}
                  isTotal={true}
                />{" "}
              </CalcRow>
              <div className="mt-12 space-y-6">
                <h3 className="font-bold text-xl text-slate-700">
                  Step 3: Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  <InputField
                    icon={Landmark}
                    name="companyName"
                    placeholder="Proposed Company Name"
                    value={formData.companyName}
                    onChange={handleFormInputChange}
                    error={errors.companyName}
                  />
                  <InputField
                    icon={User}
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    error={errors.name}
                  />
                  <InputField
                    icon={Phone}
                    name="contactNumber"
                    placeholder="Contact Number (+91)"
                    value={formData.contactNumber}
                    onChange={handleFormInputChange}
                    error={errors.contactNumber}
                  />
                  <InputField
                    icon={Mail}
                    name="email"
                    placeholder="Your Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    error={errors.email}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setInternalStep(1)}
                  className="px-5 py-2.5 font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  {" "}
                  Back{" "}
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                >
                  {" "}
                  Complete Registration <Send size={20} />{" "}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export const LlpFeeCalculatorAndFormSection = () => {
  const [internalStep, setInternalStep] = useState(1);
  const [calcData, setCalcData] = useState({
    capital: 100000,
    state: "Delhi", // Field added for UI consistency
    noOfPromoters: 2,
    addons: { inc20a: false, gstReg: false, msmeReg: false },
  });
  const [fees, setFees] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const p = (v) => parseInt(v, 10) || 0;
    const capital = p(calcData.capital);
    const promoters = p(calcData.noOfPromoters);

    let llp_ii_fee = 0;
    if (capital <= 100000) llp_ii_fee = 500;
    else if (capital > 100000 && capital <= 500000) llp_ii_fee = 2000;
    else if (capital > 500000 && capital <= 1000000) llp_ii_fee = 4000;
    else if (capital > 1000000) llp_ii_fee = 5000;

    let llp_iii_fee = 0;
    if (capital <= 100000) llp_iii_fee = 50;
    else if (capital > 100000 && capital <= 500000) llp_iii_fee = 100;
    else if (capital > 500000 && capital <= 1000000) llp_iii_fee = 150;
    else if (capital > 1000000) llp_iii_fee = 200;

    const dsc = promoters * 2250;
    const prof = 3099 + (promoters - 2) * 999;
    const panTanFee = 131; // As per original llp.js file
    const govt = p(llp_ii_fee) + p(llp_iii_fee) + panTanFee;
    const gstOnBase = Math.round((dsc + prof) * 0.18);
    const preAddonTotal = dsc + prof + govt + gstOnBase;

    let addonProfFee = 0;
    if (calcData.addons.inc20a) addonProfFee += 1999;
    if (calcData.addons.gstReg) addonProfFee += 1499;
    if (calcData.addons.msmeReg) addonProfFee += 999;
    const gstOnAddon = Math.round(addonProfFee * 0.18);
    const orderValuePayable = preAddonTotal + addonProfFee + gstOnAddon;

    setFees({
      dsc,
      prof,
      govt,
      gstOnBase,
      preAddonTotal,
      addonProfFee,
      gstOnAddon,
      orderValuePayable,
    });
  }, [calcData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "LLP name is required.";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    else if (!/^\+?91[6-9]\d{9}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Please enter a valid Indian mobile number.";
    if (!formData.name) newErrors.name = "Your name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCalcInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCalcData((prev) => ({
        ...prev,
        addons: { ...prev.addons, [name]: checked },
      }));
    } else {
      setCalcData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleComboboxChange = (name, value) => {
    setCalcData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Registration Submitted for ${
          formData.companyName
        } with a final fee of ₹${fees.orderValuePayable?.toLocaleString(
          "en-IN"
        )}.`
      );
    }
  };

  return (
    <div>
      <SectionHeader
        title="LLP Fee Calculator & Registration"
        icon={Calculator}
      />
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-slate-50/70 p-6 md:p-8 rounded-2xl shadow-inner border border-slate-200"
      >
        <AnimatePresence mode="wait">
          {internalStep === 1 ? (
            <motion.div
              key="step1"
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 1: Basic Details
              </h3>
              <StyledCombobox
                label="Contribution Capital"
                options={[
                  { value: 100000, label: "₹ 1,00,000" },
                  { value: 500000, label: "₹ 5,00,000" },
                  { value: 1000000, label: "₹ 10,00,000" },
                  { value: 1500000, label: "₹ 15,00,000" },
                  { value: 2500000, label: "₹ 25,00,000" },
                  { value: 5000000, label: "₹ 50,00,000" },
                ]}
                value={calcData.capital}
                onChange={(value) => handleComboboxChange("capital", value)}
              />
              {/* Field added back for UI consistency */}
              <StyledCombobox
                label="State of Registration"
                options={statesOfIndia.map((s) => ({ value: s, label: s }))}
                value={calcData.state}
                onChange={(value) => handleComboboxChange("state", value)}
              />
              <StyledCombobox
                label="Number of Partners"
                options={[...Array(14)].map((_, i) => ({
                  value: i + 2,
                  label: `${i + 2}`,
                }))}
                value={calcData.noOfPromoters}
                onChange={(value) =>
                  handleComboboxChange("noOfPromoters", value)
                }
              />
              
              <div className="pt-4 flex justify-end">
                {" "}
                <button
                  type="button"
                  onClick={() => setInternalStep(2)}
                  className="px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {" "}
                  Select Add-ons{" "}
                </button>{" "}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-bold text-xl text-slate-700">
                Step 2: Fee Breakdown & Add-ons
              </h3>
              <CalcRow label="Package Total">
                {" "}
                <FeeDisplayInput value={fees.preAddonTotal} />{" "}
              </CalcRow>
              <CalcRow label="Other Services" alignTop={true}>
                <div className="w-full space-y-2">
                  <AddonCheckbox
                    name="inc20a"
                    label="INC-20A Filing"
                    price="1,999"
                    checked={calcData.addons.inc20a}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="gstReg"
                    label="GST Registration"
                    price="1,499"
                    checked={calcData.addons.gstReg}
                    onChange={handleCalcInputChange}
                  />
                  <AddonCheckbox
                    name="msmeReg"
                    label="MSME Registration"
                    price="999"
                    checked={calcData.addons.msmeReg}
                    onChange={handleCalcInputChange}
                  />
                </div>
              </CalcRow>
              <div className="border-b border-blue-200 border-dashed pt-2"></div>
              <CalcRow label="Final Payable Amount" isTotal={true}>
                {" "}
                <FeeDisplayInput
                  value={fees.orderValuePayable}
                  isTotal={true}
                />{" "}
              </CalcRow>
              <div className="mt-12 space-y-6">
                <h3 className="font-bold text-xl text-slate-700">
                  Step 3: Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                  <InputField
                    icon={Landmark}
                    name="companyName"
                    placeholder="Proposed LLP Name"
                    value={formData.companyName}
                    onChange={handleFormInputChange}
                    error={errors.companyName}
                  />
                  <InputField
                    icon={User}
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    error={errors.name}
                  />
                  <InputField
                    icon={Phone}
                    name="contactNumber"
                    placeholder="Contact Number (+91)"
                    value={formData.contactNumber}
                    onChange={handleFormInputChange}
                    error={errors.contactNumber}
                  />
                  <InputField
                    icon={Mail}
                    name="email"
                    placeholder="Your Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    error={errors.email}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setInternalStep(1)}
                  className="px-5 py-2.5 font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  {" "}
                  Back{" "}
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                >
                  {" "}
                  Complete Registration <Send size={20} />{" "}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};