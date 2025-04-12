import React from 'react';
import { useForm } from '@inertiajs/react';

const SocialLinks = () => {
  const { data, setData, post, processing, errors } = useForm({
    instagram: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  });

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/update-social-links', {
      onSuccess: () => {
        alert('Social links updated successfully!');
      },
    });
  };

  return (


    <div className="mt-4 flex gap-28">

        <div className=''> <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
      <p className="text-sm text-gray-500">
        Add elsewhere links <br /> to your company profile. <br /> You can add only usernames <br /> without full HTTPS links.
      </p></div>

  
  <div>
    
     <form onSubmit={handleSubmit} className="mt-6">
        {/* Instagram */}
        <div className="mb-4 w-[750px]">
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            placeholder="Enter your Instagram username"
            value={data.instagram}
            onChange={(e) => setData('instagram', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.instagram && (
            <p className="text-red-500 text-xs mt-1">{errors.instagram}</p>
          )}
        </div>

        {/* Twitter */}
        <div className="mb-4">
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            placeholder="Enter your Twitter username"
            value={data.twitter}
            onChange={(e) => setData('twitter', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.twitter && (
            <p className="text-red-500 text-xs mt-1">{errors.twitter}</p>
          )}
        </div>

        {/* Facebook */}
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            placeholder="Enter your Facebook username"
            value={data.facebook}
            onChange={(e) => setData('facebook', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.facebook && (
            <p className="text-red-500 text-xs mt-1">{errors.facebook}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="text"
            id="linkedin"
            placeholder="Enter your LinkedIn username"
            value={data.linkedin}
            onChange={(e) => setData('linkedin', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
          )}
        </div>

        {/* YouTube */}
        <div className="mb-4">
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
            YouTube
          </label>
          <input
            type="text"
            id="youtube"
            placeholder="Enter your YouTube username"
            value={data.youtube}
            onChange={(e) => setData('youtube', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.youtube && (
            <p className="text-red-500 text-xs mt-1">{errors.youtube}</p>
          )}
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          disabled={processing}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
        >
          {processing ? 'Saving...' : 'Save Changes'}
        </button>
      </form></div>

      {/* Social Links Form */}
     
    </div>
  );
};

export default SocialLinks;