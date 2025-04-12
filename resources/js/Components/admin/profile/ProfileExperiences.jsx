import React, { useState } from 'react';
import { PlusCircle, Pencil, Calendar, MapPin } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileExperiences = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    id: '',
    titre: '',
    nom_entreprise: '',
    type_travail: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
    description: ''
  });

  const openAddModal = () => {
    reset();
    setIsAdding(true);
    setEditModalOpen(true);
  };

  const openEditModal = (experience) => {
    setData({
      id: experience.id,
      titre: experience.titre || '',
      nom_entreprise: experience.nom_entreprise || '',
      type_travail: experience.type_travail || '',
      date_debut: experience.date_debut || '',
      date_fin: experience.date_fin || '',
      lieu: experience.lieu || '',
      description: experience.description || ''
    });
    setCurrentExperience(experience);
    setIsAdding(false);
    setEditModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const experiences = candidat.experiences ? [...candidat.experiences] : [];
    
    if (isAdding) {
      // Adding a new experience
      experiences.push(data);
    } else {
      // Updating existing experience
      const index = experiences.findIndex(exp => exp.id === data.id);
      if (index !== -1) {
        experiences[index] = { ...experiences[index], ...data };
      }
    }
    
    router.put(route('candidat.profile.update'), {
      experiences: experiences
    }, {
      onSuccess: () => {
        setEditModalOpen(false);
        reset();
      }
    });
  };

  const workTypes = ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contrat'];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-6 border w-full md:w-2/3 mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experiences</h2>
        <button 
          onClick={openAddModal}
          className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Experiences List */}
      <div>
        {candidat.experiences && candidat.experiences.length > 0 ? (
          candidat.experiences.map((experience, index) => (
            <div key={experience.id || index} className="mb-6 last:mb-0">
              {/* Company Logo or Avatar */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-gray-500">
                    {experience.nom_entreprise?.charAt(0) || 'E'}
                  </span>
                </div>

                {/* Job Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{experience.titre}</h3>
                      <p className="text-gray-500 text-sm">
                        <span className="mr-2">{experience.nom_entreprise}</span>
                        <span className="text-xs text-gray-400">
                          <span className="mr-1">{experience.type_travail}</span>
                        </span>
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {formatDate(experience.date_debut)} - {formatDate(experience.date_fin)}
                        </span>
                      </div>
                      
                      {experience.lieu && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{experience.lieu}</span>
                        </div>
                      )}
                    </div>

                    {/* Edit Button */}
                    <button 
                      onClick={() => openEditModal(experience)}
                      className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  {experience.description && (
                    <p className="text-gray-600 mt-2 leading-relaxed">{experience.description}</p>
                  )}
                  </div>
              </div>

              {/* Separator */}
              {index !== candidat.experiences.length - 1 && (
                <hr className="my-4 border-t border-gray-200" />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No work experiences added</p>
        )}
      </div>

      {/* Experience Modal (Add/Edit) */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? 'Add Experience' : 'Edit Experience'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={data.titre}
                  onChange={e => setData('titre', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.titre && <div className="text-red-500 text-sm mt-1">{errors.titre}</div>}
              </div>
              
              {/* Company Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={data.nom_entreprise}
                  onChange={e => setData('nom_entreprise', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.nom_entreprise && <div className="text-red-500 text-sm mt-1">{errors.nom_entreprise}</div>}
              </div>
              
              {/* Work Type */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Work Type *</label>
                <select
                  value={data.type_travail}
                  onChange={e => setData('type_travail', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select work type</option>
                  {workTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type_travail && <div className="text-red-500 text-sm mt-1">{errors.type_travail}</div>}
              </div>
              
              {/* Start Date */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  value={data.date_debut}
                  onChange={e => setData('date_debut', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.date_debut && <div className="text-red-500 text-sm mt-1">{errors.date_debut}</div>}
              </div>
              
              {/* End Date (Optional) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  value={data.date_fin || ''}
                  onChange={e => setData('date_fin', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.date_fin && <div className="text-red-500 text-sm mt-1">{errors.date_fin}</div>}
              </div>
              
              {/* Location (Optional) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Location (Optional)</label>
                <input
                  type="text"
                  value={data.lieu || ''}
                  onChange={e => setData('lieu', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.lieu && <div className="text-red-500 text-sm mt-1">{errors.lieu}</div>}
              </div>
              
              {/* Description (Optional) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={data.description || ''}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-32"
                />
                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
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

export default ProfileExperiences;