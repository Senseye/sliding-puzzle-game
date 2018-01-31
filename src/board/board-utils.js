export default function calculateCoordinates(index, gridSize) {
  const x = Math.floor(index / gridSize);
  const y = index % gridSize;

  console.log('index, gridSize, x', index, gridSize, x);
  return { x, y };
}
