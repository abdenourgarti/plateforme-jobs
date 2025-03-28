import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CompaniesFilters = ({ selectedFilters, setSelectedFilters }) => {
    const [categories, setCategories] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [openSections, setOpenSections] = useState({ type: true, categories: true });

    useEffect(() => {
        fetch("/json/jobs.json")
            .then((response) => response.json())
            .then((data) => {
                const allCategories = [...new Set(data.flatMap(job => job.categories))];
                setCategories(allCategories);
                const allTypes = [...new Set(data.map(job => job.type))];
                setEmploymentTypes(allTypes);
            })
            .catch((error) => console.error("Error loading jobs:", error));
    }, []);

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prev) => {
            const updatedFilters = { ...prev };
            if (updatedFilters[type].includes(value)) {
                updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
            } else {
                updatedFilters[type] = [...updatedFilters[type], value];
            }
            return updatedFilters;
        });
    };

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-1/4 flex flex-col bg-white p-6 rounded-lg ">
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
                                    checked={selectedFilters.type.includes(type)}
                                    onChange={() => handleFilterChange("type", type)}
                                />
                                <span className={selectedFilters.type.includes(type) ? "text-red-500 font-semibold" : ""}>{type}</span>
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
                            <label key={category} className="flex items-center mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedFilters.categories.includes(category)}
                                    onChange={() => handleFilterChange("categories", category)}
                                />
                                <span className={selectedFilters.categories.includes(category) ? "text-red-500 font-semibold" : ""}>{category}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesFilters;