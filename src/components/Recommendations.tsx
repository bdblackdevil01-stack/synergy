import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Lightbulb, TrendingUp, DollarSign, Leaf, CheckCircle, Clock, Settings, Spade as Upgrade, Brain, Zap, Filter, Star } from 'lucide-react';
import * as Icons from 'lucide-react';

const Recommendations: React.FC = () => {
  const { recommendations, devices, applyRecommendation } = useApp();
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'schedule' | 'setting' | 'upgrade' | 'behavior'>('all');

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesPriority = filter === 'all' || rec.priority === filter;
    const matchesType = typeFilter === 'all' || rec.type === typeFilter;
    return matchesPriority && matchesType;
  });

  const getDeviceInfo = (deviceId: string) => {
    return devices.find(d => d.id === deviceId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'schedule': return Clock;
      case 'setting': return Settings;
      case 'upgrade': return Upgrade;
      case 'behavior': return Brain;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'schedule': return 'bg-blue-100 text-blue-700';
      case 'setting': return 'bg-purple-100 text-purple-700';
      case 'upgrade': return 'bg-orange-100 text-orange-700';
      case 'behavior': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalPotentialSavings = recommendations
    .filter(r => !r.applied)
    .reduce((sum, r) => sum + r.impact.costSavings, 0);
  
  const totalCarbonSavings = recommendations
    .filter(r => !r.applied)
    .reduce((sum, r) => sum + r.impact.carbonSavings, 0);

  const appliedRecommendations = recommendations.filter(r => r.applied).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">AI Smart Recommendations</h1>
              <p className="text-xl text-gray-600">Personalized energy-saving insights powered by AI</p>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">${totalPotentialSavings.toFixed(0)}</div>
            <div className="text-green-100">Potential Monthly Savings</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Leaf className="w-8 h-8" />
              <TrendingUp className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">{totalCarbonSavings.toFixed(0)} kg</div>
            <div className="text-blue-100">CO₂ Reduction Potential</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8" />
              <Star className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">{appliedRecommendations}</div>
            <div className="text-purple-100">Applied Recommendations</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white min-w-48"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="relative">
            <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white min-w-48"
            >
              <option value="all">All Types</option>
              <option value="schedule">Schedule</option>
              <option value="setting">Settings</option>
              <option value="upgrade">Upgrade</option>
              <option value="behavior">Behavior</option>
            </select>
          </div>
        </div>

        {/* Recommendations Grid */}
        {filteredRecommendations.length > 0 ? (
          <div className="space-y-6">
            {filteredRecommendations.map((recommendation) => {
              const device = getDeviceInfo(recommendation.deviceId);
              const TypeIcon = getTypeIcon(recommendation.type);
              const DeviceIcon = device ? (Icons as any)[device.icon] || Icons.Zap : Icons.Zap;

              return (
                <div
                  key={recommendation.id}
                  className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                    recommendation.applied ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{recommendation.title}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                              {recommendation.priority.toUpperCase()}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(recommendation.type)}`}>
                              {recommendation.type.toUpperCase()}
                            </div>
                          </div>
                          {device && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <DeviceIcon className="w-4 h-4" />
                              <span>{device.name}</span>
                              <span className="text-gray-400">•</span>
                              <span>{device.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {recommendation.applied && (
                        <div className="flex items-center space-x-2 text-green-600 bg-green-100 px-3 py-2 rounded-lg">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Applied</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{recommendation.description}</p>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Cost Savings</span>
                        </div>
                        <div className="text-2xl font-bold text-green-800">${recommendation.impact.costSavings.toFixed(0)}</div>
                        <div className="text-sm text-green-600">per month</div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Leaf className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">Carbon Savings</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">{recommendation.impact.carbonSavings.toFixed(1)} kg</div>
                        <div className="text-sm text-blue-600">CO₂ per month</div>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-medium text-orange-700">Efficiency Gain</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-800">{recommendation.impact.efficiency}%</div>
                        <div className="text-sm text-orange-600">improvement</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {recommendation.actionable && !recommendation.applied && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => applyRecommendation(recommendation.id)}
                          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Apply Recommendation</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filter criteria or add more devices to get personalized recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;