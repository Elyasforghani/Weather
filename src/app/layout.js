import Link from "next/link";
import MobileNav from "./components/MobileNav";

import "./globals.css";

export const metadata = {
  title: "Weather & Visualizations",
  description: "A modern dashboard for weather forecasts and visual maps",
 
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
     
      <body className="min-h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 w-full">
        <main className="flex-1 relative overflow-hidden">
          <MobileNav />

          {/* Desktop Sidebar - Glass Morphism */}
          <nav className="hidden md:flex fixed left-0 top-0 flex-col h-full w-20 z-50">
            
            {/* Background glass effect */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-r border-white/10 -z-10" />

            {/* Navigation Items */}
            <div className="flex flex-col items-center justify-center gap-8 flex-1 py-8">
              
              {/* Weather Icon */}
              <Link
                href="/"
                className="group relative flex items-center justify-center w-12 h-12 rounded-xl 
                  bg-white/0 hover:bg-white/10 
                  border border-white/0 hover:border-cyan-400/30
                  focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
                  focus:bg-cyan-400/10 focus:border-cyan-400/40
                  focus:shadow-[0_0_20px_rgba(34,211,238,0.15)]
                  transition-all duration-300"
                title="Weather"
              >
                <svg
                  className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 group-focus:text-cyan-200 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                {/* Focus indicator dot */}
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-focus:opacity-100 transition-opacity" />
              </Link>

              {/* Game Icon */}
              <Link
                href="/components/SnakeGame"
                className="group relative flex items-center justify-center w-12 h-12 rounded-xl
                  bg-white/0 hover:bg-white/10
                  border border-white/0 hover:border-purple-400/30
                  focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
                  focus:bg-purple-400/10 focus:border-purple-400/40
                  focus:shadow-[0_0_20px_rgba(192,132,252,0.15)]
                  transition-all duration-300"
                title="Snake Game"
              >
                <svg
                  className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-focus:text-purple-200 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-purple-400 opacity-0 group-focus:opacity-100 transition-opacity" />
              </Link>

              {/* Creator Icon */}
              <Link
                href="/components/Creator"
                className="group relative flex items-center justify-center w-12 h-12 rounded-xl
                  bg-white/0 hover:bg-white/10
                  border border-white/0 hover:border-amber-400/30
                  focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
                  focus:bg-amber-400/10 focus:border-amber-400/40
                  focus:shadow-[0_0_20px_rgba(251,191,36,0.15)]
                  transition-all duration-300"
                title="Creator"
              >
                <svg
                  className="w-6 h-6 text-amber-400 group-hover:text-amber-300 group-focus:text-amber-200 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 opacity-0 group-focus:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Bottom accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-4 mb-8" />
          </nav>

          {/* Main Content Area */}
          <div className="md:ml-20 relative">
            {/* Optional: Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Content */}
            <div className="relative md:p-1 mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Optional: Ambient glow elements for sophisticated depth */}
        <div className="fixed -bottom-1/3 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-20 opacity-20" />
        <div className="fixed -top-1/3 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-20 opacity-20" />
      </body>
    
    </html>
  );
}