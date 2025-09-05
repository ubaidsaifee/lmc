"use client";

import Link from "next/link";
import { motion } from 'framer-motion';
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { allCourses } from "@/app/lib/courses";

// Animation variants for individual cards
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const CourseCard = ({ course }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
    >
      <Link href={`/courses/${course.slug}`} className="flex-shrink-0">
        <div className="relative h-50 bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={course.img}
            alt={course.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-blue-600 mb-2">
          {course.category}
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-3 h-14">
          {course.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-slate-600">
            By {course.instructor.name}
          </span>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-bold">{course.rating}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              ₹{course.price.toLocaleString()}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ₹{course.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link
            href={`/courses/${course.slug}`}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 hover:scale-105"
          >
            View Details
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CoursesPage = () => {
  const { cartItems } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(allCourses.map((c) => c.category))];
  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses.filter((course) => course.category === selectedCategory);

  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main>
     {/* --- Hero Section with Banner Image --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-20 sm:py-24 px-4 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003a9b]/80 to-blue-800/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
          >
           Elevate Your Career
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-sm sm:text-md max-w-2xl mx-auto text-white"
          >
           Gain a competitive edge with courses in finance, tax, and compliance, designed by industry veterans Acquire practical, real-world skills that immediately boost your professional value and confidence Unlock new opportunities and fast-track your goals with our expert-led, targeted learning paths
          </motion.p>
        </div>
      </motion.section>

      <div id="courses-grid" className="container mx-auto px-4 mt-8 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm md:text-base font-bold rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div id="courses-grid" className="container mx-auto px-4 py-10 lg:py-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
        {filteredCourses.length === 0 && (
          <div className="text-center col-span-full py-16">
            <h3 className="text-2xl font-bold text-slate-700">
              No Courses Found
            </h3>
            <p className="text-slate-500 mt-2">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <Link
          href="/courses/cart"
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 flex items-center justify-center animate-bounce"
        >
          <ShoppingCart size={28} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
            {cartItems.length}
          </span>
        </Link>
      )}
    </main>
  );
};

export default CoursesPage;