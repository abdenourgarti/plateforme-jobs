// resources/js/Pages/client/JobPage.jsx
import { useState, useEffect } from "react";
import CompaniesSearchForm from "@/Components/Companies/CompaniesSearchForm";
import CompaniesFilters from "@/Components/Companies/CompaniesList";
import CompaniesList from "@/Components/companies/CompaniesFilters"; // Import the component
import { Link } from '@inertiajs/react';


const Companies = () => {
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
           
            
            <CompaniesSearchForm
                jobs={jobs} 
                setFilteredJobs={setFilteredJobs} 
            />
           <div className="flex gap-6 mt-6">
                <CompaniesList selectedFilters={selectedFilters} />
                <CompaniesFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
              
            </div>
        </div>
    );
};

export default Companies;