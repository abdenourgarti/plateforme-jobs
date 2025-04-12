import { useState, useEffect } from "react";

const LatestJobs = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(props.jobs);
  }, [props]);

  return (
    <section className=" mb-14 mt-10">
      

      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Latest <span className="text-red-600">jobes open</span>
            </h2>
            <a href="/offres" className="text-red-600 font-semibold hover:underline">
              Show all jobs →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center space-x-4 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                {/* Logo */}
                <img src={`images/logos/Stripe.jpg`} alt={job.entreprise?.nom} className="w-12 h-12" />

                {/* Job Details */}
                <div>
                  <h3 className="font-semibold">{job.titre}</h3>
                  <p className="text-gray-500">{job.canton.nom} • {job.location}</p>

                  {/* Job Tags */}
                  <div className="flex space-x-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm">{job.type_travail}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-md text-sm">
                        {job.categorie.designation}
                      </span>
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

export default LatestJobs;
