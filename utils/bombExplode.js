var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var extraBomb = 7;
var bomb = 4;
var explode = 5;
var home = 6;
const BLOCKSIZE = 48;

const Dead = 0;
const Alive = 1;
const Right = 0;
const Left = 1;
const Down = 2;
const Up = 3;
function bombExplode(i, j, power, roomItem, bombuser) {
  roomItem.grid[i][j] = explode;
  users = roomItem.roomUserList;
  users.map((user) => {
    if (isKillBot(i, j, user)) user.status = Dead;
  });
  users = roomItem.roomUserList;
  for (index = 0; index < power; index++) {
    if (isFire(i - index, j, Left)) {
      roomItem.grid[i - index - 1][j] = explode;
      users.map((user, k) => {
        if (isKillBot(i - index - 1, j, user)) {
          user.status = Dead;
          // users.splice(k, 1);
        }
      });
    } else {
      break;
    }
  }
  for (index = 0; index < power; index++) {
    if (isFire(i, j - index, Up)) {
      roomItem.grid[i][j - index - 1] = explode;
      users.map((user, k) => {
        if (isKillBot(i, j - index - 1, user)) {
          user.status = Dead;
          // users.splice(k, 1);
        }
      });
    } else {
      break;
    }
  }
  for (index = 0; index < power; index++) {
    if (isFire(i + index, j, Right)) {
      roomItem.grid[i + index + 1][j] = explode;
      users.map((user, k) => {
        if (isKillBot(i + index + 1, j, user)) {
          user.status = Dead;
          // users.splice(k, 1);
        }
      });
    } else {
      break;
    }
  }
  for (index = 0; index < power; index++) {
    if (isFire(i, j + index, Down)) {
      roomItem.grid[i][j + index + 1] = explode;
      users.map((user, k) => {
        if (isKillBot(i, j + index + 1, user)) {
          user.status = Dead;
          // users.splice(k, 1);
        }
      });
    } else {
      break;
    }
  }
  setTimeout(() => {
    roomItem.grid[i][j] = road;
    for (index = 0; index < power; index++) {
      if (i - index - 1 >= 0) {
        if (roomItem.grid[i - index - 1][j] == explode) {
          roomItem.grid[i - index - 1][j] = road;
        }
      }
    }
    for (index = 0; index < power; index++) {
      if (j - index - 1 >= 0) {
        if (roomItem.grid[i][j - index - 1] == explode) {
          roomItem.grid[i][j - index - 1] = road;
        }
      }
    }
    for (index = 0; index < power; index++) {
      if (i + index + 1 <= 23) {
        if (roomItem.grid[i + index + 1][j] == explode) {
          roomItem.grid[i + index + 1][j] = road;
        }
      }
    }
    for (index = 0; index < power; index++) {
      if (j + index + 1 <= 13) {
        if (roomItem.grid[i][j + index + 1] == explode) {
          roomItem.grid[i][j + index + 1] = road;
        }
      }
    }
  }, 200);
  bombuser.bombNumber++;
}

function isFire(b_x, b_y, direction) {
  if (direction === Left) {
    if (b_x === 0) return false;
    switch (roomItem.grid[b_x - 1][b_y]) {
      case road:
        return true;
        break;
      case obstacle:
        switch (Math.floor(Math.random() * 20)) {
          case 7:
            roomItem.grid[b_x - 1][b_y] = extraBomb;
            break;
          case 8:
            roomItem.grid[b_x - 1][b_y] = extraPower;
            break;
          case 9:
            roomItem.grid[b_x - 1][b_y] = extraSpeed;
            break;
          default:
            roomItem.grid[b_x - 1][b_y] = road;
            break;
        }
        return false;
        break;
      case block:
        roomItem.grid[b_x - 1][b_y] = block;
        return false;
        break;
    }
  }

  if (direction === Right) {
    if (b_x === 24) return false;
    switch (roomItem.grid[b_x + 1][b_y]) {
      case road:
        return true;
        break;
      case obstacle:
        switch (Math.floor(Math.random() * 10)) {
          case 7:
            roomItem.grid[b_x + 1][b_y] = extraBomb;
            break;
          case 8:
            roomItem.grid[b_x + 1][b_y] = extraPower;
            break;
          case 9:
            roomItem.grid[b_x + 1][b_y] = extraSpeed;
            break;
          default:
            roomItem.grid[b_x + 1][b_y] = road;
            break;
        }
        return false;
        break;
      case block:
        roomItem.grid[b_x + 1][b_y] = block;
        return false;
        break;
    }
  }
  if (direction === Up) {
    if (b_y === 0) return false;
    switch (roomItem.grid[b_x][b_y - 1]) {
      case road:
        return true;
        break;
      case obstacle:
        switch (Math.floor(Math.random() * 10)) {
          case 7:
            roomItem.grid[b_x][b_y - 1] = extraBomb;
            break;
          case 8:
            roomItem.grid[b_x][b_y - 1] = extraPower;
            break;
          case 9:
            roomItem.grid[b_x][b_y - 1] = extraSpeed;
            break;
          default:
            roomItem.grid[b_x][b_y - 1] = road;
            break;
        }
        return false;
        break;
      case block:
        roomItem.grid[b_x][b_y - 1] = block;
        return false;
        break;
    }
  }
  if (direction === Down) {
    if (b_y === 14) return false;
    switch (roomItem.grid[b_x][b_y + 1]) {
      case road:
        return true;
        break;
      case obstacle:
        switch (Math.floor(Math.random() * 10)) {
          case 7:
            roomItem.grid[b_x][b_y + 1] = extraBomb;
            break;
          case 8:
            roomItem.grid[b_x][b_y + 1] = extraPower;
            break;
          case 9:
            roomItem.grid[b_x][b_y + 1] = extraSpeed;
            break;
          default:
            roomItem.grid[b_x][b_y + 1] = road;
            break;
        }
        return false;
        break;
      case block:
        roomItem.grid[b_x][b_y - 1] = block;
        return false;
        break;
    }
  }
  return false;
}

const isKillBot = (x, y, user) => {
  let x1 = x * BLOCKSIZE;
  let y1 = y * BLOCKSIZE;
  userx1 = Math.floor(user.x / BLOCKSIZE);
  usery1 = Math.floor(user.y / BLOCKSIZE);
  userx2 = Math.ceil(user.x / BLOCKSIZE);
  usery2 = Math.ceil(user.y / BLOCKSIZE);
  if ((userx1 == x && usery1 == y) || (userx2 == x && usery2 == y)) return true;
  else return false;
};

module.exports = bombExplode;
