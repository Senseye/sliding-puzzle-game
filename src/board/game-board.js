
export class GameBoard {
  constructor(game, size) {
    this.game = game;
    this.size = size;
    this.tiles = [];
    this.pieces = [];
  }

  setEmptyTile() {
    this.emptyTile = this.tiles.find(tile => tile.isEmpty);
  }
}

export default function createGameBoard(game, size) {
  return new GameBoard(game, size);
}
