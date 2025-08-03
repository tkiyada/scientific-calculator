import React, { useState, useEffect, useCallback } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isScientific, setIsScientific] = useState(false);
  const [angleMode, setAngleMode] = useState('deg'); // 'deg' or 'rad'

  const inputNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
  }, []);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  // Scientific functions
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const scientificOperation = useCallback((func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = angleMode === 'deg' ? Math.sin(toRadians(value)) : Math.sin(value);
        break;
      case 'cos':
        result = angleMode === 'deg' ? Math.cos(toRadians(value)) : Math.cos(value);
        break;
      case 'tan':
        result = angleMode === 'deg' ? Math.tan(toRadians(value)) : Math.tan(value);
        break;
      case 'asin':
        result = angleMode === 'deg' ? toDegrees(Math.asin(value)) : Math.asin(value);
        break;
      case 'acos':
        result = angleMode === 'deg' ? toDegrees(Math.acos(value)) : Math.acos(value);
        break;
      case 'atan':
        result = angleMode === 'deg' ? toDegrees(Math.atan(value)) : Math.atan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'cbrt':
        result = Math.cbrt(value);
        break;
      case 'x2':
        result = Math.pow(value, 2);
        break;
      case 'x3':
        result = Math.pow(value, 3);
        break;
      case '1/x':
        result = value !== 0 ? 1 / value : 0;
        break;
      case 'factorial':
        result = factorial(Math.floor(Math.abs(value)));
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  }, [display, angleMode]);

  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const percentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const toggleSign = useCallback(() => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  }, [display]);

  // Memory functions
  const memoryClear = useCallback(() => setMemory(0), []);
  const memoryRecall = useCallback(() => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  }, [memory]);
  const memoryAdd = useCallback(() => {
    setMemory(memory + parseFloat(display));
    setWaitingForOperand(true);
  }, [memory, display]);
  const memorySubtract = useCallback(() => {
    setMemory(memory - parseFloat(display));
    setWaitingForOperand(true);
  }, [memory, display]);
  const memoryStore = useCallback(() => {
    setMemory(parseFloat(display));
    setWaitingForOperand(true);
  }, [display]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performOperation('=');
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [inputNumber, inputDecimal, performOperation, clear, display]);

  const formatDisplay = (value) => {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
      }
      return num.toPrecision(12).replace(/\.?0+$/, '');
    }
    return value;
  };

  const Button = ({ onClick, className = '', children, span = 1, ...props }) => (
    <button
      className={`h-12 md:h-14 rounded-lg font-semibold text-sm md:text-lg transition-all duration-150 active:scale-95 ${
        span > 1 ? `col-span-${span}` : ''
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Scientific Calculator</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500"
            >
              {angleMode.toUpperCase()}
            </button>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-500 md:hidden"
            >
              {isScientific ? 'Basic' : 'Scientific'}
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="p-4 bg-black">
          <div className="text-white text-2xl md:text-3xl font-light min-h-[2.5rem] flex items-center justify-end overflow-hidden">
            {formatDisplay(display)}
          </div>
          <div className="text-gray-400 text-sm mt-1 flex justify-between">
            <span>{operation ? `${previousValue} ${operation}` : ''}</span>
            <span className="flex gap-2">
              <span>{memory !== 0 ? 'M' : ''}</span>
              <span>{angleMode}</span>
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Scientific Panel - Always visible on desktop, toggleable on mobile */}
            <div className={`${isScientific || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block md:col-span-5`}>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <Button onClick={() => scientificOperation('sin')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  sin
                </Button>
                <Button onClick={() => scientificOperation('cos')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  cos
                </Button>
                <Button onClick={() => scientificOperation('tan')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  tan
                </Button>
                <Button onClick={() => scientificOperation('log')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  log
                </Button>

                <Button onClick={() => scientificOperation('asin')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  sin⁻¹
                </Button>
                <Button onClick={() => scientificOperation('acos')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  cos⁻¹
                </Button>
                <Button onClick={() => scientificOperation('atan')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  tan⁻¹
                </Button>
                <Button onClick={() => scientificOperation('ln')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  ln
                </Button>

                <Button onClick={() => scientificOperation('pi')} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                  π
                </Button>
                <Button onClick={() => scientificOperation('e')} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                  e
                </Button>
                <Button onClick={() => scientificOperation('exp')} className="bg-purple-600 hover:bg-purple-500 text-white">
                  eˣ
                </Button>
                <Button onClick={() => performOperation('^')} className="bg-orange-600 hover:bg-orange-500 text-white">
                  xʸ
                </Button>

                <Button onClick={() => scientificOperation('sqrt')} className="bg-green-600 hover:bg-green-500 text-white">
                  √x
                </Button>
                <Button onClick={() => scientificOperation('cbrt')} className="bg-green-600 hover:bg-green-500 text-white">
                  ∛x
                </Button>
                <Button onClick={() => scientificOperation('x2')} className="bg-green-600 hover:bg-green-500 text-white">
                  x²
                </Button>
                <Button onClick={() => scientificOperation('x3')} className="bg-green-600 hover:bg-green-500 text-white">
                  x³
                </Button>

                <Button onClick={() => scientificOperation('1/x')} className="bg-teal-600 hover:bg-teal-500 text-white">
                  1/x
                </Button>
                <Button onClick={() => scientificOperation('factorial')} className="bg-teal-600 hover:bg-teal-500 text-white">
                  x!
                </Button>
                <Button onClick={percentage} className="bg-teal-600 hover:bg-teal-500 text-white">
                  %
                </Button>
                <Button onClick={toggleSign} className="bg-gray-600 hover:bg-gray-500 text-white">
                  ±
                </Button>
              </div>
            </div>

            {/* Basic Calculator Panel */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-4 gap-2">
                {/* Memory Functions */}
                <Button onClick={memoryClear} className="bg-gray-600 hover:bg-gray-500 text-white">
                  MC
                </Button>
                <Button onClick={memoryRecall} className="bg-gray-600 hover:bg-gray-500 text-white">
                  MR
                </Button>
                <Button onClick={memoryAdd} className="bg-gray-600 hover:bg-gray-500 text-white">
                  M+
                </Button>
                <Button onClick={memorySubtract} className="bg-gray-600 hover:bg-gray-500 text-white">
                  M-
                </Button>

                {/* Function Row */}
                <Button onClick={clear} className="bg-red-600 hover:bg-red-500 text-white">
                  C
                </Button>
                <Button onClick={clearEntry} className="bg-red-500 hover:bg-red-400 text-white">
                  CE
                </Button>
                <Button onClick={memoryStore} className="bg-gray-600 hover:bg-gray-500 text-white">
                  MS
                </Button>
                <Button onClick={() => performOperation('÷')} className="bg-orange-600 hover:bg-orange-500 text-white">
                  ÷
                </Button>

                {/* Numbers Row 1 */}
                <Button onClick={() => inputNumber(7)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  7
                </Button>
                <Button onClick={() => inputNumber(8)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  8
                </Button>
                <Button onClick={() => inputNumber(9)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  9
                </Button>
                <Button onClick={() => performOperation('×')} className="bg-orange-600 hover:bg-orange-500 text-white">
                  ×
                </Button>

                {/* Numbers Row 2 */}
                <Button onClick={() => inputNumber(4)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  4
                </Button>
                <Button onClick={() => inputNumber(5)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  5
                </Button>
                <Button onClick={() => inputNumber(6)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  6
                </Button>
                <Button onClick={() => performOperation('-')} className="bg-orange-600 hover:bg-orange-500 text-white">
                  -
                </Button>

                {/* Numbers Row 3 */}
                <Button onClick={() => inputNumber(1)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  1
                </Button>
                <Button onClick={() => inputNumber(2)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  2
                </Button>
                <Button onClick={() => inputNumber(3)} className="bg-gray-700 hover:bg-gray-600 text-white">
                  3
                </Button>
                <Button onClick={() => performOperation('+')} className="bg-orange-600 hover:bg-orange-500 text-white row-span-2">
                  +
                </Button>

                {/* Bottom Row */}
                <Button onClick={() => inputNumber(0)} className="bg-gray-700 hover:bg-gray-600 text-white col-span-2">
                  0
                </Button>
                <Button onClick={inputDecimal} className="bg-gray-700 hover:bg-gray-600 text-white">
                  .
                </Button>

                {/* Equals button */}
                <Button onClick={() => performOperation('=')} className="bg-blue-600 hover:bg-blue-500 text-white col-span-4 mt-2">
                  =
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-3 text-xs text-gray-400 text-center">
          Use keyboard for input • ESC to clear • Backspace to delete • Toggle {angleMode} mode for trigonometric functions
        </div>
      </div>
    </div>
  );
};

export default Calculator;