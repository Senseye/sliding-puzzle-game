
class PuzzleGame {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.initSettings();
    this.state = 'new';
    console.log('new game: ', this.state);
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
    this.element.style = `position: relative; width: ${this.imageSize}px; height: ${this.imageSize}px; border: 1px solid black;`;
  }
}

export default function createPuzzleGame(elementId) {
  return new PuzzleGame(elementId);
}
