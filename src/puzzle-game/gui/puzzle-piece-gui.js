
export class PuzzlePieceGUI {
  constructor(puzzlePiece, size, imageSrc) {
    this.puzzlePiece = puzzlePiece;
    this.size = size;
    this.imageSrc = imageSrc;
    this.element = this.createElement();
    this.setElementGraphics();
  }

  createElement() {
    const element = document.createElement('div');
    element.setAttribute('class', 'puzzle-piece');
    element.innerHTML = this.puzzlePiece.index + 1;
    return element;
  }

  setElementGraphics() {
    this.element.setAttribute('style', `width: ${this.size}px; height: ${this.size}px;
    background: url(${this.imageSrc});
    background-position: -${this.puzzlePiece.position.left}px -${this.puzzlePiece.position.top}px;`);
    this.updateCssPosition();
  }

  updateCssPosition() {
    this.element.style.top = `${this.puzzlePiece.boardTile.position.top}px`;
    this.element.style.left = `${this.puzzlePiece.boardTile.position.left}px`;
  }

  onClick() {
    this.puzzlePiece.move();
    this.updateCssPosition();
  }
}

export function createPuzzlePieceGUI(puzzlePiece, size, imageSrc) {
  return new PuzzlePieceGUI(puzzlePiece, size, imageSrc);
}
