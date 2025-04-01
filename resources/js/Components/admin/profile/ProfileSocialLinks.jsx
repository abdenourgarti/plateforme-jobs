import React from 'react';
import { Instagram, Twitter, Globe , Pencil} from 'lucide-react';
import socialData from '@/json/profileSocialLinks.json';

const ProfileSocialLinks = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Social Links</h2>
        <button 
          className="border text-red-600 hover:bg-red-100  p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Instagram */}
        <div className="flex items-center">
          <Instagram size={18} className="text-gray-500 mr-2" />
          <a href={socialData.instagram} className="text-red-500 hover:underline">
            {socialData.instagram}
          </a>
        </div>

        {/* Twitter */}
        <div className="flex items-center">
          <Twitter size={18} className="text-gray-500 mr-2" />
          <a href={socialData.twitter} className="text-red-500 hover:underline">
            {socialData.twitter}
          </a>
        </div>

        {/* Website */}
        <div className="flex items-center">
          <Globe size={18} className="text-gray-500 mr-2" />
          <a href={socialData.website} className="text-red-500 hover:underline">
            {socialData.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialLinks;