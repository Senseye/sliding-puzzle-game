
export class PuzzleGameGUI {
  constructor(element) {
    this.element = element;
    this.extractSettings();
  }

  extractSettings() {
    this.imageSrc = this.element.getAttribute('image-src');
  }
}

export function createPuzzleGameGUI(element) {
  return new PuzzleGameGUI(document.getElementById(element));
}
