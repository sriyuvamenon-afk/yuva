import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  HelpCircle,
  Building,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData.ts';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Information',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    setTicketResult(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry.');
      }

      setTicketResult(
        `Thank you, ${formData.name}. Your inquiry has been logged with Ticket ID: ${data.ticketNumber}. Our administrative staff will reply to ${formData.email} within 24 business hours.`
      );
      setFormData({
        name: '',
        email: '',
        category: 'General Information',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error contacting university mail routing server.');
    } finally {
      setSubmitting(false);
    }
  };

  const keyOffices = [
    { title: 'Office of Admissions & Financial Aid', phone: '+1 (800) 582-7488', email: 'admissions@veritascrest.edu', hours: 'Mon–Fri: 8:00 AM – 6:00 PM' },
    { title: 'Office of the University Registrar', phone: '+1 (555) 392-8810', email: 'registrar@veritascrest.edu', hours: 'Mon–Fri: 9:00 AM – 5:00 PM' },
    { title: 'Career Advancement & Placement Cell', phone: '+1 (555) 392-8840', email: 'careers@veritascrest.edu', hours: 'Mon–Fri: 9:00 AM – 5:30 PM' },
    { title: 'Student Housing & Residential Quarters', phone: '+1 (555) 392-8860', email: 'housing@veritascrest.edu', hours: '24/7 Residential Care Desk' },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Connect with Veritas Crest</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact & Campus Location
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            We welcome inquiries from prospective students, parents, academic scholars, corporate recruiters, and visitors. Our admissions counselors and administrative staff are here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Direct Correspondence</span>
              <h2 className="font-serif text-2xl font-bold text-[#0b1d3a] mt-1">
                Send an Administrative Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have questions about specific academic departments, tuition installments, or scheduling a guided campus tour?
              </p>
            </div>

            {ticketResult && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Inquiry Dispatched</p>
                  <p>{ticketResult}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-lg text-rose-900 text-xs flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Error</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Johnathan Vance"
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
                    placeholder="e.g. johnathan@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inquiry Department
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  >
                    <option value="Admissions & Prospectus">Admissions & Prospectus</option>
                    <option value="Academic Verifications">Academic Verifications & Transcripts</option>
                    <option value="Campus Housing & Hostels">Campus Housing & Hostels</option>
                    <option value="Corporate Placement & Recruiting">Corporate Placement & Recruiting</option>
                    <option value="General Information">General Campus Information</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subject Line <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Campus visit scheduling on Friday"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detail your question or requirement..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0b1d3a] focus:bg-white text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold rounded-lg shadow transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 text-[#d4af37]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Campus Location, Hours & Key Desks (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <div className="bg-[#0b1d3a] text-white p-6 rounded-2xl border border-[#c59b27]/30 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-[#f6e08c]" />
                Main Campus Location
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{COLLEGE_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Toll-Free Helpline: {COLLEGE_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{COLLEGE_INFO.email}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{COLLEGE_INFO.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Department Extensions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0b1d3a]">Key Administrative Desks</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {keyOffices.map((office, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <p className="font-bold text-slate-800">{office.title}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span>{office.phone}</span>
                      <span>·</span>
                      <a href={`mailto:${office.email}`} className="text-[#0b1d3a] hover:underline">
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-serif text-base font-bold text-[#0b1d3a]">Follow Veritas Crest</h3>
              <p className="text-xs text-slate-500">Stay connected through official university channels:</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['LinkedIn', 'X (Twitter)', 'YouTube', 'Instagram', 'Facebook'].map((soc) => (
                  <span
                    key={soc}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:text-[#0b1d3a] hover:border-[#0b1d3a] cursor-pointer transition-colors font-medium"
                  >
                    {soc}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Campus Map & Transit Section */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-wider">Directions & Navigation</span>
            <h2 className="font-serif text-3xl font-bold text-[#0b1d3a]">Getting to Campus</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Conveniently located 20 minutes from the international airport and connected by rapid transit lines.
            </p>
          </div>

          {/* Interactive Map Iframe / Preview */}
          <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md h-96 relative bg-slate-200">
            <iframe
              title="Veritas Crest University Campus Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Stanford%20University,%20CA+(Veritas%20Crest%20University)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              className="w-full h-full filter saturate-120"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0b1d3a] mb-1">By Air</h4>
              <p className="text-slate-600">Direct 20-minute shuttle connection from San Francisco International (SFO) and San Jose (SJC) airports.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0b1d3a] mb-1">By Rail & Metro</h4>
              <p className="text-slate-600">Innovation Valley Caltrain Station is 1.2 miles from East Gate. Free electric university shuttles run every 10 mins.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#0b1d3a] mb-1">Visitor Parking</h4>
              <p className="text-slate-600">Visitor passes available at Gate 1 Welcome Pavilion. Electric vehicle Level 2 and DC fast charging available.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
