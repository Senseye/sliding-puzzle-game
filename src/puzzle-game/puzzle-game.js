import { BehaviorSubject } from 'rxjs';
import * as boardMoveDirections from '../board/move-directions';

class PuzzleGame {
  constructor() {
    this.moveDirections = [
      boardMoveDirections.oneStepRightMove,
      boardMoveDirections.oneStepLeftMove,
      boardMoveDirections.oneStepUpMove,
      boardMoveDirections.oneStepDownMove,
    ];
    this.endGameSubject = new BehaviorSubject(false);
    this.startGameSubject = new BehaviorSubject(false);
  }

  start() {
    this.gameState.init();
    this.startGameSubject.next(true);
  }

  end() {
    this.endGameSubject.next(true);
  }
}

export default function createPuzzleGame() {
  return new PuzzleGame();
}
