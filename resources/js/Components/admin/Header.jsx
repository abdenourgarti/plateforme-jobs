import React from 'react';
import LogoutButton from '@/components/LogoutButton';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
