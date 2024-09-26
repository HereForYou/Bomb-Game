var BOARDWIDTH = 48 * 25;
var BOARDHEIGHT = 48 * 15;

var myObstacles = [];
var roadBlock = [];
var homeBlock = [];
var myBombs = [];
var bombExplodes = [];
var grid = [];
var explode = [];

const Right = 0;
const Left = 1;
const Down = 2;
const Up = 3;

var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var bomb = 4;
var explode = 5;
var home = 6;
var extraBomb = 7;

//
var RoadImg;
var BlockImg;
var BombNumberImg;
var BombImg;
var BombPowerImg;
var BrickImg;
var SmileyImg;
var AngryImg;
var ExplodeImg;
var BoostImg;
function startGame() {
  RoadImg = document.getElementById("Road");
  BlockImg = document.getElementById("Block");
  BombNumberImg = document.getElementById("BombNumber");
  BombImg = document.getElementById("Bomb");
  BombPowerImg = document.getElementById("BombPower");
  BrickImg = document.getElementById("Brick");
  SmileyImg = document.getElementById("Smiley");
  AngryImg = document.getElementById("Angry");
  ExplodeImg = document.getElementById("Explode");
  BoostImg = document.getElementById("Boost");
  myGameArea.start();
}
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = BOARDWIDTH;
    this.canvas.height = BOARDHEIGHT;
    this.context = this.canvas.getContext("2d");
    document
      .getElementById("canvas")
      .append(this.canvas, document.body.childNodes[0]);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.color = color;

  this.update = function (color = null) {
    ctx = myGameArea.context;
    ctx.fillStyle = color ? color : this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
function fireComponent(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.color = color;
  this.update = function (color = null) {
    ctx = myGameArea.context;
    var grd = ctx.createRadialGradient(25, 25, 5, 25, 25, 25);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.3, "yellow");
    grd.addColorStop(0.6, "red");
    grd.addColorStop(1, "yellow");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 50, 50);
  };
}
function userComponent(width, height, image, x, y) {
  this.width = width;
  this.height = height;
  this.speed = 0.5;
  this.socketId;
  this.bombCount = 1;
  this.bombPower = 1;
  this.x = x;
  this.y = y;
  // this.image = new Image();
  this.image = image;
  this.update = function (color = null) {
    ctx = myGameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
}
let timerId,
  x,
  y,
  count = 0;

function isFire(b_x, b_y, direction) {
  if (direction === Left) {
    if (b_x === 0) return false;
    if (grid[b_x - 1][b_y] === road || grid[b_x - 1][b_y] === obstacle) {
      return true;
    }
  }
  if (direction === Right) {
    if (b_x === 28) return false;
    if (grid[b_x + 1][b_y] === road || grid[b_x + 1][b_y] === obstacle) {
      return true;
    }
  }
  if (direction === Up) {
    if (b_y === 0) return false;
    if (grid[b_x][b_y - 1] === road || grid[b_x][b_y - 1] === home) {
      return true;
    }
  }
  if (direction === Down) {
    if (b_y === 18) return false;
    if (grid[b_x][b_y + 1] === road || grid[b_x][b_y + 1] === home) {
      return true;
    }
  }
  return false;
}
