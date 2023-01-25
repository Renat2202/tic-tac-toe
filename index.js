let field = [];
// let cellsNumber = 9;

let gameOptions = {
  cellWidth: 60,
  cellNumber: 9
}

let fieldNode = document.querySelector('.field');
let gameInfoField = document.querySelector(".game-info");
let winLine = document.querySelector(".field__win-line");
let newGameButton = document.querySelector(".new-game-button");

let turn = 'Crosses';
let winner = null;

gameInfoField.textContent = `${turn} moves`;

for (let i = 0; i < Math.sqrt(gameOptions.cellNumber); i++) {
  let row = [];
  for (let j = 0; j < Math.sqrt(gameOptions.cellNumber); j++) {
    row.push("");
  }
  field.push(row);
}

function changeElementsSize(nodesClassName, styleValue) {
  let nodesList = document.querySelectorAll(`.${nodesClassName}`);
  console.log(nodesList)
  for (let element of nodesList) {
    element.style.width = styleValue;
    element.style.height = styleValue;
  }
}

function render(field, options) {
  field
  .map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      let fieldCell = document.createElement('div');
      fieldCell.className = 'field__cell';
      fieldCell.style.width = `${options.cellWidth || 40}px`; 
      fieldCell.style.height = `${options.cellWidth || 40}px`;
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
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (array[j][i] === value) {
        count++;
      }
      if (count === 3) {
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
  for (let i = 0; i < 3; i++) {
    if (array[i][i] === value) {
        count++;
    }
    if (count === 3) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        winLine.classList.add(`field__win-line_diagonal-1`);
        console.log(`Winner - ${winner}`);
        return;
    }
  }

  count = 0;
  for (let i = 0, j = 2; i < 3, j >= 0; i++, j--) {
    if (array[j][i] === value) {
        count++
    }
    if (count === 3) {
        winner = value;
        textField.textContent = `Winner - ${winner}`;
        winLine.classList.add(`field__win-line_diagonal-2`);
        console.log(`Winner - ${winner}`);
        return;        
    }
  }
}

function newGame(field, winLine, gameInfo) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      field[i][j] = '';
    }
  }
  let cells = document.querySelectorAll(".field__cell");
  console
  for (let cell of cells) {
    cell.className = "field__cell";
  }
  winLine.className = `field__win-line`;
  winner = null;
  turn = "Crosses";
  gameInfo.textContent = `${turn} moves`;
  console.log(gameInfo)
}

render(field, gameOptions);