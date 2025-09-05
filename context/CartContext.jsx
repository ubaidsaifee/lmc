"use client";
import React, { createContext, useState, useContext } from 'react';
import { allCourses } from '@/app/lib/courses'; // Import from the new file

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (course) => {
    setCartItems(prevItems => {
      if (prevItems.find(item => item.id === course.id)) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const isCourseInCart = (courseId) => {
    return cartItems.some(item => item.id === courseId);
  };

  const value = {
    cartItems,
    allCourses, // Continue to provide allCourses from here
    addToCart,
    removeFromCart,
    isCourseInCart,
    cartTotal: cartItems.reduce((total, item) => total + item.price, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};