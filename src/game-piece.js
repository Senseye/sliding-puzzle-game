
export class GamePiece {
  constructor(index, coordinates, position, gameBoard) {
    this.index = index;
    this.coordinates = coordinates;
    this.position = position;
    this.gameBoard = gameBoard;

    this.element = document.createElement('div', {
      id: `gamePiece${this.index}`,
      'game-piece-index': this.index,
    });
    this.element.innerHTML = this.index + 1;
  }

  template(image) {
    this.element.setAttribute('style', `width: 125px; height: 125px;
    background: url(${image});
    background-position: -${this.position.left}px -${this.position.top}px;
    position: absolute;
    border: 1px solid yellow;
    top: ${this.tile.position.top}px;
    left: ${this.tile.position.left}px`);
    return this.element;
  }

  setPosition() {
    console.log(this.tile);
    this.element.style.top = `${this.tile.position.top}px`;
    this.element.style.left = `${this.tile.position.left}px`;
  }

  onClick() {
    console.log('hello', this.index);
    this.move();
  }

  getPossibleMoves() {
    const possibleMoves = [];
    const { coordinates } = this.tile;
    const { gridSize } = this.gameBoard.puzzleGame;

    if (coordinates.x + 1 < gridSize) {
      possibleMoves.push({ x: coordinates.x + 1, y: coordinates.y });
    }

    if (coordinates.x > 0) {
      possibleMoves.push({ x: coordinates.x - 1, y: coordinates.y });
    }

    if (coordinates.y > 0) {
      possibleMoves.push({ x: coordinates.x, y: coordinates.y - 1 });
    }

    if (coordinates.y + 1 < gridSize) {
      possibleMoves.push({ x: coordinates.x, y: coordinates.y + 1 });
    }

    return possibleMoves;
  }

  getMoveCoordinates() {
    const possibleMoves = this.getPossibleMoves();
    const { x, y } = this.gameBoard.freeTile.coordinates;
    return possibleMoves.find(coordinates => coordinates.x === x && coordinates.y === y);
  }

  move() {
    const moveToTile = this.getMoveCoordinates();
    if (moveToTile) {
      this.tile.gamePiece = null;
      this.tile = this.gameBoard.freeTile;
      this.gameBoard.freeTile.gamePiece = this;
      this.gameBoard.setFreeTile();
      this.setPosition();
    }
  }
}

export default function gamePieceFactory(index, coordinates, position, gameBoard) {
  return new GamePiece(index, coordinates, position, gameBoard);
}
