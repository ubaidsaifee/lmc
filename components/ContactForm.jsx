// This directive indicates that this is a client-side component in Next.js.
// It allows the use of React hooks like useState, useEffect, etc.
"use client";

// Import necessary hooks and components from React.
// useState: for managing component state.
// Fragment: for grouping elements without adding extra nodes to the DOM.
// useRef: for creating mutable references to DOM elements.
// useEffect: for handling side effects (not used here but often is with useRef).
import { useState, Fragment, useRef } from "react";

// Import UI components from Headless UI for creating accessible UI patterns.
// Dialog: for building accessible modal dialogs.
// Transition: for managing enter/leave animations.
// Listbox: for creating accessible select/dropdown menus.
import { Dialog, Transition, Listbox } from "@headlessui/react";

// Import 'motion' from Framer Motion for animations.
import { motion } from "framer-motion";

// Import icons from the 'lucide-react' library.
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  ChevronDown,
  MapPin,
  X,
  Check,
} from "lucide-react";

/**
 * An array of Indian states and union territories, sorted alphabetically.
 * This is used to populate the dropdown menu in the form.
 */
const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
].sort();

/**
 * The main ContactForm component. It includes a floating button that opens a modal
 * containing the contact form.
 */
export default function ContactForm() {
  /**
   * A reusable input field component with a floating label effect and an optional icon.
   * @param {object} props - The component props.
   * @param {string} props.id - The id and name for the input element.
   * @param {string} [props.type="text"] - The type of the input (e.g., "text", "email").
   * @param {string} props.placeholder - The placeholder text which acts as the label.
   * @param {React.ElementType} props.icon - The icon component to display.
   * @param {string} props.value - The current value of the input.
   * @param {Function} props.onChange - The function to call when the input value changes.
   * @param {React.RefObject} props.fieldRef - A ref to attach to the input element.
   */
  const InputField = ({
    id,
    type = "text",
    placeholder,
    icon: Icon,
    value,
    onChange,
    fieldRef,
  }) => (
    // The relative container is necessary for absolute positioning of the label and icon.
    <div className="relative">
      <input
        ref={fieldRef}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required // Makes the field mandatory for form submission.
        // Tailwind CSS classes for styling.
        // The `peer` class is used to style the label based on the input's state (focus, placeholder-shown).
        className="block w-full px-4 py-3 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-[#ff6100] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300"
        placeholder=" " // A space placeholder is needed for the floating label effect to work correctly.
      />
      <label
        htmlFor={id}
        // These classes create the floating label effect.
        // When the placeholder is shown (input is empty and not focused), the label is centered.
        // When the input is focused or has a value, the label moves up and shrinks.
        className="absolute top-3 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {placeholder}
      </label>
      {/* Conditionally render the icon if it's provided */}
      {Icon && (
        <Icon
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
          size={20}
        />
      )}
    </div>
  );

  // State to control the visibility of the modal dialog.
  const [isOpen, setIsOpen] = useState(false);
  // State to store the selected state from the dropdown.
  const [selectedState, setSelectedState] = useState(null);
  // State to hold all form field values in a single object.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // State to track if the form is currently being submitted.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to track the result of the submission ('success', 'error', or null).
  const [submitStatus, setSubmitStatus] = useState(null);

  // A ref to the name input element to programmatically focus it when the modal opens.
  const nameInputRef = useRef(null);

  // Handles changes for all text-based input fields.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Updates the formData state immutably.
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Closes the modal and resets the submission status after a short delay.
  function closeModal() {
    setIsOpen(false);
    // Delay resetting status to allow the closing animation to finish.
    setTimeout(() => setSubmitStatus(null), 300);
  }

  // Opens the modal and focuses the name input field.
  function openModal() {
    setIsOpen(true);
    // Use a timeout to ensure the input is rendered and visible before focusing.
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  }

  // Handles the form submission process.
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior.
    setIsSubmitting(true); // Disable the submit button and show loading state.
    setSubmitStatus(null); // Reset previous submission status.

    // Combine form data with the selected state.
    const submissionData = { ...formData, state: selectedState || "" };

    try {
      // Send a POST request to the API endpoint.
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      // Check if the request was successful.
      if (response.ok) {
        setSubmitStatus("success"); // Set status to show the success message.
        // Reset the form fields.
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSelectedState(null);
      } else {
        // If the server returns an error, throw an error to be caught by the catch block.
        throw new Error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error"); // Set status to show an error message.
    } finally {
      setIsSubmitting(false); // Re-enable the submit button.
    }
  }

  return (
    // Use a React Fragment to return multiple root elements.
    <>
      {/* This is the floating action button (FAB) to open the contact form modal. */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={openModal}
          className="bg-[#003a9b] text-white font-bold py-4 px-6 rounded-full shadow-2xl flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          // Framer Motion animations for hover and tap events.
          whileHover={{ scale: 1.1, backgroundColor: "#ff6100", rotate: -5 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Send size={22} />
          {/* Hide the text on small screens */}
          <span className="hidden sm:inline">Contact Us</span>
        </motion.button>
      </div>

      {/* Headless UI Transition component for modal animations. */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* This child handles the background overlay animation. */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* The semi-transparent background overlay with a blur effect. */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* This child handles the modal panel's animation (scale and fade). */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                {/* The main modal content panel. */}
                <Dialog.Panel className="w-full max-w-4xl transform rounded-2xl bg-white shadow-2xl transition-all overflow-hidden">
                  {/* A two-column layout for larger screens. */}
                  <div className="grid lg:grid-cols-2">
                    {/* Left column: Contact information and branding. */}
                    <div
                      className="text-white p-8 lg:p-12 flex flex-col justify-center relative bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')",
                      }}
                    >
                      {/* Dark overlay for better text readability on the background image. */}
                      <div className="absolute inset-0 bg-black/60"></div>
                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold">Get in Touch</h3>
                        <p className="mt-4 text-slate-200">
                          Have a question or a project in mind? Fill out the
                          form, and we'll get back to you promptly.
                        </p>
                        {/* Static contact details. */}
                        <div className="mt-8 space-y-6">
                          <div className="flex items-center gap-4">
                            <Phone size={20} className="text-[#ff6100]" />
                            <span>
                              <a
                                href="https://api.whatsapp.com/send?phone=918448820207"
                                target="_blank"
                              >
                                +91 84488 20207
                              </a>
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Mail size={20} className="text-[#ff6100]" />
                            <span>
                              <a href="mailto:incometaxwala11@gmail.com">
                                incometaxwala11@gmail.com
                              </a>
                            </span>
                          </div>
                          <div className="flex items-start gap-4">
                            <MapPin
                              size={20}
                              className="text-[#ff6100] mt-1 flex-shrink-0"
                            />
                            <span>
                              <a
                                href="https://maps.app.goo.gl/jBc6yjhAsq4LWsx26"
                                target="_blank"
                              >
                                487/41, 2nd Floor, Peeragarhi, New Delhi-110087
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column: The contact form itself. */}
                    <div className="p-8 lg:p-12 bg-gray-50 relative">
                      {/* Close button for the modal. */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={24} />
                      </button>

                      {/* Conditional rendering: Show success message or the form. */}
                      {submitStatus === "success" ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Check size={60} className="text-green-500" />
                          <h3 className="text-2xl font-bold text-slate-800 mt-4">
                            Thank You!
                          </h3>
                          <p className="text-slate-600 mt-2">
                            Your inquiry has been submitted successfully. We
                            will get back to you shortly.
                          </p>
                          <button
                            onClick={closeModal}
                            className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg"
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        // The form element.
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* Reusable InputField components for form fields. */}
                          <InputField
                            fieldRef={nameInputRef} // Attach the ref to the name input.
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
                          {/* Headless UI Listbox for the state dropdown. */}
                          <Listbox
                            value={selectedState}
                            onChange={setSelectedState}
                          >
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border-2 border-gray-200 focus:outline-none focus-visible:border-[#ff6100] focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-colors duration-300">
                                <span
                                  className={`block truncate ${
                                    selectedState
                                      ? "text-gray-800"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {selectedState
                                    ? selectedState
                                    : "- Select State -"}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                  <ChevronDown
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              {/* Transition for the dropdown options. */}
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                                  {/* Map over the statesOfIndia array to create options. */}
                                  {statesOfIndia.map((state, stateIdx) => (
                                    <Listbox.Option
                                      key={stateIdx}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? "bg-orange-100 text-[#ff6100]"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={state}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? "font-medium text-[#ff6100]"
                                                : "font-normal"
                                            }`}
                                          >
                                            {state}
                                          </span>
                                          {/* Show a check icon next to the selected option. */}
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#ff6100]">
                                              <Check
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
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
                          {/* Textarea for the message, with a similar floating label effect. */}
                          <div className="relative">
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="3"
                              className="block w-full px-4 py-3 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-[#ff6100] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300 resize-none"
                              placeholder=" "
                            ></textarea>
                            <label
                              htmlFor="message"
                              className="absolute top-3 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Message*
                            </label>
                          </div>

                          {/* Display an error message if the submission fails. */}
                          {submitStatus === "error" && (
                            <p className="text-sm text-red-600 text-center">
                              Sorry, something went wrong. Please try again.
                            </p>
                          )}

                          {/* Privacy policy disclaimer and link. */}
                          <p className="text-xs text-center text-gray-500 pt-1">
                            *Your Information is safe with us |{" "}
                            <a
                              href="/privacy-policy"
                              className="text-[#003a9b] hover:underline"
                            >
                              Privacy Policy
                            </a>
                          </p>

                          {/* Animated submit button. */}
                          <motion.button
                            type="submit"
                            disabled={isSubmitting} // Disable button while submitting.
                            className="w-full inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#ff6100] to-orange-500 px-6 py-2.5 text-base font-bold text-white shadow-lg focus:outline-none disabled:opacity-70"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0px 10px 20px rgba(255, 97, 0, 0.4)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Change button text based on submission state. */}
                            {isSubmitting
                              ? "Submitting..."
                              : "Request Call Back"}
                          </motion.button>
                        </form>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
