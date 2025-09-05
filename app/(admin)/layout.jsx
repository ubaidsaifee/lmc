// app/(admin)/layout.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2, Users, FileText, Building, ListChecks, UserCheck, AlertTriangle
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Consultant Paid', href: '/consultant-paid', icon: UserCheck },
  { name: 'Inquiries', href: '/inquiries', icon: FileText },
];
const registrationLinks = [
    { name: 'Company Registration', href: '/company-registration', icon: Building },
    { name: 'Director Details', href: '/director-details', icon: Users },
    { name: 'MSME', href: '/msme', icon: ListChecks },
];
const itrLinks = [
    { name: 'ITR', href: '/itr', icon: FileText },
    { name: 'Defective ITR', href: '/defective-itr', icon: AlertTriangle },
];

const NavLink = ({ href, icon: Icon, children }) => {
    const pathname = usePathname();
    const isActive = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
    return (
        <Link href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white hover:bg-gray-700 ${isActive ? 'bg-indigo-600 text-white' : ''}`}>
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    );
};

export default function AdminLayout({ children }) {
  return (
    // FIX 1: Changed min-h-screen to h-screen and added overflow-hidden
    // This locks the grid to the viewport height and prevents the whole page from scrolling.
    <div className="grid h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-900 text-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-gray-700 px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold"><span className="text-lg">Visual Admin</span></Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map(link => (<NavLink key={link.name} href={link.href} icon={link.icon}>{link.name}</NavLink>))}
              <h3 className="my-3 px-3 text-xs font-semibold uppercase text-gray-500">Registration</h3>
              {registrationLinks.map(link => (<NavLink key={link.name} href={link.href} icon={link.icon}>{link.name}</NavLink>))}
              <h3 className="my-3 px-3 text-xs font-semibold uppercase text-gray-500">ITR</h3>
              {itrLinks.map(link => (<NavLink key={link.name} href={link.href} icon={link.icon}>{link.name}</NavLink>))}
            </nav>
          </div>
        </div>
      </div>
      {/* FIX 2: Added overflow-y-auto to make this column scrollable */}
      <div className="flex flex-col bg-gray-100/50 overflow-y-auto">
        <AdminHeader />
        {/* The padding is now handled by the layout */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}