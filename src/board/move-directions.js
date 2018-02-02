
export const oneStepRightMove = {
  check: (coordinates, gridSize) => coordinates.x + 1 < gridSize,
  getCoordinatesFrom(currentCoordinates) {
    return { x: currentCoordinates.x + 1, y: currentCoordinates.y };
  },
};

export const oneStepLeftMove = {
  check: coordinates => coordinates.x > 0,
  getCoordinatesFrom(currentCoordinates) {
    return { x: currentCoordinates.x - 1, y: currentCoordinates.y };
  },
};

export const oneStepUpMove = {
  check: coordinates => coordinates.y > 0,
  getCoordinatesFrom(currentCoordinates) {
    return { x: currentCoordinates.x, y: currentCoordinates.y - 1 };
  },
};

export const oneStepDownMove = {
  check: (coordinates, gridSize) => coordinates.y + 1 < gridSize,
  getCoordinatesFrom(currentCoordinates) {
    return { x: currentCoordinates.x, y: currentCoordinates.y + 1 };
  },
};
