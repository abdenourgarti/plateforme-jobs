const HeroSection = ({ title, highlight, description, searchPlaceholder1, searchPlaceholder2, buttonText }) => {
    return (
      <section className="bg-[#F8F8FD] bg-left-none flex items-center w-full h-full py-16 ">
        <div className="container flex flex-wrap items-center mx-20 text-center md:text-left max-w-4xl">
      
          <h1 className="md:text-5xl font-bold text-9xl text-gray-900">
            {title} <br></br> <span className="text-red-500 text-9xl">{highlight}</span>
          </h1>
  
   
          <p className="text-gray-600 font- mt-4">Great platform for the job seeker that searching for <br />  new career heights and passionate about startups.</p>
  
         
          <div className="mt-6 flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder={searchPlaceholder1}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-red-500"
            />
            <input
              type="text"
              placeholder={searchPlaceholder2}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-red-500"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
              {buttonText}
            </button>
          </div>
  
          {/* Popular Searches */}
          <p className="text-gray-500 mt-4">
            Popular: UI Designer, UX Researcher, Android, Admin
          </p>
        </div>
      
      </section>
    );
  };
  
  export default HeroSection;
  