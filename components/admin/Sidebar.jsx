// components/admin/Sidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, BarChart3, Users, Briefcase, ChevronDown, Building, FileUp, List, Landmark, FileWarning, Newspaper, Handshake } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navGroups = [
  {
    name: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Consultant Paid', href: '/consultant-paid', icon: Users },
      { name: 'Inquiries', href: '/inquiries', icon: FileText },
    ]
  },
  {
    name: 'REGISTRATION',
    items: [
      { name: 'Company Registration', href: '/company-registration', icon: Building },
      { name: 'Director Details', href: '/director-details', icon: Users },
      { name: 'MSME', href: '/msme', icon: Briefcase },
    ]
  },
  {
    name: 'ITR',
    items: [
      { name: 'Defective ITR', href: '/defective-itr', icon: FileWarning },
      { name: 'ITR', href: '/itr', icon: FileText },
    ]
  },
  {
    name: 'OTHERS',
    items: [
      { name: 'Blog', href: '/blog-admin', icon: Newspaper },
      { name: 'Channel Partner', href: '/channel-partner', icon: Handshake },
      { name: 'File Uploading', href: '/file-uploading', icon: FileUp },
      { name: 'ITR Filling', href: '/itr-filling', icon: List },
      { name: 'Payment', href: '/payment', icon: Landmark },
    ]
  }
];


const Sidebar = () => {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState(['Main', 'REGISTRATION', 'ITR', 'OTHERS']);

  const toggleGroup = (groupName) => {
    setOpenGroups(prev => 
      prev.includes(groupName) ? prev.filter(g => g !== groupName) : [...prev, groupName]
    );
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex-col justify-between hidden lg:flex">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h2 className="text-xl font-bold text-white">Visual Admin</h2>
        </div>
        <nav className="space-y-4">
          {navGroups.map((group) => (
            <div key={group.name}>
              {group.name !== 'Main' ? (
                <button onClick={() => toggleGroup(group.name)} className="w-full flex justify-between items-center px-2 py-2 text-sm font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300">
                  {group.name}
                  <ChevronDown size={16} className={`transition-transform ${openGroups.includes(group.name) ? 'rotate-180' : ''}`} />
                </button>
              ) : null}
              <AnimatePresence>
                {openGroups.includes(group.name) && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {group.items.map((item) => (
                      <li key={item.name} className="mt-1">
                        <Link href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${pathname === item.href ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                          <item.icon size={20} />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
       <div className="mt-auto">
         <div className="border-t border-slate-700 pt-4">
            <p className="text-xs text-slate-500">&copy; 2025 LetsMakeCompany</p>
         </div>
       </div>
    </aside>
  );
};

export default Sidebar;
