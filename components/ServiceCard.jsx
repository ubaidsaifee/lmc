'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Import the Link component

const ServiceCard = ({ imgSrc, title, shortText, href }) => { // 2. Accept the href prop
  const contentId = `service-content-${title.replace(/\s+/g, '-')}`;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full text-center md:text-left">
      <Image 
        src={imgSrc} 
        alt={title} 
        width={80} 
        height={80} 
        className="mb-4 mx-auto md:mx-0"
        sizes="(max-width: 768px) 10vw, (max-width: 1200px) 8vw, 80px"
      />
      
      <div className="flex flex-col flex-grow">
        <h5 className="text-[#003a9b] text-xl font-extrabold mb-1 min-h-[56px]">{title}</h5>
        
        <div id={contentId} className="flex-grow text-sm text-gray-600 leading-relaxed">
          <p>
            {shortText}
          </p>
        </div>
        
        {/* 3. Wrap the button in a Link component and pass the href */}
        <Link 
          href={href || '#'} // Use href, with a fallback just in case
          className="mt-4 mx-auto md:self-start md:mx-0"
        >
          <button
            className="bg-[#003a9b] text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 hover:scale-105 transition duration-300 w-full"
          >
            See More
          </button>
        </Link>
      </div>
      <div>
        <h4></h4>
      </div>
    </div>
  );
};

export default ServiceCard;