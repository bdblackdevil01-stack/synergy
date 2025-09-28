import React, { useState } from 'react';
import { Device } from '../types';
import { useApp } from '../contexts/AppContext';
import { Power, Settings, AlertTriangle, TrendingUp, TrendingDown, Wifi, WifiOff, MoreVertical, Trash2, CreditCard as Edit3, Bell } from 'lucide-react';
import * as Icons from 'lucide-react';

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const { setSelectedDevice, removeDevice, updateDevice } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [showAlertSettings, setShowAlertSettings] = useState(false);

  const getDeviceIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Zap;
    return IconComponent;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const IconComponent = getDeviceIcon(device.icon);

  const handleViewDetails = () => {
    setSelectedDevice(device);
    setShowMenu(false);
  };

  const handleRemoveDevice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove ${device.name}?`)) {
      removeDevice(device.id);
    }
    setShowMenu(false);
  };

  const handleToggleAlerts = () => {
    const updatedDevice = {
      ...device,
      alerts: {
        ...device.alerts,
        enabled: !device.alerts.enabled
      }
    };
    updateDevice(updatedDevice);
  };

  const handleUpdateThreshold = (newThreshold: number) => {
    const updatedDevice = {
      ...device,
      alerts: {
        ...device.alerts,
        threshold: newThreshold
      }
    };
    updateDevice(updatedDevice);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
              {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span className="capitalize">{device.status}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-40 z-10">
                  <button
                    onClick={handleViewDetails}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAlertSettings(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Alert Settings</span>
                  </button>
                  <button
                    onClick={handleRemoveDevice}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{device.currentUsage}</div>
            <div className="text-xs text-gray-500">kW Current</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{device.dailyUsage}</div>
            <div className="text-xs text-gray-500">kWh Today</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getEfficiencyColor(device.efficiency)}`}>
              {device.efficiency}%
            </div>
            <div className="text-xs text-gray-500">Efficiency</div>
          </div>
        </div>
      </div>

      {/* Alerts & Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {device.alerts.enabled && (
              <div className="flex items-center space-x-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs">
                <Bell className="w-3 h-3" />
                <span>Alerts On</span>
              </div>
            )}
            {device.efficiency < 70 && (
              <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>Low Efficiency</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleViewDetails}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Alert Settings Modal */}
      {showAlertSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Settings - {device.name}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Enable Alerts</span>
                <button
                  onClick={handleToggleAlerts}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    device.alerts.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      device.alerts.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              {device.alerts.enabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Threshold ({device.alerts.type === 'usage' ? 'kWh' : device.alerts.type === 'efficiency' ? '%' : 'points'})
                    </label>
                    <input
                      type="number"
                      value={device.alerts.threshold}
                      onChange={(e) => handleUpdateThreshold(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                    <select
                      value={device.alerts.type}
                      onChange={(e) => {
                        const updatedDevice = {
                          ...device,
                          alerts: {
                            ...device.alerts,
                            type: e.target.value as 'usage' | 'anomaly' | 'efficiency'
                          }
                        };
                        updateDevice(updatedDevice);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="usage">High Usage</option>
                      <option value="anomaly">Anomaly Detection</option>
                      <option value="efficiency">Low Efficiency</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAlertSettings(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAlertSettings(false)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceCard;