const keys = document.querySelectorAll(".key");
const screen = document.querySelector(".screen");

let v1 = 0;
let v2 = 0;
let operator = "";
let power = true;
let wasOperator = false;

keys.forEach(k => {
    k.addEventListener("click", keyPress)
});

function keyPress(ev) {
    const key = ev.target.textContent;

    if (key === "ON/OFF") {

        if (power) {
            power = false;
            setScreenValue("GOOD BYE");
            setTimeout(() => {
                setScreenValue("");
            }, 1000);
        } else {
            power = true;
            setScreenValue("HELLO");
            setTimeout(() => {
                setScreenValue();
            }, 1000);
        }

        wasOperator = false;

    } else if (!power || key === "") {

        return;

    } else if (key === "AC") {

        reset();

    } else if (key === "%") {

        v1 = v1 / 100;
        setScreenValue(v1);

    } else if (["=","+", "-", "/", "x"].includes(key)) {

        if (wasOperator || v1 === 0) {
            return;
        }

        if (v2 !== 0) {
            v1 = calculateByOperator(operator, v1, v2);
            v2 = 0;
        } else {
            v1 = getScreenValue();
            updateDataScreen(v1+" "+key);
        }

        if (key === "=") {
            setScreenValue(v1);
            updateDataScreen("");
            wasOperator = false;
        } else {
            setScreenValue(0);
            wasOperator = true;
        }
        operator = key;

    } else if(!isNaN(key) || key === ".") {

        addValue(key);
        if (operator === "") {
            v1 = getScreenValue();
        } else {
            v2 = getScreenValue();
        }
        wasOperator = false;
    }
}

function reset() {
    screen.textContent = "0";
    v1 = 0;
    v2 = 0;
    operator = "";
    wasOperator = false;
}

function calculateByOperator(operator, v1, v2) {
    let calculationResult = 0;
    v1 = parseFloat(v1);
    v2 = parseFloat(v2);

    switch (operator) {
        case "+":
            calculationResult = v1 + v2;
            break;
        case "-":
            calculationResult = v1 - v2;
            break;
        case "x":
            calculationResult = v1 * v2;
            break;
        case "/":
            calculationResult = v1 / v2;
            break;    
        default:
            break;
    }
    return calculationResult;
}

function addValue(value) {
    const screenValue = getScreenValue();
    if (screenValue === "0") {
        setScreenValue(value);
    } else {
        setScreenValue(screenValue + value);
    }
}

function getScreenValue() {
    return screen.textContent;
}

function setScreenValue(value) {
    screen.textContent = value;
}

function updateDataScreen(value) {
    screen.dataset.history = value;
}