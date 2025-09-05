// app/layout.jsx

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import './lib/fontawesome';
import ConditionalLayout from "@/components/ConditionalLayout";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Script from 'next/script'; // 1. Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lets Make Company Clone",
  description: "Your one-stop solution for company registration and compliance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* 2. Add the Google Analytics scripts here */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
      <body className={inter.className}>
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}