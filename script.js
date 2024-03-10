let board;
let turn;
let winner;
const boardPairing = [];

const currentPlayerMessage = document.querySelector("#current-player");
const winningMessage = document.querySelector("#winning-message");
const squares = [...document.querySelectorAll("#board > div")];
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
  render();
}

function render() {
  renderBoard();
  renderCurrentPlayerMessage();
  renderWinner();
}

function renderWinner() {
  if (winner) {
    winningMessage.innerHTML = `Player ${winner !== 1 ? "O" : "X"} Wins!`;
    return;
  }
  return;
}

function renderCurrentPlayerMessage() {
  if (!winner) {
    currentPlayerMessage.innerHTML = `Player ${turn === 1 ? "O" : "X"}'s turn`;
    return;
  }
  return;
}

function renderBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const squareIndex = i * 3 + j;
      squares[squareIndex].innerHTML = board[i][j];
    }
  }
}

squares.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault()
    if(winner){
        return 
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
        return;
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

  turn *= -1;
  checkForWinner();
  render();
}

// handle a player clicking the replay button
