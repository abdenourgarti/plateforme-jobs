import React from "react";

const StartPostingJobsSection = ({ title, buttonText, imageSrc }) => {
  return (
    <section className="relative flex justify-center py-12 max-w-7xl w-full mx-auto">
      {/* Red Background with Content */}
      <div className="container bg-red-600 flex flex-wrap items-center h-[450px] px-10 py-16 relative overflow-hidden">
        
        {/* Triangle top-left corner */}
        <div className="absolute top-0 left-0 w-0 h-0 
                border-l-[100px] border-t-[100px] 
                border-l-transparent border-t-white 
                rotate-45 -translate-x-[50px] -translate-y-[50px] z-10">
        </div>
        
        {/* Triangle bottom-right corner */}
        <div className="absolute bottom-0 right-0 w-0 h-0 
                border-r-[100px] border-b-[100px] 
                border-r-transparent border-b-white 
                rotate-45 translate-x-[50px] translate-y-[50px] z-10">
        </div>
        
        {/* Left Side - Text & Button */}
        <div className="flex flex-col justify-center ml-9 z-20 max-w-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          <button onClick={() => window.location.href = '/register'} className="bg-white py-3 px-6 text-red-600 rounded-md font-semibold shadow-md">
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