import { useState, useEffect } from "react";
import { CalculationHistory } from "../types/calculator";

export function useHistory() {
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("calc_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const addToHistory = (expression: string, result: string) => {
    const newItem: CalculationHistory = {
      id: crypto.randomUUID(),
      expression,
      result,
      timestamp: Date.now(),
    };
    
    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, 50);
      localStorage.setItem("calc_history", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("calc_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calc_history");
  };

  return { history, addToHistory, deleteFromHistory, clearHistory };
}
