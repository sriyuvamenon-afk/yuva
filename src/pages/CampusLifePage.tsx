import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Coffee, 
  Dumbbell, 
  Home, 
  BookOpen, 
  Bus, 
  Music, 
  Code, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CAMPUS_FACILITIES } from '../data/collegeData.ts';
import { CampusFacility } from '../types.ts';
import { Link } from 'react-router-dom';

export const CampusLifePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Research', 'Recreation', 'Residential', 'Wellness'];

  const filteredFacilities = CAMPUS_FACILITIES.filter(
    (fac) => selectedCategory === 'All' || fac.category === selectedCategory
  );

  const studentClubs = [
    { name: 'ACM & IEEE Student Branch', category: 'Technical', members: '480+ Members', desc: 'Organizes annual Hackathons, weekly competitive coding meetups, and robotics workshops.' },
    { name: 'Veritas Debating Union', category: 'Literary & Politics', members: '180+ Members', desc: 'Representing Veritas Crest at parliamentary debates and Model United Nations worldwide.' },
    { name: 'Aura Performing Arts Ensemble', category: 'Cultural', members: '240+ Members', desc: 'Contemporary theater productions, classical orchestral symphony, and multi-genre dance.' },
    { name: 'Formula Student Racing Guild', category: 'Engineering & Design', members: '120+ Members', desc: 'Design, manufacture, and race custom electric open-wheel formula cars in international competitions.' },
    { name: 'Eco-Sustain Green Initiative', category: 'Environmental', members: '310+ Members', desc: 'Leads zero-waste campus composting drives, solar energy audits, and urban tree canopy planting.' },
    { name: 'Venture Foundry Entrepreneurship Club', category: 'Business', members: '350+ Members', desc: 'Connects aspiring student startup founders with venture capitalists and pitch competitions.' },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>140-Acre Lush Green Campus</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Campus Life & World-Class Facilities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Experience an intellectually invigorating, inclusive, and vibrant residential community. From Olympic athletic stadiums and 24/7 libraries to electric shuttles and organic dining commons.
          </p>
        </div>
      </section>

      {/* Facilities Filter Toolbar */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">Facility Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0b1d3a] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            to="/gallery"
            className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            <span>Campus Photo Gallery</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {filteredFacilities.map((facility, idx) => (
            <div
              key={facility.id}
              className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              {/* Image Side */}
              <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0b1d3a] text-[#f6e08c] font-bold text-xs px-3 py-1.5 rounded border border-[#c59b27]/30 shadow">
                  {facility.category}
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                      {facility.timings}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {facility.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#0b1d3a]">
                    {facility.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                {/* Key Features Bullet points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#0b1d3a] uppercase tracking-wider">
                    Infrastructure Specifications:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {facility.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Available to all registered Veritas Crest students</span>
                  <Link
                    to="/contact"
                    className="font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1"
                  >
                    <span>Schedule Tour</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Clubs & Societies Section */}
      <section className="bg-slate-100/80 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Community & Societies</span>
            <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Student Clubs & Campus Life</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Over 50 student-led interest clubs driving hackathons, cultural galas, varsity sports, and leadership summits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentClubs.map((club, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold text-[#c59b27] uppercase">{club.category}</span>
                    <span className="text-slate-500">{club.members}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-2">{club.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{club.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Open for Fall Sign-ups</span>
                  <Link to="/contact" className="font-bold text-[#0b1d3a] hover:underline">
                    Inquire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
