// resources/js/Components/Jobs/JobFilters.jsx
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { router } from '@inertiajs/react';
import { route } from "ziggy-js";

const JobFilters = ({ employmentTypes, categories, filters }) => {
    const [openSections, setOpenSections] = useState({ type: true, categories: true });
    const [checkedTypes, setCheckedTypes] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    
    // Initialiser les filtres depuis les props
    useEffect(() => {
        if (filters) {
            // Pour les types de travail
            setCheckedTypes(Array.isArray(filters.type_travail) ? filters.type_travail : 
                            filters.type_travail ? [filters.type_travail] : []);
            
            // Pour les catégories - peut être multiple
            let categoryIds = [];
            if (filters.categorie) {
                if (Array.isArray(filters.categorie)) {
                    categoryIds = filters.categorie.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
                } else {
                    categoryIds = [parseInt(filters.categorie, 10)];
                }
            }
            setCheckedCategories(categoryIds);
        }
    }, [filters]);

    const handleTypeChange = (type) => {
        let newTypes;
        
        if (checkedTypes.includes(type)) {
            newTypes = checkedTypes.filter(t => t !== type);
        } else {
            newTypes = [...checkedTypes, type];
        }
        
        // Mettre à jour l'état local
        setCheckedTypes(newTypes);
        
        // Appeler le backend
        router.get(route('offres.index'), {
            type_travail: newTypes.length > 0 ? newTypes : null,
            categorie: checkedCategories.length > 0 ? checkedCategories : null,
            search: new URLSearchParams(window.location.search).get('search') || '',
            page: 1 // Reset to page 1 when changing filters
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['offres', 'filters']
        });
    };

    const handleCategoryChange = (categoryId) => {
        // Convertir en nombre si nécessaire
        const numericId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;
        
        // Pour les catégories, nous permettons la sélection multiple
        let newCategories;
        if (checkedCategories.includes(numericId)) {
            newCategories = checkedCategories.filter(id => id !== numericId);
        } else {
            newCategories = [...checkedCategories, numericId];
        }
        
        // Mettre à jour l'état local
        setCheckedCategories(newCategories);
        
        // Appeler le backend
        router.get(route('offres.index'), {
            type_travail: checkedTypes.length > 0 ? checkedTypes : null,
            categorie: newCategories.length > 0 ? newCategories : null,
            search: new URLSearchParams(window.location.search).get('search') || '',
            page: 1 // Reset to page 1 when changing filters
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['offres', 'filters']
        });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-1/4 flex flex-col bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Employment Type Filter */}
            <div className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("type")}>
                    <h3 className="font-semibold">Type of Employment</h3>
                    {openSections.type ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.type && (
                    <div className="mt-2">
                        {employmentTypes.map((type) => (
                            <label key={type} className="flex items-center mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={checkedTypes.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                <span className={checkedTypes.includes(type) ? "text-red-500 font-semibold" : ""}>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Categories Filter */}
            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("categories")}>
                    <h3 className="font-semibold">Categories</h3>
                    {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.categories && (
                    <div className="mt-2">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={checkedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                <span className={checkedCategories.includes(category.id)
                                    ? "text-red-500 font-semibold"
                                    : ""}
                                >
                                    {category.designation}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobFilters;