import { useState } from 'react';
import { Download, Link, RotateCcw, Check } from 'lucide-react';

interface Props {
  onStartOver: () => void;
  roadmapRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportButtons({ onStartOver, roadmapRef }: Props) {
  const [copied, setCopied] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setPdfError(true);
      setTimeout(() => setPdfError(false), 3000);
    }
  };

  const handleSavePDF = async () => {
    if (!roadmapRef.current) return;
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      const element = roadmapRef.current;
      const options = {
        margin: 10,
        filename: 'pathfinder-ai-roadmap.pdf',
        image: { type: 'jpeg' as const, quality: 0.95 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      };
      await html2pdf().set(options).from(element).save();
    } catch {
      setPdfError(true);
      setTimeout(() => setPdfError(false), 3000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleSavePDF}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium text-primary hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Save as PDF
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium text-primary hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" />
            Copied!
          </>
        ) : (
          <>
            <Link className="w-4 h-4" />
            Copy Link
          </>
        )}
      </button>

      <button
        onClick={onStartOver}
        className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Start Over
      </button>

      {pdfError && (
        <p className="text-xs text-amber-600 mt-1 w-full">
          📄 Hmm, that didn't quite work. Try again, or just bookmark this page — your roadmap link will always work.
        </p>
      )}
    </div>
  );
}
