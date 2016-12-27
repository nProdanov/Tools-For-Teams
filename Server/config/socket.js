/* globals module */
"use strict";
// let RoomSocket = require("./room");

module.exports = function ({ server, data }) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('chat message', (message) => {
            io.emit('chat', { type: 'new-message', text: message });
        });

        socket.on('create event', (projectName) => {
            attachEvent(socket, projectName);
        });
    });

    function attachEvent(socket, projectName) {
        socket.on(projectName, (msg) => {
            console.log(msg);
        });
    }

    return io;
};