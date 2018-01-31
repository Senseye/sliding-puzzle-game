import initPuzzleGame from './puzzle-game';
import appView from './app.html';

const root = document.getElementById('root');
root.innerHTML = appView;

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

const puzzleGame = initPuzzleGame('game');
puzzleGame.start();
