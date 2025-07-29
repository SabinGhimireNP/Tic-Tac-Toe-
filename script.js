//variables
const tiles = document.querySelectorAll(".tile");
const p1Score = document.querySelector(".p1");
const p2Score = document.querySelector(".p2");
const drawScore = document.querySelector(".draw");
const resetScore = document.querySelector(".resetScoreboard");
let board = ["", "", "", "", "", "", "", "", ""];
const winslots = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameRunning = true;

//audio variables
const winaudio = new Audio("assests/page-flip-47177.mp3");
const Incresemeter = new Audio("assests/Incresemeter.mp3");
const resetemeter = new Audio("assests/reset.mp3");

//audion controls
winaudio.volume = 0.04;
Incresemeter.volume = 0.04;
resetemeter.volume = 0.1;

let winnerFound = false;
let player1 = Math.round(Math.random());

//functions
function contentChange(e, tile) {
  winaudio.currentTime = 0;

  if (!tile.innerHTML) {
    if (!gameRunning) return;
    winaudio.play();
    e.target.classList.add("active");
    let index = e.target.dataset.set - 1;
    setTimeout(() => {
      tile.innerHTML = player1
        ? `<i class="fa-solid fa-xmark" style="color: var(--player1);"></i>`
        : `<i class="fa-regular fa-circle" style="color: var(--player2);"></i>`;
      let currentPlayer = player1 ? "X" : "O";
      board[index] = currentPlayer;
      player1 = !player1;
      checkWin();
    }, 300);
  }
}

function checkWin() {
  winslots.forEach((winslot) => {
    if (
      board[winslot[0]] === board[winslot[1]] &&
      board[winslot[2]] === board[winslot[1]] &&
      board[winslot[0]] !== ""
    ) {
      winnerFound = true;
      if (board[winslot[2]] === "X") {
        gameRunning = false;
        Incresemeter.play();
        p1Score.textContent = Number(p1Score.textContent) + 1;
        resetGame();
      }
      if (board[winslot[2]] === "O") {
        Incresemeter.play();
        p2Score.textContent = Number(p2Score.textContent) + 1;
        gameRunning = false;
        resetGame();
      }
    }
  });
  if (!winnerFound && board.every((data) => data !== "")) {
    {
      Incresemeter.play();
      drawScore.textContent = Number(drawScore.textContent) + 1;
      winnerFound = true;
      gameRunning = false;
      resetGame();
    }
  }
}

function resetGame() {
  setTimeout(() => {
    board = ["", "", "", "", "", "", "", "", ""];
    tiles.forEach((tile) => {
      tile.innerHTML = "";
      tile.classList.remove("active");
      gameRunning = true;
      winnerFound = false;
    });
  }, 100);
}
function resetScoreboard() {
  resetemeter.currentTime = 0;
  resetemeter.playbackRate = 2;
  resetemeter.play();
  drawScore.textContent = 0;
  p2Score.textContent = 0;
  p1Score.textContent = 0;
}

//eventListners
resetScore.addEventListener("click", resetScoreboard);
tiles.forEach((tile) =>
  tile.addEventListener("click", (e) => contentChange(e, tile))
);
