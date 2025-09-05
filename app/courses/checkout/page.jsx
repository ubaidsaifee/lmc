"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Hash,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// NEW: Reusable component for form inputs with icons
const FormInput = ({ icon, error, ...props }) => {
  const Icon = icon;
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block font-medium text-slate-700 mb-1"
      >
        {props.label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-slate-400" />
        </span>
        <input
          {...props}
          className={`w-full p-3 pl-10 border rounded-lg bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-slate-300"
          }`}
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

const CoursesCheckoutPage = () => {
  const { cartTotal, cartItems } = useCart(); // Assuming cartItems is available
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  // ... (validation and submission logic is unchanged)
  const validateForm = () => {
    /* Validation logic is unchanged */
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.street.trim())
      newErrors.street = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code.";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Submitting data:", formData);
      alert(
        `Thank you, ${formData.fullName}! Proceeding to payment for your order.`
      );
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 lg:py-14">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Secure Checkout
        </h1>

        {/* NEW: Main layout with form on left and sticky summary on right */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- Form Section --- */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  1. Your Details
                </h2>
                <div className="space-y-6">
                  <FormInput
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    icon={User}
                    error={errors.fullName}
                  />
                  <FormInput
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    icon={Mail}
                    error={errors.email}
                  />
                  <FormInput
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    icon={Phone}
                    error={errors.phone}
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/80">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  2. Billing Address
                </h2>
                <div className="space-y-6">
                  <FormInput
                    label="Street Address"
                    id="street"
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    icon={Home}
                    error={errors.street}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="City"
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      icon={MapPin}
                      error={errors.city}
                    />
                    <FormInput
                      label="State"
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      icon={MapPin}
                      error={errors.state}
                    />
                  </div>
                  <FormInput
                    label="PIN Code"
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    maxLength="6"
                    value={formData.pinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, pinCode: e.target.value })
                    }
                    icon={Hash}
                    error={errors.pinCode}
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/80">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  3. Final Step
                </h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        termsAccepted: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="ml-3 block text-sm text-slate-900"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.termsAccepted}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-blue-700 hover:scale-105 text-lg flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={24} />
                  Proceed to Pay ₹{cartTotal.toLocaleString("en-IN")}
                </button>
              </div>
            </form>
          </div>

          {/* --- Sticky Order Summary --- */}
          <div className="w-full lg:w-2/5">
            <div className="lg:sticky lg:top-28 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-200">
                Your Order
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems &&
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-md border border-slate-200 p-1"
                      />
                      <p className="font-semibold text-slate-700 flex-grow">
                        {item.name}
                      </p>
                      <p className="font-medium text-slate-800">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursesCheckoutPage;
