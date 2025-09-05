// components/admin/NotificationBell.jsx
"use client";

import { useState, useEffect, Fragment } from 'react';
import { Bell, FileText, CheckCircle, Mail } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Import the router

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const router = useRouter(); // Initialize the router

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/inquiries/notifications');
            if (response.ok) setNotifications(await response.json());
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleNotificationClick = async (notificationId) => {
        try {
            // Mark the specific notification as read
            await fetch(`/api/inquiries/${notificationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true }),
            });
            // Remove it from the local state
            setNotifications(prev => prev.filter(n => n._id !== notificationId));
            // Navigate to the inquiries page
            router.push('/inquiries');
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/api/inquiries/notifications', { method: 'POST' });
            setNotifications([]);
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="relative mt-1 text-slate-500 hover:text-slate-700 focus:outline-none">
                <Bell size={22} />
                {notifications.length > 0 && (
                    <motion.span
                        animate={{ scale: [1, 1.2, 1], transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" } }}
                        className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white border-2 border-white"
                    >
                        {notifications.length}
                    </motion.span>
                )}
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Menu.Items className="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <p className="text-sm font-bold text-gray-900">Notifications</p>
                        {notifications.length > 0 && (
                            <button onClick={markAllAsRead} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Mark all as read</button>
                        )}
                    </div>
                    <div className="py-1 max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <Menu.Item key={notif._id}>
                                    {({ active }) => (
                                        <button onClick={() => handleNotificationClick(notif._id)} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-start gap-4 px-4 py-3 text-sm text-left text-gray-700 transition-colors`}>
                                            <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"><FileText className="w-5 h-5 text-orange-500" /></div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">New Inquiry</p>
                                                <p className="text-gray-500">From <span className="font-semibold">{notif.name}</span>.</p>
                                                <p className="text-xs text-blue-500 mt-1">{formatTimeAgo(notif.createdAt)}</p>
                                            </div>
                                        </button>
                                    )}
                                </Menu.Item>
                            ))
                        ) : (
                            <div className="text-center py-12 px-4">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">You're all caught up!</h3>
                                <p className="mt-1 text-sm text-gray-500">No new notifications.</p>
                            </div>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}