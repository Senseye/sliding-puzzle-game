function isOffPlacedPiece(gamePiece) {
  const { x, y } = gamePiece.boardTile.coordinates;
  return gamePiece.coordinates.x !== x || gamePiece.coordinates.y !== y;
}

export class PuzzleGameState {
  constructor(gameBoard) {
    this.offPlacedPieces = 0;
    this.moves = 0;
    this.gameBoard = gameBoard;
    this.game = gameBoard.game;
  }

  init() {
    this.calculateOffPlacedPieces();
  }

  calculateOffPlacedPieces() {
    this.gameBoard.pieces.forEach((gamePiece) => {
      if (isOffPlacedPiece(gamePiece)) {
        this.offPlacedPieces += 1;
      }
    });
  }

  updateOffPlacedPieces(val) {
    this.offPlacedPieces += val;
  }

  addMoves() {
    this.moves += 1;
  }

  isGameFinished() {
    return this.offPlacedPieces === 0;
  }

  endGame() {
    if (this.isGameFinished()) {
      this.game.end();
    }
  }

  update(val) {
    this.updateOffPlacedPieces(val);
    this.addMoves();
    this.endGame();
  }
}

export function createPuzzleGameState(gameBoard) {
  return new PuzzleGameState(gameBoard);
}
