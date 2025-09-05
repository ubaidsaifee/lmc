"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
    { question: "What is Udyam Registration?", answer: "Udyam Registration is the new, simplified process for registering a Micro, Small, or Medium Enterprise (MSME). It provides a permanent registration number and an official certificate, recognizing the business as an MSME." },
    { question: "Is Udyam Registration mandatory?", answer: "While not mandatory for all businesses, it's highly recommended. Without it, you cannot access government schemes, subsidies, collateral-free loans, or other benefits designed specifically for MSMEs." },
    { question: "What documents are required for registration?", answer: "The process is designed to be simple. The primary document needed is the proprietor's or director's Aadhar card. Additionally, you'll need the business PAN card and bank account details. Our experts guide you through the minimal requirements." },
    { question: "How long does the registration process take?", answer: "With our expert assistance, the process is expedited. Once we have your complete details, we typically secure your Udyam Registration Certificate and number within 1-2 working days." },
    { question: "Can a service-based business register as an MSME?", answer: "Absolutely. The MSME classification covers both manufacturing and service-based enterprises. As long as your investment and turnover are within the prescribed limits, you are eligible." },
    { question: "What is the validity of the Udyam certificate?", answer: "The Udyam Registration Certificate has lifetime validity and does not require any renewal. You only need to update the information online if there are significant changes to your business." },
    { question: "Are there any government fees for MSME registration?", answer: "The government portal itself does not charge any fees. Our professional fee covers expert consultation, accurate application filing, timely processing, and dedicated support to ensure your registration is successful without any errors." },
    { question: "What's the difference between MSME and Udyam?", answer: "'MSME' is the sector (Micro, Small, and Medium Enterprises), while 'Udyam' is the name of the official registration portal and certificate. It replaced the older Udyog Aadhar registration." },
    { question: "Can I get a business loan more easily with this certificate?", answer: "Yes. Banks and financial institutions often prioritize loan applications from businesses with a valid Udyam certificate and offer special, MSME-specific loan schemes with better terms." },
    { question: "My business is in Delhi. Are there any local benefits?", answer: "While most benefits are central, states like Delhi may offer additional schemes for local MSMEs, such as subsidies on electricity, support for participating in trade fairs, and industrial promotion subsidies. Your Udyam certificate is the key to accessing these." }
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <Minus className="h-6 w-6 text-indigo-600" /> : <Plus className="h-6 w-6 text-gray-500" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-gray-600 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
                <AccordionItem 
                    key={index} 
                    item={item} 
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
}