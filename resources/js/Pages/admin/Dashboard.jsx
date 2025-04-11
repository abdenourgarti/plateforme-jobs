import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { FileText, Users, ArrowRight } from "lucide-react";

import DateRengWithPeer from '@/components/elements/DateRangWithPeer';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/json/datadash.json');
        if (!response.ok) throw new Error('Failed to fetch data');
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
    return <div className="p-6 text-center text-gray-500">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  const {
    userName,
    dateRange,
    stats,
    availablePercentage,
    recentApplications
  } = data;

  const interviewedPercentage = Math.round((stats.interviewed / stats.totalApplied) * 100);
  const unsuitablePercentage = 100 - interviewedPercentage;

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Good morning, {userName}</h1>
          <p className="text-gray-600 text-sm">
            Here's what's happening with your job applications from {dateRange.start} - {dateRange.end}.
          </p>
        </div>
        <div className="ml-auto">
          <DateRengWithPeer />
        </div>
      </div>

      {/* Stats Section */}
    
      <div className="flex flex-col md:flex-row gap-6">
  {/* Total Applied */}
  <div className="flex flex-col justify-center mr-20 ml-20 bg-white p-6 w-96 border items-center">
    <div>
      <h4 className="text-gray-500 text-lg font-semibold mb-4">Total Jobs Applied</h4>
    </div>
    <div className="flex gap-4">
      <div>
        <div className="text-5xl font-semibold text-gray-900">{stats.totalApplied}</div>
      </div>
      <div className="text-gray-300 p-4 rounded-full mr-4">
        <FileText className="w-20 h-20" />
      </div>
    </div>
  </div>

  {/* Interviewed - Updated */}
  <div className="flex flex-col justify-center bg-white p-6 w-96 border items-center">
    <div>
      <h4 className="text-gray-500 text-lg font-semibold mb-4">Interviewed</h4>
    </div>
    <div className="flex gap-4">
      <div>
        <div className="text-5xl font-semibold text-gray-900">{stats.interviewed}</div>
      </div>
      <div className="text-gray-300 p-4 rounded-full mr-4">
        <Users className="w-20 h-20" />
      </div>
    </div>
  </div>

  {/* Doughnut Chart */}
  <div className="flex-1 bg-white p-6 rounded-xl border flex flex-col justify-between">
    <h4 className="text-gray-500 text-sm align-middle mb-4">Jobs Applied Status</h4>
    <div className="flex items-center">
      <div className="relative w-24 h-24 mr-6">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#fff22 ${unsuitablePercentage}%, #FFFFFF 0)`,
          }}
        >
          <div className="absolute inset-[8px] bg-white rounded-full" />
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2" />
          {unsuitablePercentage}% Unsuitable
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-400 rounded-full mr-2" />
          {interviewedPercentage}% Interviewed
        </div>
      </div>
    </div>

    <div className="mt-4">
      <Link
        href="/applications"
        className="text-sm text-red-500 font-medium hover:underline flex items-center gap-1"
      >
        View All Applications <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</div>
      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border">
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
            View all applications history <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
