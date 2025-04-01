import React from 'react';
import { PlusCircle, Pencil } from 'lucide-react';
import experiencesData from '@/json/profileExperiences.json';

const ProfileExperiences = () => {
  return (
    <div className="bg-white p-6 border w-2/3 mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experiences</h2>
        <button 
          className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Experiences List */}
      <div>
        {experiencesData.map((experience, index) => (
          <div key={index} className="mb-6 last:mb-0">
            {/* Company Logo or Avatar */}
            <div className="flex items-center space-x-4">
              {experience.logo ? (
                <img 
                  src={experience.logo} 
                  alt={experience.company} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-500">{experience.company.charAt(0)}</span>
                </div>
              )}

              {/* Job Details */}
              <div>
                <h3 className="text-lg font-semibold">{experience.title}</h3>
                <p className="text-gray-500 text-sm">
                  <span className="mr-2">{experience.company}</span>
                  <span className="text-xs text-gray-400">
                    <span className="mr-1">{experience.type}</span>
                    <span>{experience.dates}</span>
                  </span>
                </p>
                <p className="text-gray-600 mt-1">{experience.location}</p>
              </div>

              {/* Edit Button */}
              <button 
                className="ml-auto bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
              >
                <Pencil size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-2 leading-relaxed">{experience.description}</p>

            {/* Separator */}
            {index !== experiencesData.length - 1 && (
              <hr className="my-4 border-t border-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* Show More */}
      {experiencesData.length > 3 && (
        <div className="mt-4 text-red-500 text-sm font-medium cursor-pointer">
          Show {experiencesData.length - 3} more experiences
        </div>
      )}
    </div>
  );
};

export default ProfileExperiences;