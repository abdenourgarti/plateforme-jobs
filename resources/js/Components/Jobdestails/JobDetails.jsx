import { CheckCircle } from "lucide-react"; // Lucide icons

const JobDetails = ({ job }) => {
  if (!job) return <p>Loading...</p>;

  return (

    <>
  

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {/* Left Section (Main Content) */}
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-600">{job.description}</p>

        {/* Responsibilities */}
        <h3 className="text-xl font-semibold mt-6">Responsibilities</h3>
        <ul className="list-none space-y-2 text-gray-600">
          {job.responsibilities.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              {item}
            </li>
          ))}
        </ul>

        {/* Who You Are */}
        <h3 className="text-xl font-semibold mt-6">Who You Are</h3>
        <ul className="list-none space-y-2 text-gray-600">
          {job.who_you_are.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              {item}
            </li>
          ))}
        </ul>

        {/* Nice-To-Haves */}
        <h3 className="text-xl font-semibold mt-6">Nice-To-Haves</h3>
        <ul className="list-none space-y-2 text-gray-600">
          {job.nice_to_haves.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Sidebar Section */}
      <div className=" p-6 rounded-lg ">
        <h3 className="text-2xl text-gray-500 mb-5 font-bold">About this role</h3>
        <div className="mt-2 bg-slate-100 rounded p-2">
          <p className="text-gray-600">
            <span className="font-semibold">{job.about_role.applied}</span> applied of {job.about_role.capacity} capacity
          </p>
          <div className="w-full bg-gray-300 h-2 rounded-full mt-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(job.about_role.applied / job.about_role.capacity) * 100}%` }}
            ></div>
          </div>
        </div>


        <div className="flex flex-col gap-4"> 
          <p className="mt-3 ">
       <span className="text-gray-400 font-light"> Apply Before :</span>   {job.about_role.apply_before}
         </p>
         <p>
         <span className="text-gray-400 font-light"> Job Posted On :</span>    {job.about_role.job_posted_on}
         </p>
         <p>
         <span className="text-gray-400 font-light">  Job Type :</span>   {job.about_role.job_type}
         </p>
         <p>
         <span className="text-gray-400 font-light">   Salary :</span>  {job.about_role.salary}
         </p>
         </div>

         <div className="mt-4 bg-slate-100 rounded p-2"></div>

      

        {/* Categories */}
        <h3 className="text-xl font-semibold mt-4 mb-4">Categories</h3>
        <div className="flex flex-wrap mt-2 ">
          {job.categories.map((category, index) => (
            <span key={index} className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded mr-2">
              {category}
            </span>
          ))}
        </div>

        <div className="mt-4 bg-slate-100 rounded p-2"></div>

        {/* Required Skills */}
        <h3 className="text-xl font-semibold mt-6">Required Skills</h3>
        <div className="flex flex-wrap m mt-2">
          {job.required_skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 m-1 text-red-800 px-2 py-1 text-sm rounded mr-2">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default JobDetails;
