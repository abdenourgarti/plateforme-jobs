import React from "react";
import { Link } from "@inertiajs/react";

const CompanyBenefits = ({ benefits, jobs }) => {
  return (
    <section className="mb-14 bg-gray-100 mt-1">
      <div className="flex justify-center items-center">
        <div className="max-w-5xl mt-10 mb-10 w-full px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Open Jobs
            </h2>
            {jobs.length > 0 && (
              <Link href={`/offres`} className="text-red-600 font-semibold hover:underline">
                Show all jobs →
              </Link>
            )}
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {jobs.map((job) => (
                <Link 
                  key={job.id} 
                  href={`/offres/${job.id}`}
                  className="flex bg-white rounded-lg p-3 items-center space-x-4 hover:shadow-md transition-shadow"
                >
                  {/* Logo */}
                  <img 
                    src={job.logo ? `/storage/${job.logo}` : '/images/logos/Stripe.jpg'} 
                    alt={job.company} 
                    className="w-12 h-12 object-contain" 
                  />

                  {/* Job Details */}
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-gray-500">{job.canton} • {job.location || 'Remote'}</p>

                    {/* Job Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm">
                        {job.type || 'Full-time'}
                      </span>
                      
                        <span                       
                          className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-md text-sm"
                        >
                          {job.categorie}
                        </span>
                      
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">No open jobs available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyBenefits;