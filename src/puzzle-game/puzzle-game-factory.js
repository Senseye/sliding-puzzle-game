import createPuzzleGame from './puzzle-game';
import { createPuzzleGameBoard } from './puzzle-game-board';
import { createPuzzleGameState } from './puzzle-game-state';
import { createPuzzleGameGUI } from './gui/puzzle-game-gui';
import { createGameBoardGUI } from '../board/game-board-gui';
import { createPuzzlePieceGUI } from './gui/puzzle-piece-gui';

export default function puzzleGameFactory(data) {
  const { gridSize, imageSize, imageSrc } = data;
  const game = createPuzzleGame();
  const gameBoard = createPuzzleGameBoard({ game, gridSize, imageSize });
  const offPlacedPieces = gameBoard.countOffPlacedPieces();
  game.gameState = createPuzzleGameState({ game, offPlacedPieces });

  createPuzzleGameGUI('game', game);
  const gameBoardGUI = createGameBoardGUI({
    element: document.getElementById('gameBoard'),
    pieceGUIFactory: createPuzzlePieceGUI,
    gameBoard,
    gridSize,
    imageSize,
    imageSrc,
  });

  game.startGameSubject.subscribe(() => {
    gameBoardGUI.render();
  });

  return game;
}
