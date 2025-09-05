"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};


const About = () => {
    return (
        <div className="py-16 md:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={imageVariants} className="lg:order-2">
                        <img
                            src="/images/auditor-700x467.png"
                            alt="Auditor working"
                            className="rounded-lg shadow-2xl w-[95%] h-auto transform hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </motion.div>
                    
                    <div className="md:pl-12 lg:order-1">
                        <motion.div variants={itemVariants} className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold font-tertiary text-[#ff6100]">Why LetsMakeCompany?</h2>
                            <div className="mt-3 h-1 w-24 bg-[#003a9b]"></div>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed text-justify">
                            When selecting our company registration services, you're choosing expertise, efficiency, and reliability. With a dedicated team well-versed in legal intricacies, we streamline the Company Registration Process, ensuring compliance with all regulations.
                        </motion.p>
                        <motion.p variants={itemVariants} className="mt-4 text-gray-600 leading-relaxed text-justify">
                            Our personalized approach caters to your unique business needs, offering tailored solutions for Company Incorporation. Trust in our proven track record of success and commitment to client satisfaction. We take pride of incorporation of thousands of companies and also more than 3,500 satisfied customers.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            <img src="/images/signature.png" alt="Signature of team" className="h-16 mb-2" />
                            <p className="font-semibold text-gray-800">Team:<br /> letsmakecompany.com</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            <Link href="/about" className="inline-block bg-[#003a9b] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#ff6100] transition-colors duration-300">
                                Learn More
                            </Link>
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

export default About;