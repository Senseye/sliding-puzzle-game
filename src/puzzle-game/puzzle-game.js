import * as boardMoveDirections from '../board/move-directions';

class PuzzleGame {
  constructor() {
    this.moveDirections = [
      boardMoveDirections.oneStepRightMove,
      boardMoveDirections.oneStepLeftMove,
      boardMoveDirections.oneStepUpMove,
      boardMoveDirections.oneStepDownMove,
    ];
  }

  start() {
    this.gameState.init();
  }

  end() {
    console.log('game ended');
    console.log(this.gameState);
  }
}

export default function createPuzzleGame(elementId) {
  return new PuzzleGame(elementId);
}
