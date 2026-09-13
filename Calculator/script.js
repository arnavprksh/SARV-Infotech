const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resultDisplayed = false;


buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const value = button.dataset.value;

        if (value === "clear") {
            currentInput = "";
            display.value = "0";
            resultDisplayed = false;
        }

        else if (value === "delete") {
            if (resultDisplayed) {
                currentInput = "";
                display.value = "0";
                resultDisplayed = false;

            } else {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || "0";
            }
        }

        else if (value === "equals") {
            calculate();
        }

        else {
            addValue(value);
        }
    });
});


function addValue(value) {

    if (resultDisplayed) {

        if (isOperator(value)) {
            currentInput += value;
        } else {
            currentInput = value;
        }

        resultDisplayed = false;

        display.value = currentInput;

        return;
    }

    if (isOperator(value)) {

        if (currentInput === "") return;

        const lastCharacter = currentInput[currentInput.length - 1];

        if (isOperator(lastCharacter)) {
            currentInput = currentInput.slice(0, -1) + value;

        } else {
            currentInput += value;
        }
    }

    else if (value === ".") {

        const parts = currentInput.split(/[+\-*/]/);

        const currentNumber = parts[parts.length - 1];

        if (!currentNumber.includes(".")) {

            if ( currentNumber === "" || isOperator(currentInput[currentInput.length - 1]) ) {
                currentInput += "0.";
            } else {
                currentInput += ".";
            }
        }
    }

    else {
        currentInput += value;
    }

    display.value = currentInput || "0";
}


function isOperator(value) {

    return (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/"
    );
}


function calculate() {

    if (currentInput === "") return;

    try {

        let expression = currentInput;

        if (isOperator( expression[expression.length - 1])) {
            expression = expression.slice(0, -1);
        }

        if (expression === "") return;

        const result = Function("return " + expression)();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            currentInput = "";
            resultDisplayed = true;
            return;
        }

        display.value = result;
        currentInput = String(result);
        resultDisplayed = true;

    } catch (error) {
        display.value = "Error";
        currentInput = "";
        resultDisplayed = true;
    }
}
