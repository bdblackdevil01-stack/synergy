import React from 'react';
import { useApp } from '../contexts/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Leaf, Zap, Clock, AlertCircle } from 'lucide-react';
import * as Icons from 'lucide-react';

const DeviceDetails: React.FC = () => {
  const { selectedDevice, setSelectedDevice, getHourlyData } = useApp();

  if (!selectedDevice) return null;

  const hourlyData = getHourlyData(selectedDevice.id);
  const IconComponent = (Icons as any)[selectedDevice.icon] || Icons.Zap;

  const totalDailyCost = hourlyData.reduce((sum, hour) => sum + hour.cost, 0);
  const peakUsage = Math.max(...hourlyData.map(h => h.actual));
  const averageUsage = hourlyData.reduce((sum, h) => sum + h.actual, 0) / hourlyData.length;

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return 'text-green-600 bg-green-100';
    if (efficiency >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedDevice(null)}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedDevice.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{selectedDevice.location}</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDevice.status)}`}>
                      {selectedDevice.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {selectedDevice.currentUsage} kW
                </div>
                <div className="text-sm text-gray-500">Current Usage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{selectedDevice.dailyUsage} kWh</div>
            <div className="text-sm text-gray-500">Today's Consumption</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">${totalDailyCost.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Daily Cost</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getEfficiencyColor(selectedDevice.efficiency).split(' ')[1]}`}>
                <TrendingUp className={`w-6 h-6 ${getEfficiencyColor(selectedDevice.efficiency).split(' ')[0]}`} />
              </div>
              {selectedDevice.efficiency >= 85 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingDown className="w-5 h-5 text-red-500" />
              }
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{selectedDevice.efficiency}%</div>
            <div className="text-sm text-gray-500">Efficiency Rating</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{(selectedDevice.dailyUsage * 0.85).toFixed(1)} kg</div>
            <div className="text-sm text-gray-500">CO₂ Today</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 24-Hour Consumption Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">24-Hour Consumption</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">Actual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Predicted</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cost Analysis Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Cost Analysis</h3>
              <div className="text-sm text-gray-500">Hourly breakdown</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: any) => [`$${value}`, 'Cost']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#f59e0b" 
                    fill="url(#costGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights & Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Device Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-xl">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Optimal Performance Window</h4>
                  <p className="text-gray-600 mt-1">Device operates most efficiently between 2 PM - 6 PM. Consider scheduling high-usage tasks during this period.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Peak Usage Prediction</h4>
                  <p className="text-gray-600 mt-1">Expected peak usage tomorrow at 7 PM ({peakUsage.toFixed(1)} kW). Consider pre-cooling or adjusting schedule.</p>
                </div>
              </div>
              
              {selectedDevice.efficiency < 80 && (
                <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Efficiency Alert</h4>
                    <p className="text-gray-600 mt-1">Device efficiency is below optimal levels. Consider maintenance check or upgrade for 25% energy savings.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Average Usage</span>
                  <span className="font-semibold">{averageUsage.toFixed(1)} kW</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(averageUsage / peakUsage) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Peak Usage</span>
                  <span className="font-semibold">{peakUsage.toFixed(1)} kW</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Efficiency</span>
                  <span className="font-semibold">{selectedDevice.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${selectedDevice.efficiency >= 85 ? 'bg-green-500' : selectedDevice.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${selectedDevice.efficiency}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">${totalDailyCost.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Estimated Daily Cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;