import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  Users, 
  CheckCircle, 
  Calendar, 
  GraduationCap, 
  Building,
  Target,
  HeartHandshake,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { COLLEGE_INFO, KEY_STATISTICS } from '../data/collegeData.ts';

export const AboutPage: React.FC = () => {
  const milestones = [
    { year: '1954', title: 'Foundation of Veritas Crest', desc: 'Established by visionary scholars and philanthropists to provide accessible, rigorous STEM and liberal arts education.' },
    { year: '1976', title: 'Autonomous Status Conferred', desc: 'Granted academic autonomy with curriculum design privileges by the National Higher Education Commission.' },
    { year: '1998', title: 'Computing & Research Foundry Launch', desc: 'Pioneered one of the nation’s first university supercomputing centers and fiber-optic networked campuses.' },
    { year: '2012', title: 'Global Dual-Degree Alliances', desc: 'Formed direct student exchange and dual-degree pathways with prestigious European and American research institutions.' },
    { year: '2022', title: 'NAAC A++ Re-Accreditation (3.92 CGPA)', desc: 'Re-accredited with the nation’s highest tier assessment score and sanctioned $42M in continuous research funding.' },
    { year: '2026', title: 'Center for Quantum Computing & AI', desc: 'Inauguration of the state-of-the-art $18M Turing AI & Quantum Sciences complex.' },
  ];

  const values = [
    { title: 'Veritas (Truth & Intellectual Integrity)', desc: 'We hold scholarly rigor and honest scientific inquiry above all expedient conclusions.', icon: Target },
    { title: 'Scientia (Transformative Knowledge)', desc: 'Learning must not remain static; it must actively solve real-world humanitarian, ecological, and economic challenges.', icon: Lightbulb },
    { title: 'Virtus (Virtue & Global Stewardship)', desc: 'Nurturing ethical empathy, ethical stewardship, and civic responsibility in every student.', icon: HeartHandshake },
    { title: 'Equity & Open Access', desc: 'Ensuring that socioeconomic circumstances never hinder exceptionally bright intellects from reaching their potential.', icon: Users },
  ];

  const leadership = [
    {
      name: 'Dr. Arthur Sterling, Ph.D.',
      title: 'Chancellor & President of the Board of Regents',
      credentials: 'Ph.D. Oxford University · Former Director of National Science Foundation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      message: 'At Veritas Crest, we do not merely teach students to adapt to the future; we mentor them to construct it with moral courage, intellectual precision, and relentless curiosity.',
    },
    {
      name: 'Prof. Margaret H. Thornton, Sc.D.',
      title: 'Vice-Chancellor & Academic Principal',
      credentials: 'Sc.D. MIT · Fellow of the Royal Academy of Engineering',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      message: 'Our educational philosophy merges humanistic empathy with technological mastery. Every student here discovers both their analytical edge and their humanitarian compass.',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Header Banner */}
      <section className="bg-[#071326] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
            alt="Campus Architecture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Institutional Heritage & Legacy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            About Veritas Crest University
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Founded in 1954, Veritas Crest University is a globally renowned center of learning and research dedicated to excellence, innovation, and ethical leadership across disciplines.
          </p>
        </div>
      </section>

      {/* 2. Vision, Mission & Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="border-l-4 border-[#c59b27] pl-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">Our Purpose</span>
              <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Vision & Mission</h2>
            </div>
            
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-[#0b1d3a] uppercase tracking-wide text-xs mb-1.5 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#c59b27]" />
                  The Institutional Vision
                </h3>
                <p>
                  To be an internationally distinguished university of higher learning, recognized for pioneering frontier research, cultivating compassionate ethical leaders, and advancing human prosperity.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-[#0b1d3a] uppercase tracking-wide text-xs mb-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#c59b27]" />
                  The Academic Mission
                </h3>
                <p>
                  To provide transformative interdisciplinary education, cultivate scientific rigor, support uncompromised freedom of intellectual discourse, and nurture students who lead with competence and conscience.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
              alt="Veritas Crest Historic Clocktower"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="font-serif text-lg font-bold">Founders Memorial Hall & Centennial Lawn</div>
                <p className="text-xs text-slate-300">The intellectual heart of Veritas Crest University since 1954.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Foundation</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1d3a]">Our Core Pillars</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded bg-[#0b1d3a] flex items-center justify-center text-[#d4af37] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#0b1d3a] mb-2">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Leadership & Principal Message */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Governance</span>
            <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">University Leadership</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Guiding the academic direction, research investments, and student welfare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-xl object-cover border-2 border-[#c59b27] shrink-0"
                />
                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">{leader.name}</h3>
                    <p className="text-xs font-semibold text-[#c59b27]">{leader.title}</p>
                    <p className="text-[11px] text-slate-500">{leader.credentials}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                    "{leader.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Historical Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Through The Decades</span>
          <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Chronicle of Milestones</h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-full bg-[#0b1d3a] border-4 border-white shadow-md text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#c59b27] transition-colors">
                <span className="text-[#f6e08c] group-hover:text-[#071326] font-serif text-sm">{m.year}</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex-1">
                <h4 className="font-serif text-base font-bold text-[#0b1d3a] mb-1">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Accreditations, Affiliations & Recognitions */}
      <section className="bg-[#0b1d3a] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">Verified Standards</span>
            <h2 className="font-serif text-3xl font-bold text-white">Accreditations & Regulatory Autonomy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLEGE_INFO.accreditations.map((acc, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4">
                <div className="p-2.5 rounded bg-white/10 text-[#d4af37] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">{acc.name}</h4>
                  <p className="text-xs text-[#f6e08c] font-semibold mt-0.5">{acc.score}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Meets the rigorous institutional standards set by national and international accreditation councils for faculty research, student outcomes, and lab infrastructure.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#d4af37] text-[#071326] font-bold text-xs uppercase tracking-wider hover:bg-[#c59b27] transition-all"
            >
              <span>Explore Academic Curricula</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
