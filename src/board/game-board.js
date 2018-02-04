
export class GameBoard {
  constructor(game, size) {
    this.game = game;
    this.size = size;
    this.tiles = [];
    this.pieces = [];
    this.emptyTiles = [];
  }

  setEmptyTiles() {
    this.emptyTiles = this.tiles.filter(tile => tile.isEmpty);
  }

  firstEmptyTile() {
    return this.emptyTiles[0];
  }
}

export default function createGameBoard(game, size) {
  return new GameBoard(game, size);
}
