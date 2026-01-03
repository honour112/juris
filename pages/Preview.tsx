import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, FileWarning, Eye, Download } from 'lucide-react';
import { supabase } from '../src/supabaseClient'; // Ensure this path matches your project structure

// Set up the worker for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PreviewProps {
  path: string; // The storage path from your Supabase 'articles' table
  onClick: () => void;
}

const Preview: React.FC<PreviewProps> = ({ path, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  // Effect to convert Supabase storage path into a public URL
  useEffect(() => {
    if (path) {
      const { data } = supabase.storage
        .from('article-pdfs')
        .getPublicUrl(path);
      
      setPublicUrl(data.publicUrl);
    }
  }, [path]);

  // Function to handle direct downloading from the card
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the parent onClick (opening the modal)
    if (publicUrl) {
      window.open(publicUrl, '_blank');
    }
  };

  if (!publicUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50">
        <Loader2 className="animate-spin text-emerald-800" size={24} />
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="relative w-full h-full bg-white flex justify-center overflow-hidden cursor-pointer group"
    >
      <Document
        file={publicUrl}
        onLoadSuccess={() => setIsLoaded(true)}
        loading={
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="animate-spin text-emerald-800" size={24} />
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-full text-slate-300 p-4 text-center">
            <FileWarning size={32} />
            <span className="text-[10px] uppercase font-black mt-2">Preview Unavailable</span>
          </div>
        }
      >
        <Page 
          pageNumber={1} 
          width={350} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className={`transition-all duration-700 shadow-sm ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      </Document>

      {/* INTERACTIVE OVERLAY */}
      <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/40 transition-all duration-300 flex items-center justify-center">
        
        {/* DOWNLOAD BUTTON (TOP RIGHT) */}
        <button 
          onClick={handleDownload}
          className="absolute top-4 right-4 bg-white p-3 rounded-xl text-emerald-900 shadow-xl opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-500 hover:text-emerald-950 hover:scale-110 active:scale-95 z-20"
          title="Download PDF"
        >
          <Download size={20} strokeWidth={2.5} />
        </button>

        {/* VIEW ICON (CENTER) */}
        <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-2">
          <div className="bg-white p-5 rounded-full text-emerald-900 shadow-2xl">
            <Eye size={28} strokeWidth={2.5} />
          </div>
          <span className="text-white text-[10px] font-black uppercase tracking-widest bg-emerald-950/50 px-3 py-1 rounded-full backdrop-blur-md">
            View Document
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preview;