'use client'
import { Home, Map, Radar, Bell, Settings } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Map, label: 'Locations', id: 'locations' },
  { icon: Radar, label: 'Radar', id: 'radar' },
  { icon: Bell, label: 'Alerts', id: 'alerts' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function BottomNav() {
  const [active, setActive] = useState('home')

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors
                ${isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}