import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Users, 
  ChevronRight, 
  CheckCircle,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COURSES_DATA, DEPARTMENTS_DATA } from '../data/collegeData.ts';
import { Course } from '../types.ts';
import { CourseModal } from '../components/CourseModal.tsx';

export const CoursesPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Departments list for filter buttons
  const departments = ['All', 'Computer Science', 'Information Technology', 'Commerce', 'Business Administration', 'Science', 'Arts'];
  const degreeLevels = ['All', 'Undergraduate', 'Postgraduate'];

  // Filter logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = 
        selectedDepartment === 'All' || course.department.toLowerCase() === selectedDepartment.toLowerCase();

      const matchesDegree = 
        selectedDegree === 'All' || course.degreeLevel.toLowerCase() === selectedDegree.toLowerCase();

      return matchesSearch && matchesDept && matchesDegree;
    });
  }, [searchQuery, selectedDepartment, selectedDegree]);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Academic Curriculum 2026–2027</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Courses & Academic Programs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Explore our world-class undergraduate, postgraduate, and professional degree tracks across engineering, computer science, business, finance, natural sciences, and the humanities.
          </p>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Top row: search & degree filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course title, code (e.g. CSAI, MBA), keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Degree Level Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
              {degreeLevels.map((deg) => (
                <button
                  key={deg}
                  onClick={() => setSelectedDegree(deg)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    selectedDegree === deg
                      ? 'bg-[#0b1d3a] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {deg}
                </button>
              ))}
            </div>
          </div>

          {/* Department Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${
                  selectedDepartment === dept
                    ? 'bg-[#d4af37] text-[#071326] font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[500px]">
        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-[#0b1d3a]">{filteredCourses.length}</span> programs
            {selectedDepartment !== 'All' && <span> in {selectedDepartment}</span>}
            {selectedDegree !== 'All' && <span> ({selectedDegree})</span>}
          </div>
          {(selectedDepartment !== 'All' || selectedDegree !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDepartment('All');
                setSelectedDegree('All');
                setSearchQuery('');
              }}
              className="text-[#0b1d3a] font-bold hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">No courses match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keyword or clearing the department and degree level filters.
            </p>
            <button
              onClick={() => {
                setSelectedDepartment('All');
                setSelectedDegree('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0b1d3a] text-white text-xs font-semibold rounded hover:bg-[#12284c] transition-colors"
            >
              View All Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#c59b27] uppercase tracking-wide">
                      {course.department}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {course.degreeLevel}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0b1d3a] group-hover:text-[#c59b27] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Metadata Pills and Specs */}
                <div className="px-6 py-3 bg-slate-50/70 border-y border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-[#c59b27]" /> Duration
                    </span>
                    <span className="font-semibold text-slate-800">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <DollarSign className="w-3.5 h-3.5 text-[#c59b27]" /> Tuition Fee
                    </span>
                    <span className="font-bold text-[#0b1d3a]">{course.annualFee} / year</span>
                  </div>

                  <div className="pt-1 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Eligibility:</span> {course.eligibility}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] transition-colors flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/admissions"
                    state={{ selectedProgram: course.title }}
                    className="px-4 py-2 text-xs font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow-xs hover:shadow transition-all uppercase tracking-wider"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Departments Overview Quick Grid */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Academic Faculties</span>
              <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Associated Departments</h2>
            </div>
            <Link
              to="/departments"
              className="text-xs font-bold text-[#0b1d3a] hover:text-[#c59b27] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore Department Laboratories & Faculty</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS_DATA.map((dept) => (
              <div key={dept.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-wider">{dept.code} Faculty</span>
                  <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mt-1 mb-2">{dept.name}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{dept.overview}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{dept.totalStudents}+ Students</span>
                  <Link to="/departments" className="font-bold text-[#0b1d3a] hover:text-[#c59b27]">
                    View Labs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modal */}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};
