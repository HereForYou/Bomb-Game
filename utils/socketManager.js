let socketIO;
module.exports = {
  init: (http) => {
    socketIO = require("socket.io")(http, {
      cors: "*",
    });

    
  },
  getIo: () => socketIO,
};
