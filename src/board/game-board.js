import Rx from 'rxjs/Rx';

export default class GameBoard {
  constructor(puzzleGame) {
    this.puzzleGame = puzzleGame;
    this.element = document.getElementById('gameBoard');
    this.tiles = [];
    this.pieces = [];
    this.bindClickEvents();

    this.source.subscribe((event) => {
      const { target } = event;
      const gamePiece = this.pieces.find(currentPiece => currentPiece.element.isSameNode(target));

      if (gamePiece) {
        gamePiece.onClick();
      }
    });
  }

  setFreeTile() {
    this.freeTile = this.tiles.find(tile => tile.gamePiece === null);
  }

  render() {
    const { imageSrc, imageSize } = this.puzzleGame;
    this.element.style = `position: relative; width: ${imageSize}px; height: ${imageSize}px; border: 1px solid black;`;
    this.pieces.forEach((gamePiece) => {
      const gamePieceElement = gamePiece.template(imageSrc);
      this.element.appendChild(gamePieceElement);
    });
  }

  bindClickEvents() {
    this.source = Rx.Observable.fromEvent(this.puzzleGame.element, 'click');
  }
}
