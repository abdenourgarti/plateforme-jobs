import React from 'react';
import { MapPin, Briefcase, Pencil } from 'lucide-react';
import profileData from '@/json/profileHeader.json'; // Your JSON data

const ProfileHeader = () => {
  const { 
    profilePhoto, 
    name, 
    jobTitle, 
    location, 
    workerStatus, 
    quickEdit 
  } = profileData;

  return (
    <div className="relative   overflow-hidden mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-400 to-purple-600" />

      <div className="relative p-8 md:p-12 flex justify-between items-center h-64 md:h-72">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Profile Photo */}
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <img 
              src={profilePhoto} 
              alt={name} 
              className="absolute inset-0 rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-white opacity-10" />
            
            {/* Quick Edit Button */}
            {quickEdit && (
              <button 
                className="absolute top-0 right-0 mt-2 mr-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md p-2"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">{name}</h1>
            <p className="text-lg md:text-xl text-white mt-1">{jobTitle}</p>
            <div className="flex items-center text-sm md:text-base text-white mt-2">
              <MapPin size={18} className="mr-1" />
              {location}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-4">
          {/* Status Indicator */}
          {workerStatus && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <Briefcase size={16} />
              <span>{workerStatus}</span>
            </button>
          )}

          {/* Edit Profile */}
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Pencil size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;