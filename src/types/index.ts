export interface Device {
  id: string;
  name: string;
  icon: string;
  status: 'online' | 'offline' | 'idle';
  currentUsage: number; // kW
  dailyUsage: number; // kWh
  efficiency: number; // percentage
  category: 'heating' | 'cooling' | 'lighting' | 'appliance' | 'entertainment';
  location: string;
  alerts: {
    enabled: boolean;
    threshold: number;
    type: 'usage' | 'anomaly' | 'efficiency';
  };
}

export interface ConsumptionData {
  deviceId: string;
  timestamp: Date;
  usage: number;
  predicted: number;
  cost: number;
}

export interface Recommendation {
  id: string;
  deviceId: string;
  type: 'schedule' | 'setting' | 'upgrade' | 'behavior';
  title: string;
  description: string;
  impact: {
    costSavings: number;
    carbonSavings: number;
    efficiency: number;
  };
  actionable: boolean;
  applied: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface HourlyData {
  hour: string;
  actual: number;
  predicted: number;
  cost: number;
}