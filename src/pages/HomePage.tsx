import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Award, 
  Landmark, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  CheckCircle,
  Building2,
  Cpu,
  Globe2,
  FileText
} from 'lucide-react';
import { 
  COLLEGE_INFO, 
  KEY_STATISTICS, 
  COURSES_DATA, 
  UPCOMING_EVENTS, 
  TESTIMONIALS, 
  RECRUITING_PARTNERS 
} from '../data/collegeData.ts';
import { Course } from '../types.ts';
import { CourseModal } from '../components/CourseModal.tsx';
import { ProspectusModal } from '../components/ProspectusModal.tsx';

export const HomePage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [prospectusOpen, setProspectusOpen] = useState(false);

  const featuredCourses = COURSES_DATA.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#071326] text-white overflow-hidden">
        {/* Background Campus Image with Navy/Gold Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80"
            alt="Veritas Crest University Historic Campus"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071326] via-[#0b1d3a]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-[#c59b27]/40 backdrop-blur-xs text-xs text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="font-semibold text-white">NAAC A++ (CGPA 3.92)</span>
              <span className="text-slate-400">·</span>
              <span className="text-[#f6e08c]">NIRF Ranked #4 Top Autonomous Institution</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Empowering Tomorrow's Leaders Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f6e08c] via-[#d4af37] to-[#e5c058]">
                Knowledge & Innovation
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl">
              Welcome to Veritas Crest University. For over seven decades, our 140-acre campus has nurtured groundbreaking scientific research, transformative business leadership, and creative intellectual discovery.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/admissions"
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#071326] bg-gradient-to-r from-[#d4af37] to-[#e5c058] hover:from-[#c59b27] hover:to-[#d4af37] rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2 uppercase tracking-wider font-sans"
              >
                <span>Apply for 2026-27</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/courses"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-md backdrop-blur-xs transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>Explore Programs</span>
              </Link>

              <button
                onClick={() => setProspectusOpen(true)}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>Download Prospectus</span>
              </button>
            </div>

            {/* Key Assurance Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-700/60 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>100% Placement Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>$42M+ Funded Research</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Merit Scholarships up to 100%</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="bg-gradient-to-r from-[#0b1d3a] via-[#12284c] to-[#0b1d3a] border-y border-[#c59b27]/30 py-8 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {KEY_STATISTICS.map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r last:border-r-0 border-white/10">
                <div className="font-serif text-3xl lg:text-4xl font-extrabold text-[#f6e08c] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LATEST NOTICES & ANNOUNCEMENTS TICKER */}
      <section className="bg-amber-50/70 border-b border-amber-200/80 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#0b1d3a] text-white font-bold text-[10px] tracking-wider uppercase rounded">
              Circular
            </span>
            <p className="text-slate-800 font-medium">
              <span className="font-bold text-[#0b1d3a]">Admission Notice:</span> Early decision application round closes December 15, 2026. Entrance merit scholarships available for engineering and business programs.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/portal" className="text-[#0b1d3a] font-bold hover:underline flex items-center gap-1">
              <span>View Noticeboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ACADEMIC PROGRAMS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#c59b27] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Academic Distinction</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0b1d3a] tracking-tight">
              Featured Flagship Programs
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Curated curricula designed alongside international industry advisory boards, integrating experiential lab practice with rigorous academic theory.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1.5 uppercase tracking-wider shrink-0"
          >
            <span>View All 85+ Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2">
                  <span className="text-[#c59b27] font-bold uppercase">{course.department}</span>
                  <span>{course.duration}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0b1d3a] group-hover:text-[#c59b27] transition-colors leading-snug">
                  {course.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="px-5 py-2 flex-1 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Eligibility:</span>
                    <span className="font-medium text-slate-800">10+2 / 60%+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tuition:</span>
                    <span className="font-bold text-[#0b1d3a]">{course.annualFee} / yr</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] transition-colors flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/admissions"
                  state={{ selectedProgram: course.title }}
                  className="px-3 py-1.5 text-[11px] font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE VERITAS CREST / COLLEGE ACHIEVEMENTS */}
      <section className="bg-slate-100/70 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">
              Institutional Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0b1d3a] tracking-tight">
              Why Choose Veritas Crest?
            </h2>
            <p className="text-sm text-slate-600">
              Transformative education backed by world-class infrastructure, distinguished faculty mentorship, and international research collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0b1d3a] flex items-center justify-center text-[#f6e08c] mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0b1d3a] mb-3">
                NAAC A++ & ABET Accredited
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Veritas Crest stands among the highest evaluated institutions nationwide with a 3.92/4.0 CGPA score. Our computing and business departments hold international ABET and AACSB accreditations.
              </p>
              <div className="text-xs font-semibold text-[#0b1d3a] flex items-center gap-1">
                <span>Category 1 Autonomous Status</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0b1d3a] flex items-center justify-center text-[#f6e08c] mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0b1d3a] mb-3">
                World-Class Research Foundries
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Undergraduate and postgraduate students collaborate directly on AI supercomputing clusters, quantum optics rigs, biomolecular gene editing, and automated financial trading floors.
              </p>
              <div className="text-xs font-semibold text-[#0b1d3a] flex items-center gap-1">
                <span>$42 Million+ Research Grants</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0b1d3a] flex items-center justify-center text-[#f6e08c] mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0b1d3a] mb-3">
                Global Academic Exchange
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Formal dual-degree agreements and semester abroad exchanges with 45+ universities across the United States, United Kingdom, Switzerland, and Singapore.
              </p>
              <div className="text-xs font-semibold text-[#0b1d3a] flex items-center gap-1">
                <span>45+ Partner Institutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS & CAMPUS HAPPENINGS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#c59b27] uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Campus Vibrancy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0b1d3a] tracking-tight">
              Upcoming Events & Conclaves
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Engage with Nobel Laureates, corporate visionaries, hackathons, and cultural celebrations hosted across our auditoriums and open-air amphitheatres.
            </p>
          </div>

          <Link
            to="/events"
            className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1.5 uppercase tracking-wider shrink-0"
          >
            <span>View All Calendar Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#0b1d3a] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                  {event.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0b1d3a] leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {event.venue.split('&')[0]}
                  </span>
                  <Link
                    to="/events"
                    className="font-bold text-[#0b1d3a] hover:text-[#c59b27]"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PLACEMENT HIGHLIGHTS & CORPORATE RECRUITERS */}
      <section className="bg-[#0b1d3a] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              Career Advancement Cell
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Placement Highlights & Industry Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Our 96.8% placement rate is powered by long-standing relationships with over 450 top-tier multi-nationals and tech unicorns.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#f6e08c]">$185,000</div>
              <div className="text-xs text-slate-300 mt-1">Highest Annual Package</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#f6e08c]">$92,400</div>
              <div className="text-xs text-slate-300 mt-1">Average Graduate Salary</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#f6e08c]">450+</div>
              <div className="text-xs text-slate-300 mt-1">Active Recruiting Companies</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#f6e08c]">98.2%</div>
              <div className="text-xs text-slate-300 mt-1">Paid Summer Internships</div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {RECRUITING_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded p-3 text-center transition-colors"
              >
                <div className="text-sm font-bold text-white tracking-wide">{partner.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{partner.tier}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. STUDENT & ALUMNI TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">
            Voices of Veritas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0b1d3a] tracking-tight">
            Student & Alumni Success Stories
          </h2>
          <p className="text-sm text-slate-600">
            Hear from our graduates thriving across world-class tech firms, investment banks, and elite research labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c59b27]"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#0b1d3a]">{test.name}</h3>
                    <p className="text-[11px] text-[#c59b27] font-semibold">{test.role}</p>
                    <p className="text-[10px] text-slate-500">{test.currentCompany}</p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{test.batch}</span>
                {test.package && (
                  <span className="font-bold text-[#0b1d3a]">{test.package}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0b1d3a] to-[#071326] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="px-3 py-1 bg-[#c59b27]/20 border border-[#c59b27]/50 text-[#f6e08c] font-bold text-xs uppercase tracking-widest rounded">
            Admissions Academic Year 2026-27
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Take The First Step Toward Your Future
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Join a legacy of thinkers, creators, and leaders. Submit your online inquiry today or connect with our admissions counselors for personalized guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/admissions"
              className="px-8 py-3.5 text-xs sm:text-sm font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow transition-all uppercase tracking-wider"
            >
              Start Online Application
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded transition-colors"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      <ProspectusModal isOpen={prospectusOpen} onClose={() => setProspectusOpen(false)} />
    </div>
  );
};
