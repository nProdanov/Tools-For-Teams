/* globals module */
"use strict";

module.exports = function({ server, data }) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {

        socket.on('disconnect', function() {
        });

        socket.on('chat message', (message) => {
            io.emit('chat', { type: 'new-message', text: message });
        });

        socket.on('create event', (projectName) => {
            attachEvent(socket, projectName);
        });
    });

    function attachEvent(socket, projectName) {
        socket.on(projectName, (message) => {
            io.emit(projectName, message);
        });
    }

    return io;
};