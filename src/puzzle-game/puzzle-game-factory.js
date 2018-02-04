import createGameBoard from '../board/game-board';
import createPuzzleGame from './puzzle-game';
import { calculatePosition, calculateCoordinates } from '../board/board-utils';
import gameTileFactory from '../board/board-tile';
import gamePieceFactory from './puzzle-piece';
import { createPuzzleGameState } from './puzzle-game-state';
import { createPuzzleGameGUI } from './gui/puzzle-game-gui';
import { createGameBoardGUI } from '../board/game-board-gui';
import { createPuzzlePieceGUI } from './gui/puzzle-piece-gui';
import shufflePuzzlePieces from './puzzle-shuffler';

export function generateBoardElements(count, imageSize, gameBoard, boardElementFactory) {
  const elements = [];
  const gridSize = Math.round(Math.sqrt(count));

  for (let i = 0; i < count; i += 1) {
    const coordinates = calculateCoordinates(i, gridSize);
    const position = calculatePosition(coordinates, gridSize, imageSize);
    elements.push(boardElementFactory(i, coordinates, position, gameBoard));
  }
  return elements;
}

function assignTilePieces(tiles, pieces) {
  const tilesArray = tiles;
  pieces.forEach((currentValue, index) => {
    const gamePiece = currentValue;
    const tile = tilesArray[index];
    tile.occupy();
    gamePiece.tile = tile;
  });
}

export default function puzzleGameFactory(data) {
  const { gridSize, imageSize, imageSrc } = data;
  const puzzleGame = createPuzzleGame();
  const gameBoard = createGameBoard(puzzleGame, gridSize);
  puzzleGame.gameState = createPuzzleGameState(gameBoard);

  const tilesCount = gridSize * gridSize;
  const piecesCount = tilesCount - 1;

  const tiles = generateBoardElements(tilesCount, imageSize, gameBoard, gameTileFactory);
  let pieces = generateBoardElements(piecesCount, imageSize, gameBoard, gamePieceFactory);
  const { coordinates: emptyTileCoordinates } = tiles[tiles.length - 1];
  pieces = shufflePuzzlePieces(pieces, gridSize, emptyTileCoordinates);
  assignTilePieces(tiles, pieces);

  gameBoard.tiles = tiles;
  gameBoard.pieces = pieces;
  gameBoard.setEmptyTiles();

  createPuzzleGameGUI('game', puzzleGame);
  const gameBoardGUI = createGameBoardGUI({
    element: document.getElementById('gameBoard'),
    pieceGUIFactory: createPuzzlePieceGUI,
    gameBoard,
    gridSize,
    imageSize,
    imageSrc,
  });

  puzzleGame.startGameSubject.subscribe(() => {
    gameBoardGUI.render();
  });

  return puzzleGame;
}
