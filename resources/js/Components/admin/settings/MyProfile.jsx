import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { showSuccessNotification, showErrorNotification } from '@/utils/notifications';

const MyProfile = ({ candidat }) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    fullName: candidat.nom_complet || '',
    phoneNumber: candidat.telephone || '',
    email: candidat.email || '',
    dateOfBirth: candidat.date_nessaince || '',
    gender: candidat.sexe || '',
  });
console.log('candidat', candidat);
  // Initialiser le formulaire avec les données du candidat
  // useEffect(() => {
  //   if (candidat) {
  //     reset({
  //       fullName: candidat.nom_complet || '',
  //       phoneNumber: candidat.telephone || '',
  //       email: candidat.email || '',
  //       dateOfBirth: candidat.date_nessaince || '',
  //       gender: candidat.sexe || '',
  //     });
  //   }
  // }, [candidat]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('candidat.settings.update'), {
      preserveScroll: true,
      onSuccess: () => {
        showSuccessNotification('Profil mis à jour avec succès!');
      },
      onError: () => {
        showErrorNotification('Erreur lors de la mise à jour du profil');
      }
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

      {/* Profile Photo - Skipping for now as requested */}
      <div className="mt-4 flex items-start gap-8">
        <div className="w-1/2">
          <h3 className="text-sm font-medium mb-2">Profile Photo</h3>
          <p className="text-lg text-gray-500">
            This image will be shown publicly <br/> as your profile picture <br/>It will help recruiters recognize you!
          </p>
        </div>

        <div className="w-1/2">
          <div className="border-2 border-dashed border-red-600 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer text-center">
            {candidat?.image ? (
              <img
                src={`/storage/${candidat.image}`}
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
          </div>
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

            {/* Email - Display only */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm bg-gray-100 sm:text-sm"
              />
              <p className="text-xs text-gray-500">Email can be updated in the Login Details tab</p>
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

            {/* Gender - Only M/F options */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
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