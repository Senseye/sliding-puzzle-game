import GameBoard from './game-board';
import gameTileFactory from '../tiles/game-tile';
import gamePieceFactory from '../game-piece';
import { calculatePosition, calculateCoordinates } from './board-utils';

const shuffleArray = require('fisher-yates');

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
    tile.gamePiece = gamePiece;
    gamePiece.tile = tile;
  });
}

export function createGameBoard(puzzleGame) {
  const { gridSize, imageSize } = puzzleGame;
  const gameBoard = new GameBoard(puzzleGame);

  const tilesCount = calculateGameTilesCount(gridSize);
  const piecesCount = calculateGamePiecesCount(gridSize);

  const tiles = generateBoardElements(tilesCount, imageSize, gameBoard, gameTileFactory);
  let pieces = generateBoardElements(piecesCount, imageSize, gameBoard, gamePieceFactory);
  pieces = shuffleArray(pieces);
  assignTilePieces(tiles, pieces);

  gameBoard.tiles = tiles;
  gameBoard.pieces = pieces;

  gameBoard.setFreeTile();

  return gameBoard;
}
