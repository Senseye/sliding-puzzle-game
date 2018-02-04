function template(data) {
  return `Moves: ${data.moves} Off placed pieces: ${data.offPlacedPieces} Status: ${data.status}`;
}

export class PuzzleGameGUI {
  constructor(element, puzzleGame) {
    this.element = element;
    this.puzzleGame = puzzleGame;
    this.puzzleGame.gameState.stateSubject.subscribe(state => this.render(state));
  }

  render(data) {
    this.element.querySelector('.game-state').innerHTML = template(data);
  }
}

export function createPuzzleGameGUI(element, puzzleGame) {
  return new PuzzleGameGUI(document.getElementById(element), puzzleGame);
}
