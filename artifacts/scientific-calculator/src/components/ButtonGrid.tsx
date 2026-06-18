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
    <>
      {/* Mobile Grid — 4 columns, all buttons visible, thumb-friendly */}
      <div className="grid grid-cols-4 gap-1.5 sm:hidden">
        {/* Row 1 */}
        <CalcButton variant="secondary" onClick={insert("sin")}>sin</CalcButton>
        <CalcButton variant="secondary" onClick={insert("cos")}>cos</CalcButton>
        <CalcButton variant="secondary" onClick={insert("tan")}>tan</CalcButton>
        <CalcButton variant="secondary" onClick={insert("sinh")}>sinh</CalcButton>
        {/* Row 2 */}
        <CalcButton variant="secondary" onClick={insert("cosh")}>cosh</CalcButton>
        <CalcButton variant="secondary" onClick={insert("tanh")}>tanh</CalcButton>
        <CalcButton variant="destructive" onClick={handle(onClear)}>AC</CalcButton>
        <CalcButton variant="secondary" onClick={handle(onBackspace)}>⌫</CalcButton>
        {/* Row 3 */}
        <CalcButton variant="secondary" onClick={insert("asin")}>sin⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("acos")}>cos⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("atan")}>tan⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("π")}>π</CalcButton>
        {/* Row 4 */}
        <CalcButton variant="secondary" onClick={insert("e")}>e</CalcButton>
        <CalcButton variant="secondary" onClick={insert("^")}>xʸ</CalcButton>
        <CalcButton variant="secondary" onClick={insert("ln")}>ln</CalcButton>
        <CalcButton variant="secondary" onClick={insert("log")}>log</CalcButton>
        {/* Row 5 */}
        <CalcButton variant="secondary" onClick={insert("sqrt")}>√x</CalcButton>
        <CalcButton variant="secondary" onClick={insert("cbrt")}>∛x</CalcButton>
        <CalcButton variant="secondary" onClick={insert("exp")}>eˣ</CalcButton>
        <CalcButton variant="secondary" onClick={insert("10^")}>10ˣ</CalcButton>
        {/* Row 6 */}
        <CalcButton variant="secondary" onClick={insert("!")}>n!</CalcButton>
        <CalcButton variant="secondary" onClick={insert("floor")}>floor</CalcButton>
        <CalcButton variant="secondary" onClick={insert("ceil")}>ceil</CalcButton>
        <CalcButton variant="secondary" onClick={insert("1/")}>1/x</CalcButton>
        {/* Row 7 */}
        <CalcButton variant="secondary" onClick={insert("mod")}>mod</CalcButton>
        <CalcButton variant="secondary" onClick={insert("(")}>(</CalcButton>
        <CalcButton variant="secondary" onClick={insert(")")}>)</CalcButton>
        <CalcButton variant="secondary" onClick={insert("abs")}>|x|</CalcButton>
        {/* Row 8 */}
        <CalcButton variant="secondary" onClick={insert("%")}>%</CalcButton>
        <CalcButton onClick={insert("7")}>7</CalcButton>
        <CalcButton onClick={insert("8")}>8</CalcButton>
        <CalcButton onClick={insert("9")}>9</CalcButton>
        {/* Row 9 */}
        <CalcButton variant="secondary" onClick={insert("/")}>÷</CalcButton>
        <CalcButton onClick={insert("4")}>4</CalcButton>
        <CalcButton onClick={insert("5")}>5</CalcButton>
        <CalcButton onClick={insert("6")}>6</CalcButton>
        {/* Row 10 */}
        <CalcButton variant="secondary" onClick={insert("*")}>×</CalcButton>
        <CalcButton onClick={insert("1")}>1</CalcButton>
        <CalcButton onClick={insert("2")}>2</CalcButton>
        <CalcButton onClick={insert("3")}>3</CalcButton>
        {/* Row 11 */}
        <CalcButton variant="secondary" onClick={insert("-")}>-</CalcButton>
        <CalcButton onClick={insert("0")}>0</CalcButton>
        <CalcButton onClick={insert(".")}>.</CalcButton>
        <CalcButton variant="primary" onClick={handle(onCalculate)}>=</CalcButton>
        {/* Row 12 */}
        <CalcButton variant="secondary" onClick={insert("round")}>round</CalcButton>
        <CalcButton variant="secondary" onClick={handle(onToggleSign)}>+/-</CalcButton>
        <CalcButton variant="secondary" onClick={insert("E")}>EE</CalcButton>
        <CalcButton variant="secondary" onClick={insert("+")}>+</CalcButton>
      </div>

      {/* Desktop Grid — 7 columns */}
      <div className="hidden sm:grid sm:grid-cols-7 sm:gap-3">
        {/* Row 1 - Scientific */}
        <CalcButton variant="secondary" onClick={insert("sin")}>sin</CalcButton>
        <CalcButton variant="secondary" onClick={insert("cos")}>cos</CalcButton>
        <CalcButton variant="secondary" onClick={insert("tan")}>tan</CalcButton>
        <CalcButton variant="secondary" onClick={insert("sinh")}>sinh</CalcButton>
        <CalcButton variant="secondary" onClick={insert("cosh")}>cosh</CalcButton>
        <CalcButton variant="secondary" onClick={insert("tanh")}>tanh</CalcButton>
        <CalcButton variant="destructive" onClick={handle(onClear)}>AC</CalcButton>
        {/* Row 2 - Scientific */}
        <CalcButton variant="secondary" onClick={insert("asin")}>sin⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("acos")}>cos⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("atan")}>tan⁻¹</CalcButton>
        <CalcButton variant="secondary" onClick={insert("e")}>e</CalcButton>
        <CalcButton variant="secondary" onClick={insert("π")}>π</CalcButton>
        <CalcButton variant="secondary" onClick={insert("^")}>xʸ</CalcButton>
        <CalcButton variant="secondary" onClick={handle(onBackspace)}>⌫</CalcButton>
        {/* Row 3 - Scientific */}
        <CalcButton variant="secondary" onClick={insert("ln")}>ln</CalcButton>
        <CalcButton variant="secondary" onClick={insert("log")}>log</CalcButton>
        <CalcButton variant="secondary" onClick={insert("sqrt")}>√x</CalcButton>
        <CalcButton variant="secondary" onClick={insert("cbrt")}>∛x</CalcButton>
        <CalcButton variant="secondary" onClick={insert("exp")}>eˣ</CalcButton>
        <CalcButton variant="secondary" onClick={insert("10^")}>10ˣ</CalcButton>
        <CalcButton variant="secondary" onClick={insert("!")}>n!</CalcButton>
        {/* Row 4 */}
        <CalcButton variant="secondary" onClick={insert("(")}>(</CalcButton>
        <CalcButton variant="secondary" onClick={insert(")")}>)</CalcButton>
        <CalcButton variant="secondary" onClick={insert("1/")}>1/x</CalcButton>
        <CalcButton variant="secondary" onClick={insert("mod")}>mod</CalcButton>
        <CalcButton onClick={insert("7")}>7</CalcButton>
        <CalcButton onClick={insert("8")}>8</CalcButton>
        <CalcButton onClick={insert("9")}>9</CalcButton>
        {/* Row 5 */}
        <CalcButton variant="secondary" onClick={insert("%")}>%</CalcButton>
        <CalcButton variant="secondary" onClick={insert("abs")}>|x|</CalcButton>
        <CalcButton variant="secondary" onClick={insert("floor")}>floor</CalcButton>
        <CalcButton variant="secondary" onClick={insert("ceil")}>ceil</CalcButton>
        <CalcButton onClick={insert("4")}>4</CalcButton>
        <CalcButton onClick={insert("5")}>5</CalcButton>
        <CalcButton onClick={insert("6")}>6</CalcButton>
        {/* Row 6 */}
        <CalcButton variant="secondary" onClick={insert("/")}>÷</CalcButton>
        <CalcButton variant="secondary" onClick={insert("*")}>×</CalcButton>
        <CalcButton variant="secondary" onClick={insert("-")}>-</CalcButton>
        <CalcButton variant="secondary" onClick={insert("+")}>+</CalcButton>
        <CalcButton onClick={insert("1")}>1</CalcButton>
        <CalcButton onClick={insert("2")}>2</CalcButton>
        <CalcButton onClick={insert("3")}>3</CalcButton>
        {/* Row 7 */}
        <CalcButton variant="secondary" onClick={insert("round")}>round</CalcButton>
        <CalcButton variant="secondary" onClick={handle(onToggleSign)}>+/-</CalcButton>
        <CalcButton variant="secondary" onClick={insert("E")}>EE</CalcButton>
        <CalcButton variant="secondary" onClick={insert("+")}>+</CalcButton>
        <CalcButton onClick={insert("0")}>0</CalcButton>
        <CalcButton onClick={insert(".")}>.</CalcButton>
        <CalcButton variant="primary" onClick={handle(onCalculate)}>=</CalcButton>
      </div>
    </>
  );
}
