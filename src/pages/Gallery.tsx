import React, { useState } from 'react';
import { GalleryImage } from '../types/wedding';
import { Maximize2, Camera } from 'lucide-react';

interface GalleryProps {
  images: GalleryImage[];
  onOpenLightbox: (index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'ceremony', label: 'Ceremony Sanctuary' },
    { id: 'celebration', label: 'Celebration' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold">
          Captured Memories
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#111111] tracking-tight">
          Wedding Photograph Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#766452] font-serif italic">
          Photographs shared by Peace and Micheal and their wedding team.
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Control - Allowed under Frontend Constitution) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#111111]/10 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              selectedCategory === cat.id
                ? 'border-[#C5A46D] text-[#111111] font-semibold'
                : 'border-transparent text-[#766452] hover:text-[#111111] hover:border-[#C5A46D]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#C5A46D]/40 p-8 space-y-3 bg-[#F7F2E9]/30">
          <Camera className="w-8 h-8 text-[#C5A46D] mx-auto" />
          <h3 className="text-xl font-serif text-[#111111]">No Photographs In This Category Yet</h3>
          <p className="text-xs text-[#766452]">Photographs will appear here when shared by the wedding team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => {
            const originalIndex = images.findIndex(i => i.id === img.id);
            return (
              <button
                type="button"
                aria-label={"Open photograph: " + img.caption}
                key={img.id}
                onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : 0)}
                className="text-left group relative cursor-pointer overflow-hidden border border-[#111111]/10 bg-[#F7F2E9] shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.altText || img.caption}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle hover overlay with icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 bg-white/90 text-[#111111] rounded-full shadow-lg">
                      <Maximize2 className="w-4 h-4 text-[#C5A46D]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-[#111111]/6 flex flex-col justify-between">
                  <p className="text-xs font-serif text-[#111111] leading-relaxed line-clamp-2">
                    {img.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#766452]">
                    <span className="uppercase tracking-wider text-[#C5A46D] font-medium">
                      {img.category}
                    </span>
                    <span>Tap to view</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Note */}
      <div className="text-center text-xs text-[#766452] pt-8">
        <p>All wedding ceremony and reception photo collections are curated for Peace &amp; Micheal.</p>
      </div>

    </div>
  );
};
