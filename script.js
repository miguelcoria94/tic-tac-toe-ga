let board;
let turn;
let winner;

const currentPlayerMessage = document.querySelector("#current-player");
const winningMessage = document.querySelector("#winning-message");
const squares = [...document.querySelectorAll("#board > div")];
const resetButton = document.querySelector("#reset-game");
init();

function init() {
  console.log("The game has started");
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  turn = 1;
  winner = null;

  winningMessage.innerHTML = "";
  currentPlayerMessage.innerHTML = `Player O's turn`;

  render();
}

function render() {
  renderBoard();

  renderCurrentPlayerMessage();

  renderWinner();
  renderControls();
}

function renderControls() {
  if (winner !== null || checkForEmptyCells() === false) {
    resetButton.style.visibility = "visible";
  } else {
    resetButton.style.visibility = "hidden";
  }
}

function renderWinner() {
  if (winner == -1) {
    winningMessage.innerHTML = `Player O wins 🏆`;
    return;
  }
  if (winner == 1) {
    winningMessage.innerHTML = `Player X wins 🏆`;
    return;
  }
  if (winner === null && checkForEmptyCells() == false) {
    winningMessage.innerHTML = `Game ends in a tie!!`;
    return;
  }
}

function renderCurrentPlayerMessage() {
  if (checkForEmptyCells() === false) {
    currentPlayerMessage.innerHTML = ``;
  }
  if (!winner) {
    currentPlayerMessage.innerHTML = `Player ${turn === 1 ? "O" : "X"}'s turn`;
    return;
  }
}

function renderBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const squareIndex = i * 3 + j;
      squares[squareIndex].innerHTML = board[i][j];
    }
  }
}

resetButton.addEventListener("click", resetGame);

squares.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    if (winner) {
      return;
    }
    playTurn(e.target);
  });
});

function checkForWinner() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      let letter = board[i][j];
      if (letter != null && checkNeighbors(i, j, letter) >= 2) {
        winner = turn;
        return winner;
      }
    }
  }
}

function checkNeighbors(
  row,
  col,
  letter,
  count = 0,
  neighborDirs = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ]
) {
  if (count >= 2) {
    return count;
  }
  for (let i = 0; i < neighborDirs.length; i++) {
    let dir = [neighborDirs[i]];
    let nextRow = row + dir[0][0];
    let nextCol = col + dir[0][1];
    if (
      nextRow >= 0 &&
      nextRow < board.length &&
      nextCol >= 0 &&
      nextCol < board[0].length &&
      board[nextRow][nextCol] === letter
    ) {
      return checkNeighbors(nextRow, nextCol, letter, count + 1, dir);
    }
  }

  return 0;
}

function resetGame() {
  init();
}

function playTurn(clickedSquare) {
  let col = clickedSquare.classList[0][1];
  let row = clickedSquare.classList[0][3];
  if (board[row][col]) {
    return;
  }
  if (turn === 1) {
    board[row][col] = "O";
  } else {
    board[row][col] = "X";
  }

  if (winner !== "tie") {
    turn *= -1;
  }

  checkForWinner();

  render();
}
function checkForEmptyCells() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] == null) {
        return true;
      }
    }
  }

  return false;
}
