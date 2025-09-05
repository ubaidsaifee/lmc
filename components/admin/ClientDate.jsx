// components/admin/ClientDate.jsx
'use client';

import { useState, useEffect } from 'react';

export default function ClientDate({ dateString }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code only runs in the browser, ensuring the date format is consistent.
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  // Render a placeholder on the server and initial client render
  if (!formattedDate) {
    return null; 
  }

  return <>{formattedDate}</>;
}