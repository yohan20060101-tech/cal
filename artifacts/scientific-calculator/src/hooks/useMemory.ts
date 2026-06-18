import { useState, useEffect } from "react";
import { MemoryState } from "../types/calculator";

export function useMemory() {
  const [memory, setMemory] = useState<MemoryState>({ value: 0, hasValue: false });

  useEffect(() => {
    const saved = localStorage.getItem("calc_memory");
    if (saved) {
      try {
        setMemory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse memory", e);
      }
    }
  }, []);

  const saveMemory = (newState: MemoryState) => {
    setMemory(newState);
    localStorage.setItem("calc_memory", JSON.stringify(newState));
  };

  const memoryClear = () => {
    saveMemory({ value: 0, hasValue: false });
  };

  const memoryRecall = () => {
    return memory.hasValue ? memory.value.toString() : null;
  };

  const memoryAdd = (val: number) => {
    saveMemory({ value: memory.value + val, hasValue: true });
  };

  const memorySubtract = (val: number) => {
    saveMemory({ value: memory.value - val, hasValue: true });
  };

  return { memory, memoryClear, memoryRecall, memoryAdd, memorySubtract };
}
