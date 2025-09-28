import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Zap, 
  TrendingDown, 
  Brain, 
  Leaf, 
  BarChart3, 
  Shield, 
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze your consumption patterns and predict future usage.'
    },
    {
      icon: TrendingDown,
      title: 'Cost Optimization',
      description: 'Reduce energy bills by up to 30% with personalized recommendations and smart scheduling.'
    },
    {
      icon: Leaf,
      title: 'Carbon Footprint',
      description: 'Track and reduce your environmental impact with real-time carbon emission monitoring.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Monitoring',
      description: 'Monitor device performance and consumption with live data visualization and alerts.'
    }
  ];

  const benefits = [
    'Save 20-35% on monthly energy bills',
    'Reduce carbon emissions by 25%',
    'Prevent equipment failures with predictive maintenance',
    'Optimize energy usage during peak hours',
    'Get personalized recommendations based on your habits'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl shadow-lg animate-pulse">
                <Zap className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"> Energy</span>
              <br />
              Consumption Optimizer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Optimize energy use with AI-powered insights. Reduce costs, minimize environmental impact, 
              and make smarter energy decisions with real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors flex items-center space-x-2">
                <span>Watch Demo</span>
                <div className="w-3 h-3 bg-emerald-600 rounded-full animate-ping"></div>
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span>4.9/5 User Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Energy Challenge
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Most households and businesses waste 30-40% of their energy consumption due to 
                inefficient usage patterns, outdated equipment, and lack of real-time insights. 
                Traditional energy monitoring solutions provide data but lack actionable intelligence.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>High energy bills without understanding why</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Inefficient device scheduling and usage</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Lack of predictive maintenance insights</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-4">30-40%</div>
                <div className="text-xl font-semibold text-gray-800 mb-2">Energy Waste</div>
                <div className="text-gray-600">Average household energy inefficiency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our AI-Powered Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to optimize your energy consumption, 
              reduce costs, and minimize environmental impact with smart, actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Proven Results</h3>
              <p className="text-xl opacity-90">Join thousands of satisfied customers saving money and the planet</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-200 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start Optimizing Your Energy Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant access to AI-powered energy insights and start saving money 
            while reducing your carbon footprint.
          </p>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center space-x-3"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;