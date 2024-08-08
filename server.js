const serverPort = 8000;
const clientPort = 4001;

const express = require('express');
const cors = require('cors');

const server = express();
const serverHttp = require('http').Server(server);
const socketManager = require('./socketManager');

server.use(cors());

server.get('/', (req, res) => {
  res.json({ msg: 'Server is running' });
});

serverHttp.listen(serverPort, () => {
  console.log(`Server is running in ${serverPort} port.`);
});

const client = express();
client.use(express.static('public'));
const clientHttp = require('http').Server(client);

client.get('/', (req, res) => {
  res.json({ msg: 'Client is running in 4000' });
});

clientHttp.listen(clientPort, () => {
  console.log(`Client is running in ${clientPort} port`);
});

socketManager.init(serverHttp);
