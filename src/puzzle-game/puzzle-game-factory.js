import createGameBoard from '../board/game-board';
import createPuzzleGame from './puzzle-game';
import { calculatePosition, calculateCoordinates } from '../board/board-utils';
import gameTileFactory from '../board/board-tile';
import gamePieceFactory from './puzzle-piece';
import { createPuzzleGameState } from './puzzle-game-state';
import { createPuzzleGameGUI } from './gui/puzzle-game-gui';
import { createGameBoardGUI } from '../board/game-board-gui';
import { createPuzzlePieceGUI } from './gui/puzzle-piece-gui';

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
    tile.occupy();
    gamePiece.tile = tile;
  });
}

function countInversions(pieces) {
  let counts = 0;
  for (let i = 0; i < pieces.length - 1; i += 1) {
    const { index: currentIndex } = pieces[i];

    for (let y = i + 1; y < pieces.length; y += 1) {
      const { index: nextIndex } = pieces[y];
      if (currentIndex > nextIndex) {
        counts += 1;
      }
    }
  }
  return counts;
}

function isSolvable(pieces, gridSize, emptyTile) {
  const isEvenGrid = gridSize % 2 === 0;
  const isEvenInversions = countInversions(pieces) % 2 === 0;
  const emptyOnEven = (emptyTile.coordinates.x > 0 && (emptyTile.coordinates.x) % 2 > 0);
  const part1 = !isEvenGrid && isEvenInversions;
  const part2 = isEvenGrid && (emptyOnEven === isEvenInversions);
  return part1 || part2;
}

export default function puzzleGameFactory(data) {
  const { gridSize, imageSize, imageSrc } = data;

  const puzzleGame = createPuzzleGame('game');
  const gameBoard = createGameBoard(puzzleGame, gridSize);
  puzzleGame.gameState = createPuzzleGameState(gameBoard);

  const tilesCount = calculateGameTilesCount(gridSize);
  const piecesCount = calculateGamePiecesCount(gridSize);

  const tiles = generateBoardElements(tilesCount, imageSize, gameBoard, gameTileFactory);
  let pieces = generateBoardElements(piecesCount, imageSize, gameBoard, gamePieceFactory);
  pieces = shuffleArray(pieces);
  assignTilePieces(tiles, pieces);

  const emptyTile = tiles.find(tile => tile.isEmpty);
  function makeSolvable() {
    if (!isSolvable(pieces, gridSize, emptyTile)) {
      pieces = shuffleArray(pieces);
      assignTilePieces(tiles, pieces);
      makeSolvable();
    }
  }
  makeSolvable();

  gameBoard.tiles = tiles;
  gameBoard.pieces = pieces;
  gameBoard.setEmptyTile();

  createPuzzleGameGUI('game');
  const gameBoardGUI = createGameBoardGUI({
    element: document.getElementById('gameBoard'),
    pieceGUIFactory: createPuzzlePieceGUI,
    gameBoard,
    gridSize,
    imageSize,
    imageSrc,
  });
  gameBoardGUI.render();

  return puzzleGame;
}
