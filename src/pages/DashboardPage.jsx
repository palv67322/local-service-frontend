import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserDashboard from '../components/dashboard/UserDashboard'; 
import ProviderDashboard from '../components/dashboard/ProviderDashboard'; 
import Profile from '../components/dashboard/Profile';
import ProviderBookings from '../components/dashboard/ProviderBookings';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  const providerTabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'services', label: 'My Services' },
    { id: 'bookings', label: 'My Bookings' },
  ];
  const userTabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'bookings', label: 'My Bookings' },
  ];
  const tabs = user.role === 'provider' ? providerTabs : userTabs;

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <Profile />;
      case 'services':
        return user.role === 'provider' ? <ProviderDashboard /> : null; 
      case 'bookings':
        if (user.role === 'provider') {
            return <ProviderBookings />;
        } else {
            return <UserDashboard />; 
        }
      default:
        return <Profile />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default DashboardPage;