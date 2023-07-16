// Variable Declarations

const numBtns = Array.from(document.querySelectorAll('.input__btn[data-type="number"]'));
// Sort Buttons in order of their value
numBtns.sort((a, b) => { return a.dataset.value - b.dataset.value })

const operators = Array.from(document.querySelectorAll('.input__btn[data-type="operator"'));
const clearAll = document.querySelector('.input__btn[data-value="CE"]');
const backspace = document.querySelector('.input__btn[data-value="backspace"]');

const decimal = document.querySelector(".input__btn[data-type='dot']");
const sign = document.querySelector(".input__btn[data-type='sign']");
const equal = document.querySelector('.input__btn[data-type="eval"]');

const [prevScreen, currentScreen] = document.querySelector(".calculator__screen")
    .querySelectorAll("[class$='Calc'");


let operand = ''

// Function Declarations


function isScreenEmpty() {
    return currentScreen.textContent.length === 0;
}
function isPrevScreenEmpty() {
    return prevScreen.textContent.length === 0;
}

function isScreenFull() {
    return currentScreen.textContent.length > 10;
}

function clearCurrentScreen() {
    currentScreen.textContent = '';
}



function getScreenNumber() {
    return parseFloat(currentScreen.textContent === '' ? "0" : currentScreen.textContent)
}

function inputNumber(number) {
    if (isScreenFull()) return;

    if (isScreenEmpty() || currentScreen.textContent === "0") { currentScreen.textContent = number; return }

    currentScreen.textContent += number


}

function addDecimal() {
    if (isScreenEmpty()) {
        currentScreen.textContent = "0" + "."
    }
    else {
        currentScreen.textContent += "."
    }
}

function changeSign() {

    if (isScreenEmpty()) return;


    currentScreen.textContent = -1 * getScreenNumber()

}

function handleOperand(enteredOperand) {

    if (!isPrevScreenEmpty()) {
        prevScreen.textContent = `${evaluate()} ${enteredOperand}`;

    }
    else {
        prevScreen.textContent = `${getScreenNumber()} ${enteredOperand}`
    }

    clearCurrentScreen();
}
function squareNumber() {
    currentScreen.textContent = square(getScreenNumber()).toPrecision(5)
}
function sqrtNumber() {
    currentScreen.textContent = sqrt(getScreenNumber()).toPrecision(5)
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    if (b == 0) { alert("Zero Division Error!"); return NaN }
    return a / b
}
function square(a) {
    return Math.pow(a, 2)
}
function sqrt(a) {
    return Math.sqrt(a)
}

function calculate() {

    if (isPrevScreenEmpty()) return getScreenNumber();


    let [a, operand] = [...prevScreen.textContent.split(' ')]


    let b = getScreenNumber()


    if ((b === 0 && operand !== '/')) {
        return parseFloat(a)
    }

    switch (operand) {
        case "+":
            return add(parseFloat(a), b)
        case '-':
            return subtract(parseFloat(a), b)
        case "*":
            return multiply(parseFloat(a), b)
        case '/':
            return divide(parseFloat(a), b)
    }
}

function evaluate() {
    return calculate().toPrecision(5).toString();
}

function handleEvaluate() {
    const result = evaluate();
    prevScreen.textContent = ''

    currentScreen.textContent = result;
}

// Handler Functions

function handleKeyboard(event) {
    if (event.key >= 0 && event.key <= 9) {
        inputNumber(event.key)

    }
    else if (event.key === '.') {
        addDecimal()
    }

    else if (event.key === 'Enter') {
        handleEvaluate()
    }
    else if (event.key === 'Backspace') {
        handleBackspace()
    }
    else if (event.key==="Delete"){
        handleClearAll()
    }
    else {
        switch (event.key) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperand(event.key);
                break;
            default:
                // alert("Invalid Input")
                break

        }
    }
}

function handleBackspace() {
    if (!isScreenEmpty())
        currentScreen.textContent = currentScreen.textContent.slice(0, -1)
}

function handleClearAll(){
    prevScreen.textContent = ''
    currentScreen.textContent = ''
}


// Event Listeners
window.addEventListener('keydown', handleKeyboard)

numBtns.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        inputNumber(numberButton.dataset.value)
    })
  //  numberButton.addEventListener('touchstart', () => {
//       inputNumber(numberButton.dataset.value)
//    })
})

operators.forEach((operator) => {

    operator.addEventListener('click', () => {
        switch (operator.dataset.value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperand(operator.dataset.value);
                break;

            case "pow2":
                squareNumber()
                break;
            case "sqrt":
                sqrtNumber();
                break;
        }
    }
    )
    //operator.addEventListener('touchstart', () => {
   //     switch (operator.dataset.value) {
   //         case '+':
     //       case '-':
     //       case '*':
     //       case '/':
      //          handleOperand(operator.dataset.value);
       ///         break;
//
      //      case "pow2":
       //         squareNumber()
       //         break;
      //      case "sqrt":
      //          sqrtNumber();
      //          break;
       // }
   // }
   // )
})

clearAll.addEventListener('click', () => { handleClearAll() })
//clearAll.addEventListener('touchstart', () => { handleClearAll() })

backspace.addEventListener("click", () => { handleBackspace() })
//backspace.addEventListener("touchstart", () => { handleBackspace() })

equal.addEventListener("click", () => { handleEvaluate() })
//equal.addEventListener("touchstart", () => { handleEvaluate() })

decimal.addEventListener("click", () => {
    addDecimal()
})
//decimal.addEventListener("touchstart", () => {
 //   addDecimal()
//})

