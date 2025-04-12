import React from "react";
import { Head } from "@inertiajs/react";
import CompanyHeader from "@/components/CompanyDetails/CompanyHeader";
import CompanyProfile from "@/components/CompanyDetails/CompanyProfile";
import CompanyBenefits from "@/components/CompanyDetails/CompanyBenefits";

const CompanyDetails = ({ entreprise, offres }) => {
  // Préparer les données pour correspondre à la structure attendue par les composants
  const companyData = {
    name: entreprise.nom,
    logo: entreprise.logo,
    canton: entreprise.canton ? entreprise.canton.nom : null,
    domaine: entreprise.domaine ? entreprise.domaine.designation : null,
    website: entreprise.site,
    founded: entreprise.date_creation,
    employees: entreprise.nombre_employes,
    locations: entreprise.locations,
    description: entreprise.description,
    social_links: {
      twitter: entreprise.twitter ? entreprise.twitter : "https://twitter.com/stripe",
      facebook: entreprise.facebook ? entreprise.facebook : "https://facebook.com/StripeHQ",
      linkedin: entreprise.linkedin ? entreprise.linkedin : "https://linkedin.com/company/stripe",
    },
    jobs_count: offres.length,
    tech_stack: entreprise.technologies.map(tech => tech.designation),
    gallery: [
      "job1.jpg",
      "job2.jpg",
      "job3.jpg",
      "job4.jpg"
    ],
  };

  // Transformer les offres d'emploi pour correspondre à la structure attendue
  const jobsData = offres.map(offre => ({
    id: offre.id,
    title: offre.titre,
    company: entreprise.nom,
    logo: entreprise.logo,
    location: offre.location,
    canton: entreprise.canton ? entreprise.canton.nom : null,
    type: offre.type_travail,
    categorie: offre.categorie.designation
  }));

  return (
    <div>
      <Head title={`${entreprise.nom} - Détails de l'entreprise`} />
      <CompanyHeader company={companyData} />
      <CompanyProfile company={companyData} />
      <CompanyBenefits benefits={companyData.benefits} jobs={jobsData} />
    </div>
  );
};

export default CompanyDetails;