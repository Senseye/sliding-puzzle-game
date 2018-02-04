
export class GameBoardGUI {
  constructor(element, gameBoard, pieceGUIFactory) {
    this.gameBoard = gameBoard;
    this.element = element;
    this.piecesGUI = [];
    this.extractSettings();
    this.setStyles();
    this.initPiecesGUI(pieceGUIFactory);
    this.clickCallback = this.delegateClickEvent.bind(this);
    this.bindClickEvents();
  }

  extractSettings() {
    this.gridSize = Number(this.element.getAttribute('grid-size'));
    this.imageSize = Number(this.element.getAttribute('image-size'));
    this.imageSrc = this.element.getAttribute('image-src');
  }

  initPiecesGUI(factory) {
    const size = this.imageSize / this.gridSize;
    this.piecesGUI = this.gameBoard.pieces.map(piece => factory(piece, size, this.imageSrc));
  }

  setStyles() {
    this.element.style.width = `${this.imageSize}px`;
    this.element.style.height = `${this.imageSize}px`;
  }

  render() {
    const tilesFragment = document.createDocumentFragment();
    this.piecesGUI.forEach(piece => tilesFragment.appendChild(piece.element));
    this.element.appendChild(tilesFragment);
  }

  delegateClickEvent(event) {
    const { target } = event;
    const gamePiece = this.piecesGUI
      .find(currentPiece => currentPiece.element.isSameNode(target));

    if (gamePiece) {
      gamePiece.onClick();
    }
  }

  bindClickEvents() {
    this.element.addEventListener('click', this.clickCallback);
  }

  destroy() {
    this.element.removeEventListener('click', this.clickCallback);
  }
}

export function createGameBoardGUI(element, gameBoard, pieceGUIFactory) {
  return new GameBoardGUI(document.getElementById(element), gameBoard, pieceGUIFactory);
}
