import React, { useState } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobDescription = () => {
  const [formData, setFormData] = useState({
    jobDescription: '',
    responsibilities: '',
    whoYouAre: '',
    niceToHaves: '',
  });

  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const getCharacterCount = (text) => text.length;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  const sections = [
    {
      id: 'jobDescription',
      title: 'Job Description',
      description: 'Describe the job title and what it entails.',
    },
    {
      id: 'responsibilities',
      title: 'Responsibilities',
      description: 'Outline the core responsibilities of the position.',
    },
    {
      id: 'whoYouAre',
      title: 'Who You Are',
      description: "Add your preferred candidates' qualifications.",
    },
    {
      id: 'niceToHaves',
      title: 'Nice-To-Haves',
      description: 'Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply.',
    },
  ];

  return (



    <div className="space-y-10">
        
      {sections.map((section) => (
        <div key={section.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left side: label and description */}
          <div>
            <h2 className="text-lg font-semibold mb-1">{section.title}</h2>
            <p className="text-sm text-gray-500">{section.description}</p>
          </div>

          {/* Right side: Quill editor */}
          <div>
            <Quill
              id={section.id}
              value={formData[section.id]}
              onChange={handleChange(section.id)}
              modules={quillModules}
              placeholder={`Enter ${section.title.toLowerCase()}...`}
              className="mt-2"
            />
            <div className="flex justify-end text-sm text-gray-500 mt-2">
              <span>{getCharacterCount(formData[section.id])} / 500</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobDescription;
