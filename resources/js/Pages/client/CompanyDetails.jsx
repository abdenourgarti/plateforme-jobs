import React, { useEffect, useState } from "react";
import CompanyHeader from "@/components/CompanyDetails/CompanyHeader";
import CompanyProfile from "@/components/CompanyDetails/CompanyProfile";
import CompanyBenefits from "@/components/CompanyDetails/CompanyBenefits";

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch("/json/company.json")
      .then((response) => response.json())
      .then((data) => setCompany(data))
      .catch((error) => console.error("Error fetching company data:", error));
  }, []);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="">
      <CompanyHeader company={company} />
      <CompanyProfile company={company} />
      <CompanyBenefits benefits={company.benefits} jobs={company.jobs} />

    </div>
  );
};

export default CompanyDetails;
