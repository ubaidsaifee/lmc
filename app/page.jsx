"use client";
import dynamic from 'next/dynamic';

// --- Reusable Components ---
// import HeroSlider from '@/components/HeroSlider';
// import Counter from '@/components/Counter';
// import HeroButtons from '@/components/HeroButtons';
// import Services from '@/components/Services';
// import About from '@/components/About';
// import Strengths from '@/components/Strengths';
// import Employees from '@/components/Employees';
// import Testimonials from '@/components/Testimonials';
// import ContactForm from '@/components/ContactForm';
// import Chatbot from '@/components/Chatbot';

// --- Dynamically Imported Components ---
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), { ssr: false });
const Counter = dynamic(() => import('@/components/Counter'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Strengths = dynamic(() => import('@/components/Strengths'), { ssr: false });
const Employees = dynamic(() => import('@/components/Employees'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });
const HeroButtons = dynamic(() => import('@/components/HeroButtons'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <HeroButtons />
      <Services />
      <About />
      <Strengths />
      <Counter />
      <Employees />
      <Testimonials />
      <ContactForm />
      <Chatbot />
    </>
  );
};

export default HomePage;