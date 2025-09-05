"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

const serviceOptions = [
  { id: "proprietorship", name: "Individual/Prop. Firm", price: 1199 },
  { id: "pvt_ltd", name: "Pvt. Ltd Company", price: 2199 },
  { id: "llp", name: "Limited Liability Partnership", price: 2199 },
  { id: "partnership", name: "Partnership Firm", price: 1899 },
];

const statesOfIndia = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Other"];

export default function MsmeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Delhi",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((total, serviceId) => {
      const service = serviceOptions.find((s) => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  }, [selectedServices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (totalPrice === 0) {
      setMessage("Please select at least one service.");
      setIsLoading(false);
      return;
    }

    try {
      // This is where you would fetch your API endpoint
      // const response = await fetch("/api/msme-order", { ... });
      console.log("Form Submitted:", { ...formData, selectedServices, totalPrice });
      // Fake delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage("Success! We've received your request and will contact you shortly.");
      
    } catch (error) {
      setMessage(`Error: Form submission failed.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 sticky top-10"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 text-xl font-bold rounded-t-lg">
            Select Your Business Type
          </h3>
          <div className="bg-white rounded-b-lg border border-t-0 border-gray-200">
            {serviceOptions.map((service) => (
              <motion.label
                key={service.id}
                htmlFor={service.id}
                className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-indigo-50 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-700 font-medium">{service.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">₹{service.price}</span>
                  <input
                    type="checkbox"
                    id={service.id}
                    value={service.id}
                    onChange={handleServiceChange}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <input type="text" name="name" placeholder="Full Name*" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            </div>
             <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <input type="email" name="email" placeholder="Email Address*" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            </div>
             <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <input type="tel" name="phone" placeholder="Phone Number*" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            </div>
             <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <select name="state" value={formData.state} onChange={handleInputChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white transition">
                    {statesOfIndia.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>
        
        <div className="mt-6">
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-md hover:shadow-lg hover:from-orange-600 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Processing..." : `Proceed to Pay ₹${totalPrice}`}
          </motion.button>
        </div>
        
        {message && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-center text-sm flex items-center justify-center p-3 rounded-md ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
             >
                <AlertCircle className="h-5 w-5 mr-2"/> {message}
             </motion.div>
        )}
        
        <p className="mt-4 text-center text-xs text-gray-500">
          Your information is 256-bit SSL encrypted & secure.
        </p>
      </form>
    </motion.div>
  );
}