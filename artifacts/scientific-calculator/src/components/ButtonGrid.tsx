import { CalcButton } from "./CalcButton";

interface ButtonGridProps {
  onInsert: (val: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onCalculate: () => void;
  onPlayClick: () => void;
}

export function ButtonGrid({ onInsert, onClear, onBackspace, onToggleSign, onCalculate, onPlayClick }: ButtonGridProps) {
  
  const handle = (action: () => void) => {
    return () => {
      onPlayClick();
      action();
    };
  };

  const insert = (val: string) => handle(() => onInsert(val));

  return (
    <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 sm:gap-3">
      {/* Row 1 - Scientific */}
      <CalcButton variant="secondary" onClick={insert("sin")}>sin</CalcButton>
      <CalcButton variant="secondary" onClick={insert("cos")}>cos</CalcButton>
      <CalcButton variant="secondary" onClick={insert("tan")}>tan</CalcButton>
      <CalcButton variant="secondary" onClick={insert("sinh")} className="hidden sm:flex">sinh</CalcButton>
      <CalcButton variant="secondary" onClick={insert("cosh")} className="hidden sm:flex">cosh</CalcButton>
      <CalcButton variant="secondary" onClick={insert("tanh")} className="hidden sm:flex">tanh</CalcButton>
      <CalcButton variant="destructive" onClick={handle(onClear)}>AC</CalcButton>

      {/* Row 2 - Scientific */}
      <CalcButton variant="secondary" onClick={insert("asin")}>sin⁻¹</CalcButton>
      <CalcButton variant="secondary" onClick={insert("acos")}>cos⁻¹</CalcButton>
      <CalcButton variant="secondary" onClick={insert("atan")}>tan⁻¹</CalcButton>
      <CalcButton variant="secondary" onClick={insert("e")} className="hidden sm:flex">e</CalcButton>
      <CalcButton variant="secondary" onClick={insert("π")} className="hidden sm:flex">π</CalcButton>
      <CalcButton variant="secondary" onClick={insert("^")} className="hidden sm:flex">xʸ</CalcButton>
      <CalcButton variant="secondary" onClick={handle(onBackspace)}>⌫</CalcButton>

      {/* Row 3 - Scientific */}
      <CalcButton variant="secondary" onClick={insert("ln")}>ln</CalcButton>
      <CalcButton variant="secondary" onClick={insert("log")}>log</CalcButton>
      <CalcButton variant="secondary" onClick={insert("sqrt")}>√x</CalcButton>
      <CalcButton variant="secondary" onClick={insert("cbrt")} className="hidden sm:flex">∛x</CalcButton>
      <CalcButton variant="secondary" onClick={insert("exp")} className="hidden sm:flex">eˣ</CalcButton>
      <CalcButton variant="secondary" onClick={insert("10^")} className="hidden sm:flex">10ˣ</CalcButton>
      <CalcButton variant="secondary" onClick={insert("!")}>n!</CalcButton>

      {/* Row 4 */}
      <CalcButton variant="secondary" onClick={insert("(")}>(</CalcButton>
      <CalcButton variant="secondary" onClick={insert(")")}>)</CalcButton>
      <CalcButton variant="secondary" onClick={insert("1/")} className="hidden sm:flex">1/x</CalcButton>
      <CalcButton variant="secondary" onClick={insert("mod")} className="hidden sm:flex">mod</CalcButton>
      <CalcButton onClick={insert("7")}>7</CalcButton>
      <CalcButton onClick={insert("8")}>8</CalcButton>
      <CalcButton onClick={insert("9")}>9</CalcButton>

      {/* Row 5 */}
      <CalcButton variant="secondary" onClick={insert("%")}>%</CalcButton>
      <CalcButton variant="secondary" onClick={insert("abs")}>|x|</CalcButton>
      <CalcButton variant="secondary" onClick={insert("floor")} className="hidden sm:flex">floor</CalcButton>
      <CalcButton variant="secondary" onClick={insert("ceil")} className="hidden sm:flex">ceil</CalcButton>
      <CalcButton onClick={insert("4")}>4</CalcButton>
      <CalcButton onClick={insert("5")}>5</CalcButton>
      <CalcButton onClick={insert("6")}>6</CalcButton>

      {/* Row 6 */}
      <CalcButton variant="secondary" onClick={insert("/")}>÷</CalcButton>
      <CalcButton variant="secondary" onClick={insert("*")}>×</CalcButton>
      <CalcButton variant="secondary" onClick={insert("-")}>-</CalcButton>
      <CalcButton variant="secondary" onClick={insert("+")} className="hidden sm:flex">+</CalcButton>
      <CalcButton onClick={insert("1")}>1</CalcButton>
      <CalcButton onClick={insert("2")}>2</CalcButton>
      <CalcButton onClick={insert("3")}>3</CalcButton>

      {/* Row 7 */}
      <CalcButton variant="secondary" onClick={insert("round")}>round</CalcButton>
      <CalcButton variant="secondary" onClick={handle(onToggleSign)}>+/-</CalcButton>
      <CalcButton variant="secondary" onClick={insert("E")}>EE</CalcButton>
      <CalcButton variant="secondary" onClick={insert("+")} className="sm:hidden">+</CalcButton>
      <CalcButton onClick={insert("0")}>0</CalcButton>
      <CalcButton onClick={insert(".")}>.</CalcButton>
      <CalcButton variant="primary" onClick={handle(onCalculate)} className="col-span-2 sm:col-span-1">=</CalcButton>

    </div>
  );
}
