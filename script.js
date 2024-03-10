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
  renderWinner();
  console.log(board);
}

function renderWinner() {
  if (winner) {
    winningMessage.innerHTML = winner;
    return;
  }
  return;
}

function renderBoard() {
  count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const squareIndex = i * 3 + j;
      squares[squareIndex].innerHTML = board[i][j];
    }
  }
  console.log(board);
}

// handle a player clicking a square
squares.forEach(function (el) {
  el.addEventListener("click", function (e) {
    playTurn(e.target);
  });
});

function checkForWinner() {
    // check for a winner
    // undate winner data
    // render the game
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
  render();
  checkForWinner()
}

// handle a player clicking the replay button
