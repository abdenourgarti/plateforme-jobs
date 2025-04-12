
import React, { useState } from 'react';
import { Mail, Phone, Globe, Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileDetails = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const { data, setData, post, processing, errors } = useForm({
    email: candidat.email || '',
    telephone: candidat.telephone || '',
    langues: candidat.langues || ''
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
        <h2 className="text-xl font-semibold">Additional Details</h2>
        <button 
          onClick={() => setEditModalOpen(true)}
          className="border text-red-600 hover:bg-red-100 p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center">
          <Mail size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{candidat.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <Phone size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{candidat.telephone || 'Not specified'}</span>
        </div>

        {/* Languages */}
        <div className="flex items-center">
          <Globe size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-700">
            {candidat.langues || 'Not specified'}
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={data.telephone}
                  onChange={e => setData('telephone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.telephone && <div className="text-red-500 text-sm mt-1">{errors.telephone}</div>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Languages</label>
                <input
                  type="text"
                  value={data.langues}
                  onChange={e => setData('langues', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g. English, French, German"
                />
                {errors.langues && <div className="text-red-500 text-sm mt-1">{errors.langues}</div>}
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

export default ProfileDetails;