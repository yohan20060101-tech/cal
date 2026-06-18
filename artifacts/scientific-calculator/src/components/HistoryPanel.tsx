import { ScrollArea } from "@/components/ui/scroll-area";
import { CalculationHistory } from "../types/calculator";
import { X, Trash2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HistoryPanelProps {
  history: CalculationHistory[];
  onSelect: (item: CalculationHistory) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onDelete, onClear }: HistoryPanelProps) {
  
  const handleExport = () => {
    const text = history.map(h => `${h.expression} = ${h.result}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calculator_history_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col bg-card border-l border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">History</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <>
              <Button variant="ghost" size="icon" onClick={handleExport} title="Export">
                <Download size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClear} title="Clear All">
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {history.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10 text-sm">
            No history yet
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="group relative flex flex-col p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onSelect(item)}
                >
                  <button 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                  >
                    <X size={14} />
                  </button>
                  <span className="text-sm text-muted-foreground font-mono truncate mb-1 pr-6">{item.expression} =</span>
                  <span className="text-lg text-foreground font-mono font-medium truncate">{item.result}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
