import { Token, TokenType } from "../types/calculator";

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  // Replace common display symbols with standard ones before tokenizing
  const expr = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  while (i < expr.length) {
    const char = expr[i];

    if (/[0-9.]/.test(char)) {
      let numStr = "";
      while (i < expr.length && /[0-9.eE+-]/.test(expr[i])) {
        // Handle scientific notation e.g., 1e-5
        if (/[eE]/.test(expr[i])) {
          numStr += expr[i];
          i++;
          if (i < expr.length && /[+-]/.test(expr[i])) {
            numStr += expr[i];
            i++;
          }
        } else if (/[+-]/.test(expr[i])) {
          break; // Stop if it's just a regular + or -
        } else {
          numStr += expr[i];
          i++;
        }
      }
      tokens.push({ type: "NUMBER", value: numStr });
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let alphaStr = "";
      while (i < expr.length && /[a-zA-Z0-9]/.test(expr[i])) {
        alphaStr += expr[i];
        i++;
      }
      if (alphaStr === "mod") {
        tokens.push({ type: "OPERATOR", value: "mod" });
      } else if (alphaStr === "pi" || alphaStr === "e" || alphaStr === "π") {
        tokens.push({ type: "CONSTANT", value: alphaStr });
      } else {
        tokens.push({ type: "FUNCTION", value: alphaStr });
      }
      continue;
    }

    if (char === "π") {
      tokens.push({ type: "CONSTANT", value: "π" });
      i++;
      continue;
    }

    if (/[+\-*/%^!]/.test(char)) {
      tokens.push({ type: "OPERATOR", value: char });
      i++;
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "LPAREN", value: "(" });
      i++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "RPAREN", value: ")" });
      i++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "COMMA", value: "," });
      i++;
      continue;
    }

    // Ignore unknown characters
    i++;
  }

  // Handle unary minus
  const processedTokens: Token[] = [];
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j];
    if (token.type === "OPERATOR" && token.value === "-") {
      if (j === 0 || tokens[j - 1].type === "LPAREN" || tokens[j - 1].type === "COMMA") {
        processedTokens.push({ type: "OPERATOR", value: "neg" });
        continue;
      }
    }
    processedTokens.push(token);
  }

  return processedTokens;
}
