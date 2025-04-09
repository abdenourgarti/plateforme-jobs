import React, { useState } from 'react';
import loginImage from '../../../../public/images/login.webp';
import { Inertia } from '@inertiajs/inertia';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';


const Register = () => {

  const [typeSelect,setTypeSelect] = useState('candidat');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    type:typeSelect,
    nom_entreprise:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      type:typeSelect
    });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    console.log('Form submitted:', formData);
    Inertia.post(route('register'), formData);
    // Ajoutez ici votre logique d'inscription
  };




  return (
    <div className="flex h-screen overflow-hidden">
      {/* Partie gauche - Image unique avec hauteur et largeur fixes */}
      <div className="hidden md:block md:w-1/3 relative bg-white">
        <img 
          src={loginImage}
          alt="Register side image"
          className="h-screen w-full object-cover object-center"
        />
      </div>
      
      {/* Partie droite avec formulaire - Fond blanc */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center space-x-4 mb-8">
              <button onClick={()=>setTypeSelect('candidat')} className={`pb-2  font-medium ${typeSelect==="candidat" ? "border-b-2  border-red-500" : "text-gray-500"}`}>
                Job Seeker
              </button>
              <button onClick={()=>setTypeSelect('entreprise')} className={`pb-2  font-medium ${typeSelect==="entreprise" ? "border-b-2  border-red-500 " : "text-gray-500"}`}>
                Company
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-6">Get more opportunities</h1>
            
            <a href={`/auth/google`} className="w-full bg-white border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center mb-4 hover:bg-gray-50 transition duration-200">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.8,10.4h-0.75v0h-9v3.75h5.41c-0.79,2.4-2.99,3.75-5.41,3.75c-3.31,0-6-2.69-6-6s2.69-6,6-6 c1.44,0,2.79,0.53,3.85,1.5l2.65-2.65C16.46,2.66,14.33,1.75,12,1.75c-5.25,0-9.5,4.25-9.5,9.5s4.25,9.5,9.5,9.5 c4.77,0,9.1-3.75,9.1-9.5C21.1,10.94,20.97,10.66,21.8,10.4z" fill="#4285F4"></path>
                </g>
              </svg>
              <span className="ml-2 text-sm">Sign Up with Google</span>
            </a>
            
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="mx-4 text-gray-500 text-xs">Or sign up with email</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
{typeSelect==="candidat"&&            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>}
{typeSelect==="entreprise"         &&   <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
              <div className="flex space-x-2">
                <div className="w-full">
                  <input
                    type="text"
                    id="first_name"
                    name="nom_entreprise"
                    value={formData.nom_entreprise}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Company name"
                    required
                  />
                </div>

              </div>
            </div>}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="text-center text-sm mb-4">
            <span className="text-gray-600">Already have an account?</span>
            <a href="/login" className="ml-1 text-red-500 hover:underline">
              Login
            </a>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            By clicking 'Continue', you acknowledge that you have read and accept the 
            <a href="#" className="text-red-500 hover:underline ml-1">Terms of Service</a>
            <span> and </span>
            <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;