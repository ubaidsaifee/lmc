"use client";
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stats = [
  {
    imgSrc: "/images/counters/contracts.png",
    end: 5000,
    label: "Contracts",
  },
  {
    imgSrc: "/images/counters/satisfaction.png",
    end: 100,
    label: "Satisfaction",
    suffix: "%",
  },
  {
    imgSrc: "/images/counters/clients.png",
    end: 3500,
    label: "Clients",
  },
  {
    imgSrc: "/images/counters/cases.png",
    end: 2500,
    label: "Cases",
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Counter = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff6100] mb-4">Proven Success, Real Results</h2>
            <div className="mt-2 mb-4 w-24 h-1 bg-[#003a9b] mx-auto"></div>
            <p className="max-w-3xl mx-auto text-gray-600 mb-12 md:mb-16">
            Our track record speaks for itself. We're driven by a passion for what we do and the tangible impact we create for our clients and our team.
            </p>
        </motion.div>
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="bg-gray-100 border-2 border-[#003a9b] text-black rounded-lg p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <Image
                src={stat.imgSrc}
                alt={stat.label}
                width={90}
                height={90}
                className="mx-auto mb-4"
              />
              <p className="text-4xl font-bold tracking-tighter">
                {isClient && (
                  <CountUp
                    end={stat.end}
                    duration={3}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix={stat.suffix || ''}
                  />
                )}
              </p>
              <p className="text-md text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Counter;