"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Lineup', href: '/lineup' },
    { name: 'Tickets', href: '/tickets' },
    { name: 'Venue Map', href: '/map' },
    { name: 'Food Vendors', href: '/food' },
    { name: 'Lost & Found', href: '/lost-found' },
  ];

  // Close the mobile dropdown when clicking outside of the navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] shadow-cyan-500/5 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2 cursor-pointer">
              <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:animate-pulse transition-all">
                🔊 SOUNDWAVE
              </span>
              <span className="hidden sm:inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                FESTIVAL
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 hover:text-cyan-400 cursor-pointer ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/5 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]'
                        : 'text-slate-300'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none transition-colors cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 border-t border-slate-800 bg-slate-950/95' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-cyan-400 border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
