export type AngleMode = "DEG" | "RAD";

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface MemoryState {
  value: number;
  hasValue: boolean;
}

export interface CalculatorState {
  expression: string;
  previewResult: string;
  finalResult: string | null;
  angleMode: AngleMode;
  error: string | null;
}

export type Operator = "+" | "-" | "×" | "÷" | "%" | "^" | "mod" | "!" | "neg";
export type Func = 
  | "sin" | "cos" | "tan" 
  | "asin" | "acos" | "atan" 
  | "sinh" | "cosh" | "tanh"
  | "log" | "ln" 
  | "sqrt" | "cbrt" 
  | "abs" 
  | "floor" | "ceil" | "round" 
  | "exp";

export type TokenType = "NUMBER" | "OPERATOR" | "FUNCTION" | "CONSTANT" | "LPAREN" | "RPAREN" | "COMMA";

export interface Token {
  type: TokenType;
  value: string;
}
