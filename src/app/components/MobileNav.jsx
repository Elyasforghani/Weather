"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const closeNav = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-16 left-6 z-50 p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Open menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeNav}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Navigation Panel */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-r border-white/10" />

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-slate-50">Menu</h2>
            <button
              onClick={closeNav}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2 px-4 py-6 flex-1">
            <li>
              <Link
                href="/"
                onClick={closeNav}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-50 hover:bg-white/10 transition-all duration-200 font-medium group"
              >
                <svg
                  className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors"
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
                Weather
              </Link>
            </li>
            <li>
              <Link
                href="/components/SnakeGame"
                onClick={closeNav}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-50 hover:bg-white/10 transition-all duration-200 font-medium group"
              >
                <svg
                  className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors"
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
                Game
              </Link>
            </li>
            <li>
              <Link
               href="/components/Creator"
                onClick={closeNav}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-50 hover:bg-white/10 transition-all duration-200 font-medium group"
              >
                 <svg
                  className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors"
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
                Creator
              </Link>
            </li>
           
          </ul>

          {/* Bottom accent */}
          <div className="px-4 py-4 border-t border-white/10">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </nav>
    </>
  );
}