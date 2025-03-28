import { useEffect, useState } from "react";

const CompaniesList = ({ selectedFilters }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("/json/jobs.json")
            .then((response) => response.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error("Error loading jobs:", error));
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(job.type);
        const matchesCategory =
            selectedFilters.categories.length === 0 || job.categories.some((cat) => selectedFilters.categories.includes(cat));

        return matchesType && matchesCategory;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[60%]">
            {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col">
                    {/* Logo & Job Count */}
                    <div className="flex justify-between items-start">
                        <img src={`/images/logos/${job.logo}`} alt={job.company} className="w-12 h-12 rounded-md" />
                        <span className="bg-red-100 text-red-500 text-sm font-semibold px-2 py-1 rounded-md">
                            {job.jobs} Jobs
                        </span>
                    </div>

                    {/* Job Title & Company */}
                    <h3 className="text-lg font-bold mt-3">{job.company}</h3>
                    <h3 className="text-lg font-normal mt-3">{job.description}</h3>
                  
                    {/* Categories */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {job.categories.map((category, index) => (
                            <span key={index} className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                {category}
                            </span>
                        ))}
                    </div>


                </div>
            ))}
        </div>
    );
};

export default CompaniesList;