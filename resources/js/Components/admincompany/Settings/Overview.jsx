import React from 'react';
import { useForm } from '@inertiajs/react';
import { Camera } from 'lucide-react'; // Importing Camera icon from Lucide
import AboutCompanySection from './AboutCompanySection';



const Overview = () => {
    const { data, setData, post, processing, errors } = useForm({
        profilePhoto: null,
        fullName: 'Jake Gyll',
        phoneNumber: '+41 76 123 45 67',
        email: 'Jakegyll@gmail.com',
        dateOfBirth: '09/08/1997',
        gender: 'Male',
        accountType: 'job_seeker',
      
        // Missing fields added here
        companyName: '',
        website: '',
        location: [],
        employeeSize: '',
        industry: '',
        foundedDay: '',
        foundedMonth: '',
        foundedYear: '',
        techStack: [],
      });
      const removeLocation = (loc) => {
        setData("location", data.location.filter(l => l !== loc));
      };
      
      const addLocation = (loc) => {
        if (loc && !data.location.includes(loc)) {
          setData("location", [...data.location, loc]);
        }
      };
      
      const removeTech = (tech) => {
        setData("techStack", data.techStack.filter(t => t !== tech));
      };
      
      const addTech = (tech) => {
        if (tech && !data.techStack.includes(tech)) {
          setData("techStack", [...data.techStack, tech]);
        }
      };
    
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
            This is Company information that you can update anytime.
          </p>
    
          <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>
    
          {/* Profile Photo */}
          <div className="mt-4 flex items-start gap-8">
      {/* Left Section – Text */}
      <div className="w-1/2">
        <h3 className="text-sm font-medium mb-2">Company logo</h3>
        <p className="text-[15px] mt-3 text-gray-500">
          This image will be shown publicly <br/> as Company logo 
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
              <Camera size={32} className="text-red-400 mb-2" />
              <p className="text-sm text-gray-500">
               <span className='text-red-500'>Click to replace or drag and dro</span> p<br />
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
            <button className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300  p-2 mt-2">
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
          <h3 className="text-sm font-medium text-gray-800">Company Details</h3>
          <p className="text-[15px] mt-3 text-gray-500">
          Introduios your company core info quickly to users by fill up company details 
        </p>
        </div>
    
        {/* Right Section - Form Fields */}

        <div className="sm:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Company Name */}
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">Company Name</label>
    <input
      type="text"
      name="companyName"
      value={data.companyName}
      onChange={handleChange}
      className="mt-1 w-full border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>

  {/* Website */}
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">Website</label>
    <input
      type="text"
      name="website"
      value={data.website}
      onChange={handleChange}
      className="mt-1 w-full border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>

  {/* Location (Multi-select with tags) */}
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">Location</label>
    <div className="flex flex-wrap gap-2 mt-1">
      {data.location.map((loc, idx) => (
        <span key={idx} className="bg-red-100 text-red-600 px-2 py-1 text-sm  flex items-center gap-1">
          {loc}
          <button type="button" onClick={() => removeLocation(loc)}>×</button>
        </span>
      ))}
    </div>
    <select
      onChange={(e) => addLocation(e.target.value)}
      className="mt-2 w-full border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Add Location</option>
      <option value="England">England</option>
      <option value="Japan">Japan</option>
      <option value="Australia">Australia</option>
    </select>
  </div>

  {/* Employee */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Employee</label>
    <select
      name="employeeSize"
      value={data.employeeSize}
      onChange={handleChange}
      className="mt-1 w-full border border-gray-300  py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option>1 - 50</option>
      <option>51 - 200</option>
      <option>201 - 500</option>
    </select>
  </div>

  {/* Industry */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Industry</label>
    <select
      name="industry"
      value={data.industry}
      onChange={handleChange}
      className="mt-1 w-full border border-gray-300  py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option>Technology</option>
      <option>Finance</option>
      <option>Healthcare</option>
    </select>
  </div>

  {/* Date Founded */}
  <div className="col-span-2 flex gap-4">
    <div className="w-1/3">
      <label className="block text-sm font-medium text-gray-700">Day</label>
      <select
        name="foundedDay"
        value={data.foundedDay}
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {[...Array(31).keys()].map((d) => (
          <option key={d + 1}>{d + 1}</option>
        ))}
      </select>
    </div>
    <div className="w-1/3">
      <label className="block text-sm font-medium text-gray-700">Month</label>
      <select
        name="foundedMonth"
        value={data.foundedMonth}
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {["January", "February", "March", "April", "May", "June", "July"].map((m, i) => (
          <option key={i}>{m}</option>
        ))}
      </select>
    </div>
    <div className="w-1/3">
      <label className="block text-sm font-medium text-gray-700">Year</label>
      <input
        type="text"
        name="foundedYear"
        value={data.foundedYear}
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300  py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </div>

  {/* Tech Stack (Tags + Dropdown) */}
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
    <div className="flex flex-wrap gap-2 mt-1">
      {data.techStack.map((tech, idx) => (
        <span key={idx} className="bg-red-100 text-red-600 px-2 py-1 text-sm  flex items-center gap-1">
          {tech}
          <button type="button" onClick={() => removeTech(tech)}>×</button>
        </span>
      ))}
    </div>
    <select
      onChange={(e) => addTech(e.target.value)}
      className="mt-2 w-full border border-gray-300  py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Add Tech</option>
      <option value="HTML 5">HTML 5</option>
      <option value="CSS 3">CSS 3</option>
      <option value="Javascript">Javascript</option>
    </select>
  </div>
</div>

       
      </div>
    
      <div className='w-full bg-gray-300 rounded mt-4 mb-4 h-3'></div>

      <div className="App">
  
      <AboutCompanySection />
    </div>
    
    
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

export default Overview;