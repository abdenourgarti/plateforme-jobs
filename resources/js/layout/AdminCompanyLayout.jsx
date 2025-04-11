import React from 'react';
import Sidebar from '@/components/admincompany/Sidebar';
import Header from '@/components/admincompany/Header';

const AdminCompanyLayout = ({ children }) => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminCompanyLayout;
