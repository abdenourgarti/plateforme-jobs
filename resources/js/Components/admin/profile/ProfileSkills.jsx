import React from 'react';
import { PlusCircle, Pencil } from 'lucide-react';
import skillsData from '@/json/profileSkills.json';

const ProfileSkills = () => {
  return (
    <div className="bg-white p-6 border w-2/3 mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex space-x-2">
          <button 
            className="bg-white hover:bg-gray-100 text-red-500 border border-red-500 rounded-full p-2"
          >
            <PlusCircle size={16} />
          </button>
          <button 
            className="bg-white hover:bg-gray-100 text-red-500 border border-red-500 rounded-full p-2"
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-red-500 px-3 py-1 rounded-md text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;