import { useEffect, useState } from "react";

const JobList = ({ selectedFilters }) => {
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
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">All Jobs ({filteredJobs.length})</h2>
            {filteredJobs.map((job) => (
                <div key={job.id} className="border p-4 rounded-lg flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <img src={`/images/logos/${job.logo}`} alt={job.company} className="w-12 h-12 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-gray-500">{job.company} ● {job.location}</p>
                            <div className="mt-2">
                                {job.categories.map((category, index) => (
                                    <span key={index} className="text-sm bg-gray-200 px-2 py-1 rounded mr-2">
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="bg-red-500 text-white px-4 py-2 rounded">Apply</button>
                </div>
            ))}
        </div>
    );
};

export default JobList;
