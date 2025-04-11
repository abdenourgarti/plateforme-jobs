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

      <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>

      {/* Profile Photo */}
      <div className="mt-4 flex items-start gap-8">
  {/* Left Section – Text */}
  <div className="w-1/2">
    <h3 className="text-sm font-medium mb-2">Profile Photo</h3>
    <p className="text-lg text-gray-500">
      This image will be shown publicly <br/> as your profile picture <br/>It will help recruiters recognize you!
    </p>
  </div>



  {/* Right Section – Upload Box */}
  <div className="w-1/2">
    <div className="border-2 border-dashed border-red-600 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer text-center">
      {data.profilePhoto ? (
        <img
          src={URL.createObjectURL(data.profilePhoto)}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full"
        />
      ) : (
        <>
          <Camera size={32} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
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

    {errors.profilePhoto && (
      <p className="text-red-500 text-xs mt-2">{errors.profilePhoto}</p>
    )}
  </div>
</div>



<div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>

      {/* Personal Details */}
     
      <form onSubmit={handleSubmit} className="mt-6">
  <div className="flex flex-col sm:flex-row gap-6">
    
    {/* Left Section - Label */}
    <div className="sm:w-1/4">
      <h3 className="text-sm font-medium text-gray-800">Personal Details</h3>
    </div>

    {/* Right Section - Form Fields */}
    <div className="sm:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number *</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
        <select
          id="gender"
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
      </div>
    </div>
  </div>

  <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>


  {/* Save Button */}
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