import React, { useState } from 'react';
import { Briefcase, Clipboard, Gift } from 'lucide-react';

import JobInformation from '@/components/admincompany/jobpost/JobInformation';
import JobDescription from '@/components/admincompany/jobpost/JobDescription';
import PerksAndBenefits from '@/components/admincompany/jobpost/PerksAndBenefits';

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep(prev => prev + 1);
  const goToPreviousStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Post a Job</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between space-x-4 mb-6 p-5 border">
        <div 
          className={`flex items-center space-x-2  ${currentStep >= 1 ? 'text-red-500' : 'text-gray-500'}`}
        >
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <Briefcase size={18} strokeWidth={2} />
          </div>
          <span>Step 1/3<br/>Job Information</span>
        </div>
        <div className="w-px h-8 bg-gray-300" />
        <div 
          className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-red-500' : 'text-gray-500'}`}
        >
          <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
            <Clipboard size={18} strokeWidth={2} />
          </div>
          <span>Step 2/3<br/>Job Description</span>
        </div>
        <div className="w-px h-8 bg-gray-300" />
        <div 
          className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-red-500' : 'text-gray-500'}`}
        >
          <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
            <Gift size={18} strokeWidth={2} />
          </div>
          <span>Step 3/3<br/>Perks & Benefits</span>
        </div>
      </div>

      {/* Content Based on Current Step */}
      {currentStep === 1 && (
        <JobInformation onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 2 && (
        <JobDescription onNext={goToNextStep} onBack={goToPreviousStep} />
      )}
      {currentStep === 3 && (
        <PerksAndBenefits onNext={goToNextStep} onBack={goToPreviousStep} />
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-end">
        {currentStep > 1 && (
          <button
            onClick={goToPreviousStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 mr-2 rounded"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={goToNextStep}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PostJob;