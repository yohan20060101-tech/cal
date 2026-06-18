import { AngleMode, Token } from "../types/calculator";

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error("Invalid: n! domain");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function evaluatePostfix(postfix: Token[], angleMode: AngleMode): number {
  const stack: number[] = [];

  const toRad = (val: number) => angleMode === "DEG" ? val * (Math.PI / 180) : val;
  const fromRad = (val: number) => angleMode === "DEG" ? val * (180 / Math.PI) : val;

  for (const token of postfix) {
    if (token.type === "NUMBER") {
      stack.push(parseFloat(token.value));
    } else if (token.type === "CONSTANT") {
      if (token.value === "π" || token.value === "pi") stack.push(Math.PI);
      else if (token.value === "e") stack.push(Math.E);
    } else if (token.type === "OPERATOR") {
      if (token.value === "neg") {
        if (stack.length < 1) throw new Error("Invalid expression");
        stack.push(-stack.pop()!);
      } else if (token.value === "!") {
        if (stack.length < 1) throw new Error("Invalid expression");
        stack.push(factorial(stack.pop()!));
      } else {
        if (stack.length < 2) throw new Error("Invalid expression");
        const b = stack.pop()!;
        const a = stack.pop()!;
        switch (token.value) {
          case "+": stack.push(a + b); break;
          case "-": stack.push(a - b); break;
          case "*": stack.push(a * b); break;
          case "/":
            if (b === 0) throw new Error("Cannot divide by zero");
            stack.push(a / b);
            break;
          case "%":
            if (b === 0) throw new Error("Cannot divide by zero");
            stack.push(a % b);
            break;
          case "mod":
            if (b === 0) throw new Error("Cannot divide by zero");
            stack.push(((a % b) + b) % b);
            break;
          case "^": stack.push(Math.pow(a, b)); break;
          default: throw new Error(`Unknown operator ${token.value}`);
        }
      }
    } else if (token.type === "FUNCTION") {
      if (stack.length < 1) throw new Error("Invalid expression");
      const a = stack.pop()!;
      switch (token.value) {
        case "sin": stack.push(Math.sin(toRad(a))); break;
        case "cos": stack.push(Math.cos(toRad(a))); break;
        case "tan": stack.push(Math.tan(toRad(a))); break;
        case "asin": stack.push(fromRad(Math.asin(a))); break;
        case "acos": stack.push(fromRad(Math.acos(a))); break;
        case "atan": stack.push(fromRad(Math.atan(a))); break;
        case "sinh": stack.push(Math.sinh(a)); break;
        case "cosh": stack.push(Math.cosh(a)); break;
        case "tanh": stack.push(Math.tanh(a)); break;
        case "log":
          if (a <= 0) throw new Error("Invalid: log domain");
          stack.push(Math.log10(a));
          break;
        case "ln":
          if (a <= 0) throw new Error("Invalid: log domain");
          stack.push(Math.log(a));
          break;
        case "sqrt":
          if (a < 0) throw new Error("Invalid: √ of negative");
          stack.push(Math.sqrt(a));
          break;
        case "cbrt": stack.push(Math.cbrt(a)); break;
        case "abs": stack.push(Math.abs(a)); break;
        case "floor": stack.push(Math.floor(a)); break;
        case "ceil": stack.push(Math.ceil(a)); break;
        case "round": stack.push(Math.round(a)); break;
        case "exp": stack.push(Math.exp(a)); break;
        default: throw new Error(`Unknown function ${token.value}`);
      }
    }
  }

  if (stack.length !== 1) throw new Error("Invalid expression");
  
  const result = stack[0];
  if (!isFinite(result)) {
      if (isNaN(result)) throw new Error("Not a number");
      throw new Error("Result too large");
  }
  return result;
}
