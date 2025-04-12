import React, { useState } from 'react';
import { PlusCircle, Pencil, Calendar, School } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileEducations = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    id: '',
    titre: '',
    nom_etablissement: '',
    annee_debut: '',
    annee_fin: '',
    description: ''
  });

  const openAddModal = () => {
    reset();
    setIsAdding(true);
    setEditModalOpen(true);
  };

  const openEditModal = (education) => {
    setData({
      id: education.id,
      titre: education.titre || '',
      nom_etablissement: education.nom_etablissement || '',
      annee_debut: education.annee_debut || '',
      annee_fin: education.annee_fin || '',
      description: education.description || ''
    });
    setCurrentEducation(education);
    setIsAdding(false);
    setEditModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const educations = candidat.educations ? [...candidat.educations] : [];
    
    if (isAdding) {
      // Adding a new education
      educations.push(data);
    } else {
      // Updating existing education
      const index = educations.findIndex(edu => edu.id === data.id);
      if (index !== -1) {
        educations[index] = { ...educations[index], ...data };
      }
    }
    
    router.put(route('candidat.profile.update'), {
      educations: educations
    }, {
      onSuccess: () => {
        setEditModalOpen(false);
        reset();
      }
    });
  };

  // Generate years for the dropdown (50 years back from current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white p-6 border w-full md:w-2/3 mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <button 
          onClick={openAddModal}
          className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Education List */}
      <div>
        {candidat.educations && candidat.educations.length > 0 ? (
          candidat.educations.map((education, index) => (
            <div key={education.id || index} className="mb-6 last:mb-0">
              {/* Institution Logo or Avatar */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <School size={20} className="text-gray-500" />
                </div>

                {/* Education Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{education.titre}</h3>
                      <p className="text-gray-500 text-sm">
                        {education.nom_etablissement}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {education.annee_debut} - {education.annee_fin || 'Present'}
                        </span>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <button 
                      onClick={() => openEditModal(education)}
                      className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  {education.description && (
                    <p className="text-gray-600 mt-2 leading-relaxed">{education.description}</p>
                  )}
                </div>
              </div>

              {/* Separator */}
              {index !== candidat.educations.length - 1 && (
                <hr className="my-4 border-t border-gray-200" />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education history added</p>
        )}
      </div>

      {/* Education Modal (Add/Edit) */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? 'Add Education' : 'Edit Education'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Degree/Title */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Degree/Title *</label>
                <input
                  type="text"
                  value={data.titre}
                  onChange={e => setData('titre', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.titre && <div className="text-red-500 text-sm mt-1">{errors.titre}</div>}
              </div>
              
              {/* Institution Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Institution Name *</label>
                <input
                  type="text"
                  value={data.nom_etablissement}
                  onChange={e => setData('nom_etablissement', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errors.nom_etablissement && <div className="text-red-500 text-sm mt-1">{errors.nom_etablissement}</div>}
              </div>
              
              {/* Start Year */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Start Year *</label>
                <select
                  value={data.annee_debut}
                  onChange={e => setData('annee_debut', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select start year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.annee_debut && <div className="text-red-500 text-sm mt-1">{errors.annee_debut}</div>}
              </div>
              
              {/* End Year (Optional) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">End Year (Optional)</label>
                <select
                  value={data.annee_fin || ''}
                  onChange={e => setData('annee_fin', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select end year or leave blank if ongoing</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.annee_fin && <div className="text-red-500 text-sm mt-1">{errors.annee_fin}</div>}
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

export default ProfileEducations;