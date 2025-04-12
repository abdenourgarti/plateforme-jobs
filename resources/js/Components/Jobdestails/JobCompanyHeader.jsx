import React from 'react';
import { Share2 } from "lucide-react";
import { div } from 'framer-motion/client';
import logoJob from "/public/images/logos/dropbox.png"
const JobCompanyHeader = ({ job }) => {

    return (

        <div className="bg-[#f9f9fb] py-6 px-4 rounded border border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src={logoJob} alt={job.titre} className="w-14 h-14 rounded" />
                <div>
                    <h2 className="text-xl font-bold">{job.titre}</h2>
                    <p className="text-sm text-gray-500">{job.company} • {job.location} • {job.type_travail}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="text-gray-400 hover:text-gray-600">
                 <Share2 size={20} />
                </button>
                <div className='w-2 h-6 rounded bg-blue-200 ' ></div>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                    Apply
                </button>
            </div>
        </div>
  
    );
};

export default JobCompanyHeader;
