const { isBlock, isHome } = require("./isBlock");

const Right = 0;
const Left = 1;
const Down = 2;
const Up = 3;
const initialSpeed = 8;
const BLOCKSIZE = 48;

var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var bomb = 4;
var explode = 5;
var home = 6;
var extraBomb = 7;

const move = ({ socketId, direction, roomItem }) => {
  let user = roomItem.roomUserList.find((item) => item.socketId === socketId);
  if (user === undefined) return 0;
  if (user.status === 0) return 0;
  let pos_x = Math.floor(user.x / BLOCKSIZE);
  let pos_y = Math.floor(user.y / BLOCKSIZE);

  if (!isBlock(user, direction, roomItem)) {

    if (direction == Up) {
      if (isHome(pos_x, pos_y)) {
        roomItem.grid[pos_x][pos_y] = home;
      } else {
        switch (roomItem.grid[pos_x][pos_y]) {
          case bomb: {
            roomItem.grid[pos_x][pos_y] = bomb;
            break;
          }
          case extraPower: {
            user.bombPower += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraBomb: {
            user.bombNumber += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraSpeed: {
            user.speed < 2 ? (user.speed += 1) : (user.speed += 0);
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          default: {
            roomItem.grid[pos_x][pos_y] = road;
          }
        }
      }
      let speed = user.speed === 1 ? 1 : 1.5;
      user.y -= initialSpeed * speed;
      if (user.x % BLOCKSIZE <= 12) user.x = user.x - (user.x % BLOCKSIZE);
      if (user.x % BLOCKSIZE >= 36)
        user.x = user.x + BLOCKSIZE - (user.x % BLOCKSIZE);
    }
    if (direction == Down) {
      if (isHome(pos_x, pos_y)) {
        roomItem.grid[pos_x][pos_y] = home;
      } else {
        switch (roomItem.grid[pos_x][pos_y]) {
          case bomb: {
            roomItem.grid[pos_x][pos_y] = bomb;
            break;
          }
          case extraPower: {
            user.bombPower += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraBomb: {
            user.bombNumber += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraSpeed: {
            user.speed < 2 ? (user.speed += 1) : (user.speed += 0);
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          default: {
            roomItem.grid[pos_x][pos_y] = road;
          }
        }
      }

      let speed = user.speed === 1 ? 1 : 1.5;
      user.y += initialSpeed * speed;
      if (user.x % BLOCKSIZE <= 12) user.x = user.x - (user.x % BLOCKSIZE);
      if (user.x % BLOCKSIZE >= 36)
        user.x = user.x + BLOCKSIZE - (user.x % BLOCKSIZE);
    }
    if (direction == Left) {
      if (isHome(pos_x, pos_y)) {
        roomItem.grid[pos_x][pos_y] = home;
      } else {
        switch (roomItem.grid[pos_x][pos_y]) {
          case bomb: {
            roomItem.grid[pos_x][pos_y] = bomb;
            break;
          }
          case extraPower: {
            user.bombPower += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraBomb: {
            user.bombNumber += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraSpeed: {
            user.speed < 2 ? (user.speed += 1) : (user.speed += 0);
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          default: {
            roomItem.grid[pos_x][pos_y] = road;
          }
        }
      }
      let speed = user.speed === 1 ? 1 : 1.5;
      user.x -= initialSpeed * speed;
      if (user.y % BLOCKSIZE <= 12) user.y = user.y - (user.y % BLOCKSIZE);
      if (user.y % BLOCKSIZE >= 36)
        user.y = user.y + BLOCKSIZE - (user.y % BLOCKSIZE);
    }
    if (direction == Right) {
      if (isHome(pos_x, pos_y)) {
        roomItem.grid[pos_x][pos_y] = home;
      } else {
        switch (roomItem.grid[pos_x][pos_y]) {
          case bomb: {
            roomItem.grid[pos_x][pos_y] = bomb;
            break;
          }
          case extraPower: {
            user.bombPower += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraBomb: {
            user.bombNumber += 1;
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          case extraSpeed: {
            user.speed < 2 ? (user.speed += 1) : (user.speed += 0);
            roomItem.grid[pos_x][pos_y] = road;
            break;
          }
          default: {
            roomItem.grid[pos_x][pos_y] = road;
          }
        }
      }
      let speed = user.speed === 1 ? 1 : 1.5;
      user.x += initialSpeed * speed;
      if (user.y % BLOCKSIZE <= 12) user.y = user.y - (user.y % BLOCKSIZE);
      if (user.y % BLOCKSIZE >= 36)
        user.y = user.y + BLOCKSIZE - (user.y % BLOCKSIZE);
    }
  }
};

module.exports = {
  move: move,
};
