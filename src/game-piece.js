import calculateCoordinates from './board/board-utils';

export class GamePiece {
  constructor(index, coordinates, position) {
    console.log('Game tile');
    this.index = index;
    this.coordinates = coordinates;
    this.position = position;
  }

  template(image) {
    return `<div id="gamePiece${this.index}" style="width: 125px; height: 125px;
    background: url(${image});
    background-position: -${this.position.left}px -${this.position.top}px;
    position: absolute;
    border: 1px solid yellow;
    top: ${this.position.top}px;
    left: ${this.position.left}px">${this.index}</div>`;
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
