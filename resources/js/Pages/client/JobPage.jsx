// resources/js/Pages/client/JobPage.jsx
import { useState, useEffect, useRef } from "react";
import JobSearchForm from "@/Components/Jobs/JobSearchForm";
import JobList from "@/Components/Jobs/JobList";
import JobFilters from "@/Components/Jobs/JobFilters";
import { Link } from "@inertiajs/react";
import Pagination from "../../Components/companies/Pagination";

const JobPage = (props) => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [cantons,setCantons] = useState([]);
    const jobListRef = useRef(null);

    console.log(jobs);

    useEffect(() => {
        setJobs(props.offres.data);
        setCategories(props.categories);
        setEmploymentTypes(props.typesoffres);
        setCantons(props.cantons);
    }, [props]);

    // Scroll to top of job list when page changes
    useEffect(() => {
        if (jobListRef.current) {
            jobListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [props.offres.current_page]);

    return (
        <div className="">
            <JobSearchForm initialFilters={props.filters} cantons={cantons}/>
            <div className="flex gap-6 mt-6" ref={jobListRef}>
                <JobFilters
                    employmentTypes={employmentTypes}
                    categories={categories}
                    filters={props.filters}
                />
                <div className="w-3/4 flex flex-col">
                    <JobList jobs={props.offres.data} />
                    {props.offres.total > 0 && (
                        <div className="flex flex-col items-center mt-6 mb-8">
                            {props.offres.last_page > 1 && (
                                <Pagination
                                    links={props.offres.links}
                                    current={props.offres.current_page}
                                    total={props.offres.last_page}
                                />
                            )}
                            <div className="text-gray-600 mt-2">
                                Showing {props.offres.from} to {props.offres.to} of {props.offres.total} jobs
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobPage;