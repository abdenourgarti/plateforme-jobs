import React, { useState } from 'react';
import { Instagram, Twitter, Globe, Facebook, Linkedin, Youtube, Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileSocialLinks = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const { data, setData, post, processing, errors } = useForm({
    instagram: candidat.instagram || '',
    facebook: candidat.facebook || '',
    linkedin: candidat.linkedin || '',
    twitter: candidat.twitter || '',
    youtube: candidat.youtube || '',
    portfolio: candidat.portfolio || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route('candidat.profile.update'), data, {
      onSuccess: () => {
        setEditModalOpen(false);
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Social Links</h2>
        <button 
          onClick={() => setEditModalOpen(true)}
          className="border text-red-600 hover:bg-red-100 p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Instagram */}
        {candidat.instagram && (
          <div className="flex items-center">
            <Instagram size={18} className="text-gray-500 mr-2" />
            <a href={candidat.instagram} className="text-red-500 hover:underline">
              {candidat.instagram}
            </a>
          </div>
        )}

        {/* Facebook */}
        {candidat.facebook && (
          <div className="flex items-center">
            <Facebook size={18} className="text-gray-500 mr-2" />
            <a href={candidat.facebook} className="text-red-500 hover:underline">
              {candidat.facebook}
            </a>
          </div>
        )}

        {/* LinkedIn */}
        {candidat.linkedin && (
          <div className="flex items-center">
            <Linkedin size={18} className="text-gray-500 mr-2" />
            <a href={candidat.linkedin} className="text-red-500 hover:underline">
              {candidat.linkedin}
            </a>
          </div>
        )}

        {/* Twitter */}
        {candidat.twitter && (
          <div className="flex items-center">
            <Twitter size={18} className="text-gray-500 mr-2" />
            <a href={candidat.twitter} className="text-red-500 hover:underline">
              {candidat.twitter}
            </a>
          </div>
        )}

        {/* YouTube */}
        {candidat.youtube && (
          <div className="flex items-center">
            <Youtube size={18} className="text-gray-500 mr-2" />
            <a href={candidat.youtube} className="text-red-500 hover:underline">
              {candidat.youtube}
            </a>
          </div>
        )}

        {/* Portfolio */}
        {candidat.portfolio && (
          <div className="flex items-center">
            <Globe size={18} className="text-gray-500 mr-2" />
            <a href={candidat.portfolio} className="text-red-500 hover:underline">
              {candidat.portfolio}
            </a>
          </div>
        )}

        {/* No social links message */}
        {!candidat.instagram && !candidat.facebook && !candidat.linkedin && 
         !candidat.twitter && !candidat.youtube && !candidat.portfolio && (
          <p className="text-gray-500">No social links added</p>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Social Links</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Instagram</label>
                <input
                  type="url"
                  value={data.instagram}
                  onChange={e => setData('instagram', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Facebook</label>
                <input
                  type="url"
                  value={data.facebook}
                  onChange={e => setData('facebook', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://facebook.com/username"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={data.linkedin}
                  onChange={e => setData('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Twitter</label>
                <input
                  type="url"
                  value={data.twitter}
                  onChange={e => setData('twitter', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://twitter.com/username"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">YouTube</label>
                <input
                  type="url"
                  value={data.youtube}
                  onChange={e => setData('youtube', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://youtube.com/c/username"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Portfolio Website</label>
                <input
                  type="url"
                  value={data.portfolio}
                  onChange={e => setData('portfolio', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  {processing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSocialLinks;