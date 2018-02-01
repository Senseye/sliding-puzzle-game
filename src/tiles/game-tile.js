
export class GameTile {
  constructor(index, coordinates, position, gameBoard) {
    this.index = index;
    this.gamePiece = null;
    this.coordinates = coordinates;
    this.position = position;
    this.gameBoard = gameBoard;
    console.log('Game tile');
  }

  isFree() {
    return this.gamePiece === null;
  }
}

export default function gameTileFactory(index, coordinates, position, gameBoard) {
  return new GameTile(index, coordinates, position, gameBoard);
}
