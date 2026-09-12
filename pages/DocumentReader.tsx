import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Lock } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLanguage } from '../context/LanguageContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentReaderProps {
  url: string;
  pageCount: number;
  currentPage: number;
  paid: boolean;
  articleId: string;
  title: string;
  path: string;
  onPageCount: (count: number) => void;
  onPageChange: (page: number) => void;
  onUnlock: (articleId: string, title: string, path: string) => void;
}

const DocumentReader = ({
  url,
  pageCount,
  currentPage,
  paid,
  articleId,
  title,
  path,
  onPageCount,
  onPageChange,
  onUnlock
}: DocumentReaderProps) => {
  const { t } = useLanguage();
  const [width, setWidth] = useState(Math.min(window.innerWidth - 48, 850));

  useEffect(() => {
    const updateWidth = () => setWidth(Math.min(window.innerWidth - 48, 850));
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const nextPage = () => {
    if (currentPage >= 20 && !paid) {
      onUnlock(articleId, title, path);
      return;
    }
    onPageChange(Math.min(pageCount, currentPage + 1));
  };

  return (
    <>
      <div className="flex-1 min-h-0 overflow-auto bg-slate-100 rounded-xl shadow-2xl flex justify-center p-4">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => onPageCount(numPages)}
          loading={<Loader2 className="animate-spin text-emerald-900 m-8" />}
        >
          <div className="relative">
            <Page pageNumber={currentPage} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
            {currentPage < pageCount && (
              <Page
                pageNumber={currentPage + 1}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={null}
                className="absolute left-0 top-0 opacity-0 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>
        </Document>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-white">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 disabled:opacity-40" aria-label={t('previousPage')}>
          <ChevronLeft />
        </button>
        <span>{t('pageLabel')} {currentPage} of {pageCount || '...'}</span>
        <button onClick={nextPage} disabled={currentPage >= pageCount && paid} className="p-2 disabled:opacity-40" aria-label={t('nextPage')}>
          <ChevronRight />
        </button>
        {!paid && pageCount > 20 && (
          <button onClick={() => onUnlock(articleId, title, path)} className="flex items-center gap-2 bg-yellow-500 text-emerald-950 px-4 py-2 rounded-lg font-bold text-sm">
            <Lock size={15} /> {t('unlockDocument')}
          </button>
        )}
      </div>
    </>
  );
};

export default DocumentReader;
