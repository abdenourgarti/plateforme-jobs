import React from 'react'
import { Link, useForm } from '@inertiajs/react'

import {
  Home,
  Briefcase,
  Search,
  Users,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

const Sidebar = () => {
  const { post } = useForm();
  const isActive = (path) => {
    return window.location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    post(route('logout'));
};

  return (
    <div className="w-64 bg-slate-100 h-screen">
      <div className="p-4 mt-8">
        <h2 className="text-xl font-semibold text-red-500"></h2>
      </div>

      <nav className="py-4 mt-9 bg-slate-100 rounded-lg">
        {/* Main Navigation */}
        <div>
          <Link
            href="/candidat/dashboard"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/candidat/dashboard')
                ? 'bg-gray-200 text-orange-600 nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <Home size={20} className="mr-3 text-icon" />
            <p>Dashboard</p>
          </Link>

          <Link
            href="/admin/companyapp"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/companyapp')
                ? 'bg-gray-200 text-orange-600  nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <Briefcase size={20} className="mr-3 text-icon" />
            My Applications
          </Link>

          <Link
            href="/admin/findjob"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/findjob')
                ? 'bg-gray-200 text-orange-600  nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <Search size={20} className="mr-3 text-icon" />
            Find Jobs
          </Link>

          <Link
            href="/admin/browscompany"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/browscompany')
                ? 'bg-gray-200 text-orange-600  nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <Users size={20} className="mr-3 text-icon" />
            Browse Companies
          </Link>

          <Link
            href="/candidat/profile"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/profile')
                ? 'bg-gray-200 text-orange-600  nav-link'
                : 'hover:bg-gray-200'
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
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/settings')
                ? 'bg-gray-200 text-orange-600  nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <Settings size={20} className="mr-3 text-icon" />
            Settings
          </Link>

          <Link
            href="/admin/help-center"
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ease-in-out w-full ${
              isActive('/admin/help-center')
                ? 'bg-gray-200 text-red-500 nav-link'
                : 'hover:bg-gray-200'
            }`}
          >
            <HelpCircle size={20} className="mr-3 text-icon" />
            Help Center
          </Link>

          <div className="w-56 h-[22px] bg-slate-300 rounded mx-4"></div>

          {/* Footer */}
          <div className="mt-64 p-4 border-t border-slate-200">
            <button
            onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-md transition duration-300 ease-in-out w-full"
            >
              <LogOut size={20} className="mr-3 text-red-600" />
              Logout
            </button>

            <div className="flex items-center space-x-3 mt-4">
              <img
                src="/images/user/user-05.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Jake Gyll</p>
                <p className="text-sm text-gray-500">jakegyll@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
