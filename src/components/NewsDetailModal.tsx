import React from 'react';
import { NewsArticle } from '../types';
import { X, Calendar, User, Clock, Share2, Copy } from 'lucide-react';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  const handleShareWA = () => {
    const text = encodeURIComponent(`*${article.title}*\n\nBaca selengkapnya di Portal Disporapar HSU:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan berita disalin ke clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Kategori: {article.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Article Header */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900 leading-tight">
              {article.title}
            </h1>

            {/* Metadata line with typographic separators */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1 border-b border-stone-100 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{article.publishedAt}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>{article.author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{article.readTimeMinutes} menit baca</span>
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden border border-stone-200">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-2.5 bg-stone-50 text-[11px] text-stone-500 italic text-center border-t border-stone-100">
              Dokumentasi Resmi Disporapar Kabupaten Hulu Sungai Utara
            </div>
          </div>

          {/* Article Body */}
          <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 max-w-prose">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Social Share Ribbon */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-stone-500 font-medium">
              Bagikan informasi ini ke publik:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWA}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Tautan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
