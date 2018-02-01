import Rx from 'rxjs/Rx';

export default class GameBoard {
  constructor(puzzleGame) {
    console.log('Game board');
    this.puzzleGame = puzzleGame;
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
    const { imageSrc } = this.puzzleGame;
    this.pieces.forEach((gamePiece) => {
      const gamePieceElement = gamePiece.template(imageSrc);
      this.puzzleGame.element.appendChild(gamePieceElement);
    });
  }

  bindClickEvents() {
    this.source = Rx.Observable.fromEvent(this.puzzleGame.element, 'click');
  }
}
