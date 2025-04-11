import { useState, useEffect, useRef } from "react";
import CompaniesSearchForm from "@/Components/Companies/CompaniesSearchForm";
import CompaniesList from "@/Components/Companies/CompaniesList";
import CompaniesFilters from "@/Components/Companies/CompaniesFilters";
import Pagination from "@/Components/Companies/Pagination";
import { router } from '@inertiajs/react';

const Companies = ({ entreprises, domaines, cantons, filters }) => {
    const companiesListRef = useRef(null);
    
    // Debugging pour voir les valeurs reçues du backend
    console.log("Filters from backend:", filters);
    
    // Scroll to top of companies list when page changes
    useEffect(() => {
        if (companiesListRef.current) {
            companiesListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [entreprises.current_page]);

    return (
        <div className="">
            <CompaniesSearchForm 
                cantons={cantons}
                initialFilters={filters}
            />
            <div className="flex gap-6 mt-6" ref={companiesListRef}>
                <CompaniesFilters 
                    domaines={domaines} 
                    selectedDomaines={filters.domaines || []}
                    entreprisesCount={entreprises.total}
                />
                <div className="w-3/4 flex flex-col">
                    <CompaniesList 
                        entreprises={entreprises.data} 
                    />
                    {entreprises.total > 0 && (
                        <div className="flex flex-col items-center mt-6 mb-8">
                            {entreprises.last_page > 1 && (
                                <Pagination 
                                    links={entreprises.links} 
                                    current={entreprises.current_page}
                                    total={entreprises.last_page}
                                />
                            )}
                            <div className="text-gray-600 mt-2">
                                Showing {entreprises.data.length} of {entreprises.total} companies
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Companies;