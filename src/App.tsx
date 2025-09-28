import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DeviceDetails from './components/DeviceDetails';
import Recommendations from './components/Recommendations';

const AppContent: React.FC = () => {
  const { currentView, selectedDevice } = useApp();

  const renderCurrentView = () => {
    if (selectedDevice) {
      return <DeviceDetails />;
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'recommendations':
        return <Recommendations />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderCurrentView()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;