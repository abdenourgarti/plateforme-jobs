import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

const ProfileAbout = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const { data, setData, processing, errors } = useForm({
    about_me: candidat.about_me || ''
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
        <h2 className="text-xl font-semibold">About Me</h2>
        <button 
          onClick={() => setEditModalOpen(true)}
          className="border text-red-600 hover:bg-red-100 p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed">
        {candidat.about_me || 'No information provided'}
      </p>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit About Me</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">About Me</label>
                <textarea
                  value={data.about_me}
                  onChange={e => setData('about_me', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-32"
                />
                {errors.about_me && <div className="text-red-500 text-sm mt-1">{errors.about_me}</div>}
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

export default ProfileAbout;