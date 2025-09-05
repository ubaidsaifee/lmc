"use client";

import Image from "next/image";
import { CheckCircle, TrendingUp, Shield, FileText, Award, Users, Zap } from 'lucide-react';
import MsmeForm from "@/components/forms/MsmeForm";
import Faq from "@/components/ui/Faq";
import { motion } from "framer-motion";

// --- Data for content sections (unchanged) ---
const benefits = [
  { icon: <TrendingUp className="h-8 w-8 text-amber-500" />, title: "Access to Collateral-Free Loans", description: "Unlock easier access to credit from banks under government schemes, fueling your business's growth without needing collateral." },
  { icon: <FileText className="h-8 w-8 text-amber-500" />, title: "Preference in Government Tenders", description: "Gain a competitive edge with special preferences and exemptions when applying for central and state government tenders." },
  { icon: <Shield className="h-8 w-8 text-amber-500" />, title: "Protection Against Delayed Payments", description: "Leverage legal protection against buyers who delay payments, ensuring your cash flow remains healthy and predictable." },
  { icon: <CheckCircle className="h-8 w-8 text-amber-500" />, title: "Subsidies and Tax Exemptions", description: "Enjoy various subsidies on patents, barcodes, and ISO certifications, along with significant exemptions under direct tax laws." }
];

const processSteps = [
    { title: "Choose Your Plan", description: "Select the registration package that perfectly matches your business entity." },
    { title: "Submit Your Details", description: "Fill out our simple and secure online form with your basic information." },
    { title: "Expert Verification", description: "Our team verifies your details and prepares the application for error-free submission." },
    { title: "Certificate in Your Inbox", description: "We handle the entire government process. Your official Udyam Certificate is delivered to you." },
];

const whyChooseUs = [
    { icon: <Zap className="h-7 w-7 text-indigo-500"/>, title: "Speed & Efficiency", description: "Our streamlined process ensures you get your certificate in the fastest possible time." },
    { icon: <Users className="h-7 w-7 text-indigo-500"/>, title: "Expert Support", description: "Our dedicated MSME experts are here to guide you at every step of the registration." },
    { icon: <Award className="h-7 w-7 text-indigo-500"/>, title: "100% Success Rate", description: "With our meticulous approach, we guarantee an error-free and successful registration." },
];

// --- Animation Variants for Framer Motion ---
// This defines a reusable animation for items sliding up and fading in.
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

// This variant is for container elements (like grids) to orchestrate animations for their children.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This creates a cascading effect
    },
  },
};


export default function MsmeRegistrationPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-white pt-32 pb-20 md:pt-40 md:pb-28 isolate"
      >
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop"
          alt="Business professionals collaborating"
          layout="fill"
          objectFit="cover"
          className="-z-20"
          priority // Prioritize loading the hero image
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-80 -z-10"></div>
        <div className="container mx-auto px-6 z-10 relative text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4"
          >
            Online MSME & Udyam Registration
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-indigo-200"
          >
            Unlock Government Benefits, Secure Loans, and Grow Your Business with India's Most Trusted MSME Registration Service.
          </motion.p>
        </div>
      </motion.section>
      
      {/* --- Main Content & Form Section --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap lg:flex-nowrap -mx-4 gap-y-12">

            {/* Left Side: Content */}
            <div className="w-full lg:w-3/5 px-4">
              <div className="max-w-2xl mx-auto lg:mx-0">
                  <motion.h2 
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                  >
                    Empower Your Enterprise with an MSME Certificate
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-gray-600 leading-relaxed mb-8"
                  >
                    MSME registration, officially known as Udyam Registration, is a crucial government certification that recognizes your business as a Micro, Small, or Medium Enterprise. This certificate is your gateway to a multitude of benefits, including financial support, tax exemptions, and preferential treatment in government contracts.
                  </motion.p>

                  {/* Benefits Section */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                      {benefits.map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center mb-3">
                                {benefit.icon}
                                <h3 className="ml-4 text-lg font-semibold text-gray-800">{benefit.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </motion.div>
                      ))}
                  </motion.div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-2/5 px-4">
              <MsmeForm /> {/* The form has its own entry animation */}
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
              <motion.h2 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                Why Partner with Us?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="max-w-2xl mx-auto text-gray-600 mb-12"
              >
                We provide more than just a registration; we offer a partnership for your success.
              </motion.p>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                  {whyChooseUs.map((item, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="bg-slate-50 p-8 rounded-lg border border-gray-100"
                    >
                        <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
              </motion.div>
          </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
            <motion.h2 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              Our Simple 4-Step Registration Process
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-2xl mx-auto text-gray-600 mb-12"
            >
              We've simplified the Udyam registration process to be fast, transparent, and completely hassle-free.
            </motion.p>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 hidden md:block" />
              {processSteps.map((step, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative z-10 flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-white border-2 border-indigo-500 text-indigo-600 rounded-full text-2xl font-bold shadow-lg">
                          {index + 1}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-800">{step.title}</h3>
                      <p className="mt-1 text-gray-600 text-sm">{step.description}</p>
                  </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
            <motion.h2 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Faq />
            </motion.div>
        </div>
      </section>
    </main>
  );
}