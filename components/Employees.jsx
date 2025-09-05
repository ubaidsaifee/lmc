
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Swiper Imports ---
// 1. Import the Autoplay module
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// --- Swiper CSS ---
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const employees = [
  {
    name: 'Riya',
    role: 'UX Designer',
    imageUrl: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=400&h=500&q=80',
  },
  {
    name: 'Kehshav Jha',
    role: 'Video Editor',
    imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=400&h=500&q=80',
  },
  {
    name: 'Supriya Jha',
    role: 'Accountant',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=500&q=80',
  },
  {
    name: 'Nitish Jha',
    role: 'Accountant',
    imageUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&w=400&h=500&q=80',
  },
  {
    name: 'Mahwish',
    role: 'Frontend Developer',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80',
  },
  {
    name: 'Ubaid Saifi',
    role: 'Backend Developer',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=500&q=80',
  },
  // {
  //   name: 'Karan',
  //   role: 'Web Developer',
  //   imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=500&q=80',
  // },{
  //   name: 'Vishal',
  //   role: 'Web Developer',
  //   imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=500&q=80',
  // },
];

const EmployeeCard = ({ name, role, imageUrl }) => {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl h-[450px] w-full"
      onClick={() => setIsTapped(!isTapped)}
    >
      <img 
        src={imageUrl} 
        alt={`Photo of ${name}`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x500/ff0000/ffffff?text=Image+Error'; }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-[#003a9b] via-[#003a9b]/70 to-transparent transition-opacity duration-500 group-hover:opacity-100 ${isTapped ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className={`bg-white/90 backdrop-blur-sm p-4 rounded-md transform transition-all duration-500 ease-in-out group-hover:translate-y-0 ${isTapped ? 'translate-y-0' : 'translate-y-full'}`}>
            <h3 className="text-xl font-bold text-[#003a9b]">{name}</h3>
            <p className="text-md font-semibold" style={{ color: '#ff6100' }}>{role}</p>
        </div>
      </div>
       <div className={`absolute inset-0 border-4 rounded-lg transition-all duration-300 pointer-events-none group-hover:border-[#fec050] ${isTapped ? 'border-[#fec050]' : 'border-transparent'}`}></div>
    </div>
  );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, duration: 0.5 },
    },
};

const Employees = () => {
  return (
    <>
      <style jsx global>{`
        .employees-carousel .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
          background: #ff6100 !important;
        }
        .employees-carousel .swiper-button-prev,
        .employees-carousel .swiper-button-next {
            width: 44px;
            height: 44px;
            background-color: white;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transition: all 0.3s ease;
        }
        .employees-carousel .swiper-button-prev:hover,
        .employees-carousel .swiper-button-next:hover {
            background-color: #ff6100;
        }
        .employees-carousel .swiper-button-prev:after,
        .employees-carousel .swiper-button-next:after {
            font-size: 18px;
            font-weight: bold;
            color: #003a9b;
            transition: all 0.3s ease;
        }
        .employees-carousel .swiper-button-prev:hover:after,
        .employees-carousel .swiper-button-next:hover:after {
            color: white;
        }
        .employees-carousel .swiper-button-prev {
            left: 0px;
        }
        .employees-carousel .swiper-button-next {
            right: 0px;
        }
        @media (min-width: 768px) {
            .employees-carousel .swiper-button-prev {
                left: -16px; 
            }
            .employees-carousel .swiper-button-next {
                right: -16px;
            }
        }
      `}</style>

      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#ff6100' }}>
              Meet Our Experts
            </h2>
            <div className="mt-4 w-24 h-1.5 mx-auto" style={{ backgroundColor: '#003a9b' }}></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Dedicated experts committed to quality and precision in every project.
            </p>
          </motion.div>

          <motion.div
            className="relative px-8 md:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Swiper
              // 2. Add Autoplay to the list of modules
              modules={[Navigation, Pagination, Autoplay]}
              grabCursor={true}
              loop={true}
              pagination={{
                type: 'progressbar',
              }}
              navigation={true}
              // 3. Configure the autoplay settings
              autoplay={{
                delay: 3000, // 3000 milliseconds = 3 seconds
                disableOnInteraction: false, // Continue autoplay after user interaction
                pauseOnMouseEnter: true, // Pause autoplay when mouse is over the slider
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.25,
                  spaceBetween: 15,
                  centeredSlides: true,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                }
              }}
              className="employees-carousel !pb-12"
            >
              {employees.map((employee, index) => (
                <SwiperSlide key={index}>
                  <EmployeeCard
                    name={employee.name}
                    role={employee.role}
                    imageUrl={employee.imageUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Employees;