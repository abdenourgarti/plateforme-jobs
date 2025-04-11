// resources/js/Pages/client/JobPage.jsx
import { useState, useEffect } from "react";
import JobSearchForm from "@/Components/Jobs/JobSearchForm";
import JobList from "@/Components/Jobs/JobList";
import JobFilters from "@/Components/Jobs/JobFilters";
import { Link } from "@inertiajs/react";

const JobPage = (props) => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);

    const [selectedFilters, setSelectedFilters] = useState({
        type: [],
        categories: []
    });

    useEffect(() => {
        setJobs(props.offres.data);
        setCategories(props.categories);
        setEmploymentTypes(props.typesoffres);
    }, [props]);

    const getFilteredJobs = () => {
        return jobs.filter((job) => {
            const matchType =
                selectedFilters.type.length === 0 ||
                selectedFilters.type.includes(job.type_travail);

            const matchCategory =
                selectedFilters.categories.length === 0 ||
                selectedFilters.categories.some(
                    (selectedCat) => selectedCat.id === job.categorie.id
                );

            return matchType && matchCategory;
        });
    };

    return (
        <div className="">
            <JobSearchForm jobs={jobs} />
            <div className="flex gap-6 mt-6">
                <JobFilters
                    employmentTypes={employmentTypes}
                    categories={categories}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
                <JobList jobs={getFilteredJobs()} />
            </div>
        </div>
    );
};

export default JobPage;
