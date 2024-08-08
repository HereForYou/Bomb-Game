window.addEventListener("keydown", (event) => handleEvent(event), false);
const handleEvent = (e) => {
  myGameArea.key = e.key;
  if (myGameArea.key && myGameArea.key == "ArrowLeft") {
    socket.emit("move", {
      socketId: socket.id,
      roomName: roomName,
      direction: 1,
    });
  }
  if (myGameArea.key && myGameArea.key == "ArrowRight") {
    socket.emit("move", {
      socketId: socket.id,
      roomName: roomName,
      direction: 0,
    });
  }
  if (myGameArea.key && myGameArea.key == "ArrowUp") {
    socket.emit("move", {
      socketId: socket.id,
      roomName: roomName,
      direction: 3,
    });
  }
  if (myGameArea.key == "ArrowDown") {
    console.log('double click');
    socket.emit("move", {
      socketId: socket.id,
      roomName: roomName,
      direction: 2,
    });
  }
  // if (
  //   myGameArea.key &&
  //   myGameArea.key == " " &&
  //   (myGameArea.key == "ArrowLeft" ||
  //     myGameArea.key == "ArrowRight" ||
  //     myGameArea.key == "ArrowUp" ||
  //     myGameArea.key == "ArrowDown")
  // ) {
  //   let direction = 0;
  //   if(myGameArea.key == "ArrowLeft") direction = 1;
  //   if(myGameArea.key == "ArrowUp") direction = 3;
  //   if(myGameArea.key == "ArrowDown") direction = 2;
  //   socket.emit("move", {
  //     socketId: socket.id,
  //     roomName: roomName,
  //     direction: direction,
  //   });
  //   socket.emit("bomb", {
  //     socketId: socket.id,
  //     roomName: roomName,
  //   });
  // }
  if (myGameArea.key && myGameArea.key == " ") {
    socket.emit("bomb", {
      socketId: socket.id,
      roomName: roomName,
    });
  }
};
