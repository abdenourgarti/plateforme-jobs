import React from "react";

const CompanyBenefits = ({ benefits }) => {
  return (
    <div className="mt-6 container px-44">
      <h3 className="text-xl font-bold mb-4">Perks & Benefits</h3>
      <div className="grid grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm flex items-center">
            <span className="text-3xl mr-4">{benefit.icon}</span>
            <div>
              <h4 className="font-bold">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyBenefits;
