const shuffleArray = require('fisher-yates');

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

function isSolvable(pieces, gridSize, emptyTileCoordinates) {
  const isEvenGrid = gridSize % 2 === 0;
  const isEvenInversions = countInversions(pieces) % 2 === 0;
  const emptyOnEven = (emptyTileCoordinates.x > 0 && (emptyTileCoordinates.x) % 2 > 0);
  const part1 = !isEvenGrid && isEvenInversions;
  const part2 = isEvenGrid && (emptyOnEven === isEvenInversions);
  return part1 || part2;
}

function shufflePuzzlePieces(pieces, gridSize, emptyTileCoordinates) {
  const shuffledPieces = shuffleArray(pieces);
  if (!isSolvable(shuffledPieces, gridSize, emptyTileCoordinates)) {
    return shufflePuzzlePieces(shuffledPieces, gridSize, emptyTileCoordinates);
  }
  return shuffledPieces;
}

export default shufflePuzzlePieces;
