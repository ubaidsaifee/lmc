// app/(admin)/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  Users, HelpCircle, FileText, Briefcase, Award, ChevronDown, Loader2, Building, UserCheck, AlertTriangle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- Reusable Components ---

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform transform hover:-translate-y-1">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="text-white" size={28} />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DataSection = ({ title, icon: Icon, children, data, isLoading, isImplemented = false, viewMoreLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-left transition-colors"
      >
        <div className="flex items-center gap-3">
            <Icon className="text-indigo-600" size={20} />
            <span>{title}</span>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={24}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200">
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>
                ) : !isImplemented ? (
                  <p className="text-center text-gray-500 p-8">This section is coming soon!</p>
                ) : data && data.length > 0 ? (
                  children
                ) : (
                  <p className="text-center text-gray-500 p-8">No data available yet.</p>
                )}
              </div>
              {/* --- "SHOW MORE" LINK ADDED HERE --- */}
              {isImplemented && data && data.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                  <Link href={viewMoreLink} className="flex items-center justify-end gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                    Show More <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Main Dashboard Component ---
export default function DashboardPage() {
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/inquiries');
        if (!response.ok) throw new Error('Failed to fetch inquiries');
        const data = await response.json();
        setInquiries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Users" value={isLoading ? '...' : users.length} icon={Users} color="bg-blue-500" />
        <StatCard title="Questions" value="0" icon={HelpCircle} color="bg-green-500" />
        <StatCard title="Inquiries" value={isLoading ? '...' : inquiries.length} icon={FileText} color="bg-orange-500" />
        <StatCard title="Consultancy" value="0" icon={Briefcase} color="bg-purple-500" />
        <StatCard title="Orders" value="0" icon={Award} color="bg-pink-500" />
      </div>

      <div className="space-y-4">
        <DataSection title="User Table" icon={Users} data={users} isLoading={isLoading} isImplemented={false} viewMoreLink="/users" />

        <DataSection title="Inquiries" icon={FileText} data={inquiries} isLoading={isLoading} isImplemented={true} viewMoreLink="/inquiries">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Contact</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{inquiry.name}</td>
                    <td className="p-3 text-gray-600">{inquiry.email}</td>
                    <td className="p-3 text-gray-600">{inquiry.status}</td>
                    <td className="p-3 text-gray-600">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataSection>

        <DataSection title="Questions" icon={HelpCircle} data={[]} isLoading={false} isImplemented={false} viewMoreLink="/questions" />
        <DataSection title="Consultancy Paid" icon={UserCheck} data={[]} isLoading={false} isImplemented={false} viewMoreLink="/consultant-paid" />
        <DataSection title="MSME Registration" icon={Briefcase} data={[]} isLoading={false} isImplemented={false} viewMoreLink="/msme" />
        <DataSection title="Defective ITR Correction" icon={AlertTriangle} data={[]} isLoading={false} isImplemented={false} viewMoreLink="/defective-itr" />
        <DataSection title="Company Registration" icon={Building} data={[]} isLoading={false} isImplemented={false} viewMoreLink="/company-registration" />
      </div>
    </div>
  );
}