
class PuzzleGame {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.initSettings();
    this.state = 'new';
    console.log('new game: ', this.state);
  }

  initSettings() {
    this.gridSize = Number(this.element.getAttribute('grid-size'));
    this.imageSize = Number(this.element.getAttribute('image-size'));
  }

  start() {
    this.state = 'started';
  }
}

export default function createPuzzleGame(elementId) {
  return new PuzzleGame(elementId);
}
