
export class GameBoardGUI {
  constructor(settings) {
    this.gameBoard = settings.gameBoard;
    this.element = settings.element;
    this.imageSrc = settings.imageSrc;
    this.imageSize = settings.imageSize;
    this.gridSize = settings.gridSize;
    this.piecesGUI = [];
    this.setStyles();
    this.initPiecesGUI(settings.pieceGUIFactory);
    this.clickCallback = this.delegateClickEvent.bind(this);
    this.bindClickEvents();
    this.gameEndSubscribe();
  }

  gameEndSubscribe() {
    this.gameBoard.game
      .endGameSubject
      .filter(data => data)
      .subscribe(() => {
        this.renderGameOver();
        this.destroy();
      });
  }

  initPiecesGUI(factory) {
    const size = this.imageSize / this.gridSize;
    this.piecesGUI = this.gameBoard.pieces.map(piece => factory(piece, size, this.imageSrc));
  }

  setStyles() {
    this.element.style.width = `${this.imageSize}px`;
    this.element.style.height = `${this.imageSize}px`;
  }

  renderGameOver() {
    this.element.style.backgroundImage = `url(${this.imageSrc})`;
  }

  render() {
    const tilesFragment = document.createDocumentFragment();
    this.piecesGUI.forEach(piece => tilesFragment.appendChild(piece.element));
    this.element.appendChild(tilesFragment);
    this.element.classList.remove('d-none');
  }

  delegateClickEvent(event) {
    const { target } = event;
    this.piecesGUI
      .filter(currentPiece => currentPiece.element.isSameNode(target))
      .forEach(piece => piece.onClick());
  }

  bindClickEvents() {
    this.element.addEventListener('click', this.clickCallback);
  }

  destroy() {
    this.element.innerHTML = '<button onclick=\'window.location.reload()\'>Restart</button>';
    this.element.removeEventListener('click', this.clickCallback);
  }
}

export function createGameBoardGUI(settings) {
  return new GameBoardGUI(settings);
}
