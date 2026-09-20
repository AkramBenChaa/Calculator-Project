// Get Element:
const calculatorContainer = document.getElementById("calculator_container");
const displayArea = document.getElementById("display_area");
let canAddNumber = true;

// Adjust the font size as needed:
function adjustFontSize() {
    const display = document.querySelector("#display_area");
    let fontSize = 40;
    display.style.fontSize = `${fontSize}px`;
    while (display.scrollWidth > display.clientWidth && fontSize > 15) {
        // Decrease font size
        fontSize--;
        display.style.fontSize = `${fontSize}px`;
        if (fontSize === 15) {
            canAddNumber = false;
        }
    }
    while (display.scrollWidth < display.clientWidth && fontSize < 40) {
        // Increase font size
        fontSize++;
        display.style.fontSize = `${fontSize}px`;
    }
}

// Sound Click:
function audio() {
    const soundClick = new Audio("./click sound effect.mp3");
    soundClick.volume = 0.1;
    soundClick.play();
}

// Add Event Listener:
calculatorContainer.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return; // If "target.nodeName" is not 'BUTTON' , return nothing.
    audio();
    switch (e.target.textContent) {
        case "C":
            clear(); // Clear All From Display
            break;
        case "DEL":
            deleteOneValue(); // Delate Only One Value
            adjustFontSize();
            break;
        case "=":
            evaluate(); // Evaluate Number
            break;
        default:
            addToDisplayArea(e.target.textContent);
            adjustFontSize();
            break;
    }
});

// Clear All:
function clear() {
    displayArea.textContent = "";
}

// Add Value In Display Area:
function addToDisplayArea(value) {
    if (
        displayArea.textContent === "Invalaid Opration" ||
        displayArea.textContent === "Limit Reached" ||
        displayArea.textContent === "Infinity"
    ) {
        clear();
    }
    if (canAddNumber === false) {
        clear();
        canAddNumber = true;
        displayArea.textContent = "Limit";
        changeStyle();
    } else {
        displayArea.style.color = " rgb(251, 248, 248)";
        displayArea.textContent += value;
    }
}

// Delate One Value:
function deleteOneValue() {
    let currentContent = displayArea.textContent;
    if (currentContent === "Limit Reached" || currentContent === "Invalaid Opration" || currentContent === "Infinity") {
        clear();
    } else {
        displayArea.textContent = currentContent.substring(0, currentContent.length - 1);
    }
}

// Evaluate Number:
function evaluate() {
    try {
        let calculation = math.evaluate(displayArea.textContent.replaceAll("×", "*").replaceAll("÷", "/"));
        displayArea.textContent = calculation;
        if (calculation == "Infinity") {
            changeStyle();
        }
    } catch (error) {
        displayArea.textContent = "Invalaid Opration";
        changeStyle();
        console.error(error);
    }
}

function changeStyle() {
    displayArea.style.cssText = `
            font-size: 10px;
            color: rgba(139, 4, 4, 0.97);
            justify-content: center;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        `;
}
