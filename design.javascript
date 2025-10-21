// Calculator state
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Update the on-screen display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    if (display) display.value = calculator.displayValue;
}

// Handle digit input
function handleDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    updateDisplay();
}

// Calculator operations with division-by-zero guard
const performCalculation = {
    '/': (firstOperand, secondOperand) => {
        if (secondOperand === 0) return 'Error';
        return firstOperand / secondOperand;
    },
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
};

// Handle operator input
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator, waitingForSecondOperand } = calculator;
    const inputValue = parseFloat(displayValue);

    // if operator already set and waiting for second operand, allow changing operator
    if (operator && waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !Number.isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        if (result === 'Error' || result === Infinity || Number.isNaN(result)) {
            calculator.displayValue = 'Error';
            // reset calculator state so user can start fresh
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            updateDisplay();
            return;
        }

        // Round result to avoid long floating-point tails (optional)
        const roundedResult = Math.round((result + Number.EPSILON) * 1e12) / 1e12;

        calculator.displayValue = String(roundedResult);
        calculator.firstOperand = roundedResult;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    updateDisplay();
}

// Reset calculator to initial state
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay();
}

// Handle decimal point input
function handleDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
        updateDisplay();
    }
}

// Event delegation for calculator keys
const keys = document.querySelector('.calculator-keys');
if (keys) {
    keys.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;
        const value = (button.value || '').trim();

        // Operators and special cases
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value);
                break;
            case '.':
                handleDecimal(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                // Digit detection: only single digit 0-9
                if (/^\d$/.test(value)) {
                    handleDigit(value);
                }
                break;
        }
    });
}

// Initialize display on load
updateDisplay();
