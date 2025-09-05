"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const CourseEnrollButton = ({ course }) => {
  const { addToCart, isCourseInCart } = useCart();
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);

  // Check cart status on component mount
  useEffect(() => {
    setIsInCart(isCourseInCart(course.id));
  }, [isCourseInCart, course.id]);

  const handleAddToCart = () => {
    addToCart(course);
    setIsInCart(true);
  };

  const handleGoToCart = () => {
    router.push('/courses/cart');
  };

  if (isInCart) {
    return (
        <button
          onClick={handleGoToCart}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg flex items-center justify-center gap-3"
        >
          <ArrowRight size={24} />
          Go to Cart
        </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg flex items-center justify-center gap-3"
    >
      <ShoppingCart size={24} />
      Add to Cart
    </button>
  );
};

export default CourseEnrollButton;