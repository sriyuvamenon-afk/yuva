import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  FlaskConical, 
  Users, 
  GraduationCap, 
  Cpu, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Award,
  Layers
} from 'lucide-react';
import { DEPARTMENTS_DATA, COURSES_DATA } from '../data/collegeData.ts';
import { Department } from '../types.ts';

export const DepartmentsPage: React.FC = () => {
  const [activeDeptId, setActiveDeptId] = useState(DEPARTMENTS_DATA[0].id);

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === activeDeptId) || DEPARTMENTS_DATA[0];

  const deptCourses = COURSES_DATA.filter(
    (c) => c.department.toLowerCase().includes(activeDept.code.toLowerCase()) ||
           activeDept.name.toLowerCase().includes(c.department.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Academic Faculties & Institutes</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Departments & Research Centers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Our specialized academic faculties bridge theoretical inquiry with state-of-the-art laboratory experimentation across computing, business, natural sciences, and the humanities.
          </p>
        </div>
      </section>

      {/* Main Department Explorer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Horizontal Department Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-200 mb-8 text-xs">
          {DEPARTMENTS_DATA.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDeptId(dept.id)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all font-semibold flex items-center gap-2 ${
                activeDeptId === dept.id
                  ? 'bg-[#0b1d3a] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span>{dept.name.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Detailed Department Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Department Overview & Labs: 8 cols */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">
                  Faculty Code: {activeDept.code}
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#0b1d3a] mt-1">
                  {activeDept.name}
                </h2>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {activeDept.overview}
                </p>
              </div>

              {/* Department Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#0b1d3a]">{activeDept.totalFaculty}</div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Professors & Mentors</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#0b1d3a]">{activeDept.totalStudents}+</div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Enrolled Scholars</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#0b1d3a]">{activeDept.laboratories.length}</div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Advanced Foundries</div>
                </div>
              </div>

              {/* Laboratories List */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a] mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-[#c59b27]" />
                  Dedicated Research Laboratories & Studios
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeDept.laboratories.map((lab, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Areas */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a] mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#c59b27]" />
                  Key Research Thrust Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeDept.researchAreas.map((area, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-[#0b1d3a]/5 text-[#0b1d3a] border border-[#0b1d3a]/15 text-xs font-semibold rounded-md">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Courses Offered by Department */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0b1d3a]">
                    Offered Degree Programs
                  </h3>
                  <p className="text-xs text-slate-500">Degree tracks administered directly by this department.</p>
                </div>
                <Link to="/courses" className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1 uppercase tracking-wider">
                  <span>View All Catalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {deptCourses.length > 0 ? (
                  deptCourses.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#c59b27] uppercase">{c.degreeLevel}</span>
                        <h4 className="font-serif text-base font-bold text-[#0b1d3a]">{c.title}</h4>
                        <p className="text-xs text-slate-500">{c.duration} · Tuition: {c.annualFee}/yr</p>
                      </div>
                      <Link
                        to="/admissions"
                        state={{ selectedProgram: c.title }}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded text-center shrink-0"
                      >
                        Apply for Program
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">Check full course catalog for all degree options.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Head of Department & Department Photo: 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Department Head Profile Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">
                Leadership
              </span>
              <img
                src={activeDept.headImage}
                alt={activeDept.headOfDepartment}
                className="w-32 h-32 rounded-full object-cover mx-auto border-3 border-[#c59b27] shadow"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">
                  {activeDept.headOfDepartment}
                </h3>
                <p className="text-xs text-[#c59b27] font-semibold mt-0.5">
                  {activeDept.headTitle}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-100 pt-3">
                "Our scholars push boundaries through continuous curiosity, ethical integrity, and rigorous experimental validation."
              </p>
              <Link
                to="/faculty"
                className="inline-block text-xs font-bold text-[#0b1d3a] hover:underline"
              >
                View Full Faculty Profile →
              </Link>
            </div>

            {/* Department Image View */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src={activeDept.image}
                alt={activeDept.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/90 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-xs font-semibold">
                  Facility Tour: {activeDept.name}
                </span>
              </div>
            </div>

            {/* Quick Contact Desk */}
            <div className="bg-[#0b1d3a] text-white p-6 rounded-2xl border border-[#c59b27]/30 text-xs space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#f6e08c]">Department Inquiries</h4>
              <p className="text-slate-300">Office Hours: Mon–Fri, 9:00 AM – 5:00 PM</p>
              <p className="text-slate-300">Email: dept-{activeDept.code.toLowerCase()}@veritascrest.edu</p>
              <Link
                to="/contact"
                className="inline-block mt-2 font-bold text-[#d4af37] hover:underline"
              >
                Campus Direction Map →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
