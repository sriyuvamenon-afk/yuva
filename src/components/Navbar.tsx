import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  UserCheck, 
  ChevronRight, 
  Bell, 
  BookOpen, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData.ts';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Departments', path: '/departments' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Campus Life', path: '/campus-life' },
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#071326] text-white text-xs py-1.5 px-4 border-b border-[#c59b27]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Ticker / Notice */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#c59b27] text-[#071326] font-bold text-[10px] tracking-wider uppercase rounded-xs">
              <Bell className="w-3 h-3 animate-pulse" />
              Notice
            </span>
            <span className="text-slate-300 truncate text-[11px] font-medium">
              Admissions Open 2026-27 · National Research Conclave Registration Live · NAAC A++ (CGPA 3.92)
            </span>
          </div>

          {/* Quick Contact & Portal Shortcuts */}
          <div className="hidden lg:flex items-center gap-5 text-slate-300 text-[11px]">
            <a href="tel:18005827488" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-[#c59b27]" />
              <span>{COLLEGE_INFO.phone}</span>
            </a>
            <a href={`mailto:${COLLEGE_INFO.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-[#c59b27]" />
              <span>{COLLEGE_INFO.email}</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link 
              to="/portal" 
              className="flex items-center gap-1.5 font-semibold text-[#f6e08c] hover:text-white transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student / Faculty Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            {/* College Crest Icon */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#0b1d3a] to-[#12284c] rounded-lg p-2 border border-[#c59b27] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#c59b27] rounded-full flex items-center justify-center text-[8px] font-black text-[#0b1d3a]">
                ★
              </div>
              <GraduationCap className="w-7 h-7 text-[#f6e08c]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0b1d3a]">
                  VERITAS CREST
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                <span>University & Research</span>
                <span className="text-[#c59b27]">·</span>
                <span className="text-emerald-700 font-semibold">Estd. 1954</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-[13px] font-medium tracking-tight transition-colors duration-150 relative ${
                    active
                      ? 'text-[#0b1d3a] font-bold'
                      : 'text-slate-600 hover:text-[#0b1d3a]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c59b27]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/portal"
              className="px-3.5 py-2 text-xs font-semibold text-[#0b1d3a] hover:bg-slate-100 rounded-md border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>Portal</span>
            </Link>

            <Link
              to="/admissions"
              className="px-4 py-2 text-xs font-bold text-[#071326] bg-gradient-to-r from-[#d4af37] to-[#e5c058] hover:from-[#c59b27] hover:to-[#d4af37] shadow-sm hover:shadow transition-all rounded-md flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/portal"
              className="px-2.5 py-1.5 text-xs font-semibold text-[#0b1d3a] bg-slate-100 rounded border border-slate-300"
            >
              Portal
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0b1d3a] hover:bg-slate-100 rounded-md focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-md font-medium ${
                    active
                      ? 'bg-slate-100 text-[#0b1d3a] font-bold border-l-4 border-[#c59b27]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <Link
              to="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#0b1d3a] bg-slate-100 rounded-md border border-slate-300"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student & Faculty Portal Access</span>
            </Link>
            
            <Link
              to="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#071326] bg-[#d4af37] rounded-md tracking-wider uppercase"
            >
              <span>Apply Online 2026-27</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <div className="pt-3 text-xs text-slate-500 text-center space-y-1">
              <p>Admissions Desk: {COLLEGE_INFO.phone}</p>
              <p>{COLLEGE_INFO.email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
