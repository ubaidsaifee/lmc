// File: src/components/GeneratePayModal.jsx

"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { User, Phone, IndianRupee, X, CheckCircle, Copy, ClipboardCheck } from "lucide-react";

const InputField = ({ id, type = "text", placeholder, icon: Icon, value, onChange, pattern }) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      pattern={pattern}
      className="block w-full px-4 py-3 pl-12 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors duration-300"
      placeholder=" "
    />
    <label
      htmlFor={id}
      className="absolute top-3 left-12 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {placeholder}
    </label>
    {Icon && <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />}
  </div>
);

const GeneratePayModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", amount: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const resetForm = () => {
    setFormData({ name: "", phone: "", amount: "" });
    setGeneratedLink(null);
    setError(null);
  };
  
  const closeModal = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      
      setGeneratedLink(result.paymentLink);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child as={Fragment} {...dialogAnimations.backdrop}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} {...dialogAnimations.panel}>
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all overflow-hidden">
                <div className="relative text-white p-8 bg-cover bg-center" style={{ backgroundImage: "url('/images/payment-bg.svg')" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/90"></div>
                  <div className="relative z-10">
                    <motion.h3 {...motionAnimations.title} className="text-3xl font-extrabold tracking-tight">
                      Generate Payment Link
                    </motion.h3>
                    <motion.p {...motionAnimations.subtitle} className="mt-2 text-blue-200">
                      Create a secure Razorpay link for easy online payments. Perfect for invoices, services, and fees.
                    </motion.p>
                  </div>
                  <button onClick={closeModal} className="absolute top-4 right-4 text-white/70 hover:text-white transition z-20">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8 bg-gray-50">
                  {!generatedLink ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <InputField id="name" placeholder="Customer Name*" icon={User} value={formData.name} onChange={handleInputChange} />
                      <InputField id="phone" type="tel" placeholder="Customer Phone*" icon={Phone} value={formData.phone} onChange={handleInputChange} pattern="[0-9]{10}" />
                      <InputField id="amount" type="number" placeholder="Amount (INR)*" icon={IndianRupee} value={formData.amount} onChange={handleInputChange} />
                      {error && <p className="text-sm text-center text-red-500">{error}</p>}
                      <motion.button type="submit" disabled={isSubmitting} {...motionAnimations.button}
                        className="w-full flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg focus:outline-none disabled:opacity-70">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                          </>
                        ) : "Generate Secure Link"}
                      </motion.button>
                    </form>
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <CheckCircle className="w-16 h-16 text-green-500" />
                      <h3 className="mt-4 text-xl font-bold text-[#003a9b]">Link Generated!</h3>
                      <p className="mt-2 text-gray-600">Share this secure link with your customer for payment.</p>
                      <div className="relative w-full mt-4">
                        <input type="text" readOnly value={generatedLink}
                          className="w-full text-center bg-gray-100 border-2 border-gray-200 rounded-lg p-3 pr-12 text-sm"
                        />
                        <button onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 rounded-md transition">
                          {isCopied ? <ClipboardCheck size={20} className="text-green-500"/> : <Copy size={20} />}
                        </button>
                      </div>
                      <button onClick={resetForm} className="mt-6 text-sm font-semibold text-blue-600 hover:underline">
                        Create another link
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Animation settings
const dialogAnimations = {
  backdrop: { enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
  panel: { enter: "ease-out duration-300", enterFrom: "opacity-0 scale-90", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-90" },
};

const motionAnimations = {
  title: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } },
  subtitle: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } },
  button: { whileHover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.4)", background: "linear-gradient(to right, #ff6e00, #fe9800)" }, whileTap: { scale: 0.98 }, transition: { duration: 0.2 } },
};

export default GeneratePayModal;