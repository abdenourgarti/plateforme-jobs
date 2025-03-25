import React, { useEffect, useState } from "react";

const JobCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("json/categories.json")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Explore by <span className="text-red-600">category</span>
          </h2>
          <a href="#" className="text-red-600 font-semibold hover:underline">
            Show all jobs →
          </a>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-lg shadow-md text-center flex flex-col items-center ${
                category.highlight ? "bg-red-600 text-white" : "bg-white text-gray-800 border"
              }`}
            >
              <span className="text-4xl">{category.icon}</span>
              <h3 className="text-lg font-bold mt-4">{category.name}</h3>
              <p className="text-sm mt-2">{category.jobs} jobs available →</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
