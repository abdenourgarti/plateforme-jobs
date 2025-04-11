import { useState } from "react";
import { router } from '@inertiajs/react';
import { route } from "ziggy-js";

export default function JobSearchForm({ cantons = [], filters = {} }) {
    const [search, setSearch] = useState({
        title: filters.search || "",
        location: filters.location || ""
    });

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Construction des paramètres de recherche
        const params = {};
        
        if (search.title) {
            params.search = search.title;
        }
        
        if (search.location) {
            params.location = search.location;
        }
        
        // Conserver les autres filtres existants s'ils existent
        if (filters.categorie && filters.categorie.length) {
            params.categorie = filters.categorie;
        }
        
        if (filters.type_travail && filters.type_travail.length) {
            params.type_travail = filters.type_travail;
        }
        
        // Redirection avec les paramètres de recherche
        router.get(route('offres.index'), params);
    };

    return (
        <div className="bg-gray-100 w-full py-10 px-6 text-center rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800">
                Find your <span className="text-red-500">dream job</span>
            </h1>
            <p className="text-gray-600 mt-2">
                Find your next career at companies like HubSpot, Nike, and Dropbox
            </p>

            <form onSubmit={handleSearch}>
                <div className="mt-6 flex justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        className="border p-3 w-80 rounded-md"
                        value={search.title}
                        onChange={(e) => setSearch({ ...search, title: e.target.value })}
                    />
                    
                    <select
                        className="border p-3 w-80 rounded-md bg-white"
                        value={search.location}
                        onChange={(e) => setSearch({ ...search, location: e.target.value })}
                    >
                        <option value="">All Cantons</option>
                        {cantons.map((canton) => (
                            <option key={canton.id || canton.nom} value={canton.code || canton.nom}>
                                {canton.nom || canton.name}
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        type="submit"
                        className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold"
                    >
                        Search
                    </button>
                </div>
            </form>
       
            <p className="mt-4 text-gray-500 text-sm">
                Popular : <span className="text-gray-700 font-medium">UI Designer, UX Researcher, Android, Admin</span>
            </p>
        </div>
    );
}