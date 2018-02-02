import createGameBoard from '../board/game-board';
import createPuzzleGame from './puzzle-game';
import { calculatePosition, calculateCoordinates } from '../board/board-utils';
import gameTileFactory from '../board/board-tile';
import gamePieceFactory from './puzzle-piece';
import { createPuzzleGameState } from './puzzle-game-state';

const shuffleArray = require('fisher-yates/inplace');

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

function calculateGameTilesCount(gridSize) {
  return gridSize * gridSize;
}

function calculateGamePiecesCount(gridSize) {
  return calculateGameTilesCount(gridSize) - 1;
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

export default function puzzleGameFactory() {
  const puzzleGame = createPuzzleGame('game');
  const gameBoard = createGameBoard(puzzleGame);
  puzzleGame.gameState = createPuzzleGameState(gameBoard);

  const { gridSize, imageSize } = puzzleGame;

  const tilesCount = calculateGameTilesCount(gridSize);
  const piecesCount = calculateGamePiecesCount(gridSize);

  const tiles = generateBoardElements(tilesCount, imageSize, gameBoard, gameTileFactory);
  let pieces = generateBoardElements(piecesCount, imageSize, gameBoard, gamePieceFactory);
  pieces = shuffleArray(pieces);
  assignTilePieces(tiles, pieces);

  gameBoard.tiles = tiles;
  gameBoard.pieces = pieces;

  gameBoard.setFreeTile();
  gameBoard.render();
  gameBoard.destroy();

  return puzzleGame;
}
