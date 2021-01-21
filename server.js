// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : server.js
// Description : Node.js server
// ************************************************

var express = require('express'); // Equivalent to an "import" command. Imports the express module.
var app = express(); // Triggering the express() function to create an app that is stored in the "app" variable.
var server = app.listen(3000); // Server listens on port 3000 (localhost)
app.use(express.static('public')); // Telling the server where to look for delivering the hosted (static) files.
console.log("Test Node.js");

var socket = require('socket.io');
var io = socket(server);

var allClients = [];

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log("Connection ID : " + socket.id + " NEW CONNECTION");
	// Get lobby message from game_menus.js
	socket.on('createLobbyMessage', handleLobbyName);
}

io.sockets.on('connection', function(socket) {
   allClients.push(socket);

   socket.on('disconnect', function() {
      console.log("Connection ID : " + socket.id + " DISCONNECTED");

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
   });
});

//socket.on('createLobbyMessage', handleLobbyName);

function handleLobbyName(lobby) {
	console.log(lobby);
}

// Code from https://github.com/LukeGarrigan/p5-multiplayer-game-starter
/*let players = [];

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });
});

io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);
  players = players.filter(player => player.id !== socket.id);
});

function updateGame() {
  io.sockets.emit("heartbeat", players);
}*/