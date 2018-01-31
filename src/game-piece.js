import calculateCoordinates from './board/board-utils';

export class GamePiece {
  constructor(index, coordinates, position) {
    console.log('Game tile');
    this.index = index;
    this.coordinates = coordinates;
    this.position = position;
  }
}

function calculatePosition({ x, y }, gridSize, imageSize) {
  const tileSize = imageSize / gridSize;
  const top = x * tileSize;
  const left = y * tileSize;

  return { top, left };
}

export default function gamePieceFactory(index, gridSize, imageSize) {
  const coordinates = calculateCoordinates(index, gridSize);
  const position = calculatePosition(coordinates, gridSize, imageSize);
  return new GamePiece(index, coordinates, position);
}
