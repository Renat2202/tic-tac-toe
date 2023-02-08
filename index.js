let field = [];
// let cellsNumber = 9;

let gameOptions = {
  cellSize: 60,
  cellNumber: 3
}

let fieldNode = document.querySelector('.field'); // Game Field
let gameInfoField = document.querySelector(".game-info"); // Game Info Span
let winLine = document.querySelector(".field__win-line"); // Win Line 
let newGameButton = document.querySelector(".new-game-button"); // New Game Button
let optionsButton = document.querySelector(".options-button"); // Options Button
let optionsPopup = document.querySelector(".options-popup"); // Options Popup
let optionsPopupCloseButton = document.querySelector(".options-popup__close-button"); // Options Popup Close Button
let optionsPopupForm = document.querySelector(".options-popup__form"); // Popup Form
let optionsInputsList = document.querySelectorAll(".options-popup__input"); // Popup Inputs
let optionsPopupInputCellSize = document.querySelector("#cell-size"); // Input Cell Size
let optionsPopupInputCellNumber = document.querySelector("#cell-number"); // Ipnut Cell Number
let optionsInputValueTextsList = document.querySelectorAll(".options-popup__input-value"); // Input Value Span

let turnTumbler = document.querySelector(".turn-block__tumbler");// Turn Tumbler Arrow

let turnsCount = 0;

let optionsPopupOpenedClass = "options-popup_opened"; // Opened Popup Class

let turn = 'Crosses'; // Current Turn
let winner = null; // Winner

// set Tumbler class
if (turn === "Crosses") {
  turnTumbler.classList.add(".turn-block__tumbler_crosses");
}

// Set Grid Style For Game Field
fieldNode.style.gridTemplateColumns = `repeat(${gameOptions.cellNumber}, 1fr)`;
fieldNode.style.gridTemplateRows = `repeat(${gameOptions.cellNumber}, 1fr)`;


// Set Current Turn Information in info span
// gameInfoField.textContent = `${turn} moves`; // deleted while tumbler added 


// Set input value to text span
for (let inputValueText of optionsInputValueTextsList) {
  inputValueText.textContent = inputValueText.parentNode.querySelector(".options-popup__input").value;
}

// Generate multidimensional array
for (let i = 0; i < gameOptions.cellNumber; i++) {
  let row = [];
  for (let j = 0; j < gameOptions.cellNumber; j++) {
    row.push("");
  }
  field.push(row);
}


// Change Element Size Styles function
function changeElementsSize(nodesClassName, styleValue) {
  let nodesList = document.querySelectorAll(`.${nodesClassName}`);
  // console.log(styleValue)
  for (let element of nodesList) {
    element.style.width = `${styleValue}px`;
    element.style.height = `${styleValue}px`;
  }
}


// Render field function
function render(field, options) {
  field
  .map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      let fieldCell = document.createElement('div');
      fieldCell.className = 'field__cell';
      fieldCell.style.width = `${options.cellSize}px`; 
      fieldCell.style.height = `${options.cellSize}px`;
      fieldNode.style.gridTemplateColumns = `repeat(${options.cellNumber}, 1fr)`;
      fieldNode.style.gridTemplateRows = `repeat(${options.cellNumber}, 1fr)`;
      fieldCell.addEventListener('click', (event) => {
        if (
          !fieldCell.classList.contains("nought") &&
          !fieldCell.classList.contains("cross") &&
          !winner
        ) {
          if (turn === "Crosses") {
            field[rowIndex][cellIndex] = "cross";
            event.target.classList.add("cross");
            turn = "Noughts";
            turnTumbler.classList.remove("turn-block__tumbler_crosses");
            turnTumbler.classList.add("turn-block__tumbler_noughts");
            checkWinner(field, "cross", gameInfoField, winLine);
          } else {
            field[rowIndex][cellIndex] = "nought";
            event.target.classList.add("nought");
            turn = "Crosses";
            turnTumbler.classList.remove("turn-block__tumbler_noughts");
            turnTumbler.classList.add("turn-block__tumbler_crosses");
            checkWinner(field, "nought", gameInfoField, winLine);
          }
        }
        // if (!winner) {
        //     gameInfoField.textContent = `${turn} moves`; // deleted while tumbler added
        // }
      });
      fieldNode.appendChild(fieldCell);
    });
  });
}


// Event Listeners
// New Game Button Event Listener
newGameButton.addEventListener('click', (evt) => {
  newGame(field, winLine, gameInfoField, gameOptions);
});


// Options Popup Close Button Event Listner
optionsPopupCloseButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closePopup(optionsPopup, optionsPopupOpenedClass);
});

// Options Button Open Event Listner
optionsButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPopup(optionsPopup, optionsPopupOpenedClass);
});


// Options Input Change Events Listeners
for (let optionsInput of optionsInputsList) {
  optionsInput.addEventListener("input", (evt) => {
    optionsInput.parentNode.querySelector(".options-popup__input-value").textContent = optionsInput.value;
  });
}

// Options Form Submit Event Listner
optionsPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let options = {
    'cellSize': optionsPopupInputCellSize.value,
    'cellNumber': optionsPopupInputCellNumber.value
  }
  console.log(options)
  submitOptions(options);
  closePopup(optionsPopup, optionsPopupOpenedClass);
})

// Open Popup Function
function openPopup(popup, openedPopupClassName) {
  if (!popup.classList.contains(openedPopupClassName)) {
    popup.classList.add(openedPopupClassName);
  }
}

// Close Popup function
function closePopup(popup, openedPopupClassName) {
  if (popup.classList.contains(openedPopupClassName)) {
    popup.classList.remove(openedPopupClassName);
  }
}

// Submit Options function
function submitOptions(options) {
  gameOptions.cellSize = options.cellSize;
  gameOptions.cellNumber = options.cellNumber;
  newGame(field, winLine, gameInfoField, options);
}

// Check winner function
function checkWinner(array, value, textField, winLine) {
  const cellIsMatch = (cellValue) => cellValue === value;

  // global count increase
  turnsCount++;

  // check rows
  for (let i = 0; i < +gameOptions.cellNumber; i++) {
    if (array[i].every(cellIsMatch)) {
      winner = value;
      textField.textContent = `Winner - ${winner}`;
      // winLine.classList.add(`field__win-line_row-${i + 1}`);
      winLine.classList.add(`field__win-line_row-active`);
      console.log(
        `(${gameOptions.cellSize} * ${i + 1}) - (${gameOptions.cellSize} / 2)`
      );
      winLine.style.marginTop = `${
        +gameOptions.cellSize * (i + 1) - +gameOptions.cellSize / 2
      }px`;
      // console.log(winLine.style.marginTop);
      console.log(`Winner - ${winner}`);
      return;
    }
  }

  // check columns
  for (let i = 0; i < +gameOptions.cellNumber; i++) {
    let count = 0;
    for (let j = 0; j < +gameOptions.cellNumber; j++) {
      if (array[j][i] === value) {
        count++;
      }
      if (count === +gameOptions.cellNumber) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        // winLine.classList.add(`field__win-line_column-${i + 1}`); // old
        winLine.classList.add(`field__win-line_column-active`);
        // margin-left: calc((-60px * 2) + (60px * 2) + 30px); // old
        // winLine.style.marginLeft = `${(+gameOptions.cellSize * -2) + ((+gameOptions.cellSize) * i) + (+gameOptions.cellSize / 2)}px`; // old
        // winLine.style.marginLeft = `${(+gameOptions.cellSize * -2) + ((+gameOptions.cellSize) * i) + (+gameOptions.cellSize / (+gameOptions.cellNumber % 2 === 0 ? 2 : 1))}px`; // old
        winLine.style.marginLeft = `${
          +gameOptions.cellSize / 2 + +gameOptions.cellSize * i
        }px`;
        // console.log(winLine.style.marginLeft);
        console.log(`Winner - ${winner}`);
        return;
      }
    }
  }

  // check diagonal
  // top-left to bottom-right diagonal
  let count = 0;
  for (let i = 0; i < +gameOptions.cellNumber; i++) {
    if (array[i][i] === value) {
      count++;
    }
    if (count === +gameOptions.cellNumber) {
      winner = value;
      textField.textContent = `Winner - ${winner}`;
      winLine.classList.add(`field__win-line_diagonal-1`);
      console.log(`Winner - ${winner}`);
      return;
    }
  }

  // top-right to bottom-left diagonal
  count = 0;
  for (
    let i = 0, j = +gameOptions.cellNumber - 1;
    i < +gameOptions.cellNumber, j >= 0;
    i++, j--
  ) {
    if (array[j][i] === value) {
      count++;
    }
    if (count === +gameOptions.cellNumber) {
      winner = value;
      textField.textContent = `Winner - ${winner}`;
      winLine.classList.add(`field__win-line_diagonal-2`);
      console.log(`Winner - ${winner}`);
      return;
    }
  }

  // check draw
  if (turnsCount === Math.pow(+gameOptions.cellNumber, 2) && !winner) {
    textField.textContent = `Draw!`;
    console.log(`Draw`);
  }
}

// New Game function
function newGame(field, winLine, gameInfo, options) {
  // remove old cells
  let oldCells = document.querySelectorAll(".field__cell");
  for(let oldCell of oldCells) {
    oldCell.remove();
  }

  // genrate new array
  field = [];
  for (let i = 0; i < options.cellNumber; i++) {
    let row = [];
    for (let j = 0; j < options.cellNumber; j++) {
      row.push("");
    }
    field.push(row);
  }

  // render new field
  render(field, options);

  let cells = document.querySelectorAll(".field__cell");
  for (let cell of cells) {
    cell.className = "field__cell";
  }
  winLine.className = `field__win-line`;
  winner = null;
  turn = "Crosses";
  turnsCount = 0;
  turnTumbler.className = `turn-block__tumbler turn-block__tumbler_crosses`;
  gameInfo.textContent = "";
  winLine.style.marginLeft = '';
  winLine.style.marginTop = '';
  // gameInfo.textContent = `${turn} moves`; // deleted while tumbler added 
  // if (options.cellSize !== gameOptions.cellSize) {
    changeElementsSize("field__cell", options.cellSize);
  // }
}


// first render
render(field, gameOptions);