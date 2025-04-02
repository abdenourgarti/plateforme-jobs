import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import loginImage from '../../../../public/images/login.webp';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    Inertia.post(route('login'), formData);
    // Ajoutez ici votre logique de connexion
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Partie gauche - Image unique avec hauteur et largeur fixes */}
      <div className="hidden md:block md:w-1/3 relative bg-white">
        <img 
          src={loginImage}
          alt="Login side image"
          className="h-screen w-full object-cover object-center"
        />
      </div>
      
      {/* Partie droite avec formulaire - Fond blanc */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            {/* <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="pb-2 text-gray-800 border-b-2 border-red-500 font-medium">
                Job Seeker
              </a>
              <a href="#" className="pb-2 text-gray-500 hover:text-gray-800 font-medium">
                Company
              </a>
            </div> */}
            <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
            
            <a href='/auth/google' className="w-full bg-white border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center mb-4 hover:bg-gray-50 transition duration-200">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.8,10.4h-0.75v0h-9v3.75h5.41c-0.79,2.4-2.99,3.75-5.41,3.75c-3.31,0-6-2.69-6-6s2.69-6,6-6 c1.44,0,2.79,0.53,3.85,1.5l2.65-2.65C16.46,2.66,14.33,1.75,12,1.75c-5.25,0-9.5,4.25-9.5,9.5s4.25,9.5,9.5,9.5 c4.77,0,9.1-3.75,9.1-9.5C21.1,10.94,20.97,10.66,21.8,10.4z" fill="#4285F4"></path>
                </g>
              </svg>
              <span className="ml-2 text-sm">Login with Google</span>
            </a>
            
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="mx-4 text-gray-500 text-xs">Or login with email</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center text-sm mb-4">
            <span className="text-gray-600">Don't have an account?</span>
            <a href="/register" className="ml-1 text-red-500 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;