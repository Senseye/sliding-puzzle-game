import puzzleGameBootstrap from './puzzle-game/puzzle-game-bootstrap';
import appView from './app.html';
import { createPuzzleGameSetup } from './puzzle-game/puzzle-game-setup';

const root = document.getElementById('root');
root.innerHTML = appView;

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

const setup = createPuzzleGameSetup('puzzleGameSetup');
setup.subject.subscribe((gameSetup) => {
  const puzzleGame = puzzleGameBootstrap(gameSetup);
  puzzleGame.start();
});
