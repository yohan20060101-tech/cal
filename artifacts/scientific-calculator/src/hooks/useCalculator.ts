import { useState, useEffect, useCallback } from "react";
import { parseAndEvaluate, formatResult } from "../parser";
import { AngleMode } from "../types/calculator";

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [previewResult, setPreviewResult] = useState("");
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");

  useEffect(() => {
    const savedMode = localStorage.getItem("calc_angleMode");
    if (savedMode === "DEG" || savedMode === "RAD") {
      setAngleMode(savedMode);
    }
  }, []);

  const toggleAngleMode = () => {
    setAngleMode(prev => {
      const newMode = prev === "DEG" ? "RAD" : "DEG";
      localStorage.setItem("calc_angleMode", newMode);
      return newMode;
    });
  };

  // Auto-preview
  useEffect(() => {
    if (!expression) {
      setPreviewResult("");
      setError(null);
      return;
    }
    
    try {
      const res = parseAndEvaluate(expression, angleMode);
      setPreviewResult(formatResult(res));
      setError(null);
    } catch (e: any) {
      setPreviewResult("");
      // Don't show error while typing unless it's a structural error they might want to know about
      // For now, keep it silent during preview
    }
  }, [expression, angleMode]);

  const insert = useCallback((val: string) => {
    if (finalResult !== null) {
      if (/[0-9]/.test(val)) {
        setExpression(val);
      } else {
        setExpression(finalResult + val);
      }
      setFinalResult(null);
      setError(null);
    } else {
      setExpression(prev => prev + val);
    }
  }, [finalResult]);

  const clear = useCallback(() => {
    setExpression("");
    setPreviewResult("");
    setFinalResult(null);
    setError(null);
  }, []);

  const backspace = useCallback(() => {
    if (finalResult !== null) {
      clear();
      return;
    }
    setExpression(prev => prev.slice(0, -1));
  }, [finalResult, clear]);

  const toggleSign = useCallback(() => {
    if (finalResult !== null) {
      const val = finalResult.startsWith("-") ? finalResult.slice(1) : "-" + finalResult;
      setFinalResult(val);
      setExpression(val);
      return;
    }
    
    // Simple naive toggle sign: wrap the expression in -()
    // Better logic would find the last number and negate it, but for a simple calc, this works if expression is empty or a single number.
    setExpression(prev => {
      if (!prev) return "-";
      // Find the last number token
      const match = prev.match(/([-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)$/);
      if (match) {
        const num = match[1];
        if (num.startsWith("-")) {
          return prev.slice(0, prev.length - num.length) + num.slice(1);
        } else if (num.startsWith("+")) {
          return prev.slice(0, prev.length - num.length) + "-" + num.slice(1);
        } else {
          return prev.slice(0, prev.length - num.length) + "-" + num;
        }
      } else {
        if (prev.endsWith("-")) return prev.slice(0, -1);
        return prev + "-";
      }
    });
  }, [finalResult]);

  const calculate = useCallback((): string | null => {
    if (!expression) return null;
    
    try {
      const res = parseAndEvaluate(expression, angleMode);
      const formatted = formatResult(res);
      setFinalResult(formatted);
      setExpression(formatted);
      setError(null);
      return formatted;
    } catch (e: any) {
      setError(e.message || "Error");
      setFinalResult(null);
      return null;
    }
  }, [expression, angleMode]);

  return {
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
  };
}
