const tiles = document.querySelectorAll(".tile");
let player1 = Math.round(Math.random());
function contentChange(e, tile) {
  e.target.classList.add("active");
  setTimeout(() => {
    if (!tile.innerHTML) {
      tile.innerHTML = player1
        ? `<i class="fa-solid fa-xmark" style="color: #ea5454;"></i>`
        : `<i class="fa-regular fa-circle" style="color: #238090;"></i>`;
      player1 = !player1;
    }
  }, 300);
}

tiles.forEach((tile) =>
  tile.addEventListener("click", (e) => contentChange(e, tile))
);
