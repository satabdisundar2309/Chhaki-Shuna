const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
  //these are the positions where a player can win
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// laets c reate a function to initialize the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.innerText = "";
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player- ${currentPlayer}`;
  boxes.forEach((box) => {
    box.classList.remove("win");
  });
  boxes.forEach((box) => {
    box.style.pointerEvents = "all";
  });
}
initGame();

// checking the game is over or not
function checkGameOver() {
  let winner = "";
  winningPositions.forEach((positions) => {
    if (
      gameGrid[positions[0]] !== "" &&
      gameGrid[positions[1]] !== "" &&
      gameGrid[positions[2]] !== "" &&
      gameGrid[positions[0]] === gameGrid[positions[1]] &&
      gameGrid[positions[1]] === gameGrid[positions[2]]
    ) {
      if (gameGrid[positions[0]] === "X") {
        winner = "X";
      } else {
        winner = "0";
      }
      boxes[positions[0]].classList.add("win");
      boxes[positions[1]].classList.add("win");
      boxes[positions[2]].classList.add("win");
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
    }
  });

  if (winner !== "") {
    gameInfo.textContent = `Winner is - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

  // if the game ties
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.textContent = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

// swap player function
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // controling the turn of players
    swapTurn();
    // checking if someone has won or not
    checkGameOver();
  }
}
// adding event listners to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// adding event listener to new game button
newGameBtn.addEventListener("click", () => {
  initGame();
});
