import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { FACULTY_DATA } from '../data/collegeData.ts';
import { FacultyMember } from '../types.ts';

export const FacultyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Computer Science', 'Information Technology', 'Business Administration', 'Commerce', 'Science', 'Arts'];

  const filteredFaculty = useMemo(() => {
    return FACULTY_DATA.filter((faculty) => {
      const matchesSearch = 
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.researchInterests.some((ri) => ri.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept = 
        selectedDept === 'All' || faculty.department.toLowerCase() === selectedDept.toLowerCase();

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Scholarly Community</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Distinguished Faculty & Researchers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Our 680+ faculty members are leaders in their respective disciplines, holding doctorates from MIT, Stanford, Oxford, Cambridge, and Harvard. They actively mentor students in labs and collaborative projects.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, doctorate, research area..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white transition-colors"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                  selectedDept === dept
                    ? 'bg-[#0b1d3a] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[500px]">
        <div className="flex items-center justify-between mb-8 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-[#0b1d3a]">{filteredFaculty.length}</span> faculty mentors
            {selectedDept !== 'All' && <span> in {selectedDept}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFaculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Photo & Header */}
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#0b1d3a]/90 text-[#f6e08c] font-bold text-[10px] px-2.5 py-1 rounded border border-[#c59b27]/40 shadow">
                    {fac.department}
                  </div>
                </div>

                <div className="p-5 pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#0b1d3a] group-hover:text-[#c59b27] transition-colors leading-snug">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-[#c59b27] font-semibold mt-0.5">
                    {fac.designation}
                  </p>
                  
                  <div className="mt-3 p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                    <p className="text-slate-700 font-medium">{fac.qualification}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                      {fac.institution}
                    </p>
                  </div>
                </div>

                {/* Research Interests */}
                <div className="px-5 py-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Research Focus:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.researchInterests.map((interest, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office & Contact Footer */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/70 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{fac.office}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
                  <a
                    href={`mailto:${fac.email}`}
                    className="text-[#0b1d3a] font-semibold hover:text-[#c59b27] flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email Profile</span>
                  </a>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {fac.publicationsCount} Publications
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
