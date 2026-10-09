import React, { useState } from 'react';
import { X, Download, BookOpen, CheckCircle, Award, ShieldCheck, Printer } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData.ts';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate an official prospectus text document for immediate download
    const prospectusText = `=====================================================
VERITAS CREST UNIVERSITY
Official Academic Prospectus 2026 - 2027
Motto: ${COLLEGE_INFO.motto}
Accreditation: NAAC A++ (CGPA 3.92) | NIRF Rank #4
Campus: ${COLLEGE_INFO.location}
Toll-Free Helpline: ${COLLEGE_INFO.phone} | Email: ${COLLEGE_INFO.email}
=====================================================

1. WELCOME FROM THE CHANCELLOR & PRINCIPAL
Veritas Crest University invites ambitious students worldwide to join our vibrant academic community. With 18,500+ students and 680+ world-class faculty, we blend theoretical rigor with applied research across 85+ specialized programs.

2. ACCREDITATION & HONORS
- NAAC A++ Grade (Highest tier institution)
- National Institutional Ranking Framework (NIRF) Rank #4
- ABET Accredited School of Computing & Engineering
- AACSB Recognized School of Business Administration

3. ACADEMIC DEPARTMENTS & FLAGSHIP PROGRAMS
- School of Computer Science & AI (B.Tech, M.Tech, Ph.D)
- Department of Information Technology & Cybersecurity (B.Tech)
- Department of Commerce & Finance (B.Com Hons, Fintech)
- School of Business Administration (BBA, MBA Global Executive)
- Faculty of Natural Sciences (B.Sc Data Science, M.Sc Physics)
- Department of Arts & International Relations (BA, MA)

4. SCHOLARSHIPS & FINANCIAL ASSISTANCE
- Veritas Presidential Merit Scholarship: 100% Tuition Waiver for Top 1% applicants.
- Dean's STEM Research Fellowship: 50% Tuition Waiver + Monthly stipend.
- Sports & Athletics Excellence Grant: Up to 75% fee concession for national level athletes.
- Need-based Educational Subsidy: Tailored aid for economically deserving candidates.

5. ADMISSION CALENDAR 2026-27
- Early Decision Round: Deadline December 15, 2026
- Regular Admission Cycle: Deadline February 28, 2027
- VCU-CAT Entrance Examination: March 15, 2027
- Commencement of Orientation Week: August 10, 2027

6. CAMPUS INFRASTRUCTURE
- 140-Acre Eco-Smart Campus with Electric Shuttles
- Central Academic Library (450,000+ print & digital volumes)
- NVIDIA DGX Supercomputing Cluster & Robotics Foundry
- Olympic-size Sports Arena & 2,200-seat Grand Auditorium
- Safe residential halls with 24/7 security & medical dispensaries

=====================================================
Admissions Office, Veritas Crest University
Visit online at: https://veritascrest.edu
=====================================================`;

    const blob = new Blob([prospectusText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Veritas_Crest_University_Prospectus_2026_2027.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b1d3a] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Official University Publications</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
            Academic Prospectus & Information Brochure 2026–2027
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Comprehensive guide to academic programs, eligibility cutoffs, scholarship opportunities, and campus life.
          </p>
        </div>

        {/* Brochure preview */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-start gap-4">
            <div className="w-20 h-28 bg-[#071326] rounded border border-[#c59b27] flex flex-col items-center justify-center text-center p-2 text-white shrink-0 shadow">
              <Award className="w-6 h-6 text-[#d4af37] mb-1" />
              <span className="font-serif text-[10px] font-bold leading-tight">VERITAS CREST</span>
              <span className="text-[8px] text-[#d4af37] mt-1">2026-27</span>
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-serif text-sm font-bold text-[#0b1d3a]">
                Prospectus Contents Overview
              </h3>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                The complete 48-page institutional handbook features accredited degree syllabi, faculty research papers, campus infrastructure blueprints, dormitory fees, and financial aid application packets.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-500">
                <span>· 85+ Degree Programs</span>
                <span>· Fee Schedules & Calculator</span>
                <span>· 100% Placement Statistics</span>
                <span>· Application Deadlines</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#0b1d3a] uppercase tracking-wider text-[11px]">Key Highlights Inside:</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Undergraduate & Postgraduate admission entrance evaluation criteria</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Full breakdown of merit scholarships up to 100% tuition coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>On-campus residential options, dining meal plans & amenities</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>List of 450+ Fortune 500 recruiting partners and internship packages</span>
              </li>
            </ul>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Prospectus downloaded successfully to your computer!</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold text-[#071326] bg-[#d4af37] hover:bg-[#c59b27] rounded shadow transition-all flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Prospectus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
