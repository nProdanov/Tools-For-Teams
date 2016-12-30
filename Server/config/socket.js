/* globals module */
"use strict";

module.exports = function({ server, data }) {
    const io = require("socket.io")(server);

    io.on('connection', (socket) => {

        socket.on('disconnect', function() {
        });

        socket.on('notification', (notification) => {
            io.emit('notification', notification);
        });

        socket.on('create user-notification', (username) => {
            attachUserNotification(socket, username);
        });

        socket.on('create notification', (projectName) => {
            attachNotification(socket, projectName);
        });

        socket.on('create event', (projectName) => {
            attachEvent(socket, projectName);
        });
    });

    function attachUserNotification(socket, username) {
        socket.on(`${username} notification`, (notification) => {
            socket.emit(`${username} notification`, notification);
        });
    }

    function attachNotification(socket, projectName) {
        socket.on(`${projectName} notification`, (notification) => {
            io.emit(`${projectName} notification`, notification);
        });
    } 

    function attachEvent(socket, projectName) {
        socket.on(projectName, (message) => {
            io.emit(projectName, message);
        });
    }

    return io;
};