// components/InquiryForm.jsx
"use client";

import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { User, Mail, Phone, ChevronDown, Check } from "lucide-react";

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
].sort();

/**
 * Reusable input field with a floating label, inspired by the reference code.
 */
const InputField = ({ id, type = "text", placeholder, icon: Icon, value, onChange }) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="block w-full px-4 py-2.5 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-[#ff6100] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300"
      placeholder=" " // Required for the floating label to work
    />
    <label
      htmlFor={id}
      className="absolute top-2.5 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2.5 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {placeholder}
    </label>
    {Icon && (
      <Icon
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
        size={20}
      />
    )}
  </div>
);

/**
 * Main InquiryForm component, designed to be embedded on a page.
 */
export default function InquiryForm() {
  const [selectedState, setSelectedState] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const submissionData = { ...formData, state: selectedState || "" };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
        setSelectedState(null);
      } else {
        throw new Error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Resets the form to allow another submission from the success screen
  const resetForm = () => setSubmitStatus(null);

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
      {submitStatus === "success" ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-8 min-h-[320px]">
          <Check size={50} className="text-green-500" />
          <h3 className="text-xl font-bold text-slate-800 mt-4">Thank You!</h3>
          <p className="text-slate-600 mt-2">
            Your inquiry has been submitted successfully. We'll be in touch shortly.
          </p>
          <button
            onClick={resetForm}
            className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="name"
            placeholder="Name*"
            icon={User}
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            id="email"
            type="email"
            placeholder="Email*"
            icon={Mail}
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            id="phone"
            type="tel"
            placeholder="Phone*"
            icon={Phone}
            value={formData.phone}
            onChange={handleInputChange}
          />
          
          <Listbox value={selectedState} onChange={setSelectedState}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2.5 pl-4 pr-10 text-left border-2 border-gray-200 focus:outline-none focus-visible:border-[#ff6100] focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-colors duration-300">
                <span className={`block truncate ${selectedState ? "text-gray-800" : "text-gray-500"}`}>
                  {selectedState ? selectedState : "- Select State -"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  {statesOfIndia.map((state, stateIdx) => (
                    <Listbox.Option
                      key={stateIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-orange-100 text-[#ff6100]" : "text-gray-900"
                        }`
                      }
                      value={state}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium text-[#ff6100]" : "font-normal"}`}>
                            {state}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#ff6100]">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="2"
              className="block w-full px-4 py-2.5 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-[#ff6100] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300 resize-none"
              placeholder=" "
            ></textarea>
            <label
              htmlFor="message"
              className="absolute top-2.5 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:top-2.5 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Message*
            </label>
          </div>

          {submitStatus === "error" && (
            <p className="text-sm text-red-600 text-center">
              Sorry, something went wrong. Please try again.
            </p>
          )}

          <p className="text-xs text-center text-gray-500 pt-1">
            *Your Information is safe with us |{" "}
            <a href="/privacy-policy" className="text-[#003a9b] hover:underline">
              Privacy Policy
            </a>
          </p>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#ff6100] to-orange-500 px-6 py-2 text-base font-bold text-white shadow-lg focus:outline-none disabled:opacity-70"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(255, 97, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {isSubmitting ? "Submitting..." : "Request Call Back"}
          </motion.button>
        </form>
      )}
    </div>
  );
}
  