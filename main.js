const numberButtons = document.querySelectorAll('.btn-num');
const operateButtons = document.querySelectorAll('.btn-op');
const clearButton = document.querySelector('#btn-clear');
const deleteButton = document.querySelector('#btn-delete');
const equalButton = document.querySelector('#btn-equal');
const screen = document.querySelector('#screen');



let overwrite = true;
let operand1 = "";
let operand2 = "";
let operation = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                alert("Error: dividing with zero");
                clear();
                return;
            }
            return divide(a, b);
    }
}

function enterValue(e) {
    var value;
    if (typeof e.target === 'undefined') {
        value = e.textContent;
    } else {
        value = e.target.textContent;
    }

    if (overwrite) {
        screen.textContent = value;
        overwrite = false;
    } else {
        screen.innerHTML += value;
    }

}

function callOperation(e) {

    overwrite = true;

    let value;
    if (typeof e.target === 'undefined') {
        value = e.textContent;
    } else {
        value = e.target.textContent;
    }


    if (operand1.length === 0) {
        operation = value;
        operand1 = screen.textContent;
        screen.textContent = operand1 + " " + operation;
    } else if (operand2.length != 0) {
        operation = value;
        screen.textContent = screen.textContent + " " + operation;
        operand1 = screen.textContent;
        operand2 = "";
    } else {
        let result = operate(operation, Number(operand1), Number(screen.textContent));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        operand1 = result;
        operation = value;
        screen.textContent = operand1 + " " + operation;
        screen.textContent = operand1;

    }
}

function clear(e) {
    overwrite = true;
    
    screen.textContent = '';
    operand1 = "";
    operand2 = "";
    operation = "";
}

function deleteValue() {
    if (screen.textContent.length > 0) {
        screen.textContent = screen.textContent.slice(0, -1);
    }
}

function evaluateExpression() {
    if(screen.textContent.indexOf('=') != -1){
        return;
    }

    operand2 = screen.textContent;

    if (operand1.length != 0 && operand2.length != 0 && operation.length != 0) {
        let result = operate(operation, Number(operand1), Number(operand2));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        screen.textContent += (" " + operand2 + " =");
        screen.textContent = result;
    }

}

/* Event listeners */
numberButtons.forEach(button => {
    button.addEventListener('click', enterValue);
});

operateButtons.forEach(button => {
    button.addEventListener('click', callOperation);
});

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', deleteValue);

equalButton.addEventListener('click', evaluateExpression);




