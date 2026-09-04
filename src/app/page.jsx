'use client'
import React, { useState, useEffect, useRef } from 'react'
import { KineticTextLoader } from "@/components/ui/kinetic-text-loader"
import useFetch from './useFetch'
import DailyForecast from './components/DailyForecast'
import CurrentWeatherStats from './components/CurrentWeather'
import RadarCard from './components/RadarCard'
import gsap from 'gsap'
import { LuCloudRain, LuSun, LuCloud, LuSnowflake, LuCloudFog, LuCloudLightning, LuCloudDrizzle, LuCloudSun } from 'react-icons/lu';

const WeatherSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto animate-pulse flex flex-col items-center gap-8 mt-8">
    
    {/* Main content grid — matches flex-wrap layout */}
    <div className="w-full flex flex-wrap gap-2 md:justify-around lg:justify-center">
      
      {/* Hero Weather Skeleton — md:w-[50%] lg:w-[35%] */}
      <div className="w-full md:w-[50%] lg:w-[35%] flex flex-col items-center text-center pt-4 gap-6">
        <div className="h-10 bg-white/10 rounded-md w-40"></div>
        <div className="h-4 bg-white/10 rounded-md w-32"></div>
        <div className="flex items-center justify-center gap-6 my-4">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full"></div>
          <div className="h-32 md:h-40 bg-white/10 rounded-md w-28 md:w-36"></div>
        </div>
        <div className="h-6 bg-white/10 rounded-md w-36"></div>
        <div className="h-10 bg-white/10 rounded-full w-48"></div>
      </div>

      {/* Radar Skeleton — md:w-[45%] lg:w-[35%] */}
      <div className="w-full md:w-[45%] lg:w-[35%] bg-white/5 border border-white/10 rounded-3xl p-4 min-h-[250px] flex flex-col">
        <div className="h-3 bg-white/10 rounded-md w-20 mb-4"></div>
        <div className="flex-1 bg-white/[0.03] rounded-2xl w-full"></div>
      </div>

      {/* Stats Skeleton — lg:w-[25%] */}
      <div className="w-full lg:w-[25%] bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col min-h-[250px]">
        <div className="h-3 bg-white/10 rounded-md w-16 mb-6"></div>
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="h-12 bg-white/[0.05] rounded-xl w-full"></div>
          <div className="h-12 bg-white/[0.05] rounded-xl w-full"></div>
          <div className="h-12 bg-white/[0.05] rounded-xl w-full"></div>
          <div className="h-12 bg-white/[0.05] rounded-xl w-full"></div>
        </div>
      </div>

      {/* Forecast Skeleton — full width */}
      <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 mt-2">
        <div className="h-3 bg-white/10 rounded-md w-28 mb-6"></div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="h-3 bg-white/10 rounded-md w-10"></div>
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="h-4 bg-white/10 rounded-md w-8"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
)

export default function Page() {
  const [city, setCity] = useState('Tehran')
  const [inputValue, setInputValue] = useState('')
  const { data, loading } = useFetch(`/api/weather?q=${encodeURIComponent(city)}`)
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = async (e) => {
    const val = e.target.value
    setInputValue(val)
    if (val.trim().length >= 3) {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`)
        const data = await res.json()
        setSuggestions(data)
        setShowSuggestions(true)
        console.log(data);
        
      } catch (error) {
        console.error("Failed to fetch suggestions", error)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (cityName) => {
    setInputValue(cityName)
    setCity(cityName)
    setShowSuggestions(false)
    setSuggestions([])
  }

  useEffect(() => {
    if (data && !loading && containerRef.current) {
      if (timelineRef.current) timelineRef.current.kill()
      timelineRef.current = gsap.fromTo(
        ".weather-card-item",
        { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true }
      )
    }
  }, [data, loading])

  const handleSearch = () => { if (inputValue.trim()) setCity(inputValue.trim()) }
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch() }

 const getWeatherGradient = (condition) => {
  const text = condition?.toLowerCase() || '';

  // Rainy / Stormy: Cool slate blending into deep moody blues
  if (text.includes('rain') || text.includes('drizzle') || text.includes('thunder')) {
    return 'from-slate-950 via-blue-950 to-cyan-950';
  }

  // Snow / Ice: Crisp, arctic indigo-to-slate with icy cyan highlights
  if (text.includes('snow') || text.includes('ice') || text.includes('flurry')) {
    return 'from-slate-950 via-indigo-950 to-blue-950';
  }

  // Cloud / Fog / Overcast: Soft silver-grey tones with subtle indigo contrast
  if (text.includes('cloud') || text.includes('overcast') || text.includes('fog')) {
    return 'from-slate-950 via-slate-900 to-zinc-800';
  }

  // Sunny / Clear: Warm golden-amber accent transitioning from deep dusk sky
  if (text.includes('clear') || text.includes('sun')) {
    return 'from-sky-950 via-slate-950 to-amber-900/40';
  }

  // Fallback: Default balanced dark sky
  return 'from-slate-950 via-slate-900 to-slate-950';
};

  const getWeatherIcon = (conditionText, sizeClass = "w-24 h-24 md:w-28 md:h-28") => {
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

    return <Icon className={`${sizeClass} ${color} drop-shadow-2xl`} />;
  };

  return (
    <div className={`w-full min-h-screen scroll-auto bg-gradient-to-b ${getWeatherGradient(data?.current?.condition?.text)} flex flex-col items-center py-2 px-4 sm:px-6 font-sans text-slate-100 selection:bg-amber-500/30`}>
      <div className="w-full  mx-auto flex flex-col items-center gap-8">

        {/* Search Bar */}
        <div className='flex gap-3 w-full max-w-lg weather-card-item relative z-10'>
          <input
            type="text"
            className='w-full bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all placeholder:text-slate-400 shadow-xl'
            onKeyDown={handleKeyDown}
            id='inp'
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
            onBlur={() => setShowSuggestions(false)}
            placeholder="Search for a city..."
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-3 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-64 overflow-y-auto custom-scrollbar">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} onMouseDown={() => handleSuggestionClick(suggestion.name)} className="px-6 py-4 text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0 flex flex-col">
                  <span className="font-semibold text-lg">{suggestion.name}</span>
                  <span className="text-sm text-slate-400">{suggestion.region}, {suggestion.country}</span>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleSearch} className='bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95'>
            Search
          </button>
        </div>

        {/* Loading & Error States */}
        {!data && loading && <WeatherSkeleton  /> }
        {loading && data && (
          <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm backdrop-blur-md animate-pulse">
            Updating...
          </div>
        )}
        {data?.error ? (
          <div className="weather-card-item w-[450px] h-[250px] gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl backdrop-blur-md text-center mt-10">
            {data.error.message}
            <KineticTextLoader/>
          </div>
        ) : data && !loading ? (
          <div ref={containerRef} className="w-full  flex flex-wrap gap-2 md:justify-around lg:justify-center mt-4">

            {/* 1. Hero Current Weather (Matching the exact screenshot typography) */}
            <section id="tempnow" className="weather-card-item md:w-[50%] lg:w-[35%] w-full  justify-center   flex flex-col items-center text-center pt-4">
              <h2 className="text-5xl font-semibold tracking-tight text-white drop-shadow-md">{data.location.name}</h2>
              <p className="text-sm text-slate-400 uppercase tracking-[0.3em] mt-2 font-medium">{data.location.country}</p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-8">
                <div className="flex items-center justify-center scale-110 md:scale-125">
                  {getWeatherIcon(data.current.condition.text, "w-24 h-24 md:w-32 md:h-32")}
                </div>
                {/* ✅ Pure white, ultra-thin temperature */}
                <h1 className="text-9xl md:text-[10rem] font-thin tracking-tighter text-white drop-shadow-lg leading-none">{Math.round(data.current.temp_c)}°</h1>
              </div>

              <p className="text-xl text-slate-300 font-medium capitalize tracking-wide drop-shadow-sm">{data.current.condition.text}</p>

              <div className="flex gap-6 mt-6 text-slate-200 text-lg font-medium bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                <span>H: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°</span>
                <span className="text-white/20">|</span>
                <span>L: {Math.round(data.forecast.forecastday[0].day.mintemp_c)}°</span>
              </div>
            </section>
            {/* radar */}
            <section className="weather-card-item md:w-[45%] flex flex-col items-center justify-center w-full lg:w-[35%] bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md shadow-xl hover:bg-white/[0.07]   transition-colors">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Live Radar</h3>
              <div className="rounded-2xl w-full  overflow-hidden  min-h-[250px]">
                <RadarCard lat={data.location.lat} lon={data.location.lon} cityName={data.location.name} />
              </div>
            </section>
            {/* current */}
            <section className="weather-card-item h-full w-full lg:w-[25%] flex flex-col bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-xl hover:bg-white/[0.07] transition-colors">
              <h3 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Today</h3>
              <div className="flex-1 flex items-center justify-center">
                <CurrentWeatherStats currentWeather={data?.current} />
              </div>
            </section>

            {/* 3. 7-Day Forecast */}
            <section id='daily' className="w-full weather-card-item bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl mt-2 hover:bg-white/[0.07] transition-colors">
              <DailyForecast days={data.forecast.forecastday} />
            </section>

          </div>
        ) : null}
      </div>
    </div>
  )
}