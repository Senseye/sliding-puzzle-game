import GameBoard from './game-board';
import gameTileFactory from '../tiles/game-tile';
import gamePieceFactory from '../game-piece';

export function generateBoardElements(count, imageSize, boardElementFactory) {
  const elements = [];
  const gridSize = Math.round(Math.sqrt(count));

  for (let i = 0; i < count; i += 1) {
    elements.push(boardElementFactory(i, gridSize, imageSize));
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
  pieces.forEach((gamePiece, index) => {
    tilesArray[index].gamePiece = gamePiece;
  });
}

export function createGameBoard(puzzleGame) {
  const { gridSize, imageSize } = puzzleGame;

  const tilesCount = calculateGameTilesCount(gridSize);
  const piecesCount = calculateGamePiecesCount(gridSize);

  const tiles = generateBoardElements(tilesCount, imageSize, gameTileFactory);
  const pieces = generateBoardElements(piecesCount, imageSize, gamePieceFactory);
  assignTilePieces(tiles, pieces);

  return new GameBoard(puzzleGame, tiles, pieces);
}
