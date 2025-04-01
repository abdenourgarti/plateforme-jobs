import { HeartPulse, Plane, Video, Users, Home, Bus, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import jobData from "@/json/jobedetails.json"; // Import JSON file

// Map icon names from JSON to Lucide components
const iconMap = {
  HeartPulse: HeartPulse,
  Plane: Plane,
  Video: Video,
  Users: Users,
  Home: Home,
  Bus: Bus,
  HandHeart: HandHeart,
};

const PerksBenefits = () => {
  const [perks, setPerks] = useState([]);

  useEffect(() => {
    setPerks(jobData.perks || []); // Load perks from JSON
  }, []);

  return (

    <>
    <hr/>
    <section className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-800 ">Perks & Benefits</h2>
      <p className="text-gray-500  mb-8">This job comes with several perks and benefits</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {perks.map((perk, index) => {
          const IconComponent = iconMap[perk.icon] || HeartPulse; // Default icon if not found
          return (
            <div key={index} className="flex flex-col items-left space-y-4 p-6 bg-white  rounded-xl">
              <IconComponent size={43} className="text-red-500" /> {/* Bigger Icon */}
              <h3 className="text-lg font-semibold">{perk.title}</h3>
              <p className="text-gray-500 text-sm">{perk.description}</p>
            </div>
          );
        })}
      </div>
    </section>
    
   </>
  );
};

export default PerksBenefits;
