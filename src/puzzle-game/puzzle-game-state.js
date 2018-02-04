import { BehaviorSubject } from 'rxjs';

function isOffPlacedPiece(gamePiece) {
  const { x, y } = gamePiece.boardTile.coordinates;
  return gamePiece.coordinates.x !== x || gamePiece.coordinates.y !== y;
}

export class PuzzleGameState {
  constructor(gameBoard) {
    this.offPlacedPieces = 0;
    this.moves = 0;
    this.status = 'started';
    this.gameBoard = gameBoard;
    this.game = gameBoard.game;
    this.stateSubject = new BehaviorSubject(this.getGameState());
  }

  init() {
    this.calculateOffPlacedPieces();
  }

  calculateOffPlacedPieces() {
    this.gameBoard.pieces
      .filter(gamePiece => isOffPlacedPiece(gamePiece))
      .forEach(() => {
        this.offPlacedPieces += 1;
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
      this.status = 'finished';
      this.game.end();
    }
  }

  getGameState() {
    return {
      moves: this.moves,
      offPlacedPieces: this.offPlacedPieces,
      status: this.status,
    };
  }

  update(val) {
    this.updateOffPlacedPieces(val);
    this.addMoves();
    this.endGame();
    this.stateSubject.next(this.getGameState());
  }
}

export function createPuzzleGameState(gameBoard) {
  return new PuzzleGameState(gameBoard);
}
