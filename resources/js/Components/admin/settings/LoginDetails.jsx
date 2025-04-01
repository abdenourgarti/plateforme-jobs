import React from 'react';
import { useForm } from '@inertiajs/react';

const LoginDetails = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '', // For updating email
    old_password: '', // For changing password
    new_password: '', // For changing password
  });

  // Handle Email Update Submission
  const handleEmailUpdate = (e) => {
    e.preventDefault();
    post('/update-email', {
      onSuccess: () => {
        alert('Email updated successfully!');
      },
    });
  };

  // Handle Password Update Submission
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    post('/update-password', {
      onSuccess: () => {
        alert('Password updated successfully!');
      },
    });
  };

  return (
    <div>
      {/* Basic Information */}
      <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
      <p className="text-sm text-gray-500">
        This is your login information that you can update anytime.
      </p>

      {/* Update Email */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Update Email</h3>
        <p className="text-xs text-gray-500">
          Update your email address to make sure it is safe.
        </p>
        <form onSubmit={handleEmailUpdate} className="mt-4">
          <input
            type="email"
            placeholder="Enter your new email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          <button
            type="submit"
            disabled={processing}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Update Email
          </button>
        </form>
      </div>

      {/* Update Password */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">New Password</h3>
        <p className="text-xs text-gray-500">
          Manage your password to make sure it is safe.
        </p>
        <form onSubmit={handlePasswordUpdate} className="mt-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Enter your old password"
            value={data.old_password}
            onChange={(e) => setData('old_password', e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.old_password && <p className="text-red-500 text-xs">{errors.old_password}</p>}

          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mt-4">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={data.new_password}
            onChange={(e) => setData('new_password', e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.new_password && <p className="text-red-500 text-xs">{errors.new_password}</p>}

          <button
            type="submit"
            disabled={processing}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Close Account */}
      <div className="mt-6 text-right">
        <button
          type="button"
          className="bg-white hover:bg-gray-100 text-red-500 border border-red-500 rounded-full p-2 flex items-center space-x-2"
        >
          <span>Close Account</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
            <path fillRule="evenodd" d="M1.32 11.4L10 2.72m1.41 1.4a4 4 0 015.36 0l10.32 10.32m-7.68-7.68a4 4 0 015.36 0L22.68 22.68" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginDetails;