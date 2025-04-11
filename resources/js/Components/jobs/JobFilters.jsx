// resources/js/Components/Jobs/JobFilters.jsx
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const JobFilters = ({ selectedFilters, setSelectedFilters, employmentTypes, categories }) => {
    const [openSections, setOpenSections] = useState({ type: true, categories: true });

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev };
            const exists = updated[type].some(item =>
                typeof item === 'object' ? item.id === value.id : item === value
            );

            if (exists) {
                updated[type] = updated[type].filter(item =>
                    typeof item === 'object' ? item.id !== value.id : item !== value
                );
            } else {
                updated[type] = [...updated[type], value];
            }

            return updated;
        });
    };

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-1/4 flex flex-col bg-white p-6 rounded-lg">
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
                                <span className={selectedFilters.type.includes(type) ? "text-red-500 font-semibold" : ""}>
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
                                    checked={selectedFilters.categories.some((cat) => cat.id === category.id)}
                                    onChange={() => handleFilterChange("categories", category)}
                                />
                                <span className={selectedFilters.categories.some((cat) => cat.id === category.id)
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
