// resources/js/Pages/client/JobPage.jsx
import { useState, useEffect } from "react";
import JobSearchForm from "@/Components/Jobs/JobSearchForm";
import JobList from "@/Components/Jobs/JobList";
import JobFilters from "@/Components/jobs/JobFilters"; // Import the component
import { Link } from '@inertiajs/react';


const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [selectedFilters, setSelectedFilters] = useState({
        type: [],
        categories: []
    });

    useEffect(() => {
        fetch("/jobs.json") 
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setFilteredJobs(data);
            })
            .catch(error => console.error("Error loading jobs:", error));
    }, []);

    return (
        <div className="">
           
            
            <JobSearchForm 
                jobs={jobs} 
                setFilteredJobs={setFilteredJobs} 
            />
           <div className="flex gap-6 mt-6">
                <JobFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
                <JobList selectedFilters={selectedFilters} />
            </div>
        </div>
    );
};

export default JobPage;