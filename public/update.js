const Dead = 0;
const Alive = 1;
const BLOCKSIZE = 48;
var road = 0;
var block = 1;
var obstacle = 2;
var extraPower = 3;
var extraSpeed = 8;
var extraBomb = 7;
var bomb = 4;
var explode = 5;
var home = 6;
let update_flag = false;
function updateGameArea() {
  if (!update_flag) {
    myGameArea.clear();
    for (i = 0; i < 25; i++) {
      for (j = 0; j < 15; j++) {
        switch (rooms.grid[i][j]) {
          case road:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              RoadImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case block:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BlockImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case obstacle:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BrickImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case bomb:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BombImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case home:
            new component(
              BLOCKSIZE,
              BLOCKSIZE,
              "blue",
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case explode:
            // drawExplode(i, j, 2);
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              ExplodeImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case extraBomb:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BombNumberImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case extraPower:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BombPowerImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
          case extraSpeed:
            new userComponent(
              BLOCKSIZE,
              BLOCKSIZE,
              BoostImg,
              i * BLOCKSIZE,
              j * BLOCKSIZE
            ).update();
            break;
        }
      }
    }
    rooms.roomUserList.map((userItem) => {
      if (userItem.status == Alive) {
        if (userItem.socketId === socket.id)
          new userComponent(
            BLOCKSIZE,
            BLOCKSIZE,
            SmileyImg,
            userItem.x,
            userItem.y
          ).update();
        else
          new userComponent(
            BLOCKSIZE,
            BLOCKSIZE,
            AngryImg,
            userItem.x,
            userItem.y
          ).update();
      }
    });
    update_flag = false;
  }
}

function displayUserInfo(user) {
  $("#userInfo").empty();
  user.map((userInfo) => {
    tag =
      '<div id="User1" style="width: 25%; padding-left:20px" style="text-align: center;">' +
      "<h1 style='margin-top:10px;margin-bottom:10px;'>" +
      userInfo.userName +
      "</h1>";
    tag1 = bombTag(userInfo.bombNumber);
    tag2 = powerTag(userInfo.bombPower);
    tag3 = "<div>Status: " + userInfo.status + "</div>";
    totaltag = tag + "<div>" + tag1 + "</div><div>" + tag2 + "</div>";
    $("#userInfo").append(totaltag);
  });
}

function bombTag(count) {
  let bombtag = "";
  while (count > 0) {
    bombtag += "<img src='./bombTag.png' width='30px'>";
    count--;
  }
  return bombtag;
}
function powerTag(count) {
  let powertag = "";
  while (count > 0) {
    powertag += "<img src='./ExplodeTag.png' width='30px'>";
    count--;
  }
  return powertag;
}
