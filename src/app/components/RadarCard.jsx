'use client'
import { useEffect, useRef, useState } from 'react'
import { CloudRain, Cloud, Map as MapIcon } from 'lucide-react'

const LAYERS = {
  radar: { label: 'Rain', icon: CloudRain, activeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-lg shadow-blue-500/10' },
  clouds: { label: 'Clouds', icon: Cloud, activeClass: 'bg-slate-400/20 text-slate-200 border-slate-400/40 shadow-lg shadow-slate-400/10' },
  none: { label: 'Clear', icon: MapIcon, activeClass: 'bg-slate-600/20 text-slate-300 border-slate-500/40' }
}

export default function RadarCard({ lat = 37.7749, lon = -122.4194, cityName = '' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const overlayRef = useRef(null)
  const LRef = useRef(null)
  const rainDataRef = useRef(null)
  const isInitRef = useRef(false)
  const [activeLayer, setActiveLayer] = useState('radar')
  const [zoomLevel, setZoomLevel] = useState(9)

  // ─── Init Map ───
  // ─── Init Map ───
  useEffect(() => {
    let mounted = true

    const init = async () => {
      if (!mapRef.current || isInitRef.current) return

      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      LRef.current = L

      if (mapRef.current._leaflet_id) {
        mapRef.current._leaflet_id = null
      }

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        maxZoom: 18,        
        minZoom: 3,
      }).setView([lat, lon], 4)

      if (!mounted) {
        map.remove()
        return
      }

      mapInstanceRef.current = map
      isInitRef.current = true

    
      setTimeout(() => {
        map.invalidateSize()
        map.setView([lat, lon],12, { animate: true })
      }, 100)

      // Track zoom for UI
      map.on('zoomend', () => setZoomLevel(map.getZoom()))

      // Dark base map
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map)

      addPin(L, lat, lon, cityName)

      try {
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json')
        const data = await res.json()
        rainDataRef.current = data
        applyLayer('radar')
      } catch {
        // Silent fail
      }
    }

    init()

    return () => {
      mounted = false
      isInitRef.current = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
        overlayRef.current = null
        LRef.current = null
        rainDataRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // ─── Move pin when city changes ───
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current || !LRef.current) return
    mapInstanceRef.current.setView([lat, lon], 9, { animate: true, duration: 1 })
    markerRef.current.setLatLng([lat, lon])
    markerRef.current.setIcon(createPinIcon(LRef.current, cityName))
  }, [lat, lon, cityName])

  // ─── Swap overlay when user toggles layer ───
  useEffect(() => {
    applyLayer(activeLayer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayer])

  // ─── Helpers ───
  function createPinIcon(L, name) {
    return L.divIcon({
      html: `
        <div style="position:relative;width:28px;height:28px;">
          <div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(59,130,246,0.25);filter:blur(6px);"></div>
          <div style="
            position:relative;width:28px;height:28px;background:#3b82f6;
            border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
            box-shadow:0 0 12px rgba(59,130,246,0.6);
          "></div>
          <div style="
            position:absolute;top:-36px;left:50%;transform:translateX(-50%);
            background:rgba(15,23,42,0.95);color:#fff;padding:3px 10px;
            border-radius:8px;font-size:11px;white-space:nowrap;
            border:1px solid rgba(255,255,255,0.12);font-family:system-ui,sans-serif;
            backdrop-filter:blur(8px);box-shadow:0 4px 12px rgba(0,0,0,0.3);
          ">${name || 'Location'}</div>
        </div>
      `,
      className: 'custom-pin',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    })
  }

  function addPin(L, lat, lon, name) {
    const marker = L.marker([lat, lon], { icon: createPinIcon(L, name) }).addTo(mapInstanceRef.current)
    markerRef.current = marker
  }

  function applyLayer(type) {
    if (!mapInstanceRef.current || !LRef.current || !rainDataRef.current) return

    const map = mapInstanceRef.current
    const L = LRef.current

    if (overlayRef.current) {
      map.removeLayer(overlayRef.current)
      overlayRef.current = null
    }

    if (type === 'none') return

    let url = null
    const data = rainDataRef.current

    if (type === 'radar') {
      const frames = data.radar?.past
      if (frames?.length > 0) {
        url = `https://tilecache.rainviewer.com${frames[frames.length - 1].path}/256/{z}/{x}/{y}/2/0_0.png`
      }
    } else if (type === 'clouds') {
      const frames = data.satellite?.infrared
      if (frames?.length > 0) {
        url = `https://tilecache.rainviewer.com${frames[frames.length - 1].path}/256/{z}/{x}/{y}/0/0_0.png`
      }
    }

    if (url) {
      // ✅ KEY FIX: maxNativeZoom 8 means tiles won't try to load past zoom 8
      // Leaflet will upscale zoom 8 tiles for deeper zoom instead of showing "Not Supported"
      overlayRef.current = L.tileLayer(url, {
        opacity: 0.75,
        maxZoom: 18,          // Match base map so overlay stays visible
        maxNativeZoom: 8,     // RainViewer only has tiles up to zoom 8
      }).addTo(map)
    }
  }

  const isZoomWarning = activeLayer !== 'none' && zoomLevel > 8

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/30 rounded-3xl overflow-hidden h-80 relative group">
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-0 bg-slate-900 cursor-grab active:cursor-grabbing" />

      {/* Edge vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(15,23,42,0.8)] pointer-events-none z-[5]" />

      {/* Zoom warning */}
      {isZoomWarning && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] px-3 py-1.5 rounded-full border border-slate-600/40 animate-pulse pointer-events-none">
          Zoom out for live radar data
        </div>
      )}

      {/* Layer toggle pills */}
      <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 justify-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto bg-slate-900/60 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-700/40">
          {Object.entries(LAYERS).map(([key, { label, icon: Icon, activeClass }]) => {
            const isActive = activeLayer === key
            return (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold 
                  border transition-all duration-200
                  ${isActive 
                    ? activeClass + ' scale-105' 
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200'}
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-10 pointer-events-none">
        <p className="text-sm font-semibold">Live Weather Map</p>
        <p className="text-[10px] text-slate-400 mt-0.5">Scroll to zoom · Drag to pan</p>
      </div>
    </div>
  )
}