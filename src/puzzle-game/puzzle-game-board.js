import { GameBoard } from '../board/game-board';
import { calculatePosition, calculateCoordinates } from '../board/board-utils';
import shufflePuzzlePieces from './puzzle-shuffler';
import gameTileFactory from '../board/board-tile';
import gamePieceFactory from './puzzle-piece';

function generateBoardElements(count, imageSize, gameBoard, boardElementFactory) {
  const elements = [];
  const gridSize = Math.round(Math.sqrt(count));

  for (let i = 0; i < count; i += 1) {
    const coordinates = calculateCoordinates(i, gridSize);
    const position = calculatePosition(coordinates, gridSize, imageSize);
    elements.push(boardElementFactory(i, coordinates, position, gameBoard));
  }

  return elements;
}

function isOffPlacedPiece(gamePiece) {
  const { x, y } = gamePiece.boardTile.coordinates;
  return gamePiece.coordinates.x !== x || gamePiece.coordinates.y !== y;
}


export class PuzzleGameBoard extends GameBoard {
  constructor(settings) {
    super(settings.game, settings.gridSize);
    this.imageSize = settings.imageSize;
    this.generateTiles();
    this.generatePieces();
    this.assignTilePieces();
    this.setEmptyTiles();
  }

  generateTiles() {
    const tilesCount = this.size * this.size;
    if (!this.tiles.length) {
      this.tiles = generateBoardElements(tilesCount, this.imageSize, this, gameTileFactory);
    }
  }

  generatePieces() {
    if (!this.pieces.length) {
      const piecesCount = (this.size * this.size) - 1;
      const pieces = generateBoardElements(piecesCount, this.imageSize, this, gamePieceFactory);
      const { coordinates: emptyTileCoordinates } = this.tiles[this.tiles.length - 1];
      this.pieces = shufflePuzzlePieces(pieces, this.gridSize, emptyTileCoordinates);
    }
  }

  assignTilePieces() {
    this.pieces.forEach((currentValue, index) => {
      const gamePiece = currentValue;
      const tile = this.tiles[index];
      tile.occupy();
      gamePiece.tile = tile;
    });
  }

  countOffPlacedPieces() {
    return this.pieces
      .filter(gamePiece => isOffPlacedPiece(gamePiece))
      .reduce(accumulator => accumulator + 1, 0);
  }
}

export function createPuzzleGameBoard(settings) {
  return new PuzzleGameBoard(settings);
}
