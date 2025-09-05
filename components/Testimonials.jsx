'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  { name: 'Sarah Lee', profession: 'Marketing Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'Working with them was seamless. Their professionalism and dedication are unmatched. Highly recommended for any business looking to grow.' },
  { name: 'David Chen', profession: 'CEO, Innovate Inc.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'An exceptional team that delivers results. They understood our vision and executed it perfectly. We saw a significant boost in our online presence.' },
  { name: 'Jessica Miller', profession: 'Project Manager', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', text: 'The entire process was smooth and efficient. Their attention to detail and proactive communication made a huge difference for our project.' },
  { name: 'Maria Garcia', profession: 'Startup Founder', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', text: 'A truly reliable partner. They are not just service providers but genuine contributors to our success. I couldn\'t be happier with the outcome.' },
  { name: 'Tom Wilson', profession: 'Creative Director', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', text: 'Their creative solutions and strategic insights were invaluable. They took our brand to the next level. A pleasure to work with.' }
];

const Testimonials = () => {
  const swiperRef = useRef(null);

  return (
    <div className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-tertiary text-[#ff6100] x-line">Testimonials</h2>
          <div className="mt-2 w-24 h-1 bg-[#003a9b] mx-auto"></div>

          <div className="absolute -top-8 sm:top-0 right-0 flex items-center space-x-3 z-20">
            <button onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous testimonial" className="testimonial-prev w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} aria-label="Next testimonial" className="testimonial-next w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Swiper
            modules={[Navigation, Autoplay, A11y]}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="!overflow-visible"
            >
            {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.name} className="h-full">
                <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center h-full hover:shadow-2xl transition-shadow duration-300">
                    <Image
                    className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-white object-cover"
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    width={100}
                    height={100}
                    />
                    <blockquote className="mt-6 flex-grow">
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    </blockquote>
                    <figcaption className="mt-6">
                    <div className="font-bold text-lg text-navy">{testimonial.name}</div>
                    <div className="text-sm text-[#003a9b] font-semibold">{testimonial.profession}</div>
                    </figcaption>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;