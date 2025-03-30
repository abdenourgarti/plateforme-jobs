import React from "react";

const CompanyBenefits = ({ benefits, jobs }) => {  // Add jobs to props
  return (
    <section className="mb-14 bg-gray-100 mt-1">
      <div className="flex justify-center  items-center">
        <div className="max-w-5xl mt-10 mb-10 w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              open jobs
            </h2>
            <a href="#" className="text-red-600 font-semibold hover:underline">
              Show all jobs →
            </a>
          </div>

          <div className="grid grid-cols-2   gap-8 mt-6">
            {jobs.map((job) => (  // Use the jobs prop instead of local state
              <div key={job.id} className="flex bg-white rounded-lg p-3 items-center space-x-4">
                {/* Logo */}
                <img 
                  src={`/images/logos/${job.logo}`} 
                  alt={job.company} 
                  className="w-12 h-12" 
                />

                {/* Job Details */}
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.company} • {job.location}</p>

                  {/* Job Tags */}
                  <div className="flex space-x-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm">
                      {job.type}
                    </span>
                    {job.categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-md text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBenefits;