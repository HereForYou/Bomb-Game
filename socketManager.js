let socketIO;

const roomList = [];
const sockets = {};
const Dead = 0;
const Alive = 1;
const getAllUsers = () => Object.values(socketToUserMap);

const getUserFromSocketId = (socketId) => socketToUserMap[socketId];

const getSocketFromUserId = (userId) => userToSocketMap[userId];

const getSocketById = (socketID) => {
  return sockets[socketID];
};

const deleteUser = (roomItem) => {
  roomItem.roomUserList = roomItem.roomUserList.filter(
    (user) => user.status === Alive,
  );
};

const addSocketById = (socketID, socket) => (sockets[socketID] = socket);

const removeSocketById = (socketID) => delete sockets[socketID];

const { generateMap, getInitialPos, generateBot } = require('./utils/map');
const { move } = require('./utils/move');
const bombPut = require('./utils/bomb');
const bombExplode = require('./utils/bombExplode');

const removeUserFromRoom = (user, room) => {
  room.roomUserList.map((userItem, index) => {
    if (user.socketId === userItem.socketId) {
      room.roomUserList.splice(index, 1);
    }
  });
};

const removeUserFromRoomList = (socketId) => {
  for (roomItem of roomList) {
    if (roomItem) {
      roomItem.roomUserList.map((user, index) => {
        if (user.socketId === socketId) {
          roomItem.roomUserList.splice(index, 1);
        }
      });
    }
  }
};

const removeRoom = () => {
  let length = roomList.length;
  for (let index = length; index > 0; index--) {
    if (roomList[index - 1].roomUserList.length === 0) {
      roomList.splice(index - 1, 1);
    }
  }
};

const findRoomUsersAllDead = () => {
  for (roomItem of roomList) {
    let userList = roomItem.roomUserList;
    if (
      userList.length === userList.filter((item) => item.status === 0).length
    ) {
      userList.map((user) => {
        if (getSocketById(user.socketId)) {
          getSocketById(user.socketId).emit('gameOverResponse');
        } else {
          removeUserFromRoom(user, roomItem);
        }
      });
    }
  }
};

module.exports = {
  init: (http) => {
    socketIO = require('socket.io')(http, {
      cors: '*',
    });

    socketIO.on('connection', (socket) => {
      console.log(`⚡ ${socket.id} has connected.`);
      addSocketById(socket.id, socket);

      socket.emit('connected', roomList);

      // -------------------------------- newRoom -----------------------------
      socket.on('newRoom', (data) => {
        const { socketId, roomName, userName } = data;

        let roomItem = roomList.find((item) => item.socketId === socketId);

        if (roomItem) {
          socket.emit('newRoomResponse', {
            msg: 'You have already created one room!',
          });
        } else {
          let grid = [];
          for (let i = 0; i < 25; i++) grid[i] = [];
          for (i = 0; i < 25; i++) for (j = 0; j < 15; j++) grid[i][j] = 0;

          generateMap(grid);

          const newRoom = {
            socketId: socketId,
            roomName: roomName,
            createrName: userName,
            roomUserList: [
              {
                socketId: socketId,
                userName: userName,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                bombNumber: 2,
                bombPower: 1,
                speed: 1,
                status: Alive,
              },
            ],
            grid: grid,
          };

          roomList.push(newRoom);
          socketIO.emit('newRoomResponse', roomList);
        }
        findRoomUsersAllDead();
      });

      //---------------------------- join --------------------------------------
      socket.on('join', (data) => {
        const { socketId, userName, roomName } = data;
        let response = '';

        const roomItem = roomList.find((item) => item.roomName === roomName);

        if (roomItem) {
          if (roomItem.roomUserList.length >= 4)
            response = 'That room is full.';
          else {
            let pos = getInitialPos(roomItem);
            roomItem.roomUserList.push({
              socketId: socketId,
              userName: userName,
              x: pos.x,
              y: pos.y,
              width: 0,
              height: 0,
              bombNumber: 2,
              bombPower: 1,
              speed: 1,
              status: Alive,
            });

            for (userItem of roomItem.roomUserList) {
              if (getSocketById(userItem.socketId)) {
                getSocketById(userItem.socketId).emit('joinResponse', roomItem);
              } else {
                removeUserFromRoom(userItem, roomItem);
              }
            }
          }
        } else response = "That room doesn't exist.";

        if (response !== '') socket.emit('errorResponse', { error: response });
        findRoomUsersAllDead();
      });

      //--------------------- move ---------------------------------------
      socket.on('move', (data) => {
        console.log('moving');
        const { socketId, roomName, direction } = data;
        roomItem = roomList.find((item) => item.roomName === roomName);
        if (roomItem) {
          move({ socketId, direction, roomItem });
          for (userItem of roomItem.roomUserList) {
            if (getSocketById(userItem.socketId)) {
              getSocketById(userItem.socketId).emit('moveResponse', roomItem);
            } else {
              removeUserFromRoom(userItem, roomItem);
            }
            F;
          }
        } else {
          socket.emit('errorResponse', { error: 'Room is cleared.' });
        }
        findRoomUsersAllDead();
      });

      //------------------Bomb-------------------------------------------------
      socket.on('bomb', (data) => {
        const { socketId, roomName } = data;
        roomItem = roomList.find((item) => item.roomName == roomName);
        if (roomItem) {
          bombPut({ socketId, roomItem });
          roomItem.roomUserList.map((userItem) => {
            if (getSocketById(userItem.socketId)) {
              getSocketById(userItem.socketId).emit('bombResponse', roomItem);
            } else {
              removeUserFromRoom(userItem, roomItem);
            }
          });
          setTimeout(() => {
            let user = roomItem.roomUserList.find(
              (item) => item.socketId === socketId,
            );
            if (user) {
              data = { roomItem: roomItem, power: user.bombPower };
              roomItem.roomUserList.map((userItem) => {
                if (getSocketById(userItem.socketId)) {
                  getSocketById(userItem.socketId).emit(
                    'bombExplodeResponse',
                    data,
                  );
                } else {
                  removeUserFromRoom(userItem, roomItem);
                }
              });
              setTimeout(() => {
                roomItem.roomUserList.map((userItem) => {
                  if (getSocketById(userItem.socketId)) {
                    getSocketById(userItem.socketId).emit(
                      'bombExplodeResponse',
                      data,
                    );
                  } else {
                    removeUserFromRoom(userItem, roomItem);
                  }
                });
                findRoomUsersAllDead();
              }, 300);
            }
          }, 2200);
        }
      });

      //--------------------------Bomb End----------------------------------
      socket.on('disconnect', () => {
        console.log(`🔥 ${socket.id} has disconnected!`);
        removeSocketById(socket.id);
        removeUserFromRoomList(socket.id);
        removeRoom();
        // roomList.map((roomItem, index) => {
        //   if (roomItem.socketId === socket.id) {
        //     roomList.splice(index, 1);
        //   }
        // });
      });
    });
  },
};
