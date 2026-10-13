import React, { useState, useMemo } from 'react';
import { Destination, NewsArticle, PermitServiceInfo, GalleryItem } from '../types';
import { PERMIT_SERVICES } from '../data/initialData';
import { Search, X, MapPin, Newspaper, FileCheck, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  onSelectDestination: (d: Destination) => void;
  onSelectNews: (n: NewsArticle) => void;
  onSelectPermit: (service: PermitServiceInfo) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  news,
  gallery,
  onSelectDestination,
  onSelectNews,
  onSelectPermit
}) => {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) {
      return { destinations: [], news: [], services: [], gallery: [] };
    }

    const matchedDestinations = destinations.filter(d =>
      d.name.toLowerCase().includes(trimmed) ||
      d.shortDesc.toLowerCase().includes(trimmed) ||
      d.location.toLowerCase().includes(trimmed) ||
      d.categoryLabel.toLowerCase().includes(trimmed)
    );

    const matchedNews = news.filter(n =>
      n.title.toLowerCase().includes(trimmed) ||
      n.summary.toLowerCase().includes(trimmed) ||
      n.category.toLowerCase().includes(trimmed)
    );

    const matchedServices = PERMIT_SERVICES.filter(s =>
      s.title.toLowerCase().includes(trimmed) ||
      s.description.toLowerCase().includes(trimmed) ||
      s.category.toLowerCase().includes(trimmed)
    );

    const matchedGallery = gallery.filter(g =>
      g.title.toLowerCase().includes(trimmed) ||
      g.location.toLowerCase().includes(trimmed)
    );

    return {
      destinations: matchedDestinations,
      news: matchedNews,
      services: matchedServices,
      gallery: matchedGallery
    };
  }, [trimmed, destinations, news, gallery]);

  if (!isOpen) return null;

  const totalResults =
    results.destinations.length +
    results.news.length +
    results.services.length +
    results.gallery.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-stone-900/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Cari destinasi wisata, berita, perizinan, atau kerajinan HSU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips if empty */}
        {!trimmed && (
          <div className="p-6 text-xs text-stone-500 space-y-3">
            <div className="font-semibold text-stone-700">Pencarian Populer di HSU:</div>
            <div className="flex flex-wrap gap-2">
              {['Danau Panggang', 'Candi Agung', 'Anyaman Purun', 'Itik Alabio', 'Izin Event', 'GOR Kamboja', 'Calendar of Events'].map((sug) => (
                <button
                  key={sug}
                  onClick={() => setQuery(sug)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        {trimmed && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {totalResults === 0 ? (
              <div className="text-center py-10 text-stone-500 text-xs">
                Tidak ada hasil ditemukan untuk <span className="font-semibold text-stone-800">"{query}"</span>. Coba kata kunci lain seperti "Candi", "Purun", "Izin", atau "Danau".
              </div>
            ) : (
              <>
                {/* Destinations */}
                {results.destinations.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Destinasi Wisata ({results.destinations.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.destinations.map(d => (
                        <div
                          key={d.id}
                          onClick={() => {
                            onClose();
                            onSelectDestination(d);
                          }}
                          className="p-2.5 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors border border-transparent hover:border-stone-200"
                        >
                          <img
                            src={d.imageUrl}
                            alt={d.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-semibold text-emerald-800">{d.categoryLabel}</div>
                            <div className="text-xs font-bold text-stone-900 truncate">{d.name}</div>
                            <div className="text-[11px] text-stone-500 truncate">{d.location}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News */}
                {results.news.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Newspaper className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Berita & Informasi ({results.news.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.news.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onClose();
                            onSelectNews(n);
                          }}
                          className="p-2.5 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors border border-transparent hover:border-stone-200"
                        >
                          <img
                            src={n.imageUrl}
                            alt={n.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-semibold text-emerald-800">{n.category} · {n.publishedAt}</div>
                            <div className="text-xs font-bold text-stone-900 truncate">{n.title}</div>
                            <div className="text-[11px] text-stone-500 truncate">{n.summary}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {results.services.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Layanan Perizinan ({results.services.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.services.map(s => (
                        <div
                          key={s.id}
                          onClick={() => {
                            onClose();
                            onSelectPermit(s);
                          }}
                          className="p-2.5 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors border border-transparent hover:border-stone-200"
                        >
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <FileCheck className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-stone-900">{s.title}</div>
                            <div className="text-[11px] text-stone-500 line-clamp-1">{s.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {results.gallery.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Galeri Foto ({results.gallery.length})</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {results.gallery.map(g => (
                        <div key={g.id} className="rounded-lg overflow-hidden border border-stone-200 group">
                          <img src={g.imageUrl} alt={g.title} className="w-full h-20 object-cover" />
                          <div className="p-1.5 bg-stone-50 text-[10px] text-stone-700 truncate font-medium">
                            {g.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
