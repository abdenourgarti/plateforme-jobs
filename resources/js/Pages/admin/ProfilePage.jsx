import React from 'react';
import ProfileHeader from '@/components/admin/profile/ProfileHeader';
import ProfileAbout from '@/components/admin/profile/ProfileAbout';
import ProfileDetails from '@/components/admin/profile/ProfileDetails';
import ProfileSocialLinks from '@/components/admin/profile/ProfileSocialLinks';

import ProfileExperiences from '@/components/admin/profile/ProfileExperiences';

import ProfileSkills from '@/components/admin/profile/ProfileSkills';

import ProfilePortfolios from '@/components/admin/profile/ProfilePortfolios';




const ProfilePage = () => {
    return (
      <div className="container mx-auto p-6">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Profile Header */}
          <div className="col-span-2">
            <ProfileHeader />
            <ProfileAbout />
          </div>
          {/* Profile Details & Social Links */}
          <div className="flex flex-col gap-6">
            <ProfileDetails />
            <ProfileSocialLinks />
          </div>
        </div>
        
        <ProfileExperiences  />
        <ProfileSkills  />
       <ProfilePortfolios />
      
      </div>
    );
  };
  
  export default ProfilePage;
  