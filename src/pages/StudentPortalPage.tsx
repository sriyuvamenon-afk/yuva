import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Lock, 
  Mail, 
  LogOut, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Clock, 
  Award, 
  Upload, 
  Plus, 
  Printer, 
  Download,
  Users,
  Bell,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export const StudentPortalPage: React.FC = () => {
  // Auth state
  const [activeTab, setActiveTab] = useState<'student-login' | 'faculty-login'>('student-login');
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'faculty' | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form inputs
  const [identifier, setIdentifier] = useState('student@veritas.edu');
  const [password, setPassword] = useState('veritas2026');

  // Student Dashboard Active Sub-Tab
  const [studentNav, setStudentNav] = useState<'overview' | 'attendance' | 'timetable' | 'results' | 'assignments' | 'fees' | 'notices'>('overview');

  // Student portal loaded data
  const [portalData, setPortalData] = useState<any | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  // Faculty state
  const [facultyStudents, setFacultyStudents] = useState<any[]>([]);
  const [facultyNav, setFacultyNav] = useState<'roster' | 'grades' | 'notices' | 'assignments'>('roster');

  // Faculty actions state
  const [gradeForm, setGradeForm] = useState({ courseCode: 'CS-301', grade: 'A+', score: '95' });
  const [gradeMsg, setGradeMsg] = useState<string | null>(null);

  const [noticeForm, setNoticeForm] = useState({ title: '', category: 'Academic', content: '', isUrgent: false });
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  const [assignmentForm, setAssignmentForm] = useState({ title: '', courseCode: 'CS-302', deadline: '', maxScore: '100' });
  const [assignmentMsg, setAssignmentMsg] = useState<string | null>(null);

  // Assignment submission modal for student
  const [submittingAssignment, setSubmittingAssignment] = useState<any | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Fee payment modal for student
  const [payingFee, setPayingFee] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('250');
  const [paymentReceipt, setPaymentReceipt] = useState<any | null>(null);

  // Quick fill helper
  const handleQuickFillStudent = () => {
    setActiveTab('student-login');
    setIdentifier('student@veritas.edu');
    setPassword('veritas2026');
    setAuthError(null);
  };

  const handleQuickFillFaculty = () => {
    setActiveTab('faculty-login');
    setIdentifier('faculty@veritas.edu');
    setPassword('prof2026');
    setAuthError(null);
  };

  // Perform Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    const endpoint = activeTab === 'student-login' ? '/api/auth/student-login' : '/api/auth/faculty-login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setUserRole(data.role);
      setCurrentUser(data.user);

      if (data.role === 'student') {
        loadStudentDashboard();
      } else {
        loadFacultyDashboard();
      }
    } catch (err: any) {
      setAuthError(err.message || 'Unable to connect to Veritas Crest identity server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setPortalData(null);
    setSubmissionSuccess(null);
    setPaymentReceipt(null);
  };

  // Fetch Student Data
  const loadStudentDashboard = async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/student/dashboard');
      const data = await res.json();
      setPortalData(data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch Faculty Data
  const loadFacultyDashboard = async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/faculty/students');
      const data = await res.json();
      setFacultyStudents(data);
    } catch (err) {
      console.error('Error fetching faculty students:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // Student Assignment Submit Action
  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;

    try {
      const res = await fetch('/api/student/submit-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: submittingAssignment.id,
          submissionNotes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmissionSuccess(`Assignment "${submittingAssignment.title}" submitted successfully!`);
        setSubmittingAssignment(null);
        setSubmissionNotes('');
        loadStudentDashboard();
        setTimeout(() => setSubmissionSuccess(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Student Pay Fee Action
  const handlePayFee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/student/pay-fee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: paymentAmount, paymentMethod: 'Card' }),
      });
      const data = await res.json();
      if (res.ok) {
        setPaymentReceipt(data.receipt);
        setPayingFee(false);
        loadStudentDashboard();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Faculty: Update Grade Action
  const handleFacultyUpdateGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faculty/update-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradeForm),
      });
      const data = await res.json();
      if (res.ok) {
        setGradeMsg(`Grade for ${gradeForm.courseCode} updated to ${gradeForm.grade} (${gradeForm.score}/100) on central academic registry.`);
        setTimeout(() => setGradeMsg(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Faculty: Post Notice Action
  const handleFacultyPostNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faculty/post-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeForm),
      });
      const data = await res.json();
      if (res.ok) {
        setNoticeMsg('Official notice broadcasted to university portal noticeboard.');
        setNoticeForm({ title: '', category: 'Academic', content: '', isUrgent: false });
        setTimeout(() => setNoticeMsg(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Faculty: Add Assignment Action
  const handleFacultyAddAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faculty/add-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignmentForm),
      });
      const data = await res.json();
      if (res.ok) {
        setAssignmentMsg('New assignment uploaded to course syllabus portal.');
        setAssignmentForm({ title: '', courseCode: 'CS-302', deadline: '', maxScore: '100' });
        setTimeout(() => setAssignmentMsg(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // RENDER: NOT LOGGED IN (LOGIN VIEW)
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="w-full min-h-[80vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          
          {/* Top Brand Emblem */}
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 bg-[#0b1d3a] rounded-xl border border-[#c59b27] flex items-center justify-center text-[#f6e08c] mx-auto shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1d3a]">
              Veritas Crest Portal
            </h1>
            <p className="text-xs text-slate-500">
              Integrated Campus ERP, Student Information System & Academic Registry
            </p>
          </div>

          {/* Quick Demo Login Credentials Bar */}
          <div className="mb-6 p-4 bg-[#0b1d3a] text-white rounded-xl border border-[#c59b27]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#f6e08c] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Demo Credentials Included
              </span>
              <span className="text-[10px] text-slate-300">Click to auto-fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleQuickFillStudent}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  activeTab === 'student-login'
                    ? 'bg-[#c59b27] text-[#071326] font-bold border-white'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold">Student Role</div>
                <div className="text-xs truncate">student@veritas.edu</div>
                <div className="text-[10px] opacity-80">Pass: veritas2026</div>
              </button>

              <button
                type="button"
                onClick={handleQuickFillFaculty}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  activeTab === 'faculty-login'
                    ? 'bg-[#c59b27] text-[#071326] font-bold border-white'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold">Faculty Role</div>
                <div className="text-xs truncate">faculty@veritas.edu</div>
                <div className="text-[10px] opacity-80">Pass: prof2026</div>
              </button>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            {/* Tab switch */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('student-login');
                  setIdentifier('student@veritas.edu');
                  setPassword('veritas2026');
                  setAuthError(null);
                }}
                className={`py-2 text-xs font-bold rounded-md transition-all ${
                  activeTab === 'student-login'
                    ? 'bg-white text-[#0b1d3a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('faculty-login');
                  setIdentifier('faculty@veritas.edu');
                  setPassword('prof2026');
                  setAuthError(null);
                }}
                className={`py-2 text-xs font-bold rounded-md transition-all ${
                  activeTab === 'faculty-login'
                    ? 'bg-white text-[#0b1d3a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Faculty ERP Login
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {activeTab === 'student-login' ? 'Student Email or Roll ID' : 'Faculty Email or Staff ID'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={activeTab === 'student-login' ? 'e.g. student@veritas.edu or VCU-2024-8841' : 'faculty@veritas.edu'}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter portal password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg shadow transition-colors uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to {activeTab === 'student-login' ? 'Student' : 'Faculty'} Portal</span>
                      <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-500 space-y-1">
              <p>Protected by 256-Bit SSL Institutional Encryption.</p>
              <p>Forgot credentials? Contact <span className="font-semibold text-slate-700">it-helpdesk@veritascrest.edu</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: FACULTY DASHBOARD VIEW
  // -------------------------------------------------------------
  if (userRole === 'faculty') {
    return (
      <div className="w-full min-h-screen bg-slate-100 pb-16">
        {/* Faculty Portal Header Bar */}
        <div className="bg-[#0b1d3a] text-white border-b border-[#c59b27]/30 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#c59b27] flex items-center justify-center text-[#f6e08c]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                  <span>Faculty Academic Console</span>
                  <span>·</span>
                  <span>ID: {currentUser.id}</span>
                </div>
                <h1 className="font-serif text-2xl font-bold text-white">{currentUser.name}</h1>
                <p className="text-xs text-slate-300">{currentUser.designation} · {currentUser.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Faculty Sub-Nav Tabs */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto text-xs py-3">
            {[
              { id: 'roster', label: 'Enrolled Students Roster', icon: Users },
              { id: 'grades', label: 'Grade & Assessment Manager', icon: Award },
              { id: 'notices', label: 'Broadcast Official Notice', icon: Bell },
              { id: 'assignments', label: 'Publish New Assignment', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFacultyNav(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    facultyNav === tab.id
                      ? 'bg-[#0b1d3a] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#d4af37]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Faculty Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* TAB 1: ROSTER */}
          {facultyNav === 'roster' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0b1d3a]">Current Enrolled Class Roster</h2>
                  <p className="text-xs text-slate-500">Students enrolled in CS-301 & CS-302 (Fall 2026).</p>
                </div>
                <span className="text-xs font-bold text-[#0b1d3a] bg-slate-100 px-3 py-1 rounded">
                  {facultyStudents.length} Students Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Student Name</th>
                      <th className="py-3 px-4 font-bold">Student ID</th>
                      <th className="py-3 px-4 font-bold">Program</th>
                      <th className="py-3 px-4 font-bold">Semester</th>
                      <th className="py-3 px-4 font-bold">CGPA</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {facultyStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-semibold text-[#0b1d3a]">
                          <div>{st.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{st.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono">{st.id}</td>
                        <td className="py-3 px-4 text-slate-600">{st.program}</td>
                        <td className="py-3 px-4 text-slate-600">Sem {st.semester}</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">{st.cgpa} / 4.0</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Good Standing
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: GRADE MANAGEMENT */}
          {facultyNav === 'grades' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0b1d3a]">Student Grade Management</h2>
                <p className="text-xs text-slate-500">Record midterm and semester marks to the university backend database.</p>
              </div>

              {gradeMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{gradeMsg}</span>
                </div>
              )}

              <form onSubmit={handleFacultyUpdateGrade} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Course</label>
                  <select
                    value={gradeForm.courseCode}
                    onChange={(e) => setGradeForm({ ...gradeForm, courseCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="CS-301">CS-301: Advanced Distributed Systems</option>
                    <option value="CS-302">CS-302: Deep Learning & Neural Architectures</option>
                    <option value="CS-303">CS-303: Cloud Native DevOps & Microservices</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Letter Grade</label>
                    <select
                      value={gradeForm.grade}
                      onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="A+">A+ (Exceptional)</option>
                      <option value="A">A (Excellent)</option>
                      <option value="A-">A- (Very Good)</option>
                      <option value="B+">B+ (Good)</option>
                      <option value="B">B (Satisfactory)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Percentage / 100</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradeForm.score}
                      onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg uppercase tracking-wider text-xs"
                >
                  Commit Grade to Database
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: NOTICES */}
          {facultyNav === 'notices' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0b1d3a]">Broadcast Official Circular</h2>
                <p className="text-xs text-slate-500">Post announcements to student dashboards and department noticeboards.</p>
              </div>

              {noticeMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{noticeMsg}</span>
                </div>
              )}

              <form onSubmit={handleFacultyPostNotice} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Notice Title</label>
                  <input
                    type="text"
                    required
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Schedule Revision for CS-301 Midterm Lab"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Placement">Placement</option>
                    <option value="Event">Campus Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Notice Content</label>
                  <textarea
                    rows={4}
                    required
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    placeholder="Provide full description of circular..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="urgentNotice"
                    checked={noticeForm.isUrgent}
                    onChange={(e) => setNoticeForm({ ...noticeForm, isUrgent: e.target.checked })}
                    className="rounded text-[#0b1d3a]"
                  />
                  <label htmlFor="urgentNotice" className="text-slate-700 font-medium">Mark as High Priority / Urgent</label>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg uppercase tracking-wider text-xs"
                >
                  Publish Notice
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: ASSIGNMENTS */}
          {facultyNav === 'assignments' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0b1d3a]">Publish Course Assignment</h2>
                <p className="text-xs text-slate-500">Assign laboratory work, code repositories, or analytical essays to students.</p>
              </div>

              {assignmentMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{assignmentMsg}</span>
                </div>
              )}

              <form onSubmit={handleFacultyAddAssignment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assignment Title</label>
                  <input
                    type="text"
                    required
                    value={assignmentForm.title}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                    placeholder="e.g. Distributed Consensus Raft Protocol Part 2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                    <select
                      value={assignmentForm.courseCode}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, courseCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="CS-301">CS-301</option>
                      <option value="CS-302">CS-302</option>
                      <option value="CS-303">CS-303</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Max Score</label>
                    <input
                      type="number"
                      value={assignmentForm.maxScore}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, maxScore: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg uppercase tracking-wider text-xs"
                >
                  Publish Assignment to Class
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: STUDENT DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-slate-100 pb-16">
      {/* Student Portal Header Bar */}
      <div className="bg-[#0b1d3a] text-white border-b border-[#c59b27]/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 border border-[#c59b27] flex items-center justify-center text-[#f6e08c] font-serif font-black text-xl shadow">
              AV
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                <span>Roll ID: {currentUser.rollNo}</span>
                <span>·</span>
                <span>Semester {currentUser.semester}</span>
              </div>
              <h1 className="font-serif text-2xl font-bold text-white">{currentUser.name}</h1>
              <p className="text-xs text-slate-300">{currentUser.program}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Cumulative GPA</div>
              <div className="font-serif text-2xl font-bold text-[#f6e08c]">{currentUser.cgpa} / 4.00</div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Sub-Nav Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-20 z-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs py-3">
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: TrendingUp },
            { id: 'attendance', label: 'Attendance Record', icon: CheckCircle2 },
            { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
            { id: 'results', label: 'Examination Results', icon: Award },
            { id: 'assignments', label: 'Assignments', icon: FileText },
            { id: 'fees', label: 'Fee & Financials', icon: DollarSign },
            { id: 'notices', label: 'Official Circulars', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setStudentNav(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  studentNav === tab.id
                    ? 'bg-[#0b1d3a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback alerts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {submissionSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2 mb-4 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{submissionSuccess}</span>
          </div>
        )}
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* SUB-TAB 1: OVERVIEW */}
        {studentNav === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Attendance</span>
                <div className="font-serif text-3xl font-bold text-[#0b1d3a] mt-1">90.8%</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Eligible (Threshold 75%)</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cumulative GPA</span>
                <div className="font-serif text-3xl font-bold text-[#0b1d3a] mt-1">3.92</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Dean's Honor Roll</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Credits Completed</span>
                <div className="font-serif text-3xl font-bold text-[#0b1d3a] mt-1">112 / 160</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">70% Degree Progress</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Clearance</span>
                <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">Cleared</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Balance Due: $0.00</div>
              </div>
            </div>

            {/* Two column grid: Recent Notices & Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Pending Assignments */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">Pending Assignments</h3>
                  <button onClick={() => setStudentNav('assignments')} className="text-xs font-bold text-[#0b1d3a] hover:underline">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {portalData?.pendingAssignments?.map((asg: any) => (
                    <div key={asg.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-[#c59b27]">{asg.courseCode}</span>
                        <h4 className="font-semibold text-slate-800">{asg.title}</h4>
                        <p className="text-[11px] text-slate-500">Due: {new Date(asg.deadline).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => setSubmittingAssignment(asg)}
                        className="px-3 py-1.5 bg-[#0b1d3a] text-white rounded text-[11px] font-bold hover:bg-[#12284c] shrink-0"
                      >
                        Submit
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Notices */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">Latest Circulars</h3>
                  <button onClick={() => setStudentNav('notices')} className="text-xs font-bold text-[#0b1d3a] hover:underline">
                    All Circulars →
                  </button>
                </div>
                <div className="space-y-3">
                  {portalData?.recentNotices?.map((nt: any) => (
                    <div key={nt.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#c59b27]">{nt.category}</span>
                        <span className="text-slate-400">{nt.date}</span>
                      </div>
                      <h4 className="font-semibold text-slate-800">{nt.title}</h4>
                      <p className="text-slate-500 text-[11px] line-clamp-2">{nt.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: ATTENDANCE */}
        {studentNav === 'attendance' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">Course-wise Attendance Ledger</h3>
                <p className="text-xs text-slate-500">Official registry records for Semester 6. Minimum requirement: 75.0%</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Overall: 90.8% (Eligible for Examinations)</span>
              </div>
            </div>

            <div className="space-y-4">
              {portalData?.attendance?.map((att: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#c59b27] uppercase">{att.courseCode}</span>
                      <h4 className="font-semibold text-slate-800 text-sm">{att.courseTitle}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-base text-[#0b1d3a]">{att.percentage}%</span>
                      <p className="text-[11px] text-slate-500">{att.attended} / {att.total} Lectures</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${att.percentage >= 85 ? 'bg-emerald-600' : att.percentage >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${att.percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Status: <strong className="text-slate-700">{att.status}</strong></span>
                    <span>Required: 75%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 3: TIMETABLE */}
        {studentNav === 'timetable' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">Weekly Academic Timetable</h3>
              <p className="text-xs text-slate-500">Schedule of lectures, laboratory suites, and seminar colloquia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="font-serif text-sm font-bold text-[#0b1d3a] border-b border-slate-200 pb-2">
                    {day}
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                      <span className="text-[10px] font-bold text-[#c59b27] block">09:00 - 10:30 AM</span>
                      <p className="font-semibold text-slate-800">CS-301: Distributed Systems</p>
                      <p className="text-[10px] text-slate-500">Hall Alpha-301</p>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                      <span className="text-[10px] font-bold text-[#c59b27] block">11:00 - 12:30 PM</span>
                      <p className="font-semibold text-slate-800">CS-302: Deep Learning</p>
                      <p className="text-[10px] text-slate-500">Turing Lab 4</p>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                      <span className="text-[10px] font-bold text-[#c59b27] block">14:00 - 16:30 PM</span>
                      <p className="font-semibold text-slate-800">DevOps & Cloud Lab</p>
                      <p className="text-[10px] text-slate-500">Cloud Foundry</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 4: EXAMINATION RESULTS */}
        {studentNav === 'results' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">Official Academic Transcript & Results</h3>
                <p className="text-xs text-slate-500">Historical semester GPA performance and current term coursework.</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Grade Slip</span>
              </button>
            </div>

            {/* Semester Historical Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { sem: 'Semester 1', gpa: '3.90', credits: 20 },
                { sem: 'Semester 2', gpa: '3.95', credits: 22 },
                { sem: 'Semester 3', gpa: '3.90', credits: 22 },
                { sem: 'Semester 4', gpa: '3.88', credits: 24 },
                { sem: 'Semester 5', gpa: '3.94', credits: 24 },
              ].map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] text-slate-500 font-semibold">{s.sem}</div>
                  <div className="font-serif text-lg font-bold text-[#0b1d3a] mt-0.5">{s.gpa}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{s.credits} Credits</div>
                </div>
              ))}
            </div>

            {/* Detailed Course Grade Ledger */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Course Code</th>
                    <th className="py-3 px-4 font-bold">Course Title</th>
                    <th className="py-3 px-4 font-bold">Credits</th>
                    <th className="py-3 px-4 font-bold">Marks (/100)</th>
                    <th className="py-3 px-4 font-bold">Letter Grade</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portalData?.recentGrades?.map((cr: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-[#0b1d3a]">{cr.courseCode}</td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{cr.courseTitle}</td>
                      <td className="py-3 px-4 text-slate-600">{cr.credits}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{cr.score}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">{cr.grade}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {cr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-TAB 5: ASSIGNMENTS */}
        {studentNav === 'assignments' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">Assignment Submission Portal</h3>
                <p className="text-xs text-slate-500">Track deadlines, submit deliverables, and view professor remarks.</p>
              </div>
            </div>

            <div className="space-y-4">
              {portalData?.pendingAssignments?.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl text-slate-500 text-xs">
                  All assignments submitted for current assessment cycle!
                </div>
              ) : (
                portalData?.pendingAssignments?.map((asg: any) => (
                  <div key={asg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#c59b27] uppercase">{asg.courseCode}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">
                          {asg.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">{asg.title}</h4>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Deadline: {new Date(asg.deadline).toLocaleDateString()} at 11:59 PM
                      </p>
                    </div>

                    <button
                      onClick={() => setSubmittingAssignment(asg)}
                      className="px-4 py-2 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Submit Solution</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SUB-TAB 6: FEES & FINANCIALS */}
        {studentNav === 'fees' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">Tuition Fees & Account Statement</h3>
                <p className="text-xs text-slate-500">Official bursar clearance receipts and electronic fee payment gateway.</p>
              </div>

              <button
                onClick={() => setPayingFee(true)}
                className="px-4 py-2 bg-[#d4af37] hover:bg-[#c59b27] text-[#071326] font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 shadow-xs shrink-0"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Fee / Amenities</span>
              </button>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[11px] text-slate-500 font-semibold">Total Invoiced Amount</span>
                <div className="font-serif text-2xl font-bold text-[#0b1d3a] mt-1">$12,400</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[11px] text-slate-500 font-semibold">Total Paid to Date</span>
                <div className="font-serif text-2xl font-bold text-emerald-700 mt-1">$12,400</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[11px] text-slate-500 font-semibold">Outstanding Balance</span>
                <div className="font-serif text-2xl font-bold text-slate-800 mt-1">$0.00</div>
              </div>
            </div>

            {paymentReceipt && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 text-xs text-emerald-900 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bursar Receipt Verified: {paymentReceipt.receiptId}
                  </span>
                  <span>{paymentReceipt.date}</span>
                </div>
                <p>Payment of ${paymentReceipt.amount} for {paymentReceipt.category} received successfully.</p>
              </div>
            )}

            {/* Receipts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Receipt ID</th>
                    <th className="py-3 px-4 font-bold">Term / Category</th>
                    <th className="py-3 px-4 font-bold">Amount</th>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portalData?.fees?.map((fee: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-[#0b1d3a]">{fee.receiptId}</td>
                      <td className="py-3 px-4 text-slate-800">{fee.category} ({fee.term})</td>
                      <td className="py-3 px-4 font-bold text-slate-900">${fee.amount}</td>
                      <td className="py-3 px-4 text-slate-500">{fee.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-TAB 7: NOTICES */}
        {studentNav === 'notices' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0b1d3a]">University Circulars & Notices</h3>
              <p className="text-xs text-slate-500">Official directives from the Registrar, Deans, and Examination Board.</p>
            </div>

            <div className="space-y-4">
              {portalData?.recentNotices?.map((nt: any) => (
                <div key={nt.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0b1d3a] text-white text-[10px] font-bold uppercase rounded">
                        {nt.category}
                      </span>
                      {nt.isUrgent && (
                        <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold uppercase rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">{nt.date} · {nt.author}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#0b1d3a]">{nt.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-xs">{nt.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: SUBMIT ASSIGNMENT */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">
              Submit Assignment: {submittingAssignment.title}
            </h3>
            <p className="text-xs text-slate-500">
              Provide your submission notes, repository link, or project documentation summary.
            </p>

            <form onSubmit={handleSubmitAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Submission Notes / Code Repository URL
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="e.g. GitHub link: https://github.com/vance-aiden/raft-consensus or summary of algorithm implementation..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingAssignment(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#0b1d3a] text-white rounded hover:bg-[#12284c]"
                >
                  Submit Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PAY FEE */}
      {payingFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">
              Bursar Payment Gateway
            </h3>
            <p className="text-xs text-slate-500">
              Simulate electronic fee remittance for library, student amenities, or examination fees.
            </p>

            <form onSubmit={handlePayFee} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Amount to Remit (USD)
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayingFee(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#d4af37] text-[#071326] rounded hover:bg-[#c59b27] uppercase tracking-wider"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
