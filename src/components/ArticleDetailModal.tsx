import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string; // Keep excerpt for consistency, though not used in modal
  fullContent: string; // This will hold the full article text
  icon: React.ReactNode;
  category: string;
}

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
}

const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';

    // Handle Escape key to close modal
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Focus the modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = ''; // Restore scrolling
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!article) return null; // Should not happen if used correctly, but for safety

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={(e) => {
        // Close modal if clicking outside the content area
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      tabIndex={-1} // Make the div focusable
      ref={modalRef}
    >
      <div
        className="relative w-full max-w-3xl p-8 rounded-2xl shadow-2xl border-4 overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-opacity-10 hover:bg-white"
          style={{ color: '#F5F5F5' }}
          aria-label="Zamknij artykuł"
        >
          <X size={24} />
        </button>

        <h2 id="article-modal-title" className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
          {article.title}
        </h2>

        <div className="text-lg leading-relaxed space-y-4" style={{ color: '#F5F5F5' }}>
          {/* Using dangerouslySetInnerHTML for content that might contain HTML tags */}
          <div className="knowledge-base-article-content" dangerouslySetInnerHTML={{ __html: article.fullContent }} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailModal;

