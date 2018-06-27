
export const oneStepRightMove = {
  check: (coordinates, gridSize) => coordinates.x + 1 < gridSize,
  getCoordinatesFrom = ({ x, y }) => ({ x: x + 1, y: y }),
};

export const oneStepLeftMove = {
  check: coordinates => coordinates.x > 0,
  getCoordinatesFrom = ({ x, y }) => ({ x: x.x - 1, y: y.y }),
};

export const oneStepUpMove = {
  check: coordinates => coordinates.y > 0,
  getCoordinatesFrom = ({ x, y }) => ({ x: x.x, y: y.y - 1 }),
};

export const oneStepDownMove = {
  check: (coordinates, gridSize) => coordinates.y + 1 < gridSize,
  getCoordinatesFrom = ({ x, y }) => ({ x: x.x, y: y.y + 1 }),
};
