// components/admin/InquiryModal.jsx
"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, MessageSquare, Send, Loader2, User, Mail, Phone, MapPin } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, inquiry, onAddRemark }) {
  const [newRemark, setNewRemark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!inquiry) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRemark.trim()) return;

    setIsSubmitting(true);
    const success = await onAddRemark(inquiry._id, newRemark.trim());
    if (success) {
      setNewRemark("");
    }
    setIsSubmitting(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 flex justify-between items-center">
                  Inquiry Details
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} /></button>
                </Dialog.Title>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side: Details & Message */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700 border-b pb-2">Client Information</h4>
                        <div className="flex items-center gap-3"><User size={16} className="text-gray-500" /><span className="font-medium">{inquiry.name}</span></div>
                        <div className="flex items-center gap-3"><Mail size={16} className="text-gray-500" /><span>{inquiry.email}</span></div>
                        <div className="flex items-center gap-3"><Phone size={16} className="text-gray-500" /><span>{inquiry.phone}</span></div>
                        <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-500" /><span>{inquiry.state || 'N/A'}</span></div>

                        <h4 className="font-semibold text-gray-700 border-b pb-2 pt-4">Original Message</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md min-h-[100px]">{inquiry.message || 'No message provided.'}</p>
                    </div>

                    {/* Right Side: Remarks */}
                    <div>
                        <h4 className="font-semibold text-gray-700 border-b pb-2">Internal Remarks</h4>
                        <div className="mt-4 max-h-60 overflow-y-auto pr-2 space-y-3">
                            {inquiry.remarks && inquiry.remarks.length > 0 ? (
                                inquiry.remarks.map((remark, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">{remark}</p>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 py-4">No remarks yet.</p>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="relative">
                                <textarea
                                value={newRemark}
                                onChange={(e) => setNewRemark(e.target.value)}
                                placeholder="Add a new remark..."
                                rows="3"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-12 p-2"
                                disabled={isSubmitting}
                                />
                                <button type="submit" className="absolute top-2 right-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300" disabled={isSubmitting || !newRemark.trim()}>
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}   