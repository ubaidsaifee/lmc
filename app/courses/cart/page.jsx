"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <main className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-10 lg:py-12">
            <div className="flex items-center mb-6">
                 <Link href="/courses" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-semibold">
                    <ArrowLeft size={20} />
                    Back to Courses
                </Link>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Shopping Cart
            </h1>
      
            {cartItems.length > 0 ? (
                // NEW: A cleaner, more modern two-column layout
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-200">Your Items ({cartItems.length})</h2>
                        <div className="space-y-6">
                        {cartItems.map(item => (
                            // NEW: List-item style for cart items is cleaner than full cards
                            <div key={item.id} className="flex items-center gap-6">
                                <img src={item.img} alt={item.name} className="w-28 h-28 object-contain rounded-lg border border-slate-200 p-2 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                                    <p className="text-xl font-semibold text-blue-600 mt-1">₹{item.price.toLocaleString()}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-500 hover:scale-110 transition-all duration-200 p-2">
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
          
                    {/* NEW: Redesigned and more prominent order summary panel */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-lg h-fit">
                        <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">Order Summary</h2>
                        <div className="space-y-4 text-slate-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span className="font-medium">Calculated at next step</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-slate-900 mt-6 pt-6 border-t border-slate-200">
                            <span>Total</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <Link href="/courses/checkout" className="w-full text-center mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3.5 rounded-lg block transition duration-300 hover:shadow-lg hover:bg-blue-700 hover:scale-105">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            ) : (
                // NEW: More engaging empty cart state with an icon
                <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2xl">
                    <ShoppingBag size={64} className="mx-auto text-slate-300" />
                    <p className="text-2xl font-bold text-slate-800 mt-6">Your cart is empty.</p>
                    <p className="text-slate-500 mt-2">Looks like you haven't added any courses yet.</p>
                    <Link href="/courses" className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                        Explore Courses
                    </Link>
                </div>
            )}
        </div>
    </main>
  );
};

export default CartPage;