/* globals module */
"use strict";

module.exports = function ({ server }) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('chat message', (message) => {
            io.emit('chat', { type: 'new-message', text: message });
        });
    });


    return io;
};