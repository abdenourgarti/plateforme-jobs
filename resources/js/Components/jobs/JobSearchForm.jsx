import { useState } from "react";

export default function JobSearchForm({ jobs, setFilteredJobs }) {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        const filtered = jobs.filter((job) =>
            job.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    return (
        <div className="bg-gray-100 w-full py-10 px-6 text-center rounded-lg">
        
            <h1 className="text-4xl font-bold text-gray-800">
                Find your <span className="text-red-500">dream job</span>
            </h1>
            <p className="text-gray-600 mt-2">
                Find your next career at companies like HubSpot, Nike, and Dropbox
            </p>

  
            <div className="mt-6 flex justify-center gap-4">
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="border p-3 w-80 rounded-md"
                    value={search.title}
                    onChange={(e) => setSearch({ ...search, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City, Country"
                    className="border p-3 w-80 rounded-md"
                    value={search.location}
                    onChange={(e) => setSearch({ ...search, location: e.target.value })}
                />
                <button className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold">
                    Search
                </button>
            </div>

       
            <p className="mt-4 text-gray-500 text-sm">
                Popular : <span className="text-gray-700 font-medium">UI Designer, UX Researcher, Android, Admin</span>
            </p>
        </div>
    );
}
