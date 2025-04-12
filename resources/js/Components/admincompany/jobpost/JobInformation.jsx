import React, { useState } from "react";

const JobInformation = ({ onNext, onBack, info }) => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        employmentTypes: [],
        salaryMin: "",
        salaryMax: "",
        categories: "",
        requiredSkills: [],
    });

    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Handle checkbox inputs
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value),
            }));
        } else {
            // Handle text and number inputs
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            {/* Basic Information Section */}
            <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
            <p className="text-sm text-gray-500 mb-4">
                This information will be displayed publicly.
            </p>
            <hr />

            {/* Job Title Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Job Title</h2>
                    <p className="text-sm text-gray-500">
                        Job titles must describe one role.
                    </p>
                </div>

                {/* Right: Form Input */}
                <div>
                    <input
                        type="text"
                        id="jobTitle"
                        placeholder="e.g. Software Engineer"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <label
                        htmlFor="jobTitle"
                        className="block font-light text-sm text-gray-300"
                    >
                        At least 80 characters
                    </label>
                </div>
            </div>
            <hr />

            {/* Type of Employment Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Type of Employment
                    </h2>
                    <p className="text-sm text-gray-500">
                        You can select multiple types of employment.
                    </p>
                </div>

                {/* {console.log(info.employmentTypes)} */}

                {/* Right: Checkbox Inputs */}
                <div className="space-y-2">
                    {info.employmentTypes?.map((type) => {
                        const value = type.type_travail;

                        return (
                            <label key={value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={value}
                                    name="employmentTypes"
                                    checked={formData.employmentTypes.includes(
                                        value
                                    )}
                                    onChange={(e) => {
                                        const checked = e.target.checked;

                                        if (checked) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                employmentTypes: [
                                                    ...prev.employmentTypes,
                                                    value,
                                                ],
                                            }));
                                        } else {
                                            setFormData((prev) => ({
                                                ...prev,
                                                employmentTypes:
                                                    prev.employmentTypes.filter(
                                                        (t) => t !== value
                                                    ),
                                            }));
                                        }
                                    }}
                                    className="mr-2"
                                />
                                {value}
                            </label>
                        );
                    })}
                </div>
            </div>
            <hr />

            {/* Salary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Salary</h2>
                    <p className="text-sm text-gray-500">
                        Please specify the estimated salary range for the role.
                        You can leave this blank.
                    </p>
                </div>

                {/* Right: Salary Range Input */}
                <div className="flex items-center space-x-2">
                    <span>$</span>
                    <input
                        type="number"
                        id="salaryMin"
                        placeholder="5,000"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span>to</span>
                    <input
                        type="number"
                        id="salaryMax"
                        placeholder="22,000"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <hr />

            {/* Categories Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    <p className="text-sm text-gray-500">
                        You can select multiple job categories.
                    </p>
                </div>

                {/* Right: Dropdown Input */}
                <select
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {info.categories?.map((category) => (
                        <option value={category.id}>
                            {category.designation}
                        </option>
                    ))}
                </select>
            </div>
            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Salary</h2>
                    <p className="text-sm text-gray-500">
                        Please specify the estimated salary range for the role.
                        You can leave this blank.
                    </p>
                </div>

                {/* Right: Salary Range Input */}
                <div className="flex items-center space-x-2">
                    <span>$</span>
                    <input
                        type="number"
                        id="salaryMin"
                        placeholder="5,000"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span>to</span>
                    <input
                        type="number"
                        id="salaryMax"
                        placeholder="22,000"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <hr />

            {/* Categories Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                {/* Left: Heading */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Required Skills
                    </h2>
                    <p className="text-sm text-gray-500">
                        Add required skills for the job.
                    </p>
                </div>

                <div>
                    <button
                        onClick={() =>
                            setFormData((prevData) => ({
                                ...prevData,
                                requiredSkills: [
                                    ...prevData.requiredSkills,
                                    "",
                                ],
                            }))
                        }
                        className="bg-transparent border hover:bg-red-100 text-red-400 px-4 py-2 rounded mt-2"
                    >
                        + Add Skill
                    </button>
                </div>

                {/* Right: Dropdown Input */}
            </div>

            {/* Required Skills Section */}
            <div className="mb-6 mt-4">
                {/* Add Skill Button */}

                {/* List of Skills */}
                <div className="mt-2 space-y-2">
                    {formData.requiredSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="text"
                                placeholder="e.g. Graphic Design"
                                value={skill}
                                onChange={(e) => {
                                    const newSkills = [
                                        ...formData.requiredSkills,
                                    ];
                                    newSkills[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        requiredSkills: newSkills,
                                    }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {index > 0 && (
                                <button
                                    onClick={() => {
                                        const newSkills = [
                                            ...formData.requiredSkills,
                                        ];
                                        newSkills.splice(index, 1);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            requiredSkills: newSkills,
                                        }));
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    x
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobInformation;
