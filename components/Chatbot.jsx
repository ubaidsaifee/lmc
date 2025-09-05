// components/Chatbot.jsx
"use client";

import { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Bot,
  User,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Expanded and Nested Q&A Structure (remains the same)
const knowledgeBase = {
  "Pvt Ltd Company Registration": {
    icon: "🏢",
    questions: [
      {
        q: "What is a Pvt Ltd Company?",
        a: "A Private Limited Company is a popular business structure for startups. It's a separate legal entity, meaning the owners' personal assets are protected from business debts. It requires a minimum of 2 directors and 2 shareholders.",
      },
      {
        q: "What are the minimum requirements?",
        a: "You need at least two directors (one must be a resident of India), two shareholders, a unique company name, and a registered office address in India.",
      },
      {
        q: "What documents are needed?",
        a: "Commonly required documents include PAN cards, identity proofs (like Aadhaar or Voter ID), and address proofs for all directors and shareholders, plus proof of the registered office address (like a utility bill).",
      },
      {
        q: "What are the benefits?",
        a: "Key benefits include limited liability protection, easier access to funding from investors, separate legal status, and enhanced credibility in the market.",
      },
      {
        q: "How long does the process take?",
        a: "The entire registration process, from name approval to receiving the Certificate of Incorporation, typically takes about 10-15 working days.",
      },
    ],
  },
  "LLP Registration": {
    icon: "🤝",
    questions: [
      {
        q: "What is an LLP?",
        a: "An LLP (Limited Liability Partnership) is a business structure that combines the flexibility of a partnership with the limited liability of a company. It's ideal for professional firms like lawyers or consultants.",
      },
      {
        q: "How is it different from a Pvt Ltd?",
        a: "LLPs have lower compliance requirements and are easier to manage than Pvt Ltd companies. However, Pvt Ltd companies are often preferred for raising equity funding from investors.",
      },
      {
        q: "What are the partner requirements?",
        a: "An LLP needs a minimum of two partners, with at least one designated partner who must be a resident of India.",
      },
      {
        q: "Is an audit mandatory for an LLP?",
        a: "An audit is only required if the LLP's turnover exceeds ₹40 lakhs or its capital contribution exceeds ₹25 lakhs in a financial year.",
      },
      {
        q: "What are the main advantages?",
        a: "The main advantages are limited liability for partners, lower compliance costs, no requirement for minimum capital contribution, and a separate legal identity.",
      },
    ],
  },
  "OPC Registration": {
    icon: "👤",
    questions: [
      {
        q: "What is an OPC?",
        a: "An One Person Company (OPC) allows a single individual to form a company with limited liability. It's a perfect structure for solo entrepreneurs who want corporate status.",
      },
      {
        q: "Who can start an OPC?",
        a: "Only a natural person who is an Indian citizen and resident in India can form an OPC. One person can form only one OPC.",
      },
      {
        q: "What is a Nominee Director?",
        a: "An OPC must appoint a nominee director who will take over the company in case of the sole director's death or incapacitation. The nominee's consent is required.",
      },
      {
        q: "Are there any limitations?",
        a: "Yes, an OPC cannot engage in Non-Banking Financial Investment activities. Also, if its paid-up capital exceeds ₹50 lakhs or turnover exceeds ₹2 crores, it must convert to a Private Limited Company.",
      },
      {
        q: "Why choose an OPC?",
        a: "Choose an OPC for limited liability, a separate legal entity, complete control, and easier compliance compared to a Private Limited Company.",
      },
    ],
  },
  "Post Incorporation Compliance": {
    icon: "📋",
    questions: [
      {
        q: "What are mandatory compliances?",
        a: "After registration, a company must appoint its first auditor within 30 days, hold its first board meeting, and file for commencement of business. Annually, it must file forms like AOC-4 (Financials) and MGT-7 (Annual Return).",
      },
      {
        q: "What is DIN KYC?",
        a: "Every individual who holds a Director Identification Number (DIN) must file a form called DIR-3 KYC every year to update their details with the Ministry of Corporate Affairs (MCA).",
      },
      {
        q: "What happens if I don't comply?",
        a: "Non-compliance can lead to heavy penalties for the company and its directors, and the company may be marked as 'strike-off' by the MCA, which means it can no longer operate legally.",
      },
      {
        q: "Do I need to hold meetings?",
        a: "Yes, a Private Limited Company is required to hold at least four board meetings in a calendar year, with a gap of not more than 120 days between two consecutive meetings.",
      },
      {
        q: "How can you help with compliance?",
        a: "We offer comprehensive annual compliance packages where our experts manage all your filings, maintain records, and ensure you meet all legal deadlines, keeping your company compliant and penalty-free.",
      },
    ],
  },
  "Trust & NGO Registration": {
    icon: "❤️",
    questions: [
      {
        q: "What is a Trust?",
        a: "A Trust is a legal arrangement where a 'settlor' transfers property to a 'trustee' to manage for the benefit of a 'beneficiary'. It's commonly used for charitable purposes (NGOs).",
      },
      {
        q: "What is 12A Registration?",
        a: "Section 12A registration is a one-time registration obtained from the Income Tax Department that exempts a Trust or NGO's income from taxation.",
      },
      {
        q: "What is 80G Registration?",
        a: "Section 80G registration allows donors who contribute to your Trust or NGO to claim a tax deduction on their donation. This is a powerful incentive for attracting funds.",
      },
      {
        q: "Are both 12A and 80G needed?",
        a: "Yes. 12A benefits the organization by making its income tax-free, while 80G benefits the donors by giving them tax deductions. Having both is essential for a non-profit.",
      },
      {
        q: "What documents are required?",
        a: "Key documents include the Trust Deed, PAN card of the Trust, and identity/address proofs of the trustees. We can guide you through the entire documentation process.",
      },
    ],
  },
};

const attentionMessages = ["Need help?", "Ask me anything!", "Chat with us!"];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I'm here to help. Please select a topic you're interested in.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatboxRef = useRef(null);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  const [view, setView] = useState("topics");
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let bubbleTimer;
    if (!isOpen) {
      bubbleTimer = setInterval(() => {
        setShowBubble(true);
        setTimeout(() => {
          setShowBubble(false);
          setTimeout(() => {
            setBubbleIndex((prev) => (prev + 1) % attentionMessages.length);
          }, 500);
        }, 4000);
      }, 8000);
    } else {
      setShowBubble(false);
    }
    return () => clearInterval(bubbleTimer);
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
    setShowBubble(false);
  }

  const handleTopicSelect = (topicKey) => {
    setSelectedTopic(topicKey);
    setView("questions");
  };

  const handleQuestionSelect = (qnaItem) => {
    setMessages((prev) => [...prev, { from: "user", text: qnaItem.q }]);
    setIsTyping(true);
    setView("chat");

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: qnaItem.a }]);
      setIsTyping(false);
    }, 1200);
  };

  const backToTopics = () => {
    setView("topics");
    setSelectedTopic(null);
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 z-40">
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                transition: { duration: 0.3 },
              }}
              className="absolute bottom-full left-0 mb-3"
            >
              <div className="bg-white text-slate-800 font-semibold py-2 px-4 rounded-xl rounded-bl-none shadow-lg border border-slate-100">
                {attentionMessages[bubbleIndex]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={openModal}
          className="bg-[#003a9b] text-white p-4 rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          whileHover={{ scale: 1.1, backgroundColor: "#ff6100", rotate: -5 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <MessageSquare size={28} />
        </motion.button>
      </div>

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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed bottom-0 left-0 sm:bottom-5 sm:left-5">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-10"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-10"
            >
              <Dialog.Panel className="w-screen h-[85vh] sm:w-96 sm:h-[600px] transform rounded-t-2xl sm:rounded-2xl bg-slate-50 text-left align-middle shadow-2xl transition-all flex flex-col overflow-hidden border border-slate-200/50">
                <header className="bg-gradient-to-r from-[#003a9b] to-blue-800 text-white p-4 rounded-t-2xl sm:rounded-t-lg flex justify-between items-center flex-shrink-0 shadow-lg z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                      <Bot size={22} />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-lg font-bold">
                        Support Assistant
                      </Dialog.Title>
                      <p className="text-xs text-blue-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </header>

                <div
                  ref={chatboxRef}
                  className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-100"
                  style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/subtle-dots.png")`,
                  }}
                >
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className={`flex items-end gap-2.5 ${
                        msg.from === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.from === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border border-slate-300">
                          <Bot size={18} className="text-slate-600" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl ${
                          msg.from === "user"
                            ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                            : "bg-white text-slate-800 rounded-bl-none shadow-md border border-slate-200"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.from === "user" && (
                        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0 border border-slate-400">
                          <User size={18} className="text-slate-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-end gap-2.5 justify-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border border-slate-300">
                        <Bot size={18} className="text-slate-600" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-white text-slate-800 rounded-bl-none shadow-md border border-slate-200 flex items-center gap-1.5">
                        <motion.span
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.span
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: 0.15,
                          }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.span
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <footer className="p-4 border-t border-slate-200 bg-white/80 backdrop-blur-sm sm:rounded-b-lg overflow-y-auto max-h-[50%] flex flex-col">
                  {/* --- THIS IS THE CHANGED PART --- */}
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    <a
                      href="https://api.whatsapp.com/send?phone=918448820207"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-center p-3 text-sm font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} size="xl" />
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div className="flex-grow">
                    <AnimatePresence mode="wait">
                      {view === "topics" && (
                        <motion.div
                          key="topics"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          {Object.entries(knowledgeBase).map(
                            ([topic, { icon }]) => (
                              <button
                                key={topic}
                                onClick={() => handleTopicSelect(topic)}
                                className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                <span className="text-xl">{icon}</span>
                                <span className="font-semibold text-slate-700">
                                  {topic}
                                </span>
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                      {view === "questions" && selectedTopic && (
                        <motion.div
                          key="questions"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={backToTopics}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-3"
                          >
                            <ArrowLeft size={16} /> Back to Topics
                          </button>
                          {knowledgeBase[selectedTopic].questions.map(
                            (qna, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuestionSelect(qna)}
                                className="w-full text-left p-3 text-sm text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors"
                              >
                                {qna.q}
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                      {view === "chat" && (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={backToTopics}
                            className="w-full text-center p-3 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
                          >
                            Ask Another Question
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </footer>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
