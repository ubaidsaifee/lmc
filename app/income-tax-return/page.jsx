"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronLeft, ArrowRight } from 'lucide-react';

// A styled and animated row for each question.
const QuestionRow = ({ question, name, value, onChange, options = null, index }) => {
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Staggered animation for each row
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-200 hover:border-sky-400 transition-all duration-300"
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      layout // Animate layout changes, like when options appear
    >
      <p className="font-semibold text-lg text-slate-800 flex-1">{question}</p>
      <div className="flex items-center gap-6 justify-self-end">
        {/* Yes Radio Button */}
        <motion.label whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer text-base">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === 'yes'}
            onChange={onChange}
            className="form-radio h-5 w-5 text-emerald-500 focus:ring-emerald-400 border-slate-300"
          />
          <span className={`font-medium ${value === 'yes' ? 'text-emerald-600' : 'text-slate-600'}`}>Yes</span>
        </motion.label>
        {/* No Radio Button */}
        <motion.label whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer text-base">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === 'no'}
            onChange={onChange}
            className="form-radio h-5 w-5 text-rose-500 focus:ring-rose-400 border-slate-300"
          />
          <span className={`font-medium ${value === 'no' ? 'text-rose-600' : 'text-slate-600'}`}>No</span>
        </motion.label>
      </div>
      {/* Conditional options with animation */}
      <AnimatePresence>
        {value === 'yes' && options && (
          <motion.div
            className="w-full md:w-auto md:justify-self-end text-sm text-slate-700 mt-4 md:mt-0 md:pl-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-4">
              {options}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const IncomeTaxReturnPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [vitalsAlert, setVitalsAlert] = useState('');
  const [formData, setFormData] = useState({
    salary: 'no',
    salaryEmployer: null,
    business: 'no',
    houseProperty: 'no',
    housePropertyLoan: null,
    capitalGains: 'no',
    capitalGainsShare: false,
    capitalGainsProperty: false,
    otherSources: 'no',
    crypto: 'no',
    phone: '+91'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (alertMessage) setAlertMessage('');
    if (vitalsAlert) setVitalsAlert('');
  };

  const calculatedAmount = useMemo(() => {
    let amount = 500;
    if (formData.salary === 'yes') amount += 200;
    if (formData.business === 'yes') amount += 500;
    if (formData.houseProperty === 'yes') amount += 300;
    if (formData.capitalGains === 'yes') amount += 500;
    if (formData.crypto === 'yes') amount += 500;
    if (formData.otherSources === 'yes') amount += 100;
    return amount;
  }, [formData]);

  const handleNextStep = () => {
    const { salary, business, houseProperty, capitalGains, otherSources, crypto } = formData;
    const isAnySourceSelected = [salary, business, houseProperty, capitalGains, otherSources, crypto].includes('yes');

    if (!isAnySourceSelected) {
      setAlertMessage("Please select at least one source of income by choosing 'Yes'.");
      return;
    }
    if (formData.salary === 'yes' && !formData.salaryEmployer) {
      setAlertMessage("For 'Salary', please specify if it's from one or two employers.");
      return;
    }
    if (formData.houseProperty === 'yes' && !formData.housePropertyLoan) {
      setAlertMessage("For 'House Property', please specify if it involves one or two homes.");
      return;
    }
    if (formData.capitalGains === 'yes' && !formData.capitalGainsShare && !formData.capitalGainsProperty) {
      setAlertMessage("For 'Capital Gains', please select the type (Share Trading and/or Property Sale).");
      return;
    }

    setAlertMessage('');
    setActiveStep(2);
  };

  const handleBackStep = () => {
    setActiveStep(1);
    setVitalsAlert('');
  };

  const handlePayment = () => {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      setVitalsAlert("Please enter a valid 10-digit Indian mobile number (e.g., +919876543210).");
      return;
    }
    setVitalsAlert('');
    console.log("Validation successful! Proceeding to payment with:", formData);
    // A custom modal would be better than an alert in a real app.
    // For this example, we'll keep it simple.
    alert("Validation passed! Connecting to payment gateway...");
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  const questions = [
    { id: 'salary', question: 'Do you have salary income?', options: (
      <>
        <label className="flex items-center gap-2 cursor-pointer text-base">
          <input type="radio" name="salaryEmployer" value="one" checked={formData.salaryEmployer === 'one'} onChange={handleInputChange} className="form-radio h-4 w-4 text-sky-500 focus:ring-sky-400" />
          <span className="text-slate-600">One Employer</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-base">
          <input type="radio" name="salaryEmployer" value="two" checked={formData.salaryEmployer === 'two'} onChange={handleInputChange} className="form-radio h-4 w-4 text-sky-500 focus:ring-sky-400" />
          <span className="text-slate-600">Two Employers</span>
        </label>
      </>
    )},
    { id: 'business', question: 'Do you have business or professional income?' },
    { id: 'houseProperty', question: 'Do you have income from a house property (rental income)?', options: (
        <>
          <label className="flex items-center gap-2 cursor-pointer text-base">
            <input type="radio" name="housePropertyLoan" value="one" checked={formData.housePropertyLoan === 'one'} onChange={handleInputChange} className="form-radio h-4 w-4 text-sky-500 focus:ring-sky-400" />
            <span className="text-slate-600">One Home</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-base">
            <input type="radio" name="housePropertyLoan" value="two" checked={formData.housePropertyLoan === 'two'} onChange={handleInputChange} className="form-radio h-4 w-4 text-sky-500 focus:ring-sky-400" />
            <span className="text-slate-600">Two Homes</span>
          </label>
        </>
    )},
    { id: 'capitalGains', question: 'Do you have income from capital gains?', options: (
        <>
          <label className="flex items-center gap-2 cursor-pointer text-base">
            <input type="checkbox" name="capitalGainsShare" checked={formData.capitalGainsShare} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-sky-500 rounded focus:ring-sky-400" />
            <span className="text-slate-600">Share Trading</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-base">
            <input type="checkbox" name="capitalGainsProperty" checked={formData.capitalGainsProperty} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-sky-500 rounded focus:ring-sky-400" />
            <span className="text-slate-600">Property Sale</span>
          </label>
        </>
    )},
    { id: 'otherSources', question: 'Do you have income from other sources (e.g., interest, dividend)?' },
    { id: 'crypto', question: 'Do you have income from Crypto?' },
  ];

  return (
    <main className="py-10 md:py-16 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-4">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#003a9b]">File Your Income Tax Return</h1>
        </section>

        <section className="mt-12 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border-t-8 border-[#003a9b]"
              >
                <h2 className="text-2xl font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">1. Source of Income</h2>
                <AnimatePresence>
                  {alertMessage && (
                    <motion.div
                      className="mb-6 flex items-center bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-4 py-3 rounded-lg" role="alert"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AlertTriangle className="h-6 w-6 mr-3 text-rose-500" />
                      <p className="font-semibold">{alertMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  {questions.map((q, index) => (
                    <QuestionRow
                      key={q.id}
                      question={q.question}
                      name={q.id}
                      value={formData[q.id]}
                      onChange={handleInputChange}
                      options={q.options}
                      index={index}
                    />
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <motion.button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-3 group"
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(96, 165, 250, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    Continue to Vitals
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20}/>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border-t-8 border-[#003a9b]"
              >
                <h2 className="text-2xl font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">2. Taxpayer's Vitals & Payment</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/2 p-6 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="text-xl font-bold text-center text-slate-800 mb-4 pb-2 border-b border-slate-300">SERVICE SUMMARY</h3>
                    <div className="space-y-2 text-base">
                      <p className="flex justify-between items-center"><span className="text-slate-600">Base Filing Fee</span><span className="font-semibold text-slate-800">₹ 500</span></p>
                      {formData.salary === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">Salary Income</span><span className="font-semibold text-emerald-600">+ ₹ 200</span></p>}
                      {formData.business === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">Business Income</span><span className="font-semibold text-emerald-600">+ ₹ 500</span></p>}
                      {formData.houseProperty === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">House Property Income</span><span className="font-semibold text-emerald-600">+ ₹ 300</span></p>}
                      {formData.capitalGains === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">Capital Gains</span><span className="font-semibold text-emerald-600">+ ₹ 500</span></p>}
                      {formData.crypto === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">Crypto Income</span><span className="font-semibold text-emerald-600">+ ₹ 500</span></p>}
                      {formData.otherSources === 'yes' && <p className="flex justify-between items-center"><span className="text-slate-600">Other Sources</span><span className="font-semibold text-emerald-600">+ ₹ 100</span></p>}
                    </div>
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-300">
                      <p className="flex justify-between items-center font-bold text-xl bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent"><span>Total Amount</span><span>₹ {calculatedAmount}</span></p>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-6 rounded-xl">
                    <AnimatePresence>
                      {vitalsAlert && (
                        <motion.div
                          className="mb-4 flex items-center bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-4 py-3 rounded-lg" role="alert"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <AlertTriangle className="h-6 w-6 mr-3 text-rose-500" />
                          <p className="font-semibold text-sm">{vitalsAlert}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="contactNo" className="block text-base font-semibold text-slate-700 mb-1">Contact No. (India)</label>
                        <input type="tel" id="contactNo" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow" placeholder="+919876543210" />
                      </div>
                      <div>
                        <label htmlFor="amount" className="block text-base font-semibold text-slate-700 mb-1">Payment Amount</label>
                        <input type="text" id="amount" value={`₹ ${calculatedAmount}`} readOnly className="w-full p-3 rounded-lg bg-amber-100 border border-amber-500 text-amber-700 font-bold focus:outline-none" />
                      </div>
                      <motion.button
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30"
                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(245, 158, 11, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        Pay Now
                      </motion.button>
                    </div>
                       <div className="mt-8 text-center space-y-4">
                          <p className="font-semibold text-slate-600">Or scan a QR code to pay instantly</p>
                          <div className="flex justify-center items-center gap-8 flex-wrap">
                            <img src="https://placehold.co/128x128/FFFFFF/000000?text=QR+Code" alt="UPI QR Code 1" className="w-32 h-32 bg-white p-2 rounded-lg shadow-md border-2 border-slate-200" />
                            <img src="https://placehold.co/128x128/FFFFFF/000000?text=QR+Code" alt="UPI QR Code 2" className="w-32 h-32 bg-white p-2 rounded-lg shadow-md border-2 border-slate-200" />
                          </div>
                       </div>
                  </div>
                </div>

                <div className="mt-8 text-left">
                  <motion.button
                    onClick={handleBackStep}
                    className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={20} /> Back to Income
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};

export default IncomeTaxReturnPage;
