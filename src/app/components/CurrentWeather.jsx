import React from 'react';
import { LuThermometerSun, LuDroplets, LuWind, LuSun, LuEye, LuGauge, LuCloudy, LuClock } from 'react-icons/lu';

export default function CurrentWeatherStats({ currentWeather }) {
  if (!currentWeather) return null;

  const stats = [
    { label: "Feels Like", value: `${currentWeather.feelslike_c}°`, Icon: LuThermometerSun, color: "text-red-400" },
    { label: "Humidity", value: `${currentWeather.humidity}%`, Icon: LuDroplets, color: "text-blue-400" },
    { label: "Wind", value: `${currentWeather.wind_kph} kph`, Icon: LuWind, color: "text-cyan-400" },
    { label: "UV Index", value: `${currentWeather.uv}`, Icon: LuSun, color: "text-amber-400" },
    { label: "Visibility", value: `${currentWeather.vis_km} km`, Icon: LuEye, color: "text-slate-300" },
    { label: "Pressure", value: `${currentWeather.pressure_mb} mb`, Icon: LuGauge, color: "text-purple-400" },
    { label: "Cloud Cover", value: `${currentWeather.cloud}%`, Icon: LuCloudy, color: "text-slate-300" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center divide-y divide-white/5">
      {stats.map((stat, index) => {
        const Icon = stat.Icon;
        return (
          <div key={index} className="group flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className={`${stat.color} transition-colors duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                {stat.label}
              </p>
            </div>
            <p className="text-base font-semibold text-slate-50 group-hover:text-white transition-colors">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}