import React from 'react';
import { Pencil } from 'lucide-react';
import aboutData from '@/json/profileAbout.json';

const ProfileAbout = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">About Me</h2>
        <button 
          className="border text-red-600 hover:bg-red-100  p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed">
        {aboutData.aboutText}
      </p>
    </div>
  );
};

export default ProfileAbout;