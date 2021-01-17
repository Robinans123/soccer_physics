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
app.use(express.static('public')); // Telling the server where to look for delivering the hosted files.
console.log("Test Node.js");