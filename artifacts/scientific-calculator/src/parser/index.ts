import { tokenize } from "./tokenizer";
import { toPostfix } from "./shunting-yard";
import { evaluatePostfix } from "./evaluator";
import { AngleMode } from "../types/calculator";

export function parseAndEvaluate(expression: string, angleMode: AngleMode): number {
  if (!expression.trim()) {
    throw new Error("Empty expression");
  }
  const tokens = tokenize(expression);
  const postfix = toPostfix(tokens);
  return evaluatePostfix(postfix, angleMode);
}

export function formatResult(value: number): string {
  // Deal with floating point precision issues
  const rounded = Number(value.toPrecision(14));
  if (Math.abs(rounded) >= 1e10 || (Math.abs(rounded) < 1e-10 && rounded !== 0)) {
    return rounded.toExponential();
  }
  return rounded.toString();
}
