import { useState, useEffect } from "react";

const FeaturedJobs = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(props.jobs);
  }, [props]);

  return (
    <section className="container max-w-7xl w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Explore by <span className="text-red-600">category</span>
          </h2>
          <a href="/offres" className="text-red-600 font-semibold hover:underline">
            Show all jobs →
          </a>
        </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-6">
        {jobs.map((job) => (
          <div key={job.latestJob.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
            <div className="flex items-center gap-2">
              <img src={`images/logos/Stripe.jpg`} alt={job.latestJob.entreprise} className="w-8 h-8" />
              <span className="text-sm font-semibold">{job.latestJob.entreprise.nom}</span>
            </div>
            <h3 className="text-lg font-bold">{job.latestJob.titre}</h3>
            <p className="text-sm text-gray-500">{job.latestJob.canton.nom} {job.latestJob.location}</p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-semibold rounded-md">
                {job.latestJob.type_travail}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md">
                {job.category.designation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
