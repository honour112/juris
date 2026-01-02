import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, FileWarning, Eye } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PreviewProps {
  url: string;
  onClick: () => void;
}

const Preview = ({ url, onClick }: PreviewProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="relative w-full h-full bg-white flex justify-center overflow-hidden cursor-pointer group"
    >
      <Document
        file={url}
        onLoadSuccess={() => setIsLoaded(true)}
        loading={
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="animate-spin text-emerald-800" size={24} />
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-full text-slate-300 p-4 text-center">
            <FileWarning size={32} />
            <span className="text-[10px] uppercase font-bold mt-2">Preview Unavailable</span>
          </div>
        }
      >
        {/* Changing 'width' to a value that fits the card (approx 350-400px).
          'renderMode="canvas"' ensures the best quality for cover pages.
        */}
        <Page 
          pageNumber={1} 
          width={350} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className={`transition-all duration-700 shadow-sm ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        />
      </Document>

      {/* READ ICON OVERLAY - Perfectly centered */}
      <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/30 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-2">
          <div className="bg-white p-4 rounded-full text-emerald-900 shadow-xl">
            <Eye size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;