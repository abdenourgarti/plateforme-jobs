import { useState } from "react";

export default function CompaniesSearchForm({ jobs, setFilteredJobs }) {
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
                Find your <span className="text-red-500">dream companie</span>
            </h1>
            <p className="text-gray-600 mt-2">
                Find your dream companies you dream work for
            </p>

  <div className="flex justify-center">
            <div className="mt-6 bg-white max-w-[900px] p-3 flex justify-center gap-4">
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="border-none  bg-transparent p-3 w-80 rounded-md"
                    value={search.title}
                    onChange={(e) => setSearch({ ...search, title: e.target.value })}
                />
                <p className="w-1 h-14 rounded-3xl bg-slate-200"></p>
                <input
                    type="text"
                    placeholder="City, Country"
                    className=" border-none  bg-transparent  p-3 w-80 rounded-md"
                    value={search.location}
                    onChange={(e) => setSearch({ ...search, location: e.target.value })}
                />
                <button className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold">
                    Search
                </button>
            </div>

       
        </div>
        
        <p className="mt-4 text-gray-500 text-sm">
                Popular : <span className="text-gray-700 font-medium">X , Microsoft , Apple , Facebook</span>
            </p>
        </div>
    );
}
