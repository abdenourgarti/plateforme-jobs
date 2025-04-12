import React, { useState } from 'react';
import { MapPin, Briefcase, Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileHeader = ({ candidat, cantons }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const { data, setData, post, processing, errors } = useForm({
    nom_complet: candidat.nom_complet || '',
    fonction: candidat.fonction || '',
    canton_id: candidat.canton_id || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route('candidat.profile.update'), {
      ...data
    }, {
      onSuccess: () => {
        setEditModalOpen(false);
      }
    });
  };

  const imageUrl = candidat.image 
    ? `/storage/${candidat.image}` 
    : '/images/user/user-05.jpg';

  return (
    <div className="relative overflow-hidden mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-400 to-purple-600" />
{console.log('candidat', candidat)}
      <div className="relative p-8 md:p-12 flex flex-col md:flex-row justify-between items-center h-auto md:h-72">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Photo */}
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <img 
              src={imageUrl}
              alt={candidat.nom_complet} 
              className="absolute inset-0 w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">{candidat.nom_complet}</h1>
            <p className="text-lg md:text-xl text-white mt-1">{candidat.fonction || 'No job title specified'}</p>
            <div className="flex justify-center md:justify-start items-center text-sm md:text-base text-white mt-2">
              <MapPin size={18} className="mr-1" />
              {candidat.canton?.nom || 'Location not specified'}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end space-y-4 mt-4 md:mt-0">
          {/* Edit Profile */}
          <button 
            onClick={() => setEditModalOpen(true)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Pencil size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.nom_complet}
                  onChange={e => setData('nom_complet', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.nom_complet && <div className="text-red-500 text-sm mt-1">{errors.nom_complet}</div>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={data.fonction}
                  onChange={e => setData('fonction', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.fonction && <div className="text-red-500 text-sm mt-1">{errors.fonction}</div>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Canton</label>
                <select
                  value={data.canton_id}
                  onChange={e => setData('canton_id', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select a canton</option>
                  {cantons.map(canton => (
                    <option key={canton.id} value={canton.id}>
                      {canton.nom}
                    </option>
                  ))}
                </select>
                {errors.canton_id && <div className="text-red-500 text-sm mt-1">{errors.canton_id}</div>}
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

export default ProfileHeader;