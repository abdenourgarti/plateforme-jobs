import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

// Icons with className support
const DocumentIcon = ({ className }) => (
  <svg className={`w-8 h-8 text-gray-300 ${className || ''}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={`w-8 h-8 text-gray-300 ${className || ''}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={`w-4 h-4 ml-1 ${className || ''}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/json/datadash.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData.dashboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const { 
    userName, 
    dateRange, 
    stats, 
    interviewedPercentage, 
    availablePercentage, 
    recentApplications 
  } = data;

  return (
    <div className="p-6">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-xl font-semibold">Good morning, {userName}</h1>
      <p className="text-gray-600 text-sm">
        Here is what's happening with your job search applications from {dateRange.start} - {dateRange.end}.
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">Total Jobs Applied</h3>
        <div className="flex items-center">
          <span className="text-4xl font-bold">{stats.totalApplied}</span>
          <DocumentIcon className="ml-auto" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">Interviewed</h3>
        <div className="flex items-center">
          <span className="text-4xl font-bold">{stats.interviewed}</span>
          <UserIcon className="ml-auto" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">Application Status</h3>
        <div className="flex items-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(#3B82F6 ${interviewedPercentage}%, #e2e8f0 0)` }}>
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="ml-4 space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">{interviewedPercentage}% Interviewed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
              <span className="text-sm">{availablePercentage}% Available</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <Link href="/applications" className="text-blue-500 text-sm flex items-center justify-end hover:text-blue-600">
            View All Applications
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>

    {/* Recent Applications */}
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-medium">Recent Applications History</h3>
      </div>
      <div className="divide-y">
        {recentApplications.map((app) => (
          <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${app.color}`}>
                  <img src={app.logo} alt={app.company} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{app.position}</h4>
                  <p className="text-sm text-gray-500">{app.company} • {app.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div>
                  <h5 className="text-xs text-gray-500">Date Applied</h5>
                  <p className="text-sm text-gray-900">{app.appliedDate}</p>
                </div>

                <div>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    app.status === 'Review' ? 'bg-amber-100 text-amber-800' :
                    app.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 text-right border-t">
        <Link href="/applications/history" className="text-blue-500 text-sm flex items-center justify-end hover:text-blue-600">
          View all applications history
          <ArrowRightIcon />
        </Link>
      </div>
    </div>
  </div>
);
};

export default Dashboard;