// components/admin/UserNav.jsx
'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CircleUser, User, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import the router

export default function UserNav() {
    const router = useRouter(); // Initialize the router

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            // Redirect to the login page after signing out
            router.push('/admin/login');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors">
                <CircleUser className="h-5 w-5 text-gray-600" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900">Admin User</p>
                            <p className="text-sm text-gray-500 truncate">admin@example.com</p>
                        </div>
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}>
                                    <User className="mr-2 h-5 w-5" />
                                    Profile
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}>
                                    <Settings className="mr-2 h-5 w-5" />
                                    Settings
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleSignOut} // Add the click handler here
                                    className={`${active ? 'bg-red-50' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-red-600`}
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Sign Out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}