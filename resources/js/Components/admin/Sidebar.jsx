import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Home,
  ClipboardList,
  Briefcase,
  Building,
  Users,
  UserCircle,
  Settings,
  Search,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const isActive = (path) => {
    return window.location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-slate-100  h-screen">
      <div className="p-4  mt-8">
        <h2 className="text-xl font-semibold text-red-500"></h2>
      </div>

      <nav className="py-4 mt-9 bg-slate-100  rounded-lg">
        {/* Main Navigation */}
        <div>
          <Link
            href="/admin/dashboard"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/dashboard') ? 'active' : ''
            }`}
          >
            <Home size={20} className="mr-3 text-icon" />
            Dashboard
          </Link>

          <Link
            href="/admin/jobs"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/jobs') ? 'active' : ''
            }`}
          >
            <Briefcase size={20} className="mr-3 text-icon" />
            My Applications
          </Link>

          <Link
            href="/admin/findjob"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/findjob') ? 'active' : ''
            }`}
          >
            <Search size={20} className="mr-3 text-icon" />
            Find Jobs
          </Link>

          <Link
            href="/admin/users"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/users') ? 'active' : ''
            }`}
          >
            <Users size={20} className="mr-3 text-icon" />
            Browse Companies
          </Link>

          <Link
            href="/admin/profile"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/profile') ? 'active' : ''
            }`}
          >
            <UserCircle size={20} className="mr-3 text-icon" />
            My Public Profile
          </Link>
        </div>

        {/* Separator and Settings Section */}
        <div className="mt-4">
          <div className="w-56 h-[3px] bg-slate-200 mx-4"></div>
          <h2 className="ml-4 text-gray-400 mt-3 mb-4">Settings</h2>

          <Link
            href="/admin/settings"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/settings') ? 'active' : ''
            }`}
          >
            <Settings size={20} className="mr-3 text-icon" />
            Settings
          </Link>

          <Link
            href="/admin/help-center"
            className={`nav-link flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive('/admin/help-center') ? 'active' : ''
            }`}
          >
            <HelpCircle size={20} className="mr-3 text-icon" />
            Help Center
          </Link>

          <Link
            href="/logout"
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition duration-300 ease-in-out w-full"
          >
            <LogOut size={20} className="mr-3 text-red-600" />
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;