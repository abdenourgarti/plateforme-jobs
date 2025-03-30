import React from "react";
import JobCompanyHeader from "@/components/Jobdestails/JobCompanyHeader";
import JobDetails from "@/components/Jobdestails/JobDetails";
import PerksBenefits from "@/components/Jobdestails/PerksBenefits";
import job from "@/json/jobedetails.json"; 

const JobDetailsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <JobCompanyHeader job={job} />
      <JobDetails job={job} />
      <PerksBenefits /> {/* Dynamic Perks Section */}
    </div>
  );
};

export default JobDetailsPage;
