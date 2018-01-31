const GAME_SIZE = 500;

class PuzzleGame {
  constructor(sourceImage, size) {
    this.sourceImage = sourceImage;
    this.size = size;
    this.state = 'new';
    console.log('new game');
  }

  start() {
    this.state = 'started';
  }
}

export default function initPuzzleGame(containerId) {
  const element = document.getElementById(containerId);
  const sourceImage = element.getAttribute('image-src');
  return new PuzzleGame(sourceImage, 4);
}
