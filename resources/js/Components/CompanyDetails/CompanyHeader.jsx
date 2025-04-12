import React from "react";
import { Link } from "@inertiajs/react";
import { Briefcase, Flame, Users, MapPin, Building } from "lucide-react";

const CompanyHeader = ({ company }) => {
  // Formatage de la date pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  // Gestion du logo
  const logoUrl = company.logo 
    ? `/images/logos/${company.logo}` 
    : '/images/logos/Stripe.jpg';

  return (
    <div className="bg-gray-50 p-6 rounded-lg container px-4 md:px-44 border">
      {/* Breadcrumb Navigation */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">Home</Link> / 
        <Link href="/companies" className="hover:underline"> Companies</Link> / 
        <span className="text-gray-800 font-semibold"> {company.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row items-center md:space-x-4">
        <img src={logoUrl} alt={company.name} className="w-20 h-20 md:w-40 md:h-40 object-contain" />
        
        <div className="flex flex-col mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row md:space-x-5 items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">{company.name}</h2>
            
            <span className="text-red-500 border text-sm px-2 py-1 mt-2 md:mt-0">
              {company.jobs_count} Jobs
            </span>
          </div>

          {company.website && (
            <div className="mt-2">
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline text-sm block">
                {company.website}
              </a>
            </div>
          )}
{console.log('company', company)}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
            <p className="flex items-center">
              <Flame size={25} className="mr-1 p-1 w-10 h-10 text-blue-500 rounded-full bg-white" />
              <span>
                <strong className="block">Founded:</strong>
                {formatDate(company.founded)}
              </span>
            </p>
            
            <p className="flex items-center">
              <Users size={25} className="mr-1 p-1 w-10 h-10 text-blue-500 rounded-full bg-white" />
              <span>
                <strong className="block">Employees:</strong>
                {company.employees || 'N/A'}
              </span>
            </p>
            
            <p className="flex items-center">
              <MapPin size={25} className="mr-1 p-1 w-10 h-10 text-blue-500 rounded-full bg-white" />
              <span>
                <strong className="block">Location:</strong>
                {company.canton}
              </span>
            </p>
            
            <p className="flex items-center">
              <Building size={25} className="mr-1 p-1 w-10 h-10 text-blue-500 rounded-full bg-white" />
              <span>
                <strong className="block">Industry:</strong>
                {company.domaine || 'N/A'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;