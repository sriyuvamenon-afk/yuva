export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Diploma';
  duration: string;
  credits: number;
  annualFee: string;
  eligibility: string;
  seats: number;
  description: string;
  careerProspects: string[];
  keyHighlights: string[];
  syllabusOverview: { semester: string; subjects: string[] }[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  headTitle: string;
  headImage: string;
  overview: string;
  totalFaculty: number;
  totalStudents: number;
  laboratories: string[];
  researchAreas: string[];
  image: string;
  featuredDegree: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  institution: string;
  experience: string;
  researchInterests: string[];
  email: string;
  office: string;
  image: string;
  publicationsCount: number;
}

export interface CampusFacility {
  id: string;
  name: string;
  category: 'Academic' | 'Residential' | 'Recreation' | 'Research' | 'Wellness';
  description: string;
  features: string[];
  image: string;
  timings: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus & Architecture' | 'Fests & Culture' | 'Tech & Hackathons' | 'Sports & Athletics' | 'Academic Conclaves';
  image: string;
  date: string;
  caption: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Cultural' | 'Technical' | 'Sports' | 'Placement';
  date: string;
  time: string;
  venue: string;
  description: string;
  speakers?: string[];
  registrationOpen: boolean;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  batch: string;
  currentCompany: string;
  quote: string;
  image: string;
  package?: string;
}

export interface CollegeStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
}
