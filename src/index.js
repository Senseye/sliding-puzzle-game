import createPuzzleGame from './puzzle-game';
import { createGameBoard } from './board/game-board-factory';

import appView from './app.html';

const root = document.getElementById('root');
root.innerHTML = appView;

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

const puzzleGame = createPuzzleGame('game');
const gameBoard = createGameBoard(puzzleGame);

console.log(gameBoard);

puzzleGame.start();
