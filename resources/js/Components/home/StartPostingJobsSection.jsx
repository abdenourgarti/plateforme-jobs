import React from "react";

const StartPostingJobsSection = ({ title, buttonText, imageSrc }) => {
  return (

    <section className="relative flex justify-center py-12">
      {/* Red Background with Content */}
      <div className="container bg-red-600 flex flex-wrap items-center h-[450px] px-10 py-16 rounded-lg relative">
        
        {/* Left Side - Text & Button */}
        <div className="flex flex-col justify-center  ml-9 z-10 max-w-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          <button className="bg-white py-3 px-6 text-red-600 rounded-md font-semibold shadow-md">
            {buttonText}
          </button>
        </div>

        {/* Right Side - Image (Floating Above Background) */}
        <div className="absolute right-6 top-[274px] transform -translate-y-1/2 w-full md:w-auto flex justify-center md:justify-end pr-10">
          <img 
            src={imageSrc} 
            alt="Dashboard Preview" 
            className="max-w-2xl rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
    
  );
};

export default StartPostingJobsSection;
