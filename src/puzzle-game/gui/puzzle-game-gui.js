function template(data) {
  return `Moves <span class="badge badge-dark">${data.moves}</span>
  Off placed pieces: <span class="badge badge-dark">${data.offPlacedPieces}</span>
  Status: <span class="badge badge-dark">${data.status}</span>`;
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
