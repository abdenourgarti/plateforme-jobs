import { useState, useEffect } from "react";
import { router } from '@inertiajs/react';

export default function CompaniesSearchForm({ cantons, initialFilters = {} }) {
    const [filters, setFilters] = useState({
        search: initialFilters.search || '',
        canton: initialFilters.canton || '',
    });

    useEffect(() => {
        setFilters({
            search: initialFilters.search || '',
            canton: initialFilters.canton || '',
        });
    }, [initialFilters]);

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Obtenir les domaines actuels
        const currentDomaines = Array.isArray(initialFilters.domaines) ? initialFilters.domaines : [];
        
        router.get(route('entreprises.index'), {
            ...filters,
            domaines: currentDomaines.length > 0 ? currentDomaines : null,
            page: 1 // Reset to page 1 when searching
        }, {
            preserveState: true,
            preserveScroll: false,
            only: ['entreprises', 'filters']
        });
    };

    return (
        <div className="bg-gray-100 w-full py-10 px-6 text-center rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800">
                Find your <span className="text-red-500">dream company</span>
            </h1>
            <p className="text-gray-600 mt-2">
                Find your dream companies you dream to work for
            </p>

            <div className="flex justify-center">
                <form onSubmit={handleSearch} className="mt-6 bg-white max-w-[900px] p-3 flex justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Company name"
                        className="border-none bg-transparent p-3 w-80 rounded-md"
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                    <p className="w-1 h-14 rounded-3xl bg-slate-200"></p>
                    <select
                        className="border-none bg-transparent p-3 w-80 rounded-md"
                        value={filters.canton}
                        onChange={(e) => setFilters({...filters, canton: e.target.value})}
                    >
                        <option value="">All Cantons</option>
                        {cantons && cantons.map(canton => (
                            <option key={canton.id} value={canton.id}>
                                {canton.nom}
                            </option>
                        ))}
                    </select>
                    <button 
                        type="submit"
                        className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold"
                    >
                        Search
                    </button>
                </form>
            </div>
            
            <p className="mt-4 text-gray-500 text-sm">
                Popular: <span className="text-gray-700 font-medium">Nestlé, Novartis, UBS, Credit Suisse</span>
            </p>
        </div>
    );
}