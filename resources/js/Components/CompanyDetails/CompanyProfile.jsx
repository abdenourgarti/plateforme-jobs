import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const CompanyProfile = ({ company }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container px-44 p-6 bg-white rounded-lg shadow-md">
      {/* Left Side */}
      <div className="md:col-span-2 space-y-6">
        {/* Company Profile */}
        <div>
          <h2 className="text-2xl font-bold">Company Profile</h2>
          <p className="text-gray-600 mt-2">{company.description || "No description available."}</p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold">Contact</h3>
          <div className="flex space-x-4 mt-2">
            {company.social_links?.twitter && (
              <a
                href={company.social_links.twitter}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-500 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={16} /> <span>Twitter</span>
              </a>
            )}
            {company.social_links?.facebook && (
              <a
                href={company.social_links.facebook}
                className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={16} /> <span>Facebook</span>
              </a>
            )}
            {company.social_links?.linkedin && (
              <a
                href={company.social_links.linkedin}
                className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-900 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} /> <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          {company.gallery?.length > 0 ? (
            company.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Company ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
            ))
          ) : (
            <p className="text-gray-600">No images available.</p>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        {/* Tech Stack */}
        <div>
          <h3 className="text-xl font-semibold">Tech Stack</h3>
          <p className="text-gray-600 mt-2">Technologies used at {company.name}:</p>
          <ul className="list-disc pl-4 text-gray-700">
            {company.tech_stack?.length > 0 ? (
              company.tech_stack.map((tech, index) => <li key={index}>{tech}</li>)
            ) : (
              <p className="text-gray-600">No tech stack listed.</p>
            )}
          </ul>
        </div>

        {/* Separator */}
        <div className="h-0.5 bg-gray-300"></div>

        {/* Office Locations */}
        <div>
          <h3 className="text-xl font-semibold">Office Locations</h3>
          <p className="text-gray-600 mt-2">Operating in {company.locations?.length || 0} countries.</p>
          <ul className="list-disc pl-4 text-gray-700">
            {company.locations?.length > 0 ? (
              company.locations.map((loc, index) => <li key={index}>{loc}</li>)
            ) : (
              <p className="text-gray-600">No locations listed.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
