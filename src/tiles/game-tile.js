
export class GameTile {
  constructor(index, coordinates, position) {
    this.index = index;
    this.gamePiece = null;
    this.coordinates = coordinates;
    this.position = position;
    console.log('Game tile');
  }

  isFree() {
    return this.gamePiece === null;
  }
}

export default function gameTileFactory(index, coordinates, position) {
  return new GameTile(index, coordinates, position);
}
