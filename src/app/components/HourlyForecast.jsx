'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

export default function HourlyForecast({ hours }) {
  const scrollRef = useRef(null)
  
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h3 className="text-slate-400 text-sm font-semibold mb-4 px-2">Hourly Forecast</h3>
      
      <div className="relative group">
        <button 
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {hours.map((hour, i) => (
            <div 
              key={hour.time}
              className={`flex-shrink-0 w-20 py-4 rounded-2xl flex flex-col items-center gap-2 snap-start
                ${i === 0 ? 'bg-slate-700/60 border border-slate-600/50' : 'bg-slate-800/40 border border-slate-700/30'}
                backdrop-blur-md`}
            >
              <span className="text-xs text-slate-300">{i === 0 ? 'Now' : formatTime(hour.time)}</span>
              <img src={`https:${hour.condition.icon}`} className="w-8 h-8" alt="" />
              <span className="text-lg font-medium">{Math.round(hour.temp_c)}°</span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function formatTime(timeString) {
  const hour = parseInt(timeString.split(' ')[1].split(':')[0])
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h = hour % 12 || 12
  return `${h} ${ampm}`
}