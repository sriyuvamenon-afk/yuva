import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Download, 
  HelpCircle, 
  Send, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  BookOpen, 
  Sparkles,
  AlertCircle,
  FileCheck,
  Award
} from 'lucide-react';
import { COLLEGE_INFO, ADMISSION_STEPS, COURSES_DATA } from '../data/collegeData.ts';
import { ProspectusModal } from '../components/ProspectusModal.tsx';

export const AdmissionsPage: React.FC = () => {
  const location = useLocation();
  const preselectedProgram = location.state?.selectedProgram || '';

  const [prospectusOpen, setProspectusOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    degreeLevel: 'Undergraduate',
    program: preselectedProgram || COURSES_DATA[0].title,
    previousQualification: 'High School Diploma (10+2 / A-Levels)',
    percentageScore: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProgram) {
      setFormData((prev) => ({ ...prev, program: preselectedProgram }));
    }
  }, [preselectedProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit admission enquiry. Please verify details.');
      }

      setSubmitSuccess(
        `Application enquiry submitted successfully! Your application reference number is: ${data.applicationNumber}. An admissions counselor has been assigned to your profile.`
      );
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        degreeLevel: 'Undergraduate',
        program: COURSES_DATA[0].title,
        previousQualification: 'High School Diploma (10+2 / A-Levels)',
        percentageScore: '',
        message: '',
      });
    } catch (err: any) {
      setSubmitError(err.message || 'Network error occurred while contacting admissions server.');
    } finally {
      setSubmitting(false);
    }
  };

  const requiredDocuments = [
    { title: 'Secondary & High School Marksheets (10th & 12th / A-Levels)', desc: 'Official transcripts verified by the governing examination board.' },
    { title: 'Government-Issued Photo Identification', desc: 'Valid Passport, National Identity Card, or Driver’s License.' },
    { title: 'Standardized Test Score Reports (Optional for early review)', desc: 'SAT / ACT / GRE / GMAT or State Entrance Assessment.' },
    { title: 'Statement of Academic Purpose (SOP)', desc: 'A 500-word reflection explaining your academic trajectory and career intent.' },
    { title: 'Letters of Academic Recommendation', desc: 'Two references from school teachers, counselors, or college professors.' },
    { title: 'Transfer & Migration Certificate', desc: 'Issued by the previously attended academic institution.' },
  ];

  const importantDates = [
    { event: 'Early Decision Application Deadline', date: 'December 15, 2026', status: 'Open Now' },
    { event: 'Veritas Aptitude Assessment (VCU-CAT Round 1)', date: 'January 10, 2027', status: 'Upcoming' },
    { event: 'Regular Decision Application Deadline', date: 'February 28, 2027', status: 'Scheduled' },
    { event: 'Merit Scholarship Announcement Date', date: 'March 20, 2027', status: 'Scheduled' },
    { event: 'Document Verification & Fee Confirmation', date: 'April 15 – May 30, 2027', status: 'Scheduled' },
    { event: 'Orientation & Academic Commencement', date: 'August 10, 2027', status: 'Scheduled' },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Admissions Cycle 2026–2027</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Admissions & Financial Aid
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            We invite intellectually inquisitive and ethically driven students from across the globe to apply. Discover application timelines, eligibility criteria, and our generous merit scholarships.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setProspectusOpen(true)}
              className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c59b27] text-[#071326] font-bold text-xs uppercase tracking-wider rounded shadow transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Prospectus</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Roadmap</span>
          <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Four Steps to Enrollment</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">A transparent and merit-centered evaluation process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {ADMISSION_STEPS.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between relative group hover:border-[#c59b27] transition-all">
              <div>
                <div className="text-3xl font-serif font-black text-[#c59b27] mb-2">
                  {step.step}
                </div>
                <h3 className="font-serif text-base font-bold text-[#0b1d3a] mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-[#0b1d3a]">
                {step.timeline}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Form & Dates Split */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200" id="application-form">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Direct Application</span>
              <h2 className="font-serif text-2xl font-bold text-[#0b1d3a] mt-1">
                Online Admission Enquiry & Registration Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the required information below. Your application will be processed by our admissions committee.
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Application Received</p>
                  <p>{submitSuccess}</p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-300 rounded-lg text-rose-900 text-xs flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Error</p>
                  <p>{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Candidate Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone / Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Degree Level <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="degreeLevel"
                    value={formData.degreeLevel}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  >
                    <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                    <option value="Postgraduate">Postgraduate (Master's)</option>
                    <option value="Doctoral">Doctoral (Ph.D)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Preferred Academic Program <span className="text-rose-500">*</span>
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} ({c.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Previous Qualification <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="previousQualification"
                    required
                    value={formData.previousQualification}
                    onChange={handleChange}
                    placeholder="e.g. High School STEM / B.Sc"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Percentage / GPA Achieved
                  </label>
                  <input
                    type="text"
                    name="percentageScore"
                    value={formData.percentageScore}
                    onChange={handleChange}
                    placeholder="e.g. 92% or 3.85 GPA"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Statement of Intent & Questions for Admissions Dean
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding your research interests, scholarship inquiries, or campus hostel accommodation preferences..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg shadow transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                >
                  {submitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <span>Submit Official Admission Inquiry</span>
                      <Send className="w-4 h-4 text-[#d4af37]" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                * Submitted applications are encrypted and recorded on our server. An official advisor will respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Right Column: Important Dates & Fee Highlights: 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Important Dates Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0b1d3a] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#c59b27]" />
                Important Dates & Deadlines
              </h3>
              
              <div className="divide-y divide-slate-100 text-xs">
                {importantDates.map((item, idx) => (
                  <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-800">{item.event}</p>
                      <p className="text-[11px] text-slate-500">{item.date}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      item.status === 'Open Now'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships & Fee Highlights */}
            <div className="bg-[#0b1d3a] text-white p-6 rounded-2xl border border-[#c59b27]/30 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f6e08c]" />
                Scholarship Opportunities
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Veritas Presidential Fellowship:</strong> 100% Tuition Waiver for candidates scoring 95%+ or SAT 1480+.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Dean's STEM Research Grant:</strong> 50% Tuition Waiver for aspiring computing & science researchers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Sports & Cultural Honors:</strong> Up to 75% fee concession for state/national representatives.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Required Documents Checklist */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Verification Guide</span>
          <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Mandatory Documentation Checklist</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Please have these physical or verified digital credentials ready for submission.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requiredDocuments.map((doc, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-[#c59b27] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs text-[#0b1d3a]">{doc.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prospectus Modal */}
      <ProspectusModal isOpen={prospectusOpen} onClose={() => setProspectusOpen(false)} />
    </div>
  );
};
