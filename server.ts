import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for server-side persistence
interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  department: string;
  semester: number;
  rollNo: string;
  cgpa: number;
  advisor: string;
  creditsEarned: number;
  totalCredits: number;
}

interface GradeRecord {
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  score: number;
  status: 'Completed' | 'In Progress';
}

interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  deadline: string;
  maxScore: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: number;
  submissionDate?: string;
  feedback?: string;
}

interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Placement' | 'Campus Life' | 'Event';
  date: string;
  author: string;
  content: string;
  isUrgent?: boolean;
}

interface AdmissionEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  degreeLevel: string;
  previousQualification: string;
  percentageScore: string;
  message?: string;
  submittedAt: string;
  status: 'Received' | 'Under Review' | 'Accepted';
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  submittedAt: string;
}

// Initial Database State
const studentDatabase: Student = {
  id: 'VCU-2024-8841',
  name: 'Aiden Vance',
  email: 'student@veritas.edu',
  program: 'B.Tech in Computer Science & Artificial Intelligence',
  department: 'School of Computing & Data Sciences',
  semester: 6,
  rollNo: '2024CS8841',
  cgpa: 3.92,
  advisor: 'Dr. Alistair Finch (Senior Professor)',
  creditsEarned: 112,
  totalCredits: 160,
};

const attendanceData = [
  { courseCode: 'CS-301', courseTitle: 'Advanced Distributed Systems', attended: 36, total: 38, percentage: 94.7, status: 'Excellent' },
  { courseCode: 'CS-302', courseTitle: 'Deep Learning & Neural Architectures', attended: 32, total: 36, percentage: 88.9, status: 'Good' },
  { courseCode: 'CS-303', courseTitle: 'Cloud Native DevOps & Microservices', attended: 34, total: 36, percentage: 94.4, status: 'Excellent' },
  { courseCode: 'CS-304', courseTitle: 'Zero-Trust Cybersecurity & Cryptography', attended: 29, total: 36, percentage: 80.5, status: 'Satisfactory' },
  { courseCode: 'CS-305', courseTitle: 'Quantum Computing Fundamentals', attended: 35, total: 38, percentage: 92.1, status: 'Good' },
  { courseCode: 'HU-202', courseTitle: 'Professional Ethics & Tech Governance', attended: 19, total: 20, percentage: 95.0, status: 'Excellent' },
];

const timetableData = [
  {
    day: 'Monday',
    slots: [
      { time: '09:00 - 10:30', course: 'CS-301: Advanced Distributed Systems', room: 'Hall Alpha-301', faculty: 'Dr. Eleanor Vance' },
      { time: '10:45 - 12:15', course: 'CS-302: Deep Learning & Neural Architectures', room: 'Turing Lab 4', faculty: 'Dr. Alistair Finch' },
      { time: '14:00 - 16:30', course: 'CS-303: DevOps & Microservices Lab', room: 'Cloud Innovation Hub', faculty: 'Prof. Marcus Chen' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '09:30 - 11:00', course: 'CS-304: Zero-Trust Cybersecurity', room: 'Hall Beta-102', faculty: 'Dr. Samantha Reed' },
      { time: '11:15 - 12:45', course: 'CS-305: Quantum Computing Fundamentals', room: 'Quantum Research Wing', faculty: 'Dr. Vikram Raman' },
      { time: '14:30 - 15:45', course: 'HU-202: Tech Ethics & Governance', room: 'Seminar Suite B', faculty: 'Prof. Evelyn Moore' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '09:00 - 10:30', course: 'CS-302: Deep Learning Studio', room: 'Turing Lab 4', faculty: 'Dr. Alistair Finch' },
      { time: '11:00 - 12:30', course: 'CS-301: Distributed Systems Recitation', room: 'Hall Alpha-301', faculty: 'Dr. Eleanor Vance' },
      { time: '14:00 - 16:00', course: 'Capstone Project Mentorship', room: 'Innovation Foundry', faculty: 'Faculty Panel' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '10:00 - 11:30', course: 'CS-303: Cloud Native DevOps', room: 'Hall Gamma-204', faculty: 'Prof. Marcus Chen' },
      { time: '13:30 - 15:00', course: 'CS-304: Applied Cryptography Lab', room: 'Cybersecurity Range', faculty: 'Dr. Samantha Reed' },
      { time: '15:30 - 17:00', course: 'National Research Colloquium', room: 'Main Auditorium', faculty: 'Guest Lecturers' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '09:00 - 10:30', course: 'CS-305: Quantum Circuit Design', room: 'Physics & Quantum Lab', faculty: 'Dr. Vikram Raman' },
      { time: '11:00 - 12:30', course: 'Open Source Studio & Peer Review', room: 'Collaborative Deck 2', faculty: 'Teaching Fellows' },
      { time: '14:00 - 16:00', course: 'Varsity Sports & Student Clubs', room: 'Sports Arena / Club Hub', faculty: 'Student Council' },
    ],
  },
];

let gradeRecords: GradeRecord[] = [
  { courseCode: 'CS-201', courseTitle: 'Data Structures & Algorithms Studio', credits: 4, grade: 'A+', score: 98, status: 'Completed' },
  { courseCode: 'CS-202', courseTitle: 'Computer Systems Architecture', credits: 4, grade: 'A', score: 92, status: 'Completed' },
  { courseCode: 'CS-203', courseTitle: 'Database Internals & SQL Engines', credits: 4, grade: 'A+', score: 96, status: 'Completed' },
  { courseCode: 'MA-201', courseTitle: 'Multivariable Calculus & Linear Algebra', credits: 4, grade: 'A', score: 91, status: 'Completed' },
  { courseCode: 'CS-301', courseTitle: 'Advanced Distributed Systems', credits: 4, grade: 'A', score: 93, status: 'In Progress' },
  { courseCode: 'CS-302', courseTitle: 'Deep Learning & Neural Architectures', credits: 4, grade: 'A+', score: 97, status: 'In Progress' },
  { courseCode: 'CS-303', courseTitle: 'Cloud Native DevOps & Microservices', credits: 4, grade: 'A', score: 90, status: 'In Progress' },
];

let assignmentData: Assignment[] = [
  {
    id: 'ASG-601',
    courseCode: 'CS-301',
    title: 'Fault-Tolerant Consensus Protocol (Raft Implementation)',
    deadline: '2026-10-24T23:59:00',
    maxScore: 100,
    status: 'Pending',
  },
  {
    id: 'ASG-602',
    courseCode: 'CS-302',
    title: 'Transformer Attention Visualizer & Fine-Tuning Benchmark',
    deadline: '2026-10-28T23:59:00',
    maxScore: 100,
    status: 'Pending',
  },
  {
    id: 'ASG-603',
    courseCode: 'CS-303',
    title: 'Terraform & Kubernetes Automated Canary Deployment',
    deadline: '2026-10-05T23:59:00',
    maxScore: 100,
    status: 'Graded',
    score: 98,
    submissionDate: '2026-10-04',
    feedback: 'Exceptional Helm chart configuration and zero-downtime test suite. Top tier submission.',
  },
  {
    id: 'ASG-604',
    courseCode: 'CS-304',
    title: 'Elliptic Curve Cryptography Key Exchange Demonstration',
    deadline: '2026-09-22T23:59:00',
    maxScore: 100,
    status: 'Graded',
    score: 94,
    submissionDate: '2026-09-21',
    feedback: 'Clear proof and well documented side-channel mitigation test cases.',
  },
];

let noticesData: Notice[] = [
  {
    id: 'NTC-801',
    title: 'Fall 2026 Global Campus Placement Drive: Tier-1 Technology & Finance Partners',
    category: 'Placement',
    date: 'October 06, 2026',
    author: 'Dean of Career Advancement',
    content: 'On-campus recruitment interviews for Google, Microsoft, Goldman Sachs, Nvidia, and McKinsey start November 10th. Pre-placement workshops commence this Friday in Auditorium Hall.',
    isUrgent: true,
  },
  {
    id: 'NTC-802',
    title: 'Schedule for Mid-Term Examinations & Practical Evaluations (Semester 2, 4, 6)',
    category: 'Examination',
    date: 'October 04, 2026',
    author: 'Controller of Examinations',
    content: 'Mid-term written examinations will be conducted from November 2nd to November 14th. Hall tickets can be downloaded via the Student Portal beginning next week.',
  },
  {
    id: 'NTC-803',
    title: 'Annual Inter-Collegiate Technology & Innovation Conclave: "InnovateX 2026"',
    category: 'Event',
    date: 'October 02, 2026',
    author: 'Student Council & Research Cell',
    content: 'Registration is now live for hackathons, robotics challenges, and paper presentations with a $50,000 innovation grant pool.',
  },
  {
    id: 'NTC-804',
    title: 'Extended Library & Computing Facilities Hours for Research Scholars',
    category: 'Campus Life',
    date: 'September 28, 2026',
    author: 'Chief Librarian',
    content: 'The Central Academic Library and Supercomputing Lab will remain accessible 24/7 with valid student RFID identification starting Monday.',
  },
];

const feeRecords = [
  { term: 'Academic Year 2026-27 (Sem 6)', category: 'Tuition & Academic Facilities', amount: 8400, paid: 8400, status: 'Paid', receiptId: 'RCP-2026-8812', date: 'Aug 12, 2026' },
  { term: 'Academic Year 2026-27 (Sem 6)', category: 'Advanced Laboratory & Cloud Lab Access', amount: 950, paid: 950, status: 'Paid', receiptId: 'RCP-2026-8813', date: 'Aug 12, 2026' },
  { term: 'Academic Year 2026-27 (Sem 6)', category: 'Examination & Assessment Fee', amount: 250, paid: 250, status: 'Paid', receiptId: 'RCP-2026-8814', date: 'Sep 01, 2026' },
  { term: 'Residential Wing & Dining Plan', category: 'Hostel Accommodation (Single Suite)', amount: 2800, paid: 2800, status: 'Paid', receiptId: 'RCP-2026-8815', date: 'Aug 10, 2026' },
];

let admissionEnquiries: AdmissionEnquiry[] = [
  {
    id: 'VCU-ADM-9041',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 234-5678',
    program: 'B.Tech in Computer Science & AI',
    degreeLevel: 'Undergraduate',
    previousQualification: 'High School Diploma (AP STEM Honor Roll)',
    percentageScore: '96.5%',
    message: 'Interested in robotics lab research opportunities and merit scholarships.',
    submittedAt: '2026-10-07T14:22:00Z',
    status: 'Under Review',
  },
  {
    id: 'VCU-ADM-9042',
    fullName: 'Rajesh Subramanian',
    email: 'rajesh.sub@example.com',
    phone: '+1 (555) 876-5432',
    program: 'Master of Business Administration (Global Business)',
    degreeLevel: 'Postgraduate',
    previousQualification: 'B.Com Honors (Finance)',
    percentageScore: '92.0%',
    message: 'Inquiring about executive leadership mentorship track and placement statistics.',
    submittedAt: '2026-10-06T09:15:00Z',
    status: 'Accepted',
  },
];

let contactMessages: ContactMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', university: 'Veritas Crest University', timestamp: new Date().toISOString() });
  });

  // Auth: Student Login
  app.post('/api/auth/student-login', (req, res) => {
    const { identifier, password } = req.body;
    // Real backend authentication validation
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please provide Student Email or ID and Password.' });
    }

    const isValidStudent = 
      (identifier.toLowerCase() === 'student@veritas.edu' || identifier.toUpperCase() === 'VCU-2024-8841' || identifier.toLowerCase() === 'aiden') &&
      password === 'veritas2026';

    if (isValidStudent) {
      return res.json({
        success: true,
        role: 'student',
        token: 'auth-token-student-vc2026-session',
        user: studentDatabase,
      });
    }

    return res.status(401).json({
      error: 'Invalid credentials. Use demo login: student@veritas.edu and password: veritas2026',
    });
  });

  // Auth: Faculty Login
  app.post('/api/auth/faculty-login', (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please provide Faculty Email or ID and Password.' });
    }

    const isValidFaculty = 
      (identifier.toLowerCase() === 'faculty@veritas.edu' || identifier.toUpperCase() === 'FAC-CS-102') &&
      password === 'prof2026';

    if (isValidFaculty) {
      return res.json({
        success: true,
        role: 'faculty',
        token: 'auth-token-faculty-fc2026-session',
        user: {
          id: 'FAC-CS-102',
          name: 'Dr. Alistair Finch',
          email: 'faculty@veritas.edu',
          designation: 'Professor & Head of Artificial Intelligence',
          department: 'School of Computing & Data Sciences',
          coursesTaught: ['CS-302: Deep Learning', 'CS-401: Advanced AI Studio'],
          office: 'Engineering Hall Tower C, Suite 410',
        },
      });
    }

    return res.status(401).json({
      error: 'Invalid credentials. Use demo login: faculty@veritas.edu and password: prof2026',
    });
  });

  // Student Portal Data Endpoints
  app.get('/api/student/profile', (_req, res) => {
    res.json(studentDatabase);
  });

  app.get('/api/student/dashboard', (_req, res) => {
    res.json({
      student: studentDatabase,
      attendance: attendanceData,
      overallAttendance: 90.8,
      recentGrades: gradeRecords.slice(-4),
      pendingAssignments: assignmentData.filter(a => a.status === 'Pending'),
      recentNotices: noticesData.slice(0, 3),
      fees: feeRecords,
    });
  });

  app.get('/api/student/attendance', (_req, res) => {
    res.json({
      records: attendanceData,
      overallPercentage: 90.8,
      minimumRequirement: 75.0,
      status: 'Eligible for all examinations',
    });
  });

  app.get('/api/student/timetable', (_req, res) => {
    res.json(timetableData);
  });

  app.get('/api/student/results', (_req, res) => {
    res.json({
      cgpa: studentDatabase.cgpa,
      totalCredits: studentDatabase.creditsEarned,
      semesters: [
        { semester: 5, gpa: 3.94, credits: 24, status: 'Distinction' },
        { semester: 4, gpa: 3.88, credits: 24, status: 'Distinction' },
        { semester: 3, gpa: 3.90, credits: 22, status: 'Distinction' },
        { semester: 2, gpa: 3.95, credits: 22, status: 'Distinction' },
        { semester: 1, gpa: 3.90, credits: 20, status: 'Distinction' },
      ],
      currentCourses: gradeRecords,
    });
  });

  app.get('/api/student/assignments', (_req, res) => {
    res.json(assignmentData);
  });

  // Submit assignment
  app.post('/api/student/submit-assignment', (req, res) => {
    const { assignmentId, submissionNotes, fileUrl } = req.body;
    const assignment = assignmentData.find(a => a.id === assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }
    assignment.status = 'Submitted';
    assignment.submissionDate = new Date().toISOString().split('T')[0];
    assignment.feedback = submissionNotes ? `Submitted notes: ${submissionNotes}` : 'Submitted successfully. Awaiting faculty evaluation.';
    res.json({ success: true, message: 'Assignment submitted successfully to portal!', assignment });
  });

  app.get('/api/student/fees', (_req, res) => {
    const totalAmount = feeRecords.reduce((acc, curr) => acc + curr.amount, 0);
    const paidAmount = feeRecords.reduce((acc, curr) => acc + curr.paid, 0);
    res.json({
      records: feeRecords,
      totalAmount,
      paidAmount,
      balanceDue: totalAmount - paidAmount,
      currency: 'USD',
      financialClearance: 'Cleared for Current Semester',
    });
  });

  // Pay Fee Simulator
  app.post('/api/student/pay-fee', (req, res) => {
    const { amount, paymentMethod } = req.body;
    const newReceipt = {
      term: 'Academic Year 2026-27 (Sem 6)',
      category: 'Supplementary Student Amenities & Lab Access',
      amount: Number(amount) || 250,
      paid: Number(amount) || 250,
      status: 'Paid',
      receiptId: `RCP-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    feeRecords.push(newReceipt);
    res.json({ success: true, message: 'Payment processed and verified by college bursar.', receipt: newReceipt });
  });

  // Notices API
  app.get('/api/notices', (_req, res) => {
    res.json(noticesData);
  });

  // Faculty API: View all enrolled students
  app.get('/api/faculty/students', (_req, res) => {
    res.json([
      studentDatabase,
      {
        id: 'VCU-2024-8842',
        name: 'Elena Rostova',
        email: 'e.rostova@veritas.edu',
        program: 'B.Tech Computer Science',
        department: 'School of Computing',
        semester: 6,
        rollNo: '2024CS8842',
        cgpa: 3.84,
        advisor: 'Dr. Alistair Finch',
        creditsEarned: 112,
        totalCredits: 160,
      },
      {
        id: 'VCU-2024-8843',
        name: 'Marcus K. Sterling',
        email: 'm.sterling@veritas.edu',
        program: 'B.Tech Computer Science',
        department: 'School of Computing',
        semester: 6,
        rollNo: '2024CS8843',
        cgpa: 3.76,
        advisor: 'Dr. Alistair Finch',
        creditsEarned: 110,
        totalCredits: 160,
      },
    ]);
  });

  // Faculty API: Update student grade
  app.post('/api/faculty/update-grade', (req, res) => {
    const { courseCode, grade, score } = req.body;
    const existing = gradeRecords.find(g => g.courseCode === courseCode);
    if (existing) {
      existing.grade = grade || existing.grade;
      existing.score = score !== undefined ? Number(score) : existing.score;
      return res.json({ success: true, message: `Updated grade for ${courseCode} successfully.`, updated: existing });
    }
    return res.status(404).json({ error: 'Course code not found in current semester grade sheet.' });
  });

  // Faculty API: Post Notice
  app.post('/api/faculty/post-notice', (req, res) => {
    const { title, category, content, isUrgent } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    const newNotice: Notice = {
      id: `NTC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category: category || 'Academic',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'Dr. Alistair Finch (Faculty Head)',
      content,
      isUrgent: !!isUrgent,
    };
    noticesData.unshift(newNotice);
    res.json({ success: true, message: 'Notice broadcasted to student noticeboard.', notice: newNotice });
  });

  // Faculty API: Add Assignment
  app.post('/api/faculty/add-assignment', (req, res) => {
    const { title, courseCode, deadline, maxScore } = req.body;
    if (!title || !courseCode) {
      return res.status(400).json({ error: 'Title and course code are required.' });
    }
    const newAssignment: Assignment = {
      id: `ASG-${Math.floor(610 + Math.random() * 90)}`,
      courseCode,
      title,
      deadline: deadline || new Date(Date.now() + 7 * 86400000).toISOString(),
      maxScore: Number(maxScore) || 100,
      status: 'Pending',
    };
    assignmentData.unshift(newAssignment);
    res.json({ success: true, message: 'Assignment published to student portal.', assignment: newAssignment });
  });

  // Admissions Enquiry Submission
  app.post('/api/admissions/enquiry', (req, res) => {
    const { fullName, email, phone, program, degreeLevel, previousQualification, percentageScore, message } = req.body;
    
    // Server-side validation
    if (!fullName || !email || !phone || !program) {
      return res.status(400).json({
        error: 'Please fill in all mandatory fields (Name, Email, Phone, Preferred Program).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const enquiryId = `VCU-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: AdmissionEnquiry = {
      id: enquiryId,
      fullName,
      email,
      phone,
      program,
      degreeLevel: degreeLevel || 'Undergraduate',
      previousQualification: previousQualification || 'High School / Senior Secondary',
      percentageScore: percentageScore || 'N/A',
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'Received',
    };

    admissionEnquiries.unshift(newEnquiry);

    res.status(201).json({
      success: true,
      message: 'Your admission inquiry has been received. Our admissions dean will reach out within 24 hours.',
      applicationNumber: enquiryId,
      enquiry: newEnquiry,
    });
  });

  app.get('/api/admissions/enquiries', (_req, res) => {
    res.json({
      total: admissionEnquiries.length,
      recent: admissionEnquiries.slice(0, 10),
    });
  });

  // Contact Message Submission
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, category, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const ticketId = `VCU-TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newMsg: ContactMessage = {
      id: ticketId,
      name,
      email,
      subject: subject || 'General Campus Inquiry',
      category: category || 'General Information',
      message,
      submittedAt: new Date().toISOString(),
    };
    contactMessages.push(newMsg);

    res.status(201).json({
      success: true,
      message: 'Your message has been dispatched to Veritas Crest Administration.',
      ticketNumber: ticketId,
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Veritas Crest University Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
