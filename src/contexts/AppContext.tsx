import React, { createContext, useContext, useState, useEffect } from 'react';
import { Device, ConsumptionData, Recommendation } from '../types';
import { generateMockDevices, generateHourlyData, generateRecommendations } from '../utils/mockData';

interface AppContextType {
  devices: Device[];
  recommendations: Recommendation[];
  selectedDevice: Device | null;
  currentView: 'landing' | 'dashboard' | 'device' | 'recommendations';
  setDevices: (devices: Device[]) => void;
  setSelectedDevice: (device: Device | null) => void;
  setCurrentView: (view: 'landing' | 'dashboard' | 'device' | 'recommendations') => void;
  addDevice: (device: Device) => void;
  removeDevice: (deviceId: string) => void;
  updateDevice: (device: Device) => void;
  applyRecommendation: (recommendationId: string) => void;
  getHourlyData: (deviceId: string) => any[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'device' | 'recommendations'>('landing');

  useEffect(() => {
    // Initialize with mock data
    const mockDevices = generateMockDevices();
    setDevices(mockDevices);
    setRecommendations(generateRecommendations(mockDevices));
  }, []);

  const addDevice = (device: Device) => {
    setDevices(prev => [...prev, device]);
  };

  const removeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    if (selectedDevice?.id === deviceId) {
      setSelectedDevice(null);
    }
  };

  const updateDevice = (updatedDevice: Device) => {
    setDevices(prev => prev.map(d => d.id === updatedDevice.id ? updatedDevice : d));
    if (selectedDevice?.id === updatedDevice.id) {
      setSelectedDevice(updatedDevice);
    }
  };

  const applyRecommendation = (recommendationId: string) => {
    setRecommendations(prev =>
      prev.map(r =>
        r.id === recommendationId
          ? { ...r, applied: true }
          : r
      )
    );
  };

  const getHourlyData = (deviceId: string) => {
    return generateHourlyData(deviceId);
  };

  return (
    <AppContext.Provider
      value={{
        devices,
        recommendations,
        selectedDevice,
        currentView,
        setDevices,
        setSelectedDevice,
        setCurrentView,
        addDevice,
        removeDevice,
        updateDevice,
        applyRecommendation,
        getHourlyData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};