import puzzleGameFactory from './puzzle-game/puzzle-game-factory';
import appView from './app.html';

const root = document.getElementById('root');
root.innerHTML = appView;

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

const puzzleGame = puzzleGameFactory();
puzzleGame.render();
puzzleGame.start();

/*
const gameBoard = createGameBoard(puzzleGame);

console.log(gameBoard);

puzzleGame.render();
gameBoard.render();
puzzleGame.start();
*/
