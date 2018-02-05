
export class BoardTile {
  constructor(index, coordinates, position, gameBoard) {
    this.index = index;
    this.isEmpty = true;
    this.coordinates = coordinates;
    this.position = position;
    this.gameBoard = gameBoard;
  }

  empty() {
    this.isEmpty = true;
  }

  occupy() {
    this.isEmpty = false;
  }
}

export default function gameTileFactory(index, coordinates, position, gameBoard) {
  return new BoardTile(index, coordinates, position, gameBoard);
}
