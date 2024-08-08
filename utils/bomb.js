const bombExplode = require("./bombExplode");

var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var bomb = 4;
var explode = 5;
var home = 6;
var extraBomb = 7;
const BLOCKSIZE = 48

const bombPut = ({ socketId, roomItem }) => {
  let user = roomItem.roomUserList.find((item) => item.socketId === socketId);
  if (user === undefined) return 0;
  if (user.bombNumber > 0 && user.status === 1) {
    user.bombNumber--;
    let pos_x = Math.round(user.x / BLOCKSIZE);
    let pos_y = Math.round(user.y / BLOCKSIZE);
    roomItem.grid[pos_x][pos_y] = bomb;
    setTimeout(() => {
      roomItem.grid[pos_x][pos_y] = explode;
      bombExplode(pos_x, pos_y, user.bombPower, roomItem, user);
    }, 2000);
  }
};
module.exports = bombPut;
