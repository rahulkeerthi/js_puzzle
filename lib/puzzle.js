const button = document.querySelector("#show-hint");
const hint = document.querySelector(".hint");

button.addEventListener("click", () => {
  hint.classList.toggle("active");
});

// PSEUDO CODE

const tileCanMove = (tile) => {
  // check if a tile have an empty neighbour
  const tileColumn = tile.cellIndex;
  const tileRow = tile.parentElement.rowIndex;
  const emptyTile = document.querySelector(".empty");
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;

  return (
    (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1) ||
    (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) ||
    (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) ||
    (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1)
  );
  // return true or false
};

const checkPlayerWon = () => {
  const tiles = document.querySelectorAll("td");
  const currentTilesAsString = Array.from(tiles)
    .map((tile) => parseInt(tile.innerText, 10))
    .join();
  const winningString = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN";
  return currentTilesAsString === winningString;
};

// select all the tiles
const tiles = document.querySelectorAll("td");
tiles.forEach((tile) => {
  // if you click on a square next to empty (horizontal or vertical)
  // technical: add an eventlistener to each td
  tile.addEventListener("click", (event) => {
    // use some logic to figure out whether the tile can move
    if (tileCanMove(tile)) {
      // select the empty tile
      const emptyTile = document.querySelector(".empty");
      // move the value in the clicked td to the empty one
      emptyTile.innerText = tile.innerText;
      tile.innerText = "";
      // move the class from the empty to the td you clicked
      emptyTile.classList.remove("empty");
      tile.classList.add("empty");
    }
    if (checkPlayerWon()) {
      alert("you won!");
    }
  });
});

// check if all the numbers are in order (black square on bottom right), and if so the player wins!
