import HeroSection from "@/components/home/HeroSection";
import StartPostingJobsSection from "@/components/home/StartPostingJobsSection";
import JobCategories from "@/components/home/JobCategories";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import LatestJobs from "@/components/home/LatestJobs";

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection 
        title="Discover more than"
        highlight="5000+ Jobs"
        description="Great platform for the job seeker that searching for new career heights and passionate about startups."
        searchPlaceholder1="Job title or keyword"
        searchPlaceholder2="City, Country"
        buttonText="Search my job"
      />
      <StartPostingJobsSection
        title="Start posting jobs today"
        buttonText="Sign Up For Free"
        imageSrc="/images/dashboard-example-applify.png" // Replace with actual path
      />
            <JobCategories />

        <StartPostingJobsSection
         title="Start posting jobs today"
         buttonText="Sign Up For Free"
         imageSrc="/images/dashboard-example-applify.png" // Replace with actual path
      />

      <FeaturedJobs />
      <LatestJobs />

    </div>
  );
};

export default Home;
