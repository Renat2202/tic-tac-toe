let field = [];
// let cellsNumber = 9;

let gameOptions = {
  cellSize: 60,
  cellNumber: 3
}

let fieldNode = document.querySelector('.field');
let gameInfoField = document.querySelector(".game-info");
let winLine = document.querySelector(".field__win-line");
let newGameButton = document.querySelector(".new-game-button");
let optionsButton = document.querySelector(".options-button");
let optionsPopup = document.querySelector(".options-popup");
let optionsPopupCloseButton = document.querySelector(".options-popup__close-button");
let optionsPopupForm = document.querySelector(".options-popup__form");
let optionsPopupInputCellSize = document.querySelector("#cell-size");
let optionsPopupInputCellNumber = document.querySelector("#cell-number");


let optionsPopupOpenedClass = "options-popup_opened";

let turn = 'Crosses';
let winner = null;

fieldNode.style.gridTemplateColumns = `repeat(${gameOptions.cellNumber}, 1fr)`;
fieldNode.style.gridTemplateRows = `repeat(${gameOptions.cellNumber}, 1fr)`;

gameInfoField.textContent = `${turn} moves`;

for (let i = 0; i < gameOptions.cellNumber; i++) {
  let row = [];
  for (let j = 0; j < gameOptions.cellNumber; j++) {
    row.push("");
  }
  field.push(row);
}



function changeElementsSize(nodesClassName, styleValue) {
  let nodesList = document.querySelectorAll(`.${nodesClassName}`);
  console.log(styleValue)
  for (let element of nodesList) {
    element.style.width = `${styleValue}px`;
    element.style.height = `${styleValue}px`;
  }
}

function render(field, options) {
  field
  .map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      let fieldCell = document.createElement('div');
      fieldCell.className = 'field__cell';
      fieldCell.style.width = `${options.cellSize}px`; 
      fieldCell.style.height = `${options.cellSize}px`;
      fieldCell.addEventListener('click', (event) => {
          if (!fieldCell.classList.contains('nought') && !fieldCell.classList.contains('cross') && !winner) {
              if (turn === 'Crosses') {
                  field[rowIndex][cellIndex] = 'cross';
                  event.target.classList.add("cross");
                  turn = 'Noughts';
                  checkWinner(field, "cross", gameInfoField, winLine);
              } else {
                  field[rowIndex][cellIndex] = "nought";
                  event.target.classList.add("nought");
                  turn = "Crosses";
                  checkWinner(field, "nought", gameInfoField, winLine);
              }
          }
          if (!winner) {
              gameInfoField.textContent = `${turn} moves`;
          }
      });
      fieldNode.appendChild(fieldCell);
    });
  });
}


newGameButton.addEventListener('click', (evt) => {
  newGame(field, winLine, gameInfoField);
});

optionsPopupCloseButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closePopup(optionsPopup, optionsPopupOpenedClass);
});

optionsButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPopup(optionsPopup, optionsPopupOpenedClass);
});

// optionsPopupInputCellSize.addEventListener('change', (evt) => {
//   evt.preventDefault();

// })

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


function openPopup(popup, openedPopupClassName) {
  if (!popup.classList.contains(openedPopupClassName)) {
    popup.classList.add(openedPopupClassName);
  }
}

function closePopup(popup, openedPopupClassName) {
  if (popup.classList.contains(openedPopupClassName)) {
    popup.classList.remove(openedPopupClassName);
  }
}

function submitOptions(options) {
  gameOptions.cellSize = options.cellSize;
  gameOptions.cellNumber = options.cellNumber;
  newGame(field, winLine, gameInfoField, options);
}


function checkWinner(array, value, textField, winLine) {
  const cellIsMatch = (cellValue) => cellValue === value;

  // check rows
  for (let i = 0; i < 3; i++) {
    if (array[i].every(cellIsMatch)) {
      winner = value;
      textField.textContent = `Winner - ${winner}`;
      winLine.classList.add(`field__win-line_row-${i + 1}`);
      console.log(`Winner - ${winner}`);
      return;
    }
  }

  // check columns
  for (let i = 0; i < gameOptions.cellNumber; i++) {
    let count = 0;
    for (let j = 0; j < gameOptions.cellNumber; j++) {
      if (array[j][i] === value) {
        count++;
      }
      if (count === gameOptions.cellNumber) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        winLine.classList.add(`field__win-line_column-${i + 1}`);
        console.log(`Winner - ${winner}`);
        return;
      }
    }
  }

  // check diagonal
  let count = 0;
  for (let i = 0; i < gameOptions.cellNumber; i++) {
    if (array[i][i] === value) {
        count++;
    }
    if (count === gameOptions.cellNumber) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        winLine.classList.add(`field__win-line_diagonal-1`);
        console.log(`Winner - ${winner}`);
        return;
    }
  }

  count = 0;
  for (let i = 0, j = gameOptions.cellNumber - 1; i < gameOptions.cellNumber, j >= 0; i++, j--) {
    if (array[j][i] === value) {
        count++
    }
    if (count === gameOptions.cellNumber) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        winLine.classList.add(`field__win-line_diagonal-2`);
        console.log(`Winner - ${winner}`);
        return;        
    }
  }
}

function newGame(field, winLine, gameInfo, options) {
  for (let i = 0; i < gameOptions.cellNumber; i++) {
    for (let j = 0; j < gameOptions.cellNumber; j++) {
      field[i][j] = "";
    }
  }
  // let newField = [];




  let cells = document.querySelectorAll(".field__cell");
  for (let cell of cells) {
    cell.className = "field__cell";
  }
  winLine.className = `field__win-line`;
  winner = null;
  turn = "Crosses";
  gameInfo.textContent = `${turn} moves`;
  console.log(options.cellSize, gameOptions.cellSize)
  // if (options.cellSize !== gameOptions.cellSize) {
    changeElementsSize("field__cell", options.cellSize);
  // }
}

render(field, gameOptions);