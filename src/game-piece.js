
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
    top: ${this.tile.position.top}px;
    left: ${this.tile.position.left}px">${this.index}</div>`;
  }
}

export default function gamePieceFactory(index, coordinates, position) {
  return new GamePiece(index, coordinates, position);
}
