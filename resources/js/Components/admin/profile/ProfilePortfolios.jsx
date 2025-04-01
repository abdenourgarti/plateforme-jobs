import React, { useState } from 'react';
import { PlusCircle, Pencil } from 'lucide-react';
import portfoliosData from '@/json/profilePortfolios.json';

const ProfilePortfolios = () => {
  const [showAll, setShowAll] = useState(false); // State to toggle visibility of all portfolios

  // Function to toggle between showing 3 or all portfolios
  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="bg-white p-6 border mt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolios</h2>
        <button 
          className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-full p-2"
        >
          <PlusCircle size={16} />
        </button>
      </div>

      {/* Portfolios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showAll
          ? portfoliosData.map((portfolio, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                {/* Portfolio Image */}
                <img 
                  src={portfolio.image} 
                  alt={portfolio.title} 
                  className="w-full h-40 object-cover rounded-t-lg"
                />

                {/* Portfolio Details */}
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">{portfolio.title}</h3>
                  <p className="text-gray-600 text-sm">{portfolio.description}</p>
                </div>
              </div>
            ))
          : portfoliosData.slice(0, 3).map((portfolio, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                {/* Portfolio Image */}
                <img 
                  src={portfolio.image} 
                  alt={portfolio.title} 
                  className="w-full h-40 object-cover rounded-t-lg"
                />

                {/* Portfolio Details */}
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">{portfolio.title}</h3>
                  <p className="text-gray-600 text-sm">{portfolio.description}</p>
                </div>
              </div>
            ))}
      </div>

      {/* Show More Button */}
      {portfoliosData.length > 3 && !showAll && (
        <div className="mt-4 text-red-500 text-sm font-medium cursor-pointer" onClick={handleShowMore}>
          Show more portfolios
        </div>
      )}

      {/* Show Less Button */}
      {showAll && (
        <div className="mt-4 text-red-500 text-sm font-medium cursor-pointer" onClick={handleShowMore}>
          Show fewer portfolios
        </div>
      )}
    </div>
  );
};

export default ProfilePortfolios;