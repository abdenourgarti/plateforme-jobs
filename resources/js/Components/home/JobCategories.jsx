import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons
import { Link } from "@inertiajs/react"; // Use Inertia for navigation

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
          <Link href="/jobs" className="text-red-600 font-semibold hover:underline">
            Show all jobs →
          </Link>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            // Get the corresponding Lucide icon component
            const IconComponent = LucideIcons[category.icon] || LucideIcons.HelpCircle;

            return (
              <Link 
                key={category.id} 
                href={`/jobs?category=${encodeURIComponent(category.name)}`} 
                className="block"
              >
                <div
                  className="p-6 rounded-lg shadow-md text-center flex flex-col items-center border 
                    transition-all duration-300 transform hover:scale-105 
                    hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  <IconComponent size={40} className="mb-4" />
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm mt-2">{category.jobs} jobs available →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
