import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import ProfileHeader from '@/components/admin/profile/ProfileHeader';
import ProfileAbout from '@/components/admin/profile/ProfileAbout';
import ProfileDetails from '@/components/admin/profile/ProfileDetails';
import ProfileSocialLinks from '@/components/admin/profile/ProfileSocialLinks';
import ProfileExperiences from '@/components/admin/profile/ProfileExperiences';
import ProfileEducations from '@/components/admin/profile/ProfileEducations';
import ProfileSkills from '@/components/admin/profile/ProfileSkills';
import ProfilePortfolios from '@/components/admin/profile/ProfilePortfolios';

const ProfilePage = ({ candidat, cantons }) => {

  return (
    <div className="container mx-auto p-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Header */}
        <div className="md:col-span-2">
          <ProfileHeader candidat={candidat} cantons={cantons} />
          <ProfileAbout candidat={candidat} />
        </div>
        {/* Profile Details & Social Links */}
        <div className="flex flex-col gap-6">
          <ProfileDetails candidat={candidat} />
          <ProfileSocialLinks candidat={candidat} />
        </div>
      </div>
      
      <ProfileExperiences candidat={candidat} />
      <ProfileEducations candidat={candidat} />
      <ProfileSkills candidat={candidat} />
    </div>
  );
};

export default ProfilePage;