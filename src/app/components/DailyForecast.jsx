import React from 'react'
import { LuCloudRain, LuSun, LuCloud, LuSnowflake, LuCloudFog, LuCloudLightning, LuCloudDrizzle, LuCloudSun, LuDroplets } from 'react-icons/lu';

const getForecastIcon = (conditionText) => {
  const text = conditionText?.toLowerCase() || '';
  let Icon = LuSun;
  let color = "text-amber-300";
  
  if (text.includes('thunder')) { Icon = LuCloudLightning; color = "text-amber-200"; }
  else if (text.includes('rain')) { Icon = LuCloudRain; color = "text-sky-400"; }
  else if (text.includes('drizzle')) { Icon = LuCloudDrizzle; color = "text-sky-300"; }
  else if (text.includes('snow') || text.includes('ice')) { Icon = LuSnowflake; color = "text-white"; }
  else if (text.includes('fog') || text.includes('mist')) { Icon = LuCloudFog; color = "text-slate-300"; }
  else if (text.includes('partly cloudy')) { Icon = LuCloudSun; color = "text-amber-200"; }
  else if (text.includes('cloud') || text.includes('overcast')) { Icon = LuCloud; color = "text-slate-200"; }
  
  return <Icon className={`w-7 h-7 ${color}`} />;
};

export default function DailyForecast({ days }) {
  if (!days) return null;

  return (
    <div className='flex flex-col md:grid md:grid-cols-7 gap-2 w-full overflow-x-auto custom-scrollbar pb-2'>
      {days.map((day, index) => { 
        const dateObj = new Date(day.date);
        // Show "Today" for the first day, otherwise short name like "Mon"
        const dayName = index === 0 ? "Today" : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <div key={day.date} className='flex md:flex-col items-center justify-between md:justify-start gap-3 md:gap-2 bg-slate-900/30 p-3 md:p-4 rounded-xl hover:bg-slate-700/40 transition-colors min-w-[100px] md:min-w-0'>
            
            <p className="font-bold text-slate-300 text-sm w-12 md:w-auto text-center">{dayName}</p>

            <div className="my-1 scale-110">
              {getForecastIcon(day.day.condition.text)}
            </div>

            {/* Rain chance */}
            <div className="flex items-center gap-1 text-xs text-sky-400">
              <LuDroplets className="w-3 h-3" />
              {day.day.daily_chance_of_rain}%
            </div>

            <div className="flex md:flex-col gap-2 md:gap-1 text-sm items-center">
              <span className="font-bold text-white">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-slate-500">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}