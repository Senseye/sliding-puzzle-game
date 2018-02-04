
export class PuzzlePiece {
  constructor(index, coordinates, position, gameBoard) {
    this.index = index;
    this.coordinates = coordinates;
    this.position = position;
    this.gameBoard = gameBoard;
    this.game = gameBoard.game;
    this.gameState = this.game.gameState;
  }

  set tile(tile) {
    this.boardTile = tile;
    this.updatePlacementIndicators();
  }

  getMoveDirections() {
    const { coordinates } = this.boardTile;
    const { size: gridSize } = this.gameBoard;
    return this.game.moveDirections
      .filter(move => move.check(coordinates, gridSize))
      .map(move => move.getCoordinatesFrom(coordinates));
  }

  hasValidMove() {
    const possibleMoves = this.getMoveDirections();
    const { x, y } = this.gameBoard.firstEmptyTile().coordinates;
    return possibleMoves.find(coordinates => coordinates.x === x && coordinates.y === y);
  }

  updateGameState() {
    const movementValue = this.isInPlace ? -1 : Boolean(this.wasInPlace);
    this.gameState.update(movementValue);
  }

  updatePlacementIndicators() {
    const { x, y } = this.boardTile.coordinates;
    this.wasInPlace = this.isInPlace;
    this.isInPlace = this.coordinates.x === x && this.coordinates.y === y;
  }

  onMoveSuccess() {
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
    this.boardTile = this.gameBoard.firstEmptyTile();
    this.boardTile.occupy();
    this.gameBoard.setEmptyTiles();
  }
}

export default function gamePieceFactory(index, coordinates, position, gameBoard) {
  return new PuzzlePiece(index, coordinates, position, gameBoard);
}
