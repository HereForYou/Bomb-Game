var roomList;
var power;
console.log("connecting...");
const socket = io.connect("http://192.168.142.156:8000");
let roomName = "";

socket.on("connected", (data) => {
  roomList = data;
  roomList.map((item) => {
    var content =
      '<div class="room">' +
      '<div style="padding-right: 128px">' +
      '<div class="roomNameLeft">Room Name</div>' +
      '<div id="roomNameLeft" class="roomNameLeft" style="text-align: center">' +
      item.roomName +
      "</div>" +
      "</div>" +
      '<div class="userNameTitle">' +
      "<div>User Name</div>" +
      "</div>" +
      '<div class="user">' +
      "<div>" +
      '<div id="userName1" class="userNameList">' +
      (item.roomUserList[0].userName !== undefined
        ? item.roomUserList[0].userName
        : "") +
      "</div>" +
      '<div id="userName1" class="userNameList">' +
      (item.roomUserList.length > 1 ? item.roomUserList[1].userName : "") +
      "</div>" +
      "</div>" +
      "<div>" +
      '<div id="userName1" class="userNameList">' +
      (item.roomUserList.length > 2 ? item.roomUserList[2].userName : "") +
      "</div>" +
      '<div id="userName1" class="userNameList">' +
      (item.roomUserList.length > 3 ? item.roomUserList[3].userName : "") +
      "</div>" +
      "</div>" +
      "</div>" +
      ' <button class="joinRoom" onclick="onRoomJoin(' +
      "'" +
      item.roomName +
      "'" +
      ")" +
      '">Join</button>' +
      "</div>";
    $(".roomList").append(content);
  });
});

const onRoomCreate = () => {
  const userName = document.getElementById("userName").value;
  roomName = document.getElementById("roomName").value;
  if (userName === "") {
    alert("Please input your name");
  } else if (roomName !== "") {
    socket.emit("newRoom", {
      userName: userName,
      roomName: roomName,
      socketId: socket.id,
    });
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("canvas").style.display = "flex";
    document.getElementById("Info").style.display = "flex";
    startGame();
  } else alert("Please input the roomname!");
};

socket.on("newRoomResponse", (data) => {
  data.map((roomItem) => {
    if (roomItem.socketId === socket.id) {
      rooms = roomItem;
      roomName = roomItem.roomName;
      let user = roomItem.roomUserList;
      displayUserInfo(user);
      updateGameArea();
    }
  });
});

const onRoomJoin = (roomName) => {
  const userName = document.getElementById("userName").value;
  if (userName === "") {
    alert("Please input your name!");
  } else {
    socket.emit("join", {
      socketId: socket.id,
      userName: userName,
      roomName: roomName,
    });
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("canvas").style.display = "flex";
    document.getElementById("Info").style.display = "flex";

    startGame();
  }
};

socket.on("joinResponse", (data) => {
  rooms = data;
  let user = data.roomUserList;
  displayUserInfo(user);
  updateGameArea();
  roomName = data.roomName;
});

socket.on("moveResponse", (data) => {
  rooms = data;
  let user = data.roomUserList;
  displayUserInfo(user);
  updateGameArea();
});

socket.on("bombResponse", (data) => {
  rooms = data;
  let users = data.roomUserList;
  displayUserInfo(users);
  updateGameArea();
});
socket.on("bombExplodeResponse", (data) => {
  rooms = data.roomItem;
  power = data.power;
  updateGameArea();
});

socket.on("gameOverResponse", () => {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("canvas").style.display = "none";
  document.getElementById("Info").style.display = "none";
  document.getElementById("gameOver").style.display = "flex";
});
