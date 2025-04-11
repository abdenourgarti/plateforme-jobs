import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react'; // For closing the notification
import applicationsData from '@/json/applications.json';

import aboutData from '@/json/profileAbout.json';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Load data from JSON file
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch('/json/applications.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData.applications);
        setLoading(false);
      };
      fetchData();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Filter data based on active tab and search query
  const filteredData = data.filter((app) => {
    if (activeTab !== 'All' && app.status !== activeTab) return false;
    if (searchQuery && !app.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Keep it up, Jake</h2>
        <p className="text-sm text-gray-500">
          Here is job application status from July 19 - July 25.
        </p>
      </div>

      {/* Notification Banner */}
      <div className="bg-white p-4 rounded-lg mb-6 relative">
        <button 
          onClick={() => setError(null)} // Close notification
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        >
          <X size={16} />
        </button>
        <div className="flex items-center space-x-2">
          <img src="/path/to/feature-icon.png" alt="New Feature" className="w-8 h-8 object-cover" />
          <div>
            <p className="font-medium text-gray-700">New Feature</p>
            <p className="text-sm text-gray-500">
              You can request a follow-up 7 days after applying for a job if the application status is in review. Only one follow-up is allowed per job.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => handleTabChange('All')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'All' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({filteredData.length})
          </button>
          <button
            onClick={() => handleTabChange('In Review')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'In Review' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            In Review ({filteredData.filter(app => app.status === 'In Review').length})
          </button>
          <button
            onClick={() => handleTabChange('Interviewing')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'Interviewing' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Interviewing ({filteredData.filter(app => app.status === 'Interviewing').length})
          </button>
          <button
            onClick={() => handleTabChange('Assessment')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'Assessment' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Assessment ({filteredData.filter(app => app.status === 'Assessment').length})
          </button>
          <button
            onClick={() => handleTabChange('Offered')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'Offered' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Offered ({filteredData.filter(app => app.status === 'Offered').length})
          </button>
          <button
            onClick={() => handleTabChange('Hired')}
            className={`text-sm font-medium py-2 px-4 rounded-md ${
              activeTab === 'Hired' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Hired ({filteredData.filter(app => app.status === 'Hired').length})
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button className="bg-white hover:bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-2 px-4">
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50">#</th>
              <th className="px-6 py-3 bg-gray-50">Company Name</th>
              <th className="px-6 py-3 bg-gray-50">Roles</th>
              <th className="px-6 py-3 bg-gray-50">Date Applied</th>
              <th className="px-6 py-3 bg-gray-50">Status</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((app, index) => (
              <tr key={app.id} className="bg-white">
                <td className="px-6 py-4">{startIndex + index + 1}</td>
                <td className="px-6 py-4 flex items-center">
                  <img src={app.logo} alt={app.company} className="w-8 h-8 mr-2 object-cover" />
                  {app.company}
                </td>
                <td className="px-6 py-4">{app.role}</td>
                <td className="px-6 py-4">{app.dateApplied}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      getStatusColor(app.status)
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path fillRule="evenodd" d="M1.32 11.4L10 2.586A1 1 0 0111.414 4L15.414 8A1 1 0 0114 9.414L8.586 15H3a1 1 0 110-2h5.586L1.32 11.4zm19.364-1.414a1 1 0 00-1.414 1.414L13 10.414V15a1 1 0 11-2 0V10.414l-4.293 4.293a1 1 0 001.414 1.414L13 12.414v2.586a1 1 0 002 0V12.414l4.293 4.293a1 1 0 001.414-1.414L15 10.414V3a1 1 0 00-2 0v7.414l-3.293-3.293a1 1 0 00-1.414 1.414L13 14.414v-3z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                page === currentPage
                  ? 'z-10 bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Helper function to get status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'In Review':
      return 'bg-yellow-100 text-yellow-800';
    case 'Interviewing':
      return 'bg-orange-100 text-orange-800';
    case 'Assessment':
      return 'bg-green-100 text-green-800';
    case 'Offered':
      return 'bg-red-100 text-red-800';
    case 'Hired':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default Dashboard;