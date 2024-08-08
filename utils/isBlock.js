// const { isHome } = require('./move')

const Right = 0;
const Left = 1;
const Down = 2;
const Up = 3;

const BLOCKSIZE = 48;
const ROW = 25;
const COLUMN = 15;

var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var bomb = 4;
var explode = 5;
var home = 6;
var extraBomb = 7;

function isBlock(user, direction, roomItem) {
  let x = user.x;
  let y = user.y;
  if (direction === Left) {
    x = Math.floor((user.x - 5) / BLOCKSIZE);

    if (y % BLOCKSIZE >= 36) {
      y = Math.ceil(user.y / BLOCKSIZE);
    } else if (y % BLOCKSIZE <= 12) y = Math.floor(user.y / BLOCKSIZE);
    else y = Math.floor(user.y / BLOCKSIZE);

    if (x === -1) return true;
    if (
      (roomItem.grid[x][y] !== road &&
        roomItem.grid[x][y] !== home &&
        roomItem.grid[x][y] !== explode &&
        roomItem.grid[x][y] !== extraBomb &&
        roomItem.grid[x][y] !== extraSpeed &&
        roomItem.grid[x][y] !== extraPower) ||
      (user.y % BLOCKSIZE > 12 &&
        user.y % BLOCKSIZE < 36 &&
        !isHome(
          Math.ceil(user.x / BLOCKSIZE),
          Math.floor(user.y / BLOCKSIZE) + 1
        ))
    ) {
      return true;
    }
  }

  if (direction === Right) {
    x = Math.ceil((user.x + 5) / BLOCKSIZE);

    if (y % BLOCKSIZE >= 36) {
      y = Math.ceil(user.y / BLOCKSIZE);
    } else if (y % BLOCKSIZE <= 12) y = Math.floor(user.y / BLOCKSIZE);
    else y = Math.floor(user.y / BLOCKSIZE);

    if (x === 25) return true;

    if (
      (roomItem.grid[x][y] !== road &&
        roomItem.grid[x][y] !== home &&
        roomItem.grid[x][y] !== explode &&
        roomItem.grid[x][y] !== extraBomb &&
        roomItem.grid[x][y] !== extraSpeed &&
        roomItem.grid[x][y] !== extraPower) ||
      (user.y % BLOCKSIZE > 12 &&
        user.y % BLOCKSIZE < 36 &&
        !isHome(
          Math.ceil(user.x / BLOCKSIZE),
          Math.floor(user.y / BLOCKSIZE) + 1
        ))
    ) {
      return true;
    }
  }

  if (direction === Up) {
    y = Math.floor((user.y - 5) / BLOCKSIZE);

    if (user.x % BLOCKSIZE >= 36) {
      x = Math.ceil(user.x / BLOCKSIZE);
    } else if (user.x % BLOCKSIZE <= 12) x = Math.floor(user.x / BLOCKSIZE);
    else x = Math.floor(user.x / BLOCKSIZE);

    if (y === -1) return true;

    if (
      (roomItem.grid[x][y] !== road &&
        roomItem.grid[x][y] !== home &&
        roomItem.grid[x][y] !== explode &&
        roomItem.grid[x][y] !== extraBomb &&
        roomItem.grid[x][y] !== extraSpeed &&
        roomItem.grid[x][y] !== extraPower) ||
      (user.x % BLOCKSIZE > 12 &&
        user.x % BLOCKSIZE < 36 &&
        !isHome(
          Math.ceil(user.x / BLOCKSIZE) - 1,
          Math.ceil(user.y / BLOCKSIZE)
        ))
    ) {
      return true;
    }
  }

  if (direction === Down) {
    y = Math.ceil((user.y + 5) / BLOCKSIZE);

    if (user.x % BLOCKSIZE >= 36) {
      x = Math.ceil(user.x / BLOCKSIZE);
    } else if (user.x % BLOCKSIZE <= 5) x = Math.floor(user.x / BLOCKSIZE);
    else x = Math.floor(user.x / BLOCKSIZE);

    if (y === 15) return true;

    if (
      (roomItem.grid[x][y] !== road &&
        roomItem.grid[x][y] !== home &&
        roomItem.grid[x][y] !== explode &&
        roomItem.grid[x][y] !== extraBomb &&
        roomItem.grid[x][y] !== extraSpeed &&
        roomItem.grid[x][y] !== extraPower) ||
      (user.x % BLOCKSIZE > 12 &&
        user.x % BLOCKSIZE < 36 &&
        !isHome(
          Math.ceil(user.x / BLOCKSIZE),
          Math.floor(user.y / BLOCKSIZE) + 1
        ))
    ) {
      return true;
    }
  }
  return false;
}

const isHome = (x, y) => {
  if (
    (x < 1 && y < 1) ||
    (x > ROW - 2 && y < 1) ||
    (x < 1 && y > COLUMN - 2) ||
    (x > ROW - 2 && y > COLUMN - 2)
  )
    return true;
  return false;
};

module.exports = {
  isBlock: isBlock,
  isHome: isHome,
};

/*
 ||
      (user.y % BLOCKSIZE > 12 &&
        user.y % BLOCKSIZE < 20 &&
        !isHome(Math.ceil(user.x / BLOCKSIZE) - 1, Math.ceil(user.y / BLOCKSIZE)))

        ||
      (user.y % BLOCKSIZE > 10 &&
        user.y % BLOCKSIZE < 20 &&
        !isHome(Math.floor(user.x / BLOCKSIZE) + 1, Math.ceil(user.y / BLOCKSIZE)))
 ||
      (user.x % BLOCKSIZE > 10 &&
        user.x % BLOCKSIZE < 20 &&
        !isHome(Math.ceil(user.x / BLOCKSIZE), Math.ceil(user.y / BLOCKSIZE) - 1))
 ||
      (user.x % BLOCKSIZE > 10 &&
        user.x % BLOCKSIZE < 20 &&
        !isHome(Math.ceil(user.x / BLOCKSIZE), Math.floor(user.y / BLOCKSIZE) + 1))
*/
