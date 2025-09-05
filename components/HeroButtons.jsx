import React from 'react'
import Link from 'next/link';


const HeroButtons = () => {
  return (
    <>
      <div className="bg-white py-8 md:py-10">
        {/* --- CONTAINER: Now flex-col on mobile, md:flex-row on desktop --- */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 md:gap-8">
          
          {/* --- BUTTONS: Now full-width on mobile, fixed-width on desktop --- */}
          <Link
            href="/private-limited-company"
            className="bg-[#003a9b] w-full md:w-[16rem] h-[4.5rem] flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#ff6100] hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out text-center"
          >
            Private Limited Company Registration
          </Link>
          
          <Link
            href="/income-tax-return"
            className="bg-[#003a9b] w-full md:w-[16rem] h-[4.5rem] flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#ff6100] hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out text-center"
          >
            ITR Filing Services
          </Link>
          
          <Link
            href="/courses"
            className="bg-[#003a9b] w-full md:w-[16rem] h-[4.5rem] flex items-center justify-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#ff6100] hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out text-center"
          >
            Career Courses
          </Link>

        </div>
      </div>
    </>
  )
}

export default HeroButtons
