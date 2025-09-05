"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaChevronRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const servicesLinks = [
  { name: "Pvt Ltd Registration", href: "/private-limited-company" },
  { name: "LLP Registration", href: "/limited-liability-partnership" },
  { name: "OPC Registration", href: "/one-person-company" },
  { name: "GST Registration", href: "/gst-registration" },
];

const complianceLinks = [
  {
    name: "Post Incorporation Compliance",
    href: "/post-incorporation-compliance",
  },
  { name: "Company Annual Return", href: "/company-annual-return" },
  { name: "LLP Annual Return", href: "/llp-annual-return" },
  { name: "OPC Annual Return", href: "/opc-annual-return" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Condition", href: "/terms-condition" },
  { name: "Cancellation & Policy", href: "/cancellation-policy" },
  { name: "Blogs", href: "/blogs" },
];

const socialIcons = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@incometaxwallah" },
  { icon: <FaInstagram />, href: "#" },
];

const Footer = () => {
  return (
    <motion.footer
      className="bg-black text-gray-400"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 lg:px-8 pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-gray-700">
          <div className="flex space-x-3 mb-4 sm:mb-0">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-9 h-9 text-2xl rounded flex items-center justify-center hover:border-[#003a9b] hover:text-white transition-transform duration-300 ease-in-out hover:scale-145"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=918448820207"
            className="flex items-center space-x-2 font-extrabold border border-gray-600 rounded px-4 py-2 hover:bg-[#27bf3d] hover:text-white transition-colors duration-300"
            target="_blank"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          <div>
            <ul>
              {servicesLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex items-center mb-3 transition-transform duration-300 ease-in-out hover:scale-105 origin-left"
                >
                  <FaChevronRight className="text-xs mr-3" />
                  <Link
                    href={link.href}
                    className="hover:text-[#fec050] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul>
              {complianceLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex items-center mb-3 transition-transform duration-300 ease-in-out hover:scale-105 origin-left"
                >
                  <FaChevronRight className="text-xs mr-3" />
                  <Link
                    href={link.href}
                    className="hover:text-[#fec050] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul>
              {companyLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex items-center mb-3 transition-transform duration-300 ease-in-out hover:scale-105 origin-left"
                >
                  <FaChevronRight className="text-xs mr-3" />
                  <Link
                    href={link.href}
                    className="hover:text-[#fec050] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <span className="h-0.5 w-6 bg-blue-500 mr-2"></span>
              <h3 className="font-bold text-white text-lg">Contact</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start transition-transform duration-300 ease-in-out hover:scale-105 origin-left">
                <FaPhoneAlt className="mt-1 mr-3 text-white" />

                <span className="hover:text-[#fec050]">
                  <a
                    href="https://api.whatsapp.com/send?phone=918448820207"
                    target="_blank"
                  >
                    +91 84488 - 20207
                  </a>
                </span>
              </li>
              <li className="flex items-start transition-transform duration-300 ease-in-out hover:scale-105 origin-left">
                <FaEnvelope className="mt-1 mr-3 text-white" />
                <span className="hover:text-[#fec050]">
                  <a href="mailto:incometaxwala11@gmail.com">
                    incometaxwala11@gmail.com
                  </a>
                </span>
              </li>

              <li className="flex items-start transition-transform duration-300 ease-in-out hover:scale-105 origin-left">
                <FaMapMarkerAlt className="mt-1 mr-3 text-white flex-shrink-0" />
                <span className="hover:text-[#fec050]">
                  <a
                    href="https://maps.app.goo.gl/jBc6yjhAsq4LWsx26"
                    target="_blank"
                  >
                    487/41, 2nd Floor, Peeragarhi, New Delhi-110087
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm border-t border-gray-700 mt-8 py-6">
          <p>
            © Copyright 2023 - by letsmakecompany.com | All Rights Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
