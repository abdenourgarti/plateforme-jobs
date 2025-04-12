import React, { useState } from 'react';
import { PlusCircle, Pencil, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/inertia-react';

const ProfileSkills = ({ candidat }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const { data, setData, processing, errors } = useForm({
    competences: candidat.competences || []
  });

  const addSkill = () => {
    if (newSkill.trim() === '') return;
    
    setData('competences', [
      ...data.competences, 
      { designation: newSkill.trim() }
    ]);
    
    setNewSkill('');
  };

  const removeSkill = (index) => {
    const updatedSkills = [...data.competences];
    updatedSkills.splice(index, 1);
    setData('competences', updatedSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    router.put(route('candidat.profile.update'), {
      competences: data.competences
    }, {
      onSuccess: () => {
        setEditModalOpen(false);
      }
    });
  };

  return (
    <div className="bg-white p-6 border w-full md:w-2/3 mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button 
          onClick={() => setEditModalOpen(true)}
          className="bg-white hover:bg-gray-100 text-red-500 border border-red-500 rounded-full p-2"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {candidat.competences && candidat.competences.length > 0 ? (
          candidat.competences.map((skill, index) => (
            <span
              key={skill.id || index}
              className="bg-gray-100 text-red-500 px-3 py-1 rounded-md text-sm font-medium"
            >
              {skill.designation}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills added</p>
        )}
      </div>

      {/* Edit Skills Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Skills</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Add New Skill */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Add New Skill</label>
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l-md"
                    placeholder="e.g. JavaScript, Project Management, etc."
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Skills List */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Your Skills</label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-24">
                  {data.competences.length > 0 ? (
                    data.competences.map((skill, index) => (
                      <div 
                        key={index}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm font-medium flex items-center"
                      >
                        <span>{skill.designation}</span>
                        <button 
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No skills added yet</p>
                  )}
                </div>
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

export default ProfileSkills;