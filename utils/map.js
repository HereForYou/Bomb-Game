const OBSTACLENUMBER = 200;

const road = 0;
const block = 1;
const obstacle = 2;
const gift = 3;
const bomb = 4;
const explode = 5;
const home = 6;
const bot = 7;

function generateObstacle(grid) {
  let count = 0;
  while (count <= OBSTACLENUMBER) {
    let x = Math.floor(Math.random() * 25);
    let y = Math.floor(Math.random() * 15);
    if (
      (x % 2 === 0 || y % 2 === 0) &&
      !(y === 0 && (x < 3 || x > 22)) &&
      !(y === 14 && (x < 3 || x > 22)) &&
      !(x === 0 && (y < 3 || y > 12)) &&
      !(x === 24 && (y < 3 || y > 12))
    ) {
      grid[x][y] = obstacle;
      count++;
    }
  }
}

function initRoadBlock(grid) {
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 14; j++) {
      if (i % 2 === 1 && j % 2 === 1) {
        grid[i][j] = block;
      }
    }
  }
}

function initHomeBlock(grid) {
  makeHomeBlock(0, 1, 0, 1, grid);
  makeHomeBlock(24, 25, 0, 1, grid);
  makeHomeBlock(0, 1, 14, 15, grid);
  makeHomeBlock(24, 25, 14, 15, grid);
}

function makeHomeBlock(minHomeX, maxHomeX, minHomeY, maxHomeY, grid) {
  for (i = minHomeX; i < maxHomeX; i++)
    for (j = minHomeY; j < maxHomeY; j++) {
      grid[i][j] = home;
    }
}

// const generateBot = (grid, x, y) => {
//   grid[x][y] = bot;
// };

const getInitialPos = (roomItem) => {
  let length = roomItem.roomUserList.length;
  let pos = {
    x: 0,
    y: 0,
  };
  switch (length) {
    case 1: {
      pos.x = 1152;
      pos.y = 0;
      break;
    }
    case 2: {
      pos.x = 0;
      pos.y = 672;
      break;
    }
    default: {
      pos.x = 1152;
      pos.y = 672;
      break;
    }
  }
  return pos;
};

module.exports = {
  generateMap: (grid) => {
    generateObstacle(grid);
    initRoadBlock(grid);
    initHomeBlock(grid);
  },
  getInitialPos: getInitialPos,
  // generateBot: generateBot,
};
