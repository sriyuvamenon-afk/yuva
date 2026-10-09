import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { CoursesPage } from './pages/CoursesPage.tsx';
import { AdmissionsPage } from './pages/AdmissionsPage.tsx';
import { DepartmentsPage } from './pages/DepartmentsPage.tsx';
import { FacultyPage } from './pages/FacultyPage.tsx';
import { CampusLifePage } from './pages/CampusLifePage.tsx';
import { EventsPage } from './pages/EventsPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { StudentPortalPage } from './pages/StudentPortalPage.tsx';

// Scroll to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#c59b27]/30 selection:text-[#0b1d3a]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/campus-life" element={<CampusLifePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portal" element={<StudentPortalPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
