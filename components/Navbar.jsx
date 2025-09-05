"use client";
import { useState, useMemo, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  ShoppingCart,
  Search,
  User,
  MessageSquare,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Check,
  CreditCard, // Icon for the new button
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "@/context/CartContext";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Fuse from "fuse.js";
import GeneratePayModal from "./GeneratePayModal"; // Import the new modal component

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/start-business",
    label: "Start Business",
    dropdownContent: [
      {
        heading: "Company Registrations",
        links: [
          {
            href: "/private-limited-company",
            label: "Private Limited Company Registration",
            keywords: [
              "pvt",
              "pvt ltd",
              "company incorporation",
              "new company",
              "sdn bhd",
            ],
          },
          {
            href: "/limited-liability-partnership",
            label: "LLP Registration",
            keywords: ["limited liability partnership", "llp new"],
          },
          {
            href: "/one-person-company",
            label: "One Person Company Registration",
            keywords: ["opc", "single person company", "solo director"],
          },
          {
            href: "/partnership-firm-registration",
            label: "Partnership Firm Registration",
            keywords: ["partner firm", "unlimited liability"],
          },
          {
            href: "/sole-proprietorship-firm",
            label: "Sole Proprietorship Firm",
            keywords: ["proprietor", "small business", "individual owned"],
          },
        ],
      },
      {
        heading: "Other Important Registrations",
        links: [
          {
            href: "/gst-registration",
            label: "GST Registration",
            keywords: ["goods and service tax", "indirect tax"],
          },
          {
            href: "/services/msme-registration",
            label: "MSME Registration",
            keywords: ["udyam", "micro small medium enterprise"],
          },
          {
            href: "/shop-act-registration",
            label: "Shop Act Registration",
            keywords: ["gumasta", "shop license"],
          },
          {
            href: "/import-export-code",
            label: "Import Export Code (IEC) Registration",
            keywords: ["iec code", "foreign trade"],
          },
          {
            href: "/trademark-registration",
            label: "Trademark Registration",
            keywords: ["brand name", "logo registration", "tm"],
          },
        ],
      },
      {
        heading: "NGO and Other Registrations",
        links: [
          {
            href: "/section-8-company",
            label: "Section 8 Company",
            keywords: ["non profit", "ngo"],
          },
          { href: "/trust-registration", label: "Trust Registration" },
          { href: "/society-registration", label: "Society Registration" },
          { href: "/80g-12a-certificate", label: "80G-12A Certificate" },
          { href: "/trust-amendment", label: "Trust Amendment" },
        ],
      },
    ],
  },
  { href: "/courses", label: "Courses", isNew: true },
  {
    href: "/income-tax-return",
    label: "File ITR",
    keywords: ["income tax", "itr filing", "tax return"],
  },
  {
    href: "/compliance",
    label: "Compliance",
    dropdownContent: [
      {
        heading: "Private Limited Company Related",
        subSections: [
          {
            heading: "Director",
            links: [
              { href: "/director-appointment", label: "Director Appointment" },
              {
                href: "/director-removal",
                label: "Director Removal / Resignation",
              },
              {
                href: "/director-din-surrender",
                label: "Director DIN Surrender",
              },
              { href: "/director-din-web-kyc", label: "Director DIN Web-KYC" },
              { href: "/director-din-kyc", label: "Director DIN KYC" },
            ],
          },
          {
            heading: "Share Capital",
            links: [
              {
                href: "/increase-auth-capital",
                label: "Increase Auth. Capital",
              },
              { href: "/share-transfer", label: "Share Transfer" },
              { href: "/share-transmission", label: "Share Transmission" },
              { href: "/share-allotment", label: "Share Allotment" },
            ],
          },
        ],
      },
      {
        heading: "LLP Related",
        subSections: [
          {
            heading: "LLP - Annual Activity",
            links: [
              { href: "/llp-annual-returns", label: "LLP Annual Returns" },
              { href: "/llp-audit", label: "LLP Audit" },
              { href: "/llp-itr-filing", label: "LLP ITR Filing" },
              { href: "/llp-balance-sheet", label: "LLP Balance Sheet + P&L" },
              { href: "/llp-dpin-kyc", label: "LLP DPIN KYC" },
            ],
          },
          {
            heading: "LLP Changes",
            links: [
              {
                href: "/object-changes-in-llp",
                label: "Object Changes In LLP",
              },
              { href: "/name-change-in-llp", label: "Name Change In LLP" },
              {
                href: "/office-shift-in-llp",
                label: "Office Shift / Change LLP",
              },
              {
                href: "/add-remove-partner-llp",
                label: "Addition / Removal Partner LLP",
              },
              {
                href: "/increase-decrease-capital-llp",
                label: "Increase / Decrease Capital LLP",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: "/calculator",
    label: "Calculator",
    dropdownContent: [
      {
        heading: "Income Tax",
        links: [
          {
            href: "/income-tax-ay-24-25",
            label: "Income for Calculator AY 24-25",
          },
          {
            href: "/income-tax-ay-23-24",
            label: "Income for Calculator AY 23-24",
          },
          { href: "/income-tax-calculator", label: "Income Tax Calculator" },
        ],
      },
      {
        heading: "Deduction / Exemption",
        links: [
          { href: "/hra-calculator", label: "HRA Calculator" },
          { href: "/rent-receipt-generator", label: "Rent Receipt Generator" },
          {
            href: "/donation-80g-calculator",
            label: "Donation 80G Calculator",
          },
        ],
      },
      {
        heading: "Public Utility Calculator",
        links: [
          {
            href: "/loan-repay-schedule-generator",
            label: "Loan Repay Schedule Generator",
          },
          { href: "/ppf-calculator", label: "PPF Calculator" },
          {
            href: "/sukanya-yojna-calculator",
            label: "Sukanya Yojna Calculator",
          },
          { href: "/sip-calculator", label: "SIP Calculator" },
        ],
      },
    ],
  },
  {
    href: "/downloads",
    label: "Downloads",
    dropdownContent: [
      {
        heading: "Forms",
        links: [
          { href: "/pan-correction-form", label: "Pan Correction Form" },
          {
            href: "/download-pan-for-transfer",
            label: "Download PAN for Transfer",
          },
          {
            href: "/documents-for-surrender-delink-pan",
            label: "Documents-for-Surrender-Delink PAN",
          },
          {
            href: "/documents-for-gst-registration",
            label: "Documents for GST-Registration",
          },
          { href: "/gift-deed", label: "Gift Deed" },
          { href: "/notice-cheque-bounce", label: "Notice Cheque Bounce" },
        ],
      },
    ],
  },
];

const consultationTopics = [
  "Company Registration",
  "Tax Planning",
  "ITR Filing",
  "Pan Adhaar Card Linking",
  "MSME Registration",
  "Tax Audit",
  "Digital Signature",
  "GST Registration",
  "All Kind of Taxation Services",
  "Other",
];

// Reusable InputField with floating label
const InputField = ({
  id,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
}) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="block w-full px-4 py-3 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors duration-300"
      placeholder=" "
    />
    <label
      htmlFor={id}
      className="absolute top-3 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
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

const TextAreaField = ({ id, placeholder, value, onChange }) => (
  <div className="relative">
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      rows="3"
      className="block w-full px-4 py-3 text-gray-800 bg-white border-2 rounded-lg appearance-none peer border-gray-200 focus:border-[#ff6100] focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300 resize-none"
      placeholder=" "
    ></textarea>
    <label
      htmlFor={id}
      className="absolute top-3 left-4 text-gray-500 duration-300 transform -translate-y-6 scale-75 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#ff6100] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {placeholder}
    </label>
  </div>
);

const ConsultancyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: "",
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form Submitted:", { ...formData, topic: selectedTopic });
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const closeModal = () => {
    setShowSuccess(false);
    setFormData({ name: "", phone: "", question: "" });
    setSelectedTopic(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-4xl transform rounded-2xl bg-white shadow-2xl transition-all overflow-hidden">
                {showSuccess ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
                    <h3 className="mt-6 text-2xl font-bold text-[#003a9b]">
                      Consultation Booked!
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Thank you. We will contact you at the provided mobile
                      number within 6 hours.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-8 bg-[#003a9b] text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-[#ff6100] hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2">
                    <div
                      className="text-white p-8 lg:p-12 flex flex-col justify-center relative bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/images/consult2.jpg')",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
                      <div className="relative z-10">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-4xl font-extrabold tracking-tight"
                        >
                          Consult with Experts
                        </motion.h3>

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "5rem" }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 my-4 rounded"
                        ></motion.div>

                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.7,
                              },
                            },
                          }}
                          className="space-y-6 text-slate-200 mt-6"
                        >
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 transition-all hover:from-orange-300 hover:to-amber-300">
                              CONTACT WITHIN 6 HOURS
                            </p>
                            <p className="text-sm">
                              We'll call you at the mobile number you provide.
                            </p>
                          </motion.div>
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 transition-all hover:from-orange-300 hover:to-amber-300">
                              CALL TIME 10:00 AM - 7:30 PM
                            </p>
                          </motion.div>
                          <motion.p
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            className="text-sm leading-relaxed"
                          >
                            Experience our tailored solutions and strategic
                            guidance. We consult on Company Registration,
                            Compliances, Income Tax, GST, & more.{" "}
                            <span className="font-bold">
                              Start Consulting with Us.
                            </span>
                          </motion.p>
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 bg-gray-50 relative">
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={24} />
                      </button>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField
                          id="name"
                          placeholder="Name*"
                          icon={User}
                          value={formData.name}
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

                        <Listbox
                          value={selectedTopic}
                          onChange={setSelectedTopic}
                        >
                          <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border-2 border-gray-200 focus:outline-none focus-visible:border-[#ff6100] focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-colors duration-300">
                              <span
                                className={`block truncate ${
                                  selectedTopic
                                    ? "text-gray-800"
                                    : "text-gray-500"
                                }`}
                              >
                                {selectedTopic
                                  ? selectedTopic
                                  : "Consultation for*"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <ChevronDown
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                                {consultationTopics.map((topic, topicIdx) => (
                                  <Listbox.Option
                                    key={topicIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-orange-100 text-[#ff6100]"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={topic}
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
                                          {topic}
                                        </span>
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

                        <TextAreaField
                          id="question"
                          placeholder="Write your question here*"
                          value={formData.question}
                          onChange={handleInputChange}
                        />

                        <p className="text-xs text-center text-gray-500 pt-1">
                          *Your Information is safe with us.
                        </p>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg focus:outline-none disabled:opacity-70"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.4)",
                            background:
                              "linear-gradient(to right, #ff6e00, #fe9800)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Pay ₹599 & Book Consultation"
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { cartItems } = useCart();
  const cartItemCount = cartItems ? cartItems.length : 0;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const rightAlignedMenus = ["Calculator", "Downloads", "Blogs"];
  const centeredMenus = ["Compliance"];

  const [isConsultancyOpen, setIsConsultancyOpen] = useState(false);

  // --- NEW STATE FOR GENERATE PAY MODAL ---
  const [isGeneratePayOpen, setIsGeneratePayOpen] = useState(false);

  const allLinks = useMemo(() => {
    const links = [];
    const extractLinks = (items) => {
      if (!items) return;
      for (const item of items) {
        if (item.href && item.label) {
          links.push({ ...item, keywords: item.keywords || [] });
        }
        if (item.dropdownContent) {
          item.dropdownContent.forEach((col) => {
            if (col.links) extractLinks(col.links);
            if (col.subSections) {
              col.subSections.forEach((sub) => extractLinks(sub.links));
            }
          });
        }
      }
    };
    extractLinks(navLinks);
    return links;
  }, []);

  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: "label", weight: 0.7 },
        { name: "keywords", weight: 0.3 },
      ],
      includeScore: true,
      minMatchCharLength: 1,
      threshold: 0.3,
    };
    return new Fuse(allLinks, options);
  }, [allLinks]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLinks([]);
      return;
    }
    const results = fuse.search(searchTerm);
    const finalResults = results.map((result) => result.item);
    setFilteredLinks(finalResults);
  }, [searchTerm, fuse]);

  function openSearch() {
    setIsSearchOpen(true);
  }
  function closeSearch() {
    setIsSearchOpen(false);
  }

  function handleMobileLinkClick() {
    setIsOpen(false);
    setSearchTerm("");
  }

  const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null);

  return (
    <>
      <header
        className="sticky top-0 z-40 shadow-md bg-white"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container mx-auto px-4">
          {/* --- Desktop Navbar --- */}
          <div className="hidden lg:flex justify-between 2xl:justify-around items-center py-2">
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/company_logo.jpg"
                alt="LetsMakeCompany Logo"
                className="h-12"
              />
            </Link>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-sm mb-2">
                <div className="flex items-center gap-4 text-gray-800 font-semibold">
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="text-green-500 text-[1.3rem]"
                  />
                  <span>
                    <a
                      href="https://api.whatsapp.com/send?phone=918448820207"
                      target="_blank"
                    >
                      84488 20207
                    </a>
                  </span>

                  <Phone size={16} className="text-green-500" />
                  <span>
                    <a
                      href="https://api.whatsapp.com/send?phone=918588808411"
                      target="_blank"
                    >
                      85888 08411
                    </a>
                  </span>

                  <Phone size={16} className="text-green-500" />
                  <span>
                    <a
                      href="https://api.whatsapp.com/send?phone=919990225685"
                      target="_blank"
                    >
                      99902 25685
                    </a>
                  </span>
                </div>
                <Link
                  href="/courses/cart"
                  className="relative p-2 text-gray-600 hover:text-blue-600 ml-4"
                  aria-label="View shopping cart"
                >
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* --- NEW GENERATE PAY BUTTON --- */}
                <motion.button
                  onClick={() => setIsGeneratePayOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-md text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <CreditCard size={14} />
                  Generate Pay
                </motion.button>

                <button
                  onClick={() => setIsConsultancyOpen(true)}
                  className="ml-2 bg-[#003a9b] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#ff6100] hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Book Consultancy
                </button>
              </div>
              <hr className="w-full border-gray-200" />
              <div className="flex justify-end pt-2 min-h-[40px]">
                <nav className="flex items-center space-x-8">
                  {navLinks.map((link) => {
                    let positionClass = "left-0";
                    if (rightAlignedMenus.includes(link.label))
                      positionClass = "right-0";
                    else if (centeredMenus.includes(link.label))
                      positionClass = "left-1/2 -translate-x-1/2";

                    return (
                      <div
                        key={link.label}
                        onMouseEnter={() => setOpenMenu(link.label)}
                        className="relative"
                      >
                        {link.dropdownContent ? (
                          <button className="text-gray-600 font-semibold transition-colors uppercase text-sm flex items-center py-2 cursor-default relative duration-300 hover:text-[#003a9b] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#ff6100] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                            {link.label}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`ml-1 transition-transform duration-300 ${
                                openMenu === link.label ? "rotate-180" : ""
                              }`}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-gray-600 font-semibold transition-colors uppercase text-sm flex items-center py-2 relative duration-300 hover:text-[#003a9b] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#ff6100] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                          >
                            {link.label}
                          </Link>
                        )}
                        {openMenu === link.label && link.dropdownContent && (
                          <div
                            className={`absolute top-full ${positionClass} mt-2 w-max bg-white shadow-2xl rounded-lg border border-gray-200 p-6 max-h-[calc(100vh-150px)] overflow-y-auto`}
                          >
                            <div
                              className={`grid gap-x-12 gap-y-6 grid-cols-${link.dropdownContent.length}`}
                            >
                              {link.dropdownContent.map((column) => (
                                <div key={column.heading}>
                                  <h3 className="font-bold text-md text-blue-900 border-b-2 border-blue-200 pb-2 mb-3">
                                    {column.heading}
                                  </h3>
                                  {column.links && (
                                    <ul className="space-y-2">
                                      {column.links.map((subLink) => (
                                        <li key={subLink.label}>
                                          <Link
                                            href={subLink.href}
                                            className="text-sm text-gray-600 hover:text-blue-800 block transition-transform duration-200 hover:scale-105 origin-left"
                                          >
                                            {subLink.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {column.subSections && (
                                    <div className="space-y-4">
                                      {column.subSections.map((subSection) => (
                                        <div key={subSection.heading}>
                                          <h4 className="font-semibold text-sm text-gray-800 mb-2">
                                            {subSection.heading}
                                          </h4>
                                          <ul className="space-y-2 pl-2">
                                            {subSection.links.map(
                                              (subLink) => (
                                                <li key={subLink.label}>
                                                  <Link
                                                    href={subLink.href}
                                                    className="text-sm text-gray-600 hover:text-blue-800 block transition-transform duration-200 hover:scale-105 origin-left"
                                                  >
                                                    {subLink.label}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <button
                    onClick={openSearch}
                    className="text-gray-600 hover:text-blue-800"
                    aria-label="Open search "
                  >
                    <Search size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* --- Mobile Header --- */}
          <div className="lg:hidden flex items-center justify-between h-18">
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/company_logo.jpg"
                alt="LetsMakeCompany Logo"
                className="h-10"
              />
            </Link>
            <div className="flex items-center gap-1">
              {/* --- NEW GENERATE PAY BUTTON FOR MOBILE --- */}
              <button
                onClick={() => setIsGeneratePayOpen(true)}
                className="bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-bold"
              >
                Pay
              </button>
              <button
                onClick={() => setIsConsultancyOpen(true)}
                className="bg-[#003a9b] text-white px-3 py-1.5 rounded-md text-xs font-bold"
              >
                Book
              </button>
              <Link
                href="/courses/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600"
                aria-label="View shopping cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-700"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Book Consultancy Modal --- */}
      <ConsultancyModal
        isOpen={isConsultancyOpen}
        onClose={() => setIsConsultancyOpen(false)}
      />

      {/* --- NEW: Render the Generate Pay Modal --- */}
      <GeneratePayModal
        isOpen={isGeneratePayOpen}
        onClose={() => setIsGeneratePayOpen(false)}
      />

      {/* --- Desktop Search Modal (no longer used on mobile) --- */}
      <Transition appear show={isSearchOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeSearch}
          initialFocus={searchInputRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-xs" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-100 py-3 pl-10 pr-12 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                      placeholder="Search for any service"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                      <button
                        onClick={closeSearch}
                        className="p-1.5 text-gray-500 hover:text-gray-800"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {filteredLinks.length > 0 && (
                    <div className="mt-2 max-h-80 overflow-y-auto">
                      <ul className="py-1">
                        {filteredLinks.map((link) => (
                          <li key={`${link.href}-${link.label}`}>
                            <Link
                              href={link.href}
                              onClick={closeSearch}
                              className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-800"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* --- Mobile Menu Panel (with integrated search) --- */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex items-center justify-between px-4 py-4 shadow-sm">
                        <Dialog.Title className="text-lg font-semibold text-blue-900">
                          Menu
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md p-2 text-gray-600 hover:text-gray-900"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* --- Search Bar Inside Mobile Menu --- */}
                      <div className="border-b border-gray-200 p-4">
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Search for services..."
                          />
                        </div>
                      </div>

                      <div className="relative flex-1">
                        {/* --- Search Results --- */}
                        {searchTerm && (
                          <div className="absolute w-full bg-white z-10 max-h-60 overflow-y-auto border-b">
                            {filteredLinks.length > 0 ? (
                              <ul>
                                {filteredLinks.map((link) => (
                                  <li key={`${link.href}-${link.label}`}>
                                    <Link
                                      href={link.href}
                                      onClick={handleMobileLinkClick}
                                      className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="p-4 text-sm text-gray-500">
                                No services found.
                              </p>
                            )}
                          </div>
                        )}

                        {/* --- Main Menu Links --- */}
                        <nav className="flex flex-col space-y-1 p-4">
                          {navLinks.map((link) => (
                            <div key={link.label}>
                              {link.dropdownContent ? (
                                <div>
                                  <button
                                    onClick={() =>
                                      setOpenMobileSubMenu(
                                        openMobileSubMenu === link.label
                                          ? null
                                          : link.label
                                      )
                                    }
                                    className="w-full flex justify-between items-center py-2 px-3 rounded-md text-base font-semibold text-gray-700 hover:bg-gray-100"
                                  >
                                    <span>{link.label}</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className={`transition-transform duration-300 ${
                                        openMobileSubMenu === link.label
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    >
                                      <path d="m6 9 6 6 6-6" />
                                    </svg>
                                  </button>
                                  {openMobileSubMenu === link.label && (
                                    <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-200 ml-3">
                                      {link.dropdownContent.map((col) => (
                                        <div key={col.heading} className="py-1">
                                          <h4 className="font-bold text-sm text-blue-800 mt-2 px-3">
                                            {col.heading}
                                          </h4>
                                          {col.links &&
                                            col.links.map((subLink) => (
                                              <Link
                                                key={subLink.href}
                                                href={subLink.href}
                                                onClick={handleMobileLinkClick}
                                                className="block py-2 px-3 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                                              >
                                                {subLink.label}
                                              </Link>
                                            ))}
                                          {col.subSections &&
                                            col.subSections.map(
                                              (subSection) => (
                                                <div
                                                  key={subSection.heading}
                                                  className="pl-2"
                                                >
                                                  <h5 className="font-semibold text-sm text-gray-800 mt-2 px-3">
                                                    {subSection.heading}
                                                  </h5>
                                                  {subSection.links.map(
                                                    (subLink) => (
                                                      <Link
                                                        key={subLink.href}
                                                        href={subLink.href}
                                                        onClick={
                                                          handleMobileLinkClick
                                                        }
                                                        className="block py-2 px-3 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                                                      >
                                                        {subLink.label}
                                                      </Link>
                                                    )
                                                  )}
                                                </div>
                                              )
                                            )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  href={link.href}
                                  onClick={handleMobileLinkClick}
                                  className="block py-2 px-3 rounded-md text-base font-semibold text-gray-700 hover:bg-gray-100"
                                >
                                  {link.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;