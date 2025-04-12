import React, { useState } from 'react';
import MyProfile from '@/components/admin/settings/MyProfile';
import LoginDetails from '@/components/admin/settings/LoginDetails';
import { usePage } from '@inertiajs/react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('my-profile');
  const { candidat } = usePage().props;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabs */}
      <nav className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('my-profile')}
          className={`text-sm font-medium ${
            activeTab === 'my-profile' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setActiveTab('login-details')}
          className={`text-sm font-medium ${
            activeTab === 'login-details' ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
          }`}
        >
          Login Details
        </button>
      </nav>

      {/* Content */}
      <div>
        {activeTab === 'my-profile' && <MyProfile candidat={candidat} />}
        {activeTab === 'login-details' && <LoginDetails candidat={candidat} />}
      </div>
    </div>
  );
};

export default SettingsPage;