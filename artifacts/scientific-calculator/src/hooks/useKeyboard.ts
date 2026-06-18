import { useEffect } from "react";

export function useKeyboard(
  insert: (val: string) => void,
  calculate: () => void,
  backspace: () => void,
  clear: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input (though there shouldn't be any here)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key;
      
      if (/[0-9+\-*/.%()]/.test(key)) {
        e.preventDefault();
        insert(key === "*" ? "×" : key === "/" ? "÷" : key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (key === "Escape" || key === "Delete") {
        e.preventDefault();
        clear();
      } else if (key === "e") {
        e.preventDefault();
        insert("e");
      } else if (key === "p") { // naive pi mapping
        e.preventDefault();
        insert("π");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [insert, calculate, backspace, clear]);
}
