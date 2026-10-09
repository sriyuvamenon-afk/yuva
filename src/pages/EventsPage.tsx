import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/collegeData.ts';
import { CollegeEvent } from '../types.ts';

export const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rsvpRegistered, setRsvpRegistered] = useState<{ [eventId: string]: boolean }>({});

  const categories = ['All', 'Technical', 'Placement', 'Cultural', 'Sports', 'Academic'];

  const filteredEvents = UPCOMING_EVENTS.filter(
    (e) => selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleRsvp = (eventId: string) => {
    setRsvpRegistered((prev) => ({ ...prev, [eventId]: true }));
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#071326] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Academic & Cultural Calendar 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Campus Events, Seminars & Conclaves
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Stay abreast of university symposia, research workshops, international student hackathons, and cultural evenings happening throughout the semester.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Event Type:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0b1d3a] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {filteredEvents.map((event) => {
            const isRegistered = rsvpRegistered[event.id];

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row"
              >
                {/* Event Photo */}
                <div className="md:w-2/5 relative min-h-[240px] md:min-h-[300px] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#0b1d3a] text-[#f6e08c] font-bold text-xs px-3 py-1 rounded shadow">
                    {event.category}
                  </div>
                </div>

                {/* Event Details */}
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-bold text-[#c59b27]">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {event.venue}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#0b1d3a]">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {event.description}
                    </p>

                    {event.speakers && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Distinguished Speakers:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {event.speakers.map((spk, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                              {spk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RSVP & Action Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      Open to registered students, faculty, and invited scholars.
                    </div>

                    {isRegistered ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Seat Confirmed & Calendar Invite Sent</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRsvp(event.id)}
                        className="px-5 py-2.5 bg-[#0b1d3a] hover:bg-[#12284c] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wider"
                      >
                        <span>Reserve Free Delegate Seat</span>
                        <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
