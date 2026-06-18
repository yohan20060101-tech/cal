import { AngleMode, CalculationHistory } from "../types/calculator";
import { Display } from "./Display";
import { ButtonGrid } from "./ButtonGrid";
import { useCalculator } from "../hooks/useCalculator";
import { useHistory } from "../hooks/useHistory";
import { useMemory } from "../hooks/useMemory";
import { useKeyboard } from "../hooks/useKeyboard";
import { useSound } from "../hooks/useSound";
import { useState } from "react";
import { HistoryPanel } from "./HistoryPanel";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { History, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function Calculator() {
  const { theme, setTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick } = useSound();
  
  const {
    expression,
    setExpression,
    previewResult,
    finalResult,
    error,
    angleMode,
    toggleAngleMode,
    insert,
    clear,
    backspace,
    toggleSign,
    calculate
  } = useCalculator();

  const { history, addToHistory, deleteFromHistory, clearHistory } = useHistory();
  const { memory, memoryAdd, memoryClear, memoryRecall, memorySubtract } = useMemory();

  useKeyboard(insert, () => {
    const res = calculate();
    if (res) addToHistory(expression, res);
  }, backspace, clear);

  const handleCalculate = () => {
    const currentExpr = expression;
    const res = calculate();
    if (res && res !== currentExpr) {
      addToHistory(currentExpr, res);
    }
  };

  const handleHistorySelect = (item: CalculationHistory) => {
    setExpression(item.expression);
  };

  const TopBar = () => (
    <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar min-w-0">
        <button
          onClick={() => { playClick(); toggleAngleMode(); }}
          className="text-xs font-bold px-2 py-1 sm:px-3 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex-shrink-0"
        >
          {angleMode}
        </button>
        <div className="flex gap-1 bg-secondary rounded p-1 flex-shrink-0">
          <button onClick={() => { playClick(); memoryClear(); }} className="text-xs px-1.5 py-0.5 sm:px-2 rounded hover:bg-background transition-colors text-muted-foreground">MC</button>
          <button onClick={() => {
            playClick();
            const val = memoryRecall();
            if (val) insert(val);
          }} className="text-xs px-1.5 py-0.5 sm:px-2 rounded hover:bg-background transition-colors text-muted-foreground">MR</button>
          <button onClick={() => {
            playClick();
            const res = finalResult ? parseFloat(finalResult) : (previewResult ? parseFloat(previewResult) : 0);
            if (!isNaN(res)) memoryAdd(res);
          }} className="text-xs px-1.5 py-0.5 sm:px-2 rounded hover:bg-background transition-colors text-muted-foreground">M+</button>
          <button onClick={() => {
            playClick();
            const res = finalResult ? parseFloat(finalResult) : (previewResult ? parseFloat(previewResult) : 0);
            if (!isNaN(res)) memorySubtract(res);
          }} className="text-xs px-1.5 py-0.5 sm:px-2 rounded hover:bg-background transition-colors text-muted-foreground">M-</button>
        </div>
        {memory.hasValue && (
          <span className="text-xs font-mono text-primary font-bold ml-1 sm:ml-2 tracking-tighter whitespace-nowrap flex-shrink-0">M= {memory.value}</span>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => { playClick(); toggleSound(); }}>
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-muted-foreground" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => { playClick(); setTheme(theme === "dark" ? "light" : "dark"); }}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto h-[100dvh] sm:h-auto sm:min-h-[800px] flex flex-col lg:flex-row lg:p-4 xl:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col bg-card sm:rounded-3xl sm:border border-border shadow-2xl overflow-hidden"
      >
        <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 xl:p-8">
          <TopBar />

          <Display
            expression={expression}
            previewResult={previewResult}
            finalResult={finalResult}
            error={error}
          />

          <div className="flex-1 flex flex-col justify-end">
             <ButtonGrid
                onInsert={insert}
                onClear={clear}
                onBackspace={backspace}
                onToggleSign={toggleSign}
                onCalculate={handleCalculate}
                onPlayClick={playClick}
             />
          </div>
        </div>
      </motion.div>

      {/* Desktop History Panel */}
      <div className="hidden lg:block w-80 lg:ml-4 xl:ml-8 bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex-shrink-0">
        <HistoryPanel
          history={history}
          onSelect={handleHistorySelect}
          onDelete={deleteFromHistory}
          onClear={clearHistory}
        />
      </div>

      {/* Mobile History Drawer */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90">
              <History size={22} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80dvh] bg-card border-t border-border">
            <HistoryPanel
              history={history}
              onSelect={(item) => {
                handleHistorySelect(item);
              }}
              onDelete={deleteFromHistory}
              onClear={clearHistory}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
