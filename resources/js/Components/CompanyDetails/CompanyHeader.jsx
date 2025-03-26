import React from "react";
import { Link } from "@inertiajs/react";
import { Briefcase, Flame, Users, MapPin, Building } from "lucide-react";

const CompanyHeader = ({ company }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg container px-44  border">
      {/* Breadcrumb Navigation */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">Home</Link> / 
        <Link href="/companies" className="hover:underline"> Companies</Link> / 
        <span className="text-gray-800 font-semibold"> {company.name}</span>
      </nav>


      <div className="flex items-center space-x-4">

        <img src={`/images/logos/${company.logo}`} alt={company.name} className="w-40 h-40" />
        
        <div className="flex items-left flex-col space-x-3">
    
    <div className="flex space-x-5">
          <h2 className="text-3xl font-bold">{company.name}</h2>
          
 
          <span className="text-red-500 border text-sm px-2 py-1 ">
            {company.jobs_count} Jobs
            
          </span>
          </div>

          <div> <a href={company.website} className="text-red-500 hover:underline text-sm mt-1 ml-[-12px] block">
               {company.website}
          </a>
         </div>

      <div className="mt-4  flex space-x-20 text-gray-600">
        <p className="flex items-center"><Flame size={25} className="mr-1 p-1  w-10 h-10 text-blue-500 rounded-[100%]  bg-white " /> <p> <strong className="flex items-center">Founded:</strong>  {company.founded} </p> </p>
        <p className="flex items-center"><Users size={25} className="mr-1 p-1  w-10 h-10 text-blue-500 rounded-[100%]  bg-white " />  <p> <strong className="flex items-center">Founded:</strong>  {company.founded} </p></p>
        <p className="flex items-center"><MapPin size={25} className="mr-1 p-1  w-10 h-10 text-blue-500 rounded-[100%]  bg-white " />  <p> <strong className="flex items-center">Founded:</strong>  {company.founded} </p> </p>
        <p className="flex items-center"><Building size={25} className="mr-1 p-1  w-10 h-10 text-blue-500 rounded-[100%]  bg-white " />  <p> <strong className="flex items-center">Founded:</strong>  {company.founded} </p></p>
      </div>


        </div>
      </div>

    </div>
  );
};

export default CompanyHeader;
