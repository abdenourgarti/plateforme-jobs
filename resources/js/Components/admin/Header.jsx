import React from 'react';
import LogoutButton from '@/components/LogoutButton';

const Header = () => {
  return (
    <header className="bg-white  px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold"></h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
