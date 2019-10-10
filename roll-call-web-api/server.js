// Express API's part

const express = require('express');
// const Auth = require('./src/api/auth');
const app = express();

var Auth = require('./src/api/Auth')
var User_Controller = require('./src/api/User_Controller')

app.use(express.static('public'));
app.use('/auth', Auth);
app.use('/user', User_Controller);

var server = app.listen(8080, function () {
    console.log("Listening on port *:8080");
})

// Socket.io's part

// var socket = require('socket.io');
// var io = socket(server);
