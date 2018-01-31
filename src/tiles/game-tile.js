import calculateCoordinates from './../board/board-utils';

export class GameTile {
  constructor(index, coordinates) {
    this.index = index;
    this.gamePiece = null;
    this.coordinates = coordinates;
    console.log('Game tile');
  }

  isFree() {
    return this.gamePiece === null;
  }
}

export default function gameTileFactory(index, gridSize) {
  const coordinates = calculateCoordinates(index, gridSize);
  return new GameTile(index, coordinates);
}
