
export class GameBoard {
  constructor(game) {
    this.game = game;
    this.tiles = [];
    this.pieces = [];
    this.element = document.getElementById('gameBoard');
    this.bindClickEvents();
  }

  setFreeTile() {
    this.freeTile = this.tiles.find(tile => tile.isEmpty);
  }

  render() {
    const { imageSize } = this.game;
    this.element.style = `position: relative; width: ${imageSize}px; height: ${imageSize}px; border: 1px solid black;`;
    const tilesFragment = document.createDocumentFragment();
    this.pieces.forEach(gamePiece => tilesFragment.appendChild(gamePiece.element));
    this.element.appendChild(tilesFragment);
  }

  bindClickEvents() {
    this.element.addEventListener('click', this.delegateClickEvent.bind(this));
  }

  delegateClickEvent(event) {
    const { target } = event;
    const gamePiece = this.pieces.find(currentPiece => currentPiece.element.isSameNode(target));
    if (gamePiece) {
      gamePiece.onClick();
    }
  }

  destroy() {
    console.log('destroy');
    this.element.removeEventListener('click', this.delegateClickEvent);
  }
}

export default function createGameBoard(game) {
  return new GameBoard(game);
}
