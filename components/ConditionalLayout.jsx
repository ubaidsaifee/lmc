// components/ConditionalLayout.jsx

'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Define admin paths
  const isAdminPage = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/inquiries') ||
                      pathname.startsWith('/registrations') ||
                      pathname.startsWith('/analytics') ||
                      pathname.startsWith('/users') ||
                      pathname.startsWith('/settings');

  // Conditionally render Navbar and Footer
  return (
    <>
      {isAdminPage ? (
        <>{children}</>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}