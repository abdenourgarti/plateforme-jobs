import { useState, useEffect } from "react";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("json/featured_jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <section className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Explore by <span className="text-red-600">category</span>
          </h2>
          <a href="#" className="text-red-600 font-semibold hover:underline">
            Show all jobs →
          </a>
        </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-6">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <img src={`images/logos/${job.logo}`} alt={job.company} className="w-8 h-8" />
              <span className="text-sm font-semibold">{job.company}</span>
            </div>
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.location}</p>
            <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-semibold rounded-md">
              {job.type}
            </span>
            <div className="mt-2 flex gap-2">
              {job.categories.map((cat, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
