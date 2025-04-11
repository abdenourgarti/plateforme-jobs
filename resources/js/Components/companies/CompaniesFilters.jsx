import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { router } from '@inertiajs/react';

const CompaniesFilters = ({ domaines, selectedDomaines = [], entreprisesCount }) => {
    const [openSections, setOpenSections] = useState({ domaines: true });
    const [checkedDomaines, setCheckedDomaines] = useState([]);
    
    // Mise à jour des domaines cochés quand les props changent
    useEffect(() => {
        // Assurez-vous que nous avons un tableau d'IDs numériques
        const numericIds = selectedDomaines.map(id => 
            typeof id === 'string' ? parseInt(id, 10) : id
        ).filter(id => !isNaN(id));
        
        console.log("Selected domaines from props:", selectedDomaines);
        console.log("Converted to numeric IDs:", numericIds);
        
        setCheckedDomaines(numericIds);
    }, [selectedDomaines]);

    const handleDomaineChange = (domaineId) => {
        // Assurez-vous que l'ID est un nombre
        const numericId = typeof domaineId === 'string' ? parseInt(domaineId, 10) : domaineId;
        
        let newSelectedDomaines;
        
        if (checkedDomaines.includes(numericId)) {
            newSelectedDomaines = checkedDomaines.filter(id => id !== numericId);
        } else {
            newSelectedDomaines = [...checkedDomaines, numericId];
        }
        
        // Mettre à jour l'état local immédiatement
        setCheckedDomaines(newSelectedDomaines);
        
        // Appeler le backend
        router.get(route('entreprises.index'), {
            domaines: newSelectedDomaines.length > 0 ? newSelectedDomaines : null,
            search: new URLSearchParams(window.location.search).get('search') || '',
            canton: new URLSearchParams(window.location.search).get('canton') || '',
            page: 1 // Reset to page 1 when changing filters
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['entreprises', 'filters']
        });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Déterminer la hauteur du conteneur des filtres
    const getFilterHeight = () => {
        if (entreprisesCount <= 4) {
            return "h-screen"; // Pleine hauteur si peu d'entreprises
        } else {
            return "max-h-[800px]"; // Hauteur maximale autrement
        }
    };

    return (
        <div className={`w-1/4 flex flex-col bg-white p-6 rounded-lg shadow ${getFilterHeight()}`}>
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            {/* Domaines Filter */}
            <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("domaines")}>
                    <h3 className="font-semibold">Domaines</h3>
                    {openSections.domaines ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.domaines && (
                    <div className="mt-2 overflow-y-auto max-h-[calc(100%-50px)]">
                        {domaines.map((domaine) => {
                            // Assurez-vous que l'ID est un nombre pour la comparaison
                            const domaineId = typeof domaine.id === 'string' ? parseInt(domaine.id, 10) : domaine.id;
                            const isChecked = checkedDomaines.includes(domaineId);
                            
                            return (
                                <label key={domaine.id} className="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={isChecked}
                                        onChange={() => handleDomaineChange(domaine.id)}
                                    />
                                    <span className={isChecked ? "text-red-500 font-semibold" : ""}>
                                        {domaine.designation}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesFilters;