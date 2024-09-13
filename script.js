
const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (button.classList.contains('number')) {
            if (currentInput.length < 12) {
                currentInput += value;
                display.textContent = currentInput;
            }
        } else if (button.classList.contains('operator')) {
            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    try {
                        currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
                        display.textContent = currentInput;
                        previousInput = '';
                        operator = '';
                    } catch (e) {
                        display.textContent = 'Error';
                    }
                }
            } else {
                if (currentInput) {
                    if (previousInput && operator) {
                        try {
                            previousInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
                        } catch (e) {
                            previousInput = 'Error';
                        }
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                }
                operator = value;
                display.textContent = operator;
            }
        }
    });
});