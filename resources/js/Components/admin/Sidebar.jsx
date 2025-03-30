import React from 'react';
import { Link } from '@inertiajs/react';
import { Home, ClipboardList, Building, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-red-500">Admin Panel</h2>
      </div>

      <nav className="py-4">
        <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Home size={20} className="mr-3 text-gray-500" /> Dashboard
        </Link>
        <Link href="/admin/jobs" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <ClipboardList size={20} className="mr-3 text-gray-500" /> Manage Jobs
        </Link>
        <Link href="/admin/companies" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Building size={20} className="mr-3 text-gray-500" /> Companies
        </Link>
        <Link href="/admin/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Users size={20} className="mr-3 text-gray-500" /> Users
        </Link>
        <Link href="/admin/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Settings size={20} className="mr-3 text-gray-500" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
