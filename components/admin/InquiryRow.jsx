// components/admin/InquiryRow.jsx
"use client";

import { memo, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Trash2, FileText, Activity, CheckCircle } from 'lucide-react';
import ClientDate from './ClientDate';

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusClasses = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Follow Up": "bg-blue-100 text-blue-800 whitespace-nowrap",
    "Complete": "bg-green-100 text-green-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const InquiryRow = memo(function InquiryRow({ inquiry, onViewDetails, onStatusUpdate, onDelete }) {
  return (
    <tr 
      onClick={onViewDetails}
      className={`border-b border-slate-200 last:border-b-0 hover:bg-slate-100 transition cursor-pointer ${!inquiry.isRead ? 'bg-indigo-50 font-semibold' : ''}`}
    >
      <td className="p-4"><p className="text-slate-800">{inquiry.name}</p></td>
      <td className="p-4 text-slate-600">
        <p>{inquiry.email}</p>
        <p className="text-xs text-slate-500">{inquiry.phone}</p>
      </td>
      <td className="p-4 text-slate-600">{inquiry.state || 'N/A'}</td>
      <td className="p-4"><StatusBadge status={inquiry.status} /></td>
      <td className="p-4 text-slate-600"><ClientDate dateString={inquiry.createdAt} /></td>
      <td className="p-4 text-right min-w-[160px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-2">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    Status
                    <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
                </Menu.Button>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    {/* FIX: Changed classes to make menu open upwards, preventing it from being cut off at the bottom of the page */}
                    <Menu.Items className="origin-bottom-right absolute right-0 bottom-full mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        <Menu.Item>
                            <button onClick={() => onStatusUpdate(inquiry._id, 'Pending')} className='group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><FileText className="mr-3 h-5 w-5 text-yellow-500" /> Mark as Pending</button>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={() => onStatusUpdate(inquiry._id, 'Follow Up')} className='group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><Activity className="mr-3 h-5 w-5 text-blue-500" /> Mark for Follow Up</button>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={() => onStatusUpdate(inquiry._id, 'Complete')} className='group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><CheckCircle className="mr-3 h-5 w-5 text-green-500" /> Mark as Complete</button>
                        </Menu.Item>
                    </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <button
                onClick={() => onDelete(inquiry._id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                aria-label="Delete Inquiry"
            >
                <Trash2 size={18} />
            </button>
        </div>
      </td>
    </tr>
  );
});

export default InquiryRow;