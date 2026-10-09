import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Send, 
  CheckCircle2,
  Award,
  ChevronRight
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData.ts';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#071326] text-slate-300 border-t border-[#c59b27]/30">
      {/* Top Pre-Footer Accreditation Ribbon */}
      <div className="border-b border-slate-800 bg-[#050e1b] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#d4af37]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">Recognitions & Accreditations</p>
              <p className="text-xs text-slate-400">Institutional quality benchmarks recognized by statutory national & global bodies</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {COLLEGE_INFO.accreditations.map((acc, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-[#0b1d3a] border border-slate-700/60 rounded text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="font-semibold text-white">{acc.name}</span>
                <span className="text-slate-400 text-[11px]">({acc.score})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0b1d3a] to-[#16305a] rounded-lg border border-[#c59b27] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#f6e08c]" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  VERITAS CREST UNIVERSITY
                </span>
                <span className="text-[11px] text-[#d4af37] tracking-wider uppercase block">
                  {COLLEGE_INFO.motto}
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              Founded in 1954, Veritas Crest University stands as a beacon of academic rigor, pioneering scientific research, and ethical global leadership. Dedicated to cultivating future innovators across 85+ specialized degree tracks.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                Subscribe to University Gazette & Research Bulletin
              </p>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-950/70 border border-emerald-600 rounded text-xs text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! You are subscribed to our monthly university dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter academic or personal email"
                    required
                    className="bg-[#0b1d3a] border border-slate-700 text-xs text-white rounded px-3 py-2 flex-1 focus:outline-hidden focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="bg-[#c59b27] hover:bg-[#d4af37] text-[#071326] font-bold text-xs px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#c59b27] pl-2">
              Academic Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> All Programs (UG/PG/PhD)
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Academic Departments
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Admission Guidelines 2026
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Faculty Directory
                </Link>
              </li>
              <li>
                <Link to="/campus-life" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Central Library & Labs
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Academic Calendar & Fests
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#c59b27] pl-2">
              Student & Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/portal" className="text-[#f6e08c] hover:underline font-semibold flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Student Portal Login
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Faculty ERP Console
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Download Prospectus
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors flex items-center gap-1 text-slate-400">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Campus Photo Gallery
                </Link>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Anti-Ragging Cell & Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" /> Equal Opportunity Directorate
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Campus Office */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#c59b27] pl-2">
              Campus Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <div>
                  <p className="text-white font-medium">{COLLEGE_INFO.phone}</p>
                  <p className="text-[11px] text-slate-400">Toll Free Admissions</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`mailto:${COLLEGE_INFO.email}`} className="hover:text-white transition-colors">
                  {COLLEGE_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.officeHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Veritas Crest University. All rights reserved. NIRF Top 5 Autonomous Institution.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Academic Enrollment</span>
            <span className="hover:text-slate-400 cursor-pointer">Mandatory Disclosures</span>
            <Link to="/contact" className="hover:text-slate-400">Campus Route & GPS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
