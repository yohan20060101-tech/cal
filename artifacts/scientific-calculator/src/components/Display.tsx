import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface DisplayProps {
  expression: string;
  previewResult: string;
  finalResult: string | null;
  error: string | null;
}

export function Display({ expression, previewResult, finalResult, error }: DisplayProps) {
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression]);

  const handleCopy = () => {
    const textToCopy = finalResult || previewResult || expression;
    if (!textToCopy) return;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayText = error ? error : (finalResult !== null ? finalResult : expression || "0");
  
  // Calculate a rough font size based on length
  const getFontSize = () => {
    const len = displayText.length;
    if (len < 12) return "text-5xl sm:text-6xl";
    if (len < 18) return "text-4xl sm:text-5xl";
    if (len < 24) return "text-3xl sm:text-4xl";
    return "text-2xl sm:text-3xl";
  };

  return (
    <div className="w-full bg-background border border-border/50 rounded-2xl p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 shadow-inner relative flex flex-col justify-end min-h-[100px] sm:min-h-[140px] lg:min-h-[160px] overflow-hidden">

      {/* Small floating copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
        aria-label="Copy result"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>

      {/* Expression / Previous steps */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto whitespace-nowrap text-right text-muted-foreground mb-1 sm:mb-2 font-mono text-xs sm:text-sm lg:text-base hide-scrollbar scroll-smooth"
      >
        {finalResult !== null ? expression + " =" : (previewResult && expression !== previewResult ? previewResult : "\u00A0")}
      </div>

      {/* Main Display Area */}
      <motion.div
        key={displayText}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className={`w-full text-right font-mono font-medium tracking-tight text-foreground truncate ${getFontSize()}`}
        role="math"
        aria-live="polite"
      >
        {displayText}
      </motion.div>
    </div>
  );
}
