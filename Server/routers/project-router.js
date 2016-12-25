/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, controllers }) {
    let router = new Router();

    router
        .get("/api/users/:id", controllers.getUserById)
        .post("/project", controllers.createProject)
        .post("/users", controllers.createUser)
        .post('/users/:userId/projects', controllers.addProjectToUser);

    app.use("/api", router);

    return router;
};