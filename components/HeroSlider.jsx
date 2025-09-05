"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    bg: '/images/banners/b1.jpg',
    subtitle: 'BUISNESS REGISTRATION IN INDIA',
    title: 'We Handle All Your Compliance Requirements',
    text: 'We are An online Business Registration Plateform that helps entrepreneurs in setting up Business in India Along with Various Legal Compliances, Audi++t, ITR Filings, GST Registration.',
    link: '/private-limited-company'
  },
  {
    bg: '/images/banners/b2.jpg',
    subtitle: 'Income Tax Return Filing',
    title: 'Transform your vision into reality with hassle-free ITR Filing.',
    text: 'Professional assistance for Income Tax Return (ITR) filing. Our Highly Qualified Tax Experts will take care of your Compliances, Tax Savings, and maximum potential Tax Refunds.',
    link: '/income-tax-return'
  },
  {
    bg: '/images/banners/b3.jpg',
    subtitle: 'Consultancy Services',
    title: 'We Provide One to One Innovative, Trusted Solutions.',
    text: 'Our Consultation Services offer expert advice and Guidance across various industries. We are not just consultants rather we eliminate the Problems-Doubts and give peace of mind.',
    link: '/book-consultancy'
  },
  {
    bg: '/images/banners/b4.jpg',
    subtitle: 'Blogs',
    title: 'Unlock Financial Freedom with Smart Money Management.',
    text: 'Take control of your finances and pave the way to a brighter future with our expert guidance. From budgeting tips to investment strategies, discover how to achieve your financial goals.',
    link: '/blogs'
  }
];

const HeroSlider = () => {
  return (
    <motion.section
      className="relative hero-slider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[60vh] md:h-[60vh] bg-cover bg-center flex items-center p-4"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* --- Responsive Overlays --- */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent block md:hidden"></div>
              <div className="absolute inset-0 bg-opacity-50 hidden md:block"></div>

              <div className="container mx-auto relative z-10">
                <div className="max-w-2xl text-white text-center md:text-left md:ml-8">

                  {/* ================================================================== */}
                  {/* 1. ORIGINAL DESKTOP VERSION - Visible on md and up             */}
                  {/* THIS IS YOUR EXACT, UNCHANGED CODE BLOCK FOR DESKTOP           */}
                  {/* ================================================================== */}
                  <div className="hidden md:block">
                    <Link href={slide.link}>
                      <h4 className="text-xl md:text-4xl font-extrabold uppercase tracking-wider my-3 text-navy inline-block">
                        {slide.subtitle}
                      </h4>
                    </Link>
                    <h4 className="text-lg md:text-xl pt-2 capitalize">{slide.title}</h4>
                    <p className="mt-4 text-sm md:text-base text-gray-200">{slide.text}</p>
                  </div>

                  {/* ====================================================================== */}
                  {/* 2. STABLE & SIMPLE MOBILE VERSION - Hidden on md and up               */}
                  {/* (No complex animations to prevent rendering failures)                */}
                  {/* ====================================================================== */}
                  <div className="block md:hidden text-left">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                          {slide.subtitle}
                      </h4>
                      <h2 className="text-xl font-extrabold my-3 text-white leading-tight">
                          {slide.title}
                      </h2>
                      <p className="text-xs text-gray-200 mb-6 line-clamp-3">
                          {slide.text}
                      </p>
                      <div>
                          <Link href={slide.link} className="inline-flex items-center gap-1 bg-[#fec050] text-[#003a9b] text-xs font-bold py-2 px-4 rounded-lg">
                              <span>Learn More</span>
                              <ArrowRight size={16} />
                          </Link>
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default HeroSlider;