import GameBoard from './game-board';
import gameTileFactory from '../tiles/game-tile';
import gamePieceFactory from '../game-piece';
import { calculatePosition, calculateCoordinates } from './board-utils';

const shuffleArray = require('fisher-yates');

export function generateBoardElements(count, imageSize, boardElementFactory) {
  const elements = [];
  const gridSize = Math.round(Math.sqrt(count));

  for (let i = 0; i < count; i += 1) {
    const coordinates = calculateCoordinates(i, gridSize);
    const position = calculatePosition(coordinates, gridSize, imageSize);
    elements.push(boardElementFactory(i, coordinates, position));
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
    console.log(gamePiece);
  });
}

export function createGameBoard(puzzleGame) {
  const { gridSize, imageSize } = puzzleGame;

  const tilesCount = calculateGameTilesCount(gridSize);
  const piecesCount = calculateGamePiecesCount(gridSize);

  const tiles = generateBoardElements(tilesCount, imageSize, gameTileFactory);
  const pieces = shuffleArray(generateBoardElements(piecesCount, imageSize, gamePieceFactory));
  assignTilePieces(tiles, pieces);

  return new GameBoard(puzzleGame, tiles, pieces);
}
