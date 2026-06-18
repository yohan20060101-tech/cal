import { Token } from "../types/calculator";

const PRECEDENCE: Record<string, number> = {
  "neg": 4,
  "!": 4,
  "^": 3,
  "*": 2,
  "/": 2,
  "%": 2,
  "mod": 2,
  "+": 1,
  "-": 1
};

const RIGHT_ASSOCIATIVE = ["^", "neg"];

export function toPostfix(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const operators: Token[] = [];

  for (const token of tokens) {
    if (token.type === "NUMBER" || token.type === "CONSTANT") {
      output.push(token);
    } else if (token.type === "FUNCTION") {
      operators.push(token);
    } else if (token.type === "OPERATOR") {
      while (
        operators.length > 0 &&
        operators[operators.length - 1].type !== "LPAREN" &&
        (operators[operators.length - 1].type === "FUNCTION" ||
          PRECEDENCE[operators[operators.length - 1].value] > PRECEDENCE[token.value] ||
          (PRECEDENCE[operators[operators.length - 1].value] === PRECEDENCE[token.value] &&
            !RIGHT_ASSOCIATIVE.includes(token.value)))
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (token.type === "LPAREN") {
      operators.push(token);
    } else if (token.type === "RPAREN") {
      while (operators.length > 0 && operators[operators.length - 1].type !== "LPAREN") {
        output.push(operators.pop()!);
      }
      if (operators.length > 0 && operators[operators.length - 1].type === "LPAREN") {
        operators.pop(); // discard LPAREN
      }
      if (operators.length > 0 && operators[operators.length - 1].type === "FUNCTION") {
        output.push(operators.pop()!);
      }
    } else if (token.type === "COMMA") {
      while (operators.length > 0 && operators[operators.length - 1].type !== "LPAREN") {
        output.push(operators.pop()!);
      }
    }
  }

  while (operators.length > 0) {
    output.push(operators.pop()!);
  }

  return output;
}
