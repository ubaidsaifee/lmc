"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const strengthsData = [
  {
    imgSrc: '/images/strengths/afford.png',
    alt: 'Affordability',
    title: 'Affordability',
    description: 'We offer cost-effective business registration services. Our quotations are always competitive without compromising on quality.'
  },
  {
    imgSrc: '/images/strengths/service.png',
    alt: 'Customer Support',
    title: 'Customer Support',
    description: 'We provide customer support throughout the registration process, promptly addressing any queries or concerns that clients may have both during and after company registration.'
  },
  {
    imgSrc: '/images/strengths/speed.png',
    alt: 'Speed and Efficiency',
    title: 'Speed and Efficiency',
    description: 'Time is of the essence. We emphasize a Quick and Efficient Company Registration Process without unnecessary delays.'
  },
  {
    imgSrc: '/images/strengths/price.png',
    alt: 'Transparent Pricing',
    title: 'Transparent Pricing',
    description: 'We ensure a transparent pricing structure with no hidden fees, reaffirming our commitment to clarity and empowering entrepreneurs to make well-informed decisions confidently.'
  }
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

const Strengths = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-tertiary text-[#ff6100] x-line">Our Key Strengths</h2>
          <div className="mt-2 w-24 h-1 bg-[#003a9b] mx-auto"></div>
        </motion.div>
        <motion.div
            className="flex flex-wrap justify-center gap-6 px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          {strengthsData.map((strength, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white border-2 border-[#003a9b] rounded-lg w-full max-w-[270px] p-5 flex flex-col items-center text-center transition-all duration-300 ease-in-out shadow-md hover:bg-blue-900/10 hover:shadow-xl hover:-translate-y-2 hover:scale-105"
            >
              <Image
                src={strength.imgSrc}
                width={100}
                height={100}
                alt={strength.alt}
                sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 100px"
                className="mb-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-1"
              />
              <div className="text-center">
                <h3 className="mb-2.5 text-xl font-bold text-[#003a9b]">
                  {strength.title}
                </h3>
                <p className="text-base text-gray-600">
                  {strength.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Strengths;