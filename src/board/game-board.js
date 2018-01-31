
export default class GameBoard {
  constructor(puzzleGame, tiles, pieces) {
    console.log('Game board');
    this.puzzleGame = puzzleGame;
    this.tiles = tiles;
    this.pieces = pieces;
  }

  render() {
    const gamePiecesTemplates = [];
    const { imageSrc } = this.puzzleGame;
    this.pieces.forEach(gamePiece => gamePiecesTemplates.push(gamePiece.template(imageSrc)));
    this.puzzleGame.element.innerHTML = gamePiecesTemplates.join('');
  }
}
