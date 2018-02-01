
class PuzzleGame {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.initSettings();
    this.state = 'new';
    this.moves = 0;
    this.elapsedMs = 0;
  }

  initSettings() {
    this.gridSize = Number(this.element.getAttribute('grid-size'));
    this.imageSize = Number(this.element.getAttribute('image-size'));
    this.imageSrc = this.element.getAttribute('image-src');
  }

  start() {
    this.state = 'started';
  }

  render() {
    this.element.getElementsByClassName('moves')[0].innerHTML = this.moves;
  }

  incrementMoves() {
    this.moves = this.moves + 1;
  }

  updateMoves() {
    this.incrementMoves();
    this.render();
  }
}

export default function createPuzzleGame(elementId) {
  return new PuzzleGame(elementId);
}
