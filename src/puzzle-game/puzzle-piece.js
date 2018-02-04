
export class GamePiece {
  constructor(index, coordinates, position, gameBoard) {
    this.index = index;
    this.coordinates = coordinates;
    this.position = position;
    this.gameBoard = gameBoard;
    this.game = gameBoard.game;
    this.gameState = this.game.gameState;
    this.createElement();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'puzzle-piece');
    this.element.innerHTML = this.index + 1;
    this.setElementGraphics();
  }

  setElementGraphics() {
    const { imageSize, gridSize } = this.game;
    const pieceSize = `${imageSize / gridSize}px`;
    this.element.setAttribute('style', `width: ${pieceSize}; height: ${pieceSize};
    background: url(${this.gameBoard.game.imageSrc});
    background-position: -${this.position.left}px -${this.position.top}px;`);
  }

  updateCssPosition() {
    this.element.style.top = `${this.boardTile.position.top}px`;
    this.element.style.left = `${this.boardTile.position.left}px`;
  }

  set tile(tile) {
    this.boardTile = tile;
    this.updateCssPosition();
    this.updatePlacementIndicators();
  }

  getMoveDirections() {
    const { coordinates } = this.boardTile;
    const { gridSize } = this.game;

    return this.game.moveDirections
      .filter(move => move.check(coordinates, gridSize))
      .map(move => move.getCoordinatesFrom(coordinates));
  }

  hasValidMove() {
    const possibleMoves = this.getMoveDirections();
    const { x, y } = this.gameBoard.emptyTile.coordinates;
    return possibleMoves.find(coordinates => coordinates.x === x && coordinates.y === y);
  }

  updateGameState() {
    let movementValue = 0;
    if (this.wasInPlace) {
      movementValue = 1;
    } else if (this.isInPlace) {
      movementValue = -1;
    }

    this.gameState.update(movementValue);
  }

  updatePlacementIndicators() {
    const { x, y } = this.boardTile.coordinates;
    this.wasInPlace = this.isInPlace;
    this.isInPlace = this.coordinates.x === x && this.coordinates.y === y;
  }

  onMoveSuccess() {
    this.updateCssPosition();
    this.updatePlacementIndicators();
    this.updateGameState();
  }

  move() {
    const validMove = this.hasValidMove();
    if (validMove) {
      this.useBoardEmptyTile();
      this.onMoveSuccess();
    }
  }

  useBoardEmptyTile() {
    this.boardTile.empty();
    this.boardTile = this.gameBoard.emptyTile;
    this.gameBoard.emptyTile.occupy();
    this.gameBoard.setEmptyTile();
  }

  onClick() {
    this.move();
  }
}

export default function gamePieceFactory(index, coordinates, position, gameBoard) {
  return new GamePiece(index, coordinates, position, gameBoard);
}
