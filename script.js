const tiles = document.querySelectorAll(".tile");
const p1Score = document.querySelector(".p1");
const p2Score = document.querySelector(".p2");
const drawScore = document.querySelector(".draw");
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
console.log(drawScore.textContent, p1Score.textContent, p2Score.textContent);
let winnerFound = false;
let player1 = Math.round(Math.random());
function contentChange(e, tile) {
  if (!gameRunning) return;
  e.target.classList.add("active");
  let index = e.target.dataset.set - 1;
  setTimeout(() => {
    if (!tile.innerHTML) {
      tile.innerHTML = player1
        ? `<i class="fa-solid fa-xmark" style="color: #ea5454;"></i>`
        : `<i class="fa-regular fa-circle" style="color: #238090;"></i>`;
      let currentPlayer = player1 ? "X" : "O";
      board[index] = currentPlayer;
      player1 = !player1;
      checkWin();
    }
  }, 300);
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
        p1Score.textContent = Number(p1Score.textContent) + 1;
        resetGame();
      }
      if (board[winslot[2]] === "O") {
        p2Score.textContent = Number(p2Score.textContent) + 1;
        gameRunning = false;
        resetGame();
      }
    }
  });
  if (!winnerFound && board.every((data) => !data == "")) {
    {
      drawScore.textContent = Number(drawScore.textContent) + 1;
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
    });
  }, 500);
}

tiles.forEach((tile) =>
  tile.addEventListener("click", (e) => contentChange(e, tile))
);
