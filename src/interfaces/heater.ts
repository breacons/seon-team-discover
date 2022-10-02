export interface Heater {
  id: string | number;
  x: number;
  y: number;
  radius: number
  level: number;
  action?: 'up' | 'down';
}

export interface Thermometer {
  id: string | number;
  x: number;
  y: number;
  label: string;
  currentTemperature: number;
  currentHumidity: number;
  batteryPercentage: number;
  isExternal?: boolean;
  desiredTemperature?: number;

}
