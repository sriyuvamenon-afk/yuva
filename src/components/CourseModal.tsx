import React from 'react';
import { X, CheckCircle, Clock, Award, BookOpen, DollarSign, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Course } from '../types.ts';
import { useNavigate } from 'react-router-dom';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const handleApply = () => {
    onClose();
    navigate('/admissions', { state: { selectedProgram: course.title } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b1d3a] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
            <span>{course.department}</span>
            <span>·</span>
            <span>{course.degreeLevel} Program</span>
            <span>·</span>
            <span>Code: {course.code}</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            {course.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{course.credits} Credits</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
              <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{course.annualFee} / Year</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded">
              <Users className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{course.seats} Total Seats</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 divide-y divide-slate-100">
          
          {/* Description */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-2">Program Overview</h3>
            <p className="leading-relaxed text-slate-600">{course.description}</p>
          </div>

          {/* Eligibility */}
          <div className="pt-4">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c59b27]" />
              Admission Eligibility
            </h3>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
              {course.eligibility}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="pt-4">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-3">Distinguished Program Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {course.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Pathways */}
          <div className="pt-4">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#c59b27]" />
              Career Outcomes & Industry Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.careerProspects.map((cp, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs rounded">
                  {cp}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Curriculum Syllabus */}
          <div className="pt-4">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a] mb-3">Curriculum Structure & Core Modules</h3>
            <div className="space-y-3">
              {course.syllabusOverview.map((sem, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-3 bg-slate-50/60">
                  <div className="font-semibold text-xs text-[#0b1d3a] uppercase tracking-wide mb-2">
                    {sem.semester}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {sem.subjects.map((subj, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#c59b27] rounded-full shrink-0" />
                        <span>{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded transition-colors"
          >
            Close Details
          </button>
          
          <button
            onClick={handleApply}
            className="px-5 py-2.5 text-xs font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow-sm hover:shadow transition-all flex items-center gap-2 uppercase tracking-wider"
          >
            <span>Proceed to Apply</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
