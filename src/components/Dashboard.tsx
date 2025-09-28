import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import DeviceCard from './DeviceCard';
import { Plus, Search, Filter, Zap, TrendingUp, DollarSign, Leaf } from 'lucide-react';
import * as Icons from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../types';

const Dashboard: React.FC = () => {
  const { devices, addDevice } = useApp();
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || device.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalConsumption = devices.reduce((sum, device) => sum + device.dailyUsage, 0);
  const totalCost = totalConsumption * 0.12;
  const totalCO2 = totalConsumption * 0.85;
  const averageEfficiency = devices.reduce((sum, device) => sum + device.efficiency, 0) / devices.length;

  const categories = ['all', 'heating', 'cooling', 'lighting', 'appliance', 'entertainment'];

  const handleAddDevice = (deviceData: any) => {
    const newDevice: Device = {
      id: uuidv4(),
      ...deviceData,
      currentUsage: Math.random() * 3,
      dailyUsage: Math.random() * 50,
      efficiency: Math.floor(Math.random() * 40) + 60,
      status: 'online' as const,
      alerts: {
        enabled: false,
        threshold: 25,
        type: 'usage' as const
      }
    };
    addDevice(newDevice);
    setShowAddDevice(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Energy Dashboard</h1>
          <p className="text-xl text-gray-600">Monitor and optimize your energy consumption with AI-powered insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalConsumption.toFixed(1)} kWh</div>
            <div className="text-sm text-gray-500">Total Consumption Today</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">${totalCost.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Estimated Daily Cost</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalCO2.toFixed(1)} kg</div>
            <div className="text-sm text-gray-500">CO₂ Emissions Today</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              {averageEfficiency >= 80 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingUp className="w-5 h-5 text-red-500" />
              }
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{averageEfficiency.toFixed(0)}%</div>
            <div className="text-sm text-gray-500">Average Efficiency</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white min-w-48"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddDevice(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Device</span>
          </button>
        </div>

        {/* Devices Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria, or add a new device.</p>
            <button
              onClick={() => setShowAddDevice(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Your First Device
            </button>
          </div>
        )}

        {/* Add Device Modal */}
        {showAddDevice && (
          <AddDeviceModal 
            onClose={() => setShowAddDevice(false)}
            onAdd={handleAddDevice}
          />
        )}
      </div>
    </div>
  );
};

// Add Device Modal Component
const AddDeviceModal: React.FC<{ 
  onClose: () => void; 
  onAdd: (device: any) => void; 
}> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'zap',
    category: 'appliance',
    location: ''
  });

  const icons = [
    'thermometer', 'lightbulb', 'refrigerator', 'wind', 'gamepad-2', 
    'tv', 'washing-machine', 'microwave', 'coffee', 'fan'
  ];

  const categories = ['heating', 'cooling', 'lighting', 'appliance', 'entertainment'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.location) {
      onAdd(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-96 overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Device</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Device Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Smart Thermostat"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Living Room"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <div className="grid grid-cols-5 gap-3">
              {icons.map(iconName => {
                const IconComponent = (Icons as any)[iconName] || Icons.Zap;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.icon === iconName
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;