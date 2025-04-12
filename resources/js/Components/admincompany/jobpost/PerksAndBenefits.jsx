import React, { useState } from 'react';
import { PlusCircle, XCircle, Award, Coffee } from 'lucide-react';

const PerksAndBenefits = ({ onNext, onBack, initialData }) => {
  const [perks, setPerks] = useState(initialData?.perks || [
    {
      id: 1,
      icon: "Award",
      title: 'Full Healthcare',
      description:
        'We believe in thriving communities and that starts with our team being happy and healthy.',
    },
    {
      id: 2,
      icon: "Coffee",
      title: 'Unlimited Vacation',
      description:
        'We believe you should have a flexible vacation policy that allows you to take time off when needed.',
    },
  ]);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award className="text-red-500" />;
      case 'Coffee':
        return <Coffee className="text-blue-500" />;
      default:
        return <PlusCircle className="text-green-500" />;
    }
  };

  const addPerk = () => {
    const newPerk = {
      id: perks.length + 1,
      icon: "PlusCircle",
      title: '',
      description: '',
    };
    setPerks((prev) => [...prev, newPerk]);
  };

  const removePerk = (id) => {
    setPerks((prev) => prev.filter((perk) => perk.id !== id));
  };

  const updatePerk = (id, field, value) => {
    setPerks((prev) =>
      prev.map((perk) =>
        perk.id === id ? { ...perk, [field]: value } : perk
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ perks });
  };

  return (
    <form id="step-3-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Title and description */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Perks & Benefits</h2>
          <p className="text-sm text-gray-500">
            Add up to 6 perks and benefits. You can reorder them later.
          </p>
        </div>

        {/* Right: Form inputs */}
        <div className="space-y-4">
          {perks.map((perk) => (
            <div
              key={perk.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                {renderIcon(perk.icon)}
                <input
                  type="text"
                  placeholder="Title"
                  value={perk.title}
                  onChange={(e) => updatePerk(perk.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                value={perk.description}
                onChange={(e) =>
                  updatePerk(perk.id, 'description', e.target.value)
                }
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
              
              <button
                type="button"
                onClick={() => removePerk(perk.id)}
                className="mt-2 text-red-500 hover:text-red-700 flex items-center space-x-1"
              >
                <XCircle size={16} />
                <span>Remove</span>
              </button>
            </div>
          ))}

          {/* Add Perk Button */}
          {perks.length < 6 && (
            <button
              type="button"
              onClick={addPerk}
              className="bg-red-500 hover:bg-red-600 text-white w-40 px-4 py-2 rounded flex items-center justify-center space-x-2"
            >
              <PlusCircle size={16} />
              <span>Add New Perk</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PerksAndBenefits;