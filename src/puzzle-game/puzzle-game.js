import * as boardMoveDirections from '../board/move-directions';

class PuzzleGame {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.moveDirections = [
      boardMoveDirections.oneStepRightMove,
      boardMoveDirections.oneStepLeftMove,
      boardMoveDirections.oneStepUpMove,
      boardMoveDirections.oneStepDownMove,
    ];
    this.initSettings();
    this.state = 'new';
  }

  initSettings() {
    this.gridSize = Number(this.element.getAttribute('grid-size'));
    this.imageSize = Number(this.element.getAttribute('image-size'));
    this.imageSrc = this.element.getAttribute('image-src');
  }

  start() {
    this.state = 'started';
    this.renderGameState();
    this.gameState.init();
  }

  end() {
    this.state = 'ended';
    this.renderGameState();
  }

  render() {
    this.element.getElementsByClassName('moves')[0].innerHTML = this.moves;
  }

  renderGameState() {
    this.element.getElementsByClassName('status')[0].innerHTML = this.state;
  }
}

export default function createPuzzleGame(elementId) {
  return new PuzzleGame(elementId);
}
