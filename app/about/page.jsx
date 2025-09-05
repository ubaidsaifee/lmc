// app/about/page.jsx
'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Gem, ShieldCheck, Handshake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Reusable component for feature cards
const FeatureCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-xl shadow-lg border border-slate-100"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg flex items-center justify-center">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</h3>
    </div>
    <p className="mt-4 text-slate-600">{children}</p>
  </motion.div>
);

// Main About Us Page Component
export default function AboutUsPage() {
  return (
    <div className="bg-[#fffff0] text-slate-800">
      {/* --- Hero Section with Banner Image --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-20 sm:py-24 px-4 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003a9b]/80 to-blue-800/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
          >
            Simplifying Your Journey to Entrepreneurship
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-sm sm:text-md max-w-2xl mx-auto text-white"
          >
            At LetsMakeCompany, we blend expertise with technology to provide seamless, reliable, and efficient company registration and compliance services across India.
          </motion.p>
        </div>
      </motion.section>

      {/* --- Mission & Vision Section --- */}
      <section className="py-14 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FeatureCard icon={Target} title="Our Mission">
              To empower entrepreneurs by streamlining the entire company registration process. We handle the legal intricacies so you can focus on what you do best: building your business.
            </FeatureCard>
            <FeatureCard icon={Eye} title="Our Vision">
              To be India's most trusted and user-friendly platform for business incorporation and compliance, fostering a new generation of successful and legally sound enterprises.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* --- Founder Section --- */}
      <section className="bg-white py-14 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* <div className="absolute -top-4 -left-4 w-full h-full bg-[#fec050] rounded-2xl transform -rotate-3"></div> */}
              <Image
                src="/images/about/expert.jpg" // Make sure this image is in your /public folder
                alt="Founder of LetsMakeCompany"
                width={500}
                height={500}
                className="relative rounded-2xl"
              />
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Meet Our Founder
              </motion.h2>
              <div className="mt-3 h-1.5 w-20 text-center bg-gradient-to-r from-orange-500 to-amber-500"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-slate-600 leading-relaxed"
              >
                With over a decade of experience in corporate law and finance, our founder established LetsMakeCompany to address a critical gap in the market: a reliable, transparent, and affordable service for aspiring entrepreneurs. His vision is to make the dream of starting a company accessible to everyone in India.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-slate-600 leading-relaxed"
              >
                "We take pride in the thousands of businesses we've helped launch. Our commitment is to your success, from day one and beyond."
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Values Section --- */}
      <section className="py-14 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Why Choose LetsMakeCompany?
          </motion.h2>
          <div className="mt-3 h-1.5 w-20 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto"></div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Gem} title="Expertise">
              Our team is well-versed in legal intricacies, ensuring a smooth and compliant registration process.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Reliability">
              With a proven track record and over 3,500 satisfied customers, you can trust us to get it right.
            </FeatureCard>
            <FeatureCard icon={Handshake} title="Personalized Approach">
              We offer tailored solutions for your unique business needs, ensuring you get the right start.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="bg-white py-14 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Ready to Start Your Business Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-slate-600"
          >
            Let our experts guide you. Get in touch today for a free consultation and take the first step towards building your dream company.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href="/private-limited-company"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Company Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}