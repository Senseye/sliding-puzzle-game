import { BehaviorSubject } from 'rxjs';

export class PuzzleGameState {
  constructor({ offPlacedPieces, game }) {
    this.offPlacedPieces = offPlacedPieces;
    this.moves = 0;
    this.status = 'started';
    this.game = game;
    this.stateSubject = new BehaviorSubject(this.getGameState());
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

  update(offPlaceMove) {
    this.updateOffPlacedPieces(offPlaceMove);
    this.addMoves();
    this.endGame();
    this.stateSubject.next(this.getGameState());
  }
}

export function createPuzzleGameState(gameBoard) {
  return new PuzzleGameState(gameBoard);
}
