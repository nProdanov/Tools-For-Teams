/* globals module */
"use strict";

module.exports = function({ server }) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('chat message', (message) => {
            io.emit('chat', { type: 'new-message', text: message });
        });

        socket.on('message-board-update', (message, userName) => {
            io.emit('message-board-update', { type: 'new-message-board', text: message, userName: userName });
        });
    });

    return io;
};