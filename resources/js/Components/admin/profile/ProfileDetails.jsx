import React from 'react';
import { Mail, Phone, Globe, Pencil } from 'lucide-react'; // Replaced Language with Globe
import detailsData from '@/json/profileDetails.json';

const ProfileDetails = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Additional Details</h2>
        <button 
          className=" border text-red-600 hover:bg-red-100  p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center">
          <Mail size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{detailsData.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <Phone size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{detailsData.phone}</span>
        </div>

        {/* Languages */}
        <div className="flex items-center">
          <Globe size={18} className="text-gray-400 mr-2" /> {/* Using Globe Icon */}
          <span className="text-gray-700">
            {detailsData.languages.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;