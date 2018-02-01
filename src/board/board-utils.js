export function calculateCoordinates(index, gridSize) {
  const x = Math.floor(index / gridSize);
  const y = index % gridSize;
  return { x, y };
}

export function calculatePosition({ x, y }, gridSize, imageSize) {
  const tileSize = imageSize / gridSize;
  const top = x * tileSize;
  const left = y * tileSize;

  return { top, left };
}
