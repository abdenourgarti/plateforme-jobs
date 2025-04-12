import React, { useState } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const AboutCompanySection = () => {
  const [description, setDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const MAX_CHARACTERS = 500;

  const handleChange = (value) => {
    setDescription(value);
    setCharacterCount(value.length);
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-8">

      {/* Left side - Title and Description */}
      <div className="md:w-1/2">
        <h3 className="text-xl font-semibold text-gray-800">About Company</h3>
        <p className="mt-2 text-sm text-gray-600">
          Brief description for your company. URLs are hyperlinked.
        </p>
      </div>

      {/* Right side - Quill + Counter */}
      <div className="md:w-1/2 w-full">
        <div className="w-full">
          <Quill
            value={description}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
              ],
            }}
            placeholder="Nomad is part of the Information Technology Industry."
            className="bg-white rounded-md"
          />
        </div>

        {/* Character Count */}
        <div className="flex justify-end mt-2 text-sm text-gray-500">
          <span>{characterCount} / {MAX_CHARACTERS}</span>
        </div>
      </div>

    </div>
  );
};

export default AboutCompanySection;
