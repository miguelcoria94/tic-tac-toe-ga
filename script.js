let board;
let turn;
let winner;

const currentPlayerMessage = document.querySelector("#current-player");
const winningMessage = document.querySelector("#winning-message"); 
const squares = [...document.querySelectorAll("#board > div")]

init()

function init(){
    console.log("The game has started")
    board  = 
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    turn = 1
    winner = null
    render()
}

function render() {
}