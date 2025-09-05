"use client";
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';

const servicesData = [
    {
      imgSrc: '/images/services/post.png',
      title: 'Post Incorporation Compliance',
      shortText: 'Post-incorporation compliance stands as a critical aspect of corporate governance, where businesses navigate a labyrinth of regulatory frameworks.',
      href: '/post-incorporation-compliance' // 1. Add the link to your existing page
    },
    {
      imgSrc: '/images/services/pvt.png',
      title: 'Private Limited Company Registration',
      shortText: 'A Private Limited Company is a popular choice for startups seeking limited liability, separating personal assets from business debts and obligations.',
      href: '/private-limited-company' // 1. Add the link to your existing page
    },
    {
      imgSrc: '/images/services/llp.png',
      title: 'LLP Registration',
      shortText: 'A Limited Liability Partnership (LLP) combines the benefits of a partnership and a company, offering flexibility with limited liability protection.',
      href: '/limited-liability-partnership' // 1. Add the link to your existing page
    },
    {
      imgSrc: '/images/services/opc.png',
      title: 'OPC Registration',
      shortText: 'An One Person Company (OPC) is an ideal structure for solo entrepreneurs who want corporate benefits and limited liability.',
      href: '/one-person-company' // 1. Add the link to your existing page
    },
    {
      imgSrc: '/images/services/trust.png',
      title: 'Trust Registration',
      shortText: 'Trust registration is essential for non-profits and NGOs to gain legal status, manage assets, and carry out charitable activities in an organized manner.',
      href: '/trust-registration' // 1. Add the link to your existing page
    },
    {
      imgSrc: '/images/services/80g.png',
      title: '80G - 12A Registration',
      shortText: 'Registrations under Section 12A and 80G are vital for NGOs and trusts to avail tax exemptions and offer tax benefits to donors.',
      href: '/80g-12a-registration' // 1. Add the link to your existing page
    }
  ];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Services = () => {
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
            <h2 className="text-3xl md:text-4xl font-bold font-tertiary text-[#ff6100]">Our Main Services</h2>
            <div className="mt-2 w-24 h-1 bg-[#003a9b] mx-auto"></div>
        </motion.div>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
                <ServiceCard
                imgSrc={service.imgSrc}
                title={service.title}
                shortText={service.shortText}
                href={service.href} // 2. Pass the href prop down to the card
                />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;