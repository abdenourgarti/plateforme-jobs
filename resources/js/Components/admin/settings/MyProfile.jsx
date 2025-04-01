import React from 'react';
import { useForm } from '@inertiajs/react';
import { Camera } from 'lucide-react'; // Importing Camera icon from Lucide

const MyProfile = () => {
  const { data, setData, post, processing, errors } = useForm({
    profilePhoto: null, // For uploading profile photo
    fullName: 'Jake Gyll',
    phoneNumber: '+41 76 123 45 67',
    email: 'Jakegyll@gmail.com',
    dateOfBirth: '09/08/1997',
    gender: 'Male',
    accountType: 'job_seeker',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  // Handle file upload for profile photo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('profilePhoto', file); // Store the file in the form data
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/update-profile', {
      onSuccess: () => {
        alert('Profile updated successfully!');
      },
    });
  };

  return (
    <div>
      {/* Basic Information */}
      <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
      <p className="text-sm text-gray-500">
        This is your personal information that you can update anytime.
      </p>

      {/* Profile Photo */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Profile Photo</h3>
        <p className="text-xs text-gray-500">
          This image will be shown publicly as your profile picture. It will help recruiters recognize you!
        </p>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 flex items-center justify-center cursor-pointer">
          {data.profilePhoto ? (
            <img
              src={URL.createObjectURL(data.profilePhoto)} // Preview uploaded image
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <>
              <Camera size={32} className="text-gray-400 mb-2" /> {/* Lucide Icon */}
              <p className="text-sm text-gray-500 text-center">
                Click to replace or drag and drop<br />
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="profile-photo-input"
          />
          <label htmlFor="profile-photo-input" className="cursor-pointer">
            <button className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2 mt-2">
              Upload Photo
            </button>
          </label>
        </div>
        {errors.profilePhoto && <p className="text-red-500 text-xs">{errors.profilePhoto}</p>}
      </div>

      {/* Personal Details */}
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Personal Details</h3>

          {/* Full Name */}
          <div className="mb-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div className="mb-2">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
          </div>

          {/* Gender */}
          <div className="mb-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>
        </div>

        {/* Account Type */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Account Type</h3>
          <p className="text-xs text-gray-500">
            You can update your account type
          </p>
          <div className="mt-2">
            {/* Job Seeker */}
            <div className="flex items-center mb-2">
              <input
                id="job_seeker"
                name="accountType"
                type="radio"
                value="job_seeker"
                checked={data.accountType === 'job_seeker'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="job_seeker" className="text-sm text-gray-700">
                Job Seeker
              </label>
              <p className="ml-2 text-xs text-gray-500">Looking for a job</p>
            </div>

            {/* Employer */}
            <div className="flex items-center">
              <input
                id="employer"
                name="accountType"
                type="radio"
                value="employer"
                checked={data.accountType === 'employer'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="employer" className="text-sm text-gray-700">
                Employer
              </label>
              <p className="ml-2 text-xs text-gray-500">Hiring, sourcing candidates, or posting jobs</p>
            </div>
          </div>
          {errors.accountType && <p className="text-red-500 text-xs">{errors.accountType}</p>}
        </div>

        {/* Save Changes Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={processing}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            {processing ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;