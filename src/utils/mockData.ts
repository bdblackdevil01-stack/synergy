import { Device, Recommendation, HourlyData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateMockDevices = (): Device[] => [
  {
    id: uuidv4(),
    name: 'Smart Thermostat',
    icon: 'thermometer',
    status: 'online',
    currentUsage: 2.3,
    dailyUsage: 18.5,
    efficiency: 87,
    category: 'heating',
    location: 'Living Room',
    alerts: {
      enabled: true,
      threshold: 25,
      type: 'usage'
    }
  },
  {
    id: uuidv4(),
    name: 'LED Light System',
    icon: 'lightbulb',
    status: 'online',
    currentUsage: 0.8,
    dailyUsage: 6.2,
    efficiency: 92,
    category: 'lighting',
    location: 'Kitchen',
    alerts: {
      enabled: true,
      threshold: 10,
      type: 'anomaly'
    }
  },
  {
    id: uuidv4(),
    name: 'Energy Star Refrigerator',
    icon: 'refrigerator',
    status: 'online',
    currentUsage: 1.2,
    dailyUsage: 28.8,
    efficiency: 85,
    category: 'appliance',
    location: 'Kitchen',
    alerts: {
      enabled: false,
      threshold: 35,
      type: 'efficiency'
    }
  },
  {
    id: uuidv4(),
    name: 'Smart AC Unit',
    icon: 'wind',
    status: 'idle',
    currentUsage: 0.0,
    dailyUsage: 45.2,
    efficiency: 78,
    category: 'cooling',
    location: 'Master Bedroom',
    alerts: {
      enabled: true,
      threshold: 50,
      type: 'usage'
    }
  },
  {
    id: uuidv4(),
    name: 'Gaming Console',
    icon: 'gamepad-2',
    status: 'offline',
    currentUsage: 0.0,
    dailyUsage: 12.3,
    efficiency: 65,
    category: 'entertainment',
    location: 'Living Room',
    alerts: {
      enabled: true,
      threshold: 15,
      type: 'usage'
    }
  }
];

export const generateHourlyData = (deviceId: string): HourlyData[] => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0') + ':00';
    const baseUsage = Math.sin((i - 6) * Math.PI / 12) * 2 + 3 + Math.random() * 1.5;
    const actual = Math.max(0, baseUsage);
    const predicted = actual + (Math.random() - 0.5) * 0.8;
    const cost = actual * 0.12; // $0.12 per kWh

    return {
      hour,
      actual: parseFloat(actual.toFixed(2)),
      predicted: parseFloat(predicted.toFixed(2)),
      cost: parseFloat(cost.toFixed(3))
    };
  });

  return hours;
};

export const generateRecommendations = (devices: Device[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  devices.forEach(device => {
    if (device.efficiency < 80) {
      recommendations.push({
        id: uuidv4(),
        deviceId: device.id,
        type: 'upgrade',
        title: 'Upgrade to Energy Star Model',
        description: `Replace ${device.name} with a more efficient model to reduce consumption by up to 25%.`,
        impact: {
          costSavings: 45.50,
          carbonSavings: 12.3,
          efficiency: 25
        },
        actionable: true,
        applied: false,
        priority: 'high'
      });
    }

    if (device.category === 'heating' || device.category === 'cooling') {
      recommendations.push({
        id: uuidv4(),
        deviceId: device.id,
        type: 'schedule',
        title: 'Optimize Temperature Schedule',
        description: `Adjust ${device.name} to run more efficiently during off-peak hours.`,
        impact: {
          costSavings: 23.80,
          carbonSavings: 8.7,
          efficiency: 15
        },
        actionable: true,
        applied: false,
        priority: 'medium'
      });
    }

    if (device.category === 'lighting') {
      recommendations.push({
        id: uuidv4(),
        deviceId: device.id,
        type: 'behavior',
        title: 'Motion-Activated Controls',
        description: `Install smart sensors for ${device.name} to automatically turn off when no one is present.`,
        impact: {
          costSavings: 18.20,
          carbonSavings: 5.1,
          efficiency: 20
        },
        actionable: true,
        applied: false,
        priority: 'medium'
      });
    }
  });

  return recommendations;
};