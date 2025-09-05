// components/admin/AdminHeader.jsx
'use client';

import { Search } from 'lucide-react';
import NotificationBell from '@/components/admin/NotificationBell';
import UserNav from '@/components/admin/UserNav';

export default function AdminHeader() {
  // Add a placeholder submit handler to prevent errors
  const handleGlobalSearch = (event) => {
    event.preventDefault();
    alert("Global search is not yet implemented.");
  };

  return (
    <header className="flex h-16 py-2 items-center justify-between gap-4 border-b bg-white px-6 sticky top-0 z-30 shadow-sm">
      {/* Left Side: Search Bar */}
      <div>
        {/* Attach the handler to the form's onSubmit event */}
        <form onSubmit={handleGlobalSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-[250px] lg:w-[35-px] transition-all"
            />
          </div>
        </form>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center gap-4">
        <NotificationBell />
        <UserNav />
      </div>
    </header>
  );
}