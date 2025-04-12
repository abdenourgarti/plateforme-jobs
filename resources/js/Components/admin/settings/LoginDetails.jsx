import React from 'react';
import { useForm } from '@inertiajs/react';
import { showSuccessNotification, showErrorNotification } from '@/utils/notifications';

const LoginDetails = ({ candidat }) => {
  const emailForm = useForm({
    email: candidat?.email || '',
  });

  const passwordForm = useForm({
    old_password: '',
    new_password: '',
  });

  // Handle Email Update Submission
  const handleEmailUpdate = (e) => {
    e.preventDefault();
    emailForm.put(route('candidat.settings.email.update'), {
      preserveScroll: true,
      onSuccess: () => {
        showSuccessNotification('Email mis à jour avec succès!');
      },
      onError: () => {
        showErrorNotification('Erreur lors de la mise à jour de l\'email');
      }
    });
  };

  // Handle Password Update Submission
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    passwordForm.put(route('candidat.settings.password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        // Reset password fields on success
        passwordForm.reset();
        showSuccessNotification('Mot de passe mis à jour avec succès!');
      },
      onError: (errors) => {
        if (errors.old_password) {
          // Message spécifique pour mot de passe incorrect
          showErrorNotification(errors.old_password);
        } else {
          showErrorNotification('Erreur lors de la mise à jour du mot de passe');
        }
      }
    });
  };

  return (
    <div>
      {/* Basic Information */}
      <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
      <p className="text-sm text-gray-500">
        This is your login information that you can update anytime.
      </p>

      <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>

      {/* Update Email */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-6">
          
          {/* Left Section - Label */}
          <div className="sm:w-1/4">
            <h3 className="text-sm font-medium text-gray-800">Update Email</h3>
            <p className="text-xs text-gray-500 mt-1">
              Update your email address to make sure it is safe.
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="sm:w-3/4">
            <form onSubmit={handleEmailUpdate}>
              <input
                type="email"
                placeholder="Enter your new email"
                value={emailForm.data.email}
                onChange={(e) => emailForm.setData('email', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {emailForm.errors.email && <p className="text-red-500 text-xs">{emailForm.errors.email}</p>}

              <button
                type="submit"
                disabled={emailForm.processing}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                {emailForm.processing ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>

      {/* Update Password */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-6">

          {/* Left Section - Label */}
          <div className="sm:w-1/4">
            <h3 className="text-sm font-medium text-gray-800">New Password</h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage your password to make sure it is safe.
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="sm:w-3/4">
            <form onSubmit={handlePasswordUpdate}>

              {/* Old Password */}
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                placeholder="Enter your old password"
                value={passwordForm.data.old_password}
                onChange={(e) => passwordForm.setData('old_password', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {passwordForm.errors.old_password && (
                <p className="text-red-500 text-xs mt-1">{passwordForm.errors.old_password}</p>
              )}

              {/* New Password */}
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mt-4">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                value={passwordForm.data.new_password}
                onChange={(e) => passwordForm.setData('new_password', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {passwordForm.errors.new_password && (
                <p className="text-red-500 text-xs mt-1">{passwordForm.errors.new_password}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={passwordForm.processing}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                {passwordForm.processing ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
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