import React from 'react';
import { X, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types.ts';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, items, onClose, onSelect }) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800 text-white">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#d4af37] font-semibold">{item.category}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {item.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="relative bg-black flex items-center justify-center min-h-[400px] max-h-[70vh] overflow-hidden group">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom description */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{item.caption}</p>
          </div>
          <div className="text-[11px] text-slate-500 shrink-0">
            Image {currentIndex + 1} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
